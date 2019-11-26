"""
PostgreSQL database backend for Django.

Requires psycopg 2: http://initd.org/projects/psycopg2
"""
from django.db.backends.postgresql.base import \
    DatabaseWrapper as PBDatabaseWrapper, Database

# # Some of these import psycopg2, so import them after checking if it's installed.
from .introspection import DatabaseIntrospection            # NOQA isort:skip
from .operations import DatabaseOperations                  # NOQA isort:skip
from .schema import DatabaseSchemaEditor                    # NOQA isort:skip
from .features import DatabaseFeatures

class DatabaseWrapper(PBDatabaseWrapper):
    vendor = 'crate'
    display_name = 'CrateDB'

    data_types = {
        **PBDatabaseWrapper.data_types,
        'DateTimeField': 'timestamp',
    }
    
    # The patterns below are used to generate SQL pattern lookup clauses when
    # the right-hand side of the lookup isn't a raw string (it might be an expression
    # or the result of a bilateral transformation).
    # In those cases, special characters for LIKE operators (e.g. \, *, _) should be
    # escaped on database side.
    #
    # Note: we use str.format() here for readability as '%' is used as a wildcard for
    # the LIKE operator.
    pattern_esc = r"REPLACE(REPLACE(REPLACE({}, '\', '\\'), '%%', '\%%'), '_', '\_')"

    SchemaEditorClass = DatabaseSchemaEditor
    introspection_class = DatabaseIntrospection
    ops_class = DatabaseOperations
    features_class = DatabaseFeatures

    def ensure_timezone(self):
        self.ensure_connection()
        return super(DatabaseWrapper, self).ensure_timezone()

    def init_connection_state(self):
        self.connection.set_client_encoding('UTF8')

        timezone_changed = self.ensure_timezone()
        if timezone_changed:
            # Commit after setting the time zone (see #17062)
            if not self.get_autocommit():
                self.connection.commit()

    def is_usable(self):
        try:
            # Use a psycopg cursor directly, bypassing Django's utilities.
            self.connection.cursor().execute("SELECT 1")
        except Database.Error:
            return False
        else:
            return True