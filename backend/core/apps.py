from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'
    # The app used to be called `backend`; the label keeps its database tables and migration history.
    label = 'backend'
