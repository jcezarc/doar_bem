import os
from util.db.sql_table import SqlTable
from util.db.lite_table import LiteTable

DOAR_FAZ_BEM_USER = os.environ.get('DOAR_FAZ_BEM_USER', 'juliocascalles')
DOAR_FAZ_BEM_PASSWORD = os.environ.get('DOAR_FAZ_BEM_PASSWORD', 'EquipeDoarBem!')
DOAR_FAZ_BEM_HOST = os.environ.get('DOAR_FAZ_BEM_HOST', 'localhost')

def get_table(schema):
    if DOAR_FAZ_BEM_HOST == 'temp':
        # --- Sqlite ----------------------------
        return LiteTable(schema, {
            "timeout": 5,
            "database": "doar_bem",
            "cached_statements": 100,
            "uri": True,
            "check_same_thread": True
        })
    else:
        # --- MySql -------------------------
        return LiteTable(schema, {
            "username": DOAR_FAZ_BEM_USER,
            "password": DOAR_FAZ_BEM_PASSWORD,
            "host": DOAR_FAZ_BEM_HOST,
            "database": "doar_bem"
        })
