import json
from flask_restful import Resource
from flask import request, jsonify

from service.Pessoa_service import PessoaService

class AllPessoa(Resource):

    #
    def get(self):
        """
        Pesquisa uma lista de Pessoas, no formato:
        .../Pessoa?nome=ABC&cpf_cnpj=00000...

        #Read
        """
        service = PessoaService()
        return service.find(request.args)
    
    #
    def post(self):
        """
        Grava uma nova Pessoa

        #Write
        """
        req_data = request.get_json()
        service = PessoaService()
        return service.insert(req_data)

    #
    def put(self):
        """
        Altera os dados da Pessoa

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = PessoaService()
        return service.update(req_data)
