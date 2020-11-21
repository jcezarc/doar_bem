# -*- coding: utf-8 -*-
import logging
from flask import Flask, Blueprint, request, jsonify
from flask_restful import Api
import sys
sys.path.append('.')
from resource.Necessidade_by_id import NecessidadeById
from resource.all_Necessidade import AllNecessidade
from resource.Pessoa_by_id import PessoaById
from resource.all_Pessoa import AllPessoa
from resource.Mensagem_by_id import MensagemById
from resource.all_Mensagem import AllMensagem


BASE_PATH = '/doar_faz_bem'

def config_routes(app):
    api = Api(app)
    #--- Resources: ----
    api.add_resource(NecessidadeById, BASE_PATH+'/Necessidade/{descricao}', methods=['GET'], endpoint='get_Necessidade_by_id')
    api.add_resource(AllNecessidade, BASE_PATH+'/Necessidade', methods=['GET'], endpoint='get_AllNecessidade')
    api.add_resource(AllNecessidade, BASE_PATH+'/Necessidade', methods=['POST'], endpoint='post_Necessidade')
    api.add_resource(AllNecessidade, BASE_PATH+'/Necessidade', methods=['PUT'], endpoint='put_Necessidade')
    api.add_resource(NecessidadeById, BASE_PATH+'/Necessidade/{descricao}', methods=['DELETE'], endpoint='delete_Necessidade')
    api.add_resource(PessoaById, BASE_PATH+'/Pessoa/{cpf_cnpj}', methods=['GET'], endpoint='get_Pessoa_by_id')
    api.add_resource(AllPessoa, BASE_PATH+'/Pessoa', methods=['GET'], endpoint='get_AllPessoa')
    api.add_resource(AllPessoa, BASE_PATH+'/Pessoa', methods=['POST'], endpoint='post_Pessoa')
    api.add_resource(AllPessoa, BASE_PATH+'/Pessoa', methods=['PUT'], endpoint='put_Pessoa')
    api.add_resource(PessoaById, BASE_PATH+'/Pessoa/{cpf_cnpj}', methods=['DELETE'], endpoint='delete_Pessoa')
    api.add_resource(MensagemById, BASE_PATH+'/Mensagem/{id}', methods=['GET'], endpoint='get_Mensagem_by_id')
    api.add_resource(AllMensagem, BASE_PATH+'/Mensagem', methods=['GET'], endpoint='get_AllMensagem')
    api.add_resource(AllMensagem, BASE_PATH+'/Mensagem', methods=['POST'], endpoint='post_Mensagem')
    api.add_resource(AllMensagem, BASE_PATH+'/Mensagem', methods=['PUT'], endpoint='put_Mensagem')
    api.add_resource(MensagemById, BASE_PATH+'/Mensagem/{id}', methods=['DELETE'], endpoint='delete_Mensagem')
    #-------------------

logging.basicConfig(
    # filename='doar_faz_bem.log',
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)

APP = Flask(__name__)
config_routes(APP)

if __name__ == '__main__':
    APP.run(debug=True)
