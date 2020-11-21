import logging
from model.Pessoa_model import PessoaModel
from util.messages import (
    resp_error,
    resp_not_found,
    resp_post_ok,
    resp_get_ok,
    resp_ok
)
from service.db_connection import get_table

class PessoaService:
    def __init__(self, table=None):
        if table:
            self.table = table
        else:
            self.table = get_table(PessoaModel)

    def find(self, params, cpf_cnpj=None):
        if cpf_cnpj:
            logging.info(f'Procurando "{cpf_cnpj}" na Pessoa ...')
            found = self.table.find_one([cpf_cnpj])
        else:
            logging.info('Procurando todas as Pessoas...')
            found = self.table.find_all(
                20,
                self.table.get_conditions(params, False)
            )
        if not found:
            return resp_not_found()
        return resp_get_ok(found)

    def insert(self, json):
        logging.info('Novo registro gravado de Pessoa')
        errors = self.table.insert(json)
        if errors:
            return resp_error(errors)
        return resp_post_ok()

    def update(self, json):
        logging.info('Alterando dados da Pessoa ...')
        errors = self.table.update(json)
        if errors:
            return resp_error(errors)
        return resp_ok("Pessoa alterada... OK!")
        
    def delete(self, cpf_cnpj):
        logging.info('Removendo Pessoa ...')
        self.table.delete(cpf_cnpj)
        return resp_ok("Pessoa deletada com sucesso!")
