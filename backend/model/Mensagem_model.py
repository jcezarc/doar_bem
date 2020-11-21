from marshmallow import Schema, validate
from marshmallow.fields import Str, Nested, List, Integer, Float, DateTime, Boolean
from model.Pessoa_model import PessoaModel
from model.Necessidade_model import NecessidadeModel
from model.Pessoa_model import PessoaModel


PK_DEFAULT_VALUE = 0

class MensagemModel(Schema):
    id = Integer(primary_key=True, default=PK_DEFAULT_VALUE)
    dia = DateTime(format='%Y-%m-%d')
    conteudo = Str()
    lida = Str(validate=validate.Length(max=1), default='N')
    quantidade = Float()
    de = Nested(PessoaModel)
    campanha = Nested(NecessidadeModel)
    para = Nested(PessoaModel)

