from django.db.backends.postgresql.introspection import (
    DatabaseIntrospection as PGDatabaseIntrospection, FieldInfo, TableInfo,
)
from django.db.models.indexes import Index

class DatabaseIntrospection(PGDatabaseIntrospection):
    # Maps type codes to Django Field types.
    data_types_reverse = {
        **PGDatabaseIntrospection.data_types_reverse,
        1114: 'DateTimeField',
        1184: 'DateTimeField',
        1185: 'DateTimeField',
    }

    def get_table_list(self, cursor):
        """Return a list of table and view names in the current database."""
        cursor.execute("""
            SELECT c.relname, c.relkind
            FROM pg_catalog.pg_class c
            LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
            WHERE c.relkind IN ('r', 'v')
                AND n.nspname NOT IN ('pg_catalog', 'pg_toast')""")
# broken until cratedb fixes post 3.2.0
#                AND pg_catalog.pg_table_is_visible(c.oid)""")
        return [TableInfo(row[0], {'r': 't', 'v': 'v'}.get(row[1]))
                for row in cursor.fetchall()
                if row[0] not in self.ignored_tables]
