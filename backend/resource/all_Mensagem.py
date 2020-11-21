import json
from datetime import datetime
from flask_restful import Resource
from flask import request, jsonify

from service.Email_service import send_gmail
from service.Mensagem_service import MensagemService
from service.Necessidade_service import NecessidadeService

class AllMensagem(Resource):

    #
    def get(self):
        """
        Returns all records from the table Mensagem

        #Read
        """
        service = MensagemService()
        return service.find(request.args)
    
    #
    def post(self):
        """
        Write a new record in Mensagem

        #Write
        """
        req_data = request.get_json()
        service = MensagemService()
        msg, status_code = service.insert(req_data)
        print('** Mensagem.post =>', status_code)
        if status_code == 201:
            print('\tEnviando email...')
            erro = send_gmail(req_data)
            if erro:
                print('\t...com ERRO:', erro)
            else:
                print('\tSucesso!!! :)')
        return msg, status_code

    #
    def put(self):
        """
        Updates a record in Mensagem

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = MensagemService()
        # [To-Do] Iniciar Transação ---
        msg, status_code = service.update(req_data)
        if status_code == 200:
            today = datetime.today()
            service = NecessidadeService()
            for record in msg['data']:
                nova_nec = {
                    'descricao': record['campanha']['descricao'],
                    'quantidade': record['quantidade'],
                    'logotipo': record['campanha']['logotipo'],
                    'dia': today.strftime("%Y-%m-%d"),
                    'pessoa': record['de']
                }
                msg, status_code = service.insert(nova_nec)
                if status_code != 201: break
        return msg, status_code
