import { Component, OnInit, Input } from '@angular/core';
import { MensagemModel } from '../Mensagem-model';

@Component({
    selector: 'app-Mensagem-item',
    styleUrls: ['Mensagem-item.component.css'],
    templateUrl: './Mensagem-item.component.html'
})
export class MensagemItemComponent implements OnInit{

    @Input() Mensagem: MensagemModel

    constructor(){}

    ngOnInit() {}

    setRead(isChecked:Boolean){
        if(isChecked){
            this.Mensagem.lida = 'S'
        }else{
            this.Mensagem.lida = 'N'
        }
    }

}