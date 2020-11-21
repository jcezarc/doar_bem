from marshmallow import Schema, validate
from marshmallow.fields import Str, Nested, List, Integer, Float, DateTime, Boolean
from model.Pessoa_model import PessoaModel
from datetime import datetime

PK_DEFAULT_VALUE = "000"

class NecessidadeModel(Schema):
    id = Str(primary_key=True, default=PK_DEFAULT_VALUE, required=True)
    descricao = Str(default='')
    quantidade = Float(default=1)
    logotipo = Str()
    hashtags = Str()
    dia = DateTime(format='%Y-%m-%d')

    pessoa = Nested(PessoaModel)
