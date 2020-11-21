import logging
import uuid
from model.Necessidade_model import NecessidadeModel
from util.messages import (
    resp_error,
    resp_not_found,
    resp_post_ok,
    resp_get_ok,
    resp_ok
)
from datetime import datetime
from service.db_connection import get_table
from service.Notifica_service import dispara_notificacao
from util.dateutils import parse_yymmdd

def todas_tags(txt):
    result = []
    for s in txt.split(' '):
        s = s.replace(' ', '')
        if s: result.append(
            "hashtags LIKE '%{}%'".format(s)
        )
    return '({})'.format(
        ' OR '.join(result)
    )

def faixa_valores(txt, campo, func=None):
    op = {
        'min': '>=',
        'max': '<='
    }
    result = []
    for s in txt.split(' '):
        if not s:
            continue
        key, value = s.split(':')
        if func:
            value = func(value)
        result.append('{} {} {}'.format(
            campo,
            op[key],
            value
        ))
    return '({})'.format(
        ' AND '.join(result)
    )

def faixa_quantidades(txt):
    return faixa_valores(txt, 'abs(quantidade)')

def faixa_datas(txt):
    return faixa_valores(txt, 'dia', parse_yymmdd)

class NecessidadeService:
    def __init__(self, table=None):
        if table:
            self.table = table
            self.pode_disparar = False
        else:
            self.table = get_table(NecessidadeModel)
            self.pode_disparar = True

    def find(self, params, id=None):
        if id:
            logging.info('Procurando "{}" em Necessidade ...'.format(id))
            found = self.table.find_one([id])
        else:
            logging.info('Procurando todas Necessidades...')
            self.table.new_condition_event['hashtags'] = todas_tags
            self.table.new_condition_event['quantidade'] = faixa_quantidades
            self.table.new_condition_event['dia'] = faixa_datas
            found = self.table.find_all(
                20,
                self.table.get_conditions(params, False)
            )
            self.table.new_condition_event = {}
        if not found:
            return resp_not_found()
        return resp_get_ok(found)

    def insert(self, json):
        logging.info('Gravando nova Necessidade')
        id_registro = str(uuid.uuid4())
        json['id'] = id_registro
        errors = self.table.insert(json)
        if errors:
            return resp_error(errors)
        if self.pode_disparar:
            dispara_notificacao(json)
        return resp_post_ok()

    def update(self, json):
        logging.info('Alterando os dados da Necessidade ...')
        errors = self.table.update(json)
        if errors:
            return resp_error(errors)
        return resp_ok("Alteração na Necessidade...OK!")
        
    def delete(self, descricao):
        logging.info('Removendo uma Necessidade ...')
        self.table.delete(descricao)
        return resp_ok("Necessidade deletada com sucesso!")
