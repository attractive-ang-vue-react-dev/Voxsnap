from django.db.backends.postgresql.features import DatabaseFeatures as PGDatabaseFeatures

class DatabaseFeatures(PGDatabaseFeatures):
    can_return_id_from_insert = False
    can_return_ids_from_bulk_insert = False