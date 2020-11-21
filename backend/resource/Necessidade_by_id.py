from flask_restful import Resource


from service.Necessidade_service import NecessidadeService

class NecessidadeById(Resource):

    

    #
    def get(self, descricao):
        """
        Procura uma Necessidade pela descricao EXATA

        #Read
        """
        service = NecessidadeService()
        return service.find(None, descricao)

    #
    def delete(self, descricao):
        """
        Remove uma Necessidade do banco de dados

        #Write
        """
        service = NecessidadeService()
        return service.delete([descricao])
