import { Component, OnInit } from '@angular/core';
import { MensagemService } from '../Mensagem-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemModel } from '../Mensagem-model'
import { PessoaService } from '../../Pessoa/Pessoa-service'
import { NecessidadeService } from '../../Necessidade/Necessidade-service'

@Component({
    selector: 'app-new-mensagem',
    styleUrls: ['new-Mensagem.component.css'],
    templateUrl: './new-Mensagem.component.html'
})
export class NewMensagemComponent implements OnInit {
    MensagemForm: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private msgService: MensagemService
    ){}

    ngOnInit() {
        this.MensagemForm = this.formBuilder.group({            
            de: this.formBuilder.control(
                PessoaService.pessoaLogin.nome, 
                [Validators.required]
            ),
            para: this.formBuilder.control(
                NecessidadeService.currentNecessidade.pessoa.nome,
                [Validators.required]
            ),
            campanha : this.formBuilder.control(
                NecessidadeService.currentNecessidade.descricao,
                [Validators.required]
            ),
            quantidade: this.formBuilder.control('1',[Validators.required]),
            conteudo: this.formBuilder.control('', [Validators.required]),
        })
    }

    save(item: MensagemModel){
        item.de = PessoaService.pessoaLogin
        item.para = NecessidadeService.currentNecessidade.pessoa
        item.campanha = NecessidadeService.currentNecessidade
        this.msgService.enviarMensagem(item)
        this.router.navigate(['Necessidade'])
    }

}