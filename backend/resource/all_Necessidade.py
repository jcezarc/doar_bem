import json
from flask_restful import Resource
from flask import request, jsonify

from service.Necessidade_service import NecessidadeService


class AllNecessidade(Resource):

    #
    def get(self):
        """
        Procura uma lista de Necessidades, no formato:
        .../Necessidade?descricao=ABC&quantidade=123&data=YYYY-mm-dd

        #Read
        """
        service = NecessidadeService()
        return service.find(request.args)
    
    #
    def post(self):
        """
        Grava uma nova Necessidade no banco de dados

        #Write
        """
        req_data = request.get_json()
        service = NecessidadeService()
        return service.insert(req_data)

    #
    def put(self):
        """
        Atualiza os dados da Necessidade

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = NecessidadeService()
        return service.update(req_data)
