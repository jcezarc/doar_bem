from flask_restful import Resource


from service.Mensagem_service import MensagemService

class MensagemById(Resource):

    

    #
    def get(self, id):
        """
        Search in  Mensagem by the filed id

        #Read
        """
        service = MensagemService()
        return service.find(None, id)

    #
    def delete(self, id):
        """
        Delete a record of Mensagem

        #Write
        """
        service = MensagemService()
        return service.delete([id])
