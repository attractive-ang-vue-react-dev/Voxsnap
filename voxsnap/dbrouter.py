class AnalyticsRouter:
    """
    This router will send all analytics requests to the CrateDB
    analytics database via the PostgreSQL wire protocol
    """

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'analytics':
            return 'analytics'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'analytics':
            return 'analytics'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'analytics':
            return db == 'analytics'
        return None
