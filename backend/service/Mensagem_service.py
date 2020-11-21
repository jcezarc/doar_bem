import logging
from datetime import datetime
from model.Mensagem_model import MensagemModel
from util.messages import (
    resp_error,
    resp_not_found,
    resp_post_ok,
    resp_get_ok,
    resp_ok
)
from util.dateutils import str_short_date
from service.db_connection import get_table

class MensagemService:
    def __init__(self, table=None):
        if table:
            self.table = table
        else:
            self.table = get_table(MensagemModel)
        self.table.required_fields = ['para', 'lida']

    def find(self, params, id=None):
        if id:
            logging.info(f'Finding "{id}" in Mensagem ...')
            found = self.table.find_one([id])
        else:
            logging.info('Finding all records of Mensagem...')
            found = self.table.find_all(
                20,
                self.table.get_conditions(params, False)
            )
        if not found:
            return resp_not_found()
        if isinstance(found, list):
            for record in found:
                dia = record['dia']
                record['dia'] = str_short_date(dia)
        return resp_get_ok(found)

    def insert(self, json):
        logging.info('New record write in Mensagem')
        today = datetime.today()
        json['dia'] = today.strftime("%Y-%m-%d")
        json['lida'] = 'N'
        errors = self.table.insert(json)
        if errors:
            return resp_error(errors)
        return resp_post_ok()

    @staticmethod
    def lista_de_ids(values):
        return 'id IN ({})'.format(
            ','.join(values)
        )

    @staticmethod
    def cond_vazia(values):
        return ''

    def update(self, json):
        self.table.new_condition_event['id'] = self.lista_de_ids
        self.table.new_condition_event['lida'] = self.cond_vazia
        logging.info('Changing record of Mensagem ...')
        errors = self.table.update(json)
        self.table.new_condition_event = {}
        if errors:
            return resp_error(errors)
        return resp_ok(
            data=self.table.find_all(
                20,
                self.table.last_condition
            )
        )

    def delete(self, id):
        logging.info('Removing record of Mensagem ...')
        self.table.delete(id)
        return resp_ok("Deleted record OK!")
