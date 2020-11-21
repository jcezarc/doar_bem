from marshmallow import Schema
from marshmallow.fields import Str, Nested, List, Integer, Float, Date, Boolean


PK_DEFAULT_VALUE = "000"

class PessoaModel(Schema):
    cpf_cnpj = Str(primary_key=True, default=PK_DEFAULT_VALUE)
    nome = Str(default='')
    CEP = Str(default='')
    endereco = Str(default='')
    email = Str(default='', required=True)
    senha = Str(default='', required=True)
    foto = Str(default='')