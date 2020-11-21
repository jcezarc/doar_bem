import os
from datetime import datetime
from slack import WebClient


def dispara_notificacao(dados):
    if not dados:
        return
    quantidade = float(dados['quantidade'])
    if quantidade < 0:
        quantidade = -quantidade
        mensagem = '{nome} iniciou a campanha para obter {quantidade} {necessidade} no dia {dia}'
    else:
        mensagem = '{nome} doou {quantidade} {necessidade} no dia {dia}'
    dia = datetime.strptime(dados['dia'], '%Y-%m-%d')
    dados = {
        'necessidade': dados['descricao'],
        'nome': dados['pessoa']['nome'],
        'quantidade': quantidade,
        'dia': dia.strftime('%d/%m/%Y')
    }
    mensagem = mensagem.format(**dados) + '\n---\n'
    token = os.environ.get('DOAR_FAZ_BEM_SLACK')
    client = WebClient(token)
    client.chat_postMessage(
        channel='#doar_faz_bem_notificacoes',
        text=mensagem
    )
