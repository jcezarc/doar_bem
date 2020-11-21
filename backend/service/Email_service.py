import os
import smtplib

def send_gmail(dados, anonimo=False):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    def get_mensagem():
        if anonimo:
            assunto='Notificação de doação'
        else:
            assunto='{} doou {} para a campanha {} no dia {}'.format(
                dados['de']['nome'], # Doador
                dados['quantidade'],
                dados['campanha']['descricao'],
                dados['dia'],
            )
        mensagem = '{}\n{}'.format(''
            'Subject: ' + assunto,
            dados['conteudo']
        )
        return mensagem.encode('utf-8')
    try:
        params = {
            'from_addr': 'noreply@doarbem.com.br',
            'to_addrs': dados['para']['email'],
            'msg': get_mensagem()
        }
        server.ehlo()
        server.starttls()
        server.login(
            os.environ.get('DOAR_FAZ_BEM_EMAIL_USER'),
            os.environ.get('DOAR_FAZ_BEM_EMAIL_PSWD')
        )
        server.sendmail(**params)
        return None
    except Exception as e:
        return e
