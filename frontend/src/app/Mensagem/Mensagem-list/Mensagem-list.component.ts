import { Component, OnInit } from '@angular/core';
import { MensagemModel } from '../Mensagem-model';
import { MensagemService } from '../Mensagem-service';
import {RespJsonFlask} from '../../app.api'
import {PessoaService} from '../../Pessoa/Pessoa-service'


@Component({
    selector: 'app-Mensagem-list',
    styleUrls: ['Mensagem-list.component.css'],
    templateUrl: './Mensagem-list.component.html'
})
export class MensagemListComponent implements OnInit{

    items: MensagemModel[] = []
    temMensagens:Boolean = true

    constructor(
      private MensagemSvc:  MensagemService,
    ){}

    loadMessages(){
        this.MensagemSvc.carregaMensagens(
            PessoaService.pessoaLogin.cpf_cnpj
        ).subscribe(
            resp => {
                let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                this.items = (<MensagemModel[]>obj.data)
                if(!this.items){
                    this.temMensagens = false
                }
            }
        )
    }

    ngOnInit() {
        this.loadMessages()
    }

    update(){
        let msgLidas:number[] = []
        for (let i = 0; i < this.items.length; i++){
            if(this.items[i].lida == 'S'){
                msgLidas.push(this.items[i].id)
            }
        }
        if(!msgLidas){
            console.log('Nenhuma mensagem marcad como lida! :(')
            return
        }
        this.MensagemSvc.marcarComoLida(msgLidas)
        this.loadMessages()
    }

    mensagemCount():number{
        if(!this.temMensagens){
            return 0
        }
        return this.items.length
    }

}