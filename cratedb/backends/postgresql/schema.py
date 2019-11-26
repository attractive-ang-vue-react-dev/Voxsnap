from django.db.backends.postgresql.schema import \
    DatabaseSchemaEditor as PGDatabaseSchemaEditor
import psycopg2


class DatabaseSchemaEditor(PGDatabaseSchemaEditor):
    sql_create_index = "CREATE INDEX %(name)s ON %(table)s%(using)s (%(columns)s)%(extra)s"
    sql_create_varchar_index = "CREATE INDEX %(name)s ON %(table)s (%(columns)s varchar_pattern_ops)%(extra)s"
    sql_create_text_index = "CREATE INDEX %(name)s ON %(table)s (%(columns)s text_pattern_ops)%(extra)s"

    def _create_like_index_sql(self, model, field):
        """
        Return the statement to create an index with varchar operator pattern
        when the column type is 'varchar' or 'text', otherwise return None.
        """
        db_type = field.db_type(connection=self.connection)
        if db_type is not None and (field.db_index or field.unique):
            # Fields with database column types of `varchar` and `text` need
            # a second index that specifies their operator class, which is
            # needed when performing correct LIKE queries outside the
            # C locale. See #12234.
            #
            # The same doesn't apply to array fields such as varchar[size]
            # and text[size], so skip them.
            if '[' in db_type:
                return None
            if db_type.startswith('varchar'):
                return self._create_index_sql(
                    model, [field],
                    suffix='_like',
                    sql=self.sql_create_varchar_index)
            elif db_type.startswith('text'):
                return self._create_index_sql(model, [field],
                                              suffix='_like',
                                              sql=self.sql_create_text_index)
        return None

    def _alter_field(self,
                     model,
                     old_field,
                     new_field,
                     old_type,
                     new_type,
                     old_db_params,
                     new_db_params,
                     strict=False):
        # Drop indexes on varchar/text/citext columns that are changing to a
        # different type.
        if (old_field.db_index or old_field.unique) and (
            (old_type.startswith('varchar')
             and not new_type.startswith('varchar')) or
            (old_type.startswith('text') and not new_type.startswith('text'))
                or (old_type.startswith('citext')
                    and not new_type.startswith('citext'))):
            index_name = self._create_index_name(model._meta.db_table,
                                                 [old_field.column],
                                                 suffix='_like')
            self.execute(
                self._delete_constraint_sql(self.sql_delete_index, model,
                                            index_name))

        super()._alter_field(model, old_field, new_field, old_type, new_type,
                             old_db_params, new_db_params, strict)
        # Added an index? Create any PostgreSQL-specific indexes.
        if ((not (old_field.db_index or old_field.unique)
             and new_field.db_index)
                or (not old_field.unique and new_field.unique)):
            like_index_statement = self._create_like_index_sql(
                model, new_field)
            if like_index_statement is not None:
                self.execute(like_index_statement)

        # Removed an index? Drop any PostgreSQL-specific indexes.
        if old_field.unique and not (new_field.db_index or new_field.unique):
            index_to_remove = self._create_index_name(model._meta.db_table,
                                                      [old_field.column],
                                                      suffix='_like')
            self.execute(
                self._delete_constraint_sql(self.sql_delete_index, model,
                                            index_to_remove))
