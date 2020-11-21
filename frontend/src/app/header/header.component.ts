import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../Pessoa/Pessoa-service';

@Component({
  selector: 'app-header',
  styleUrls: ['../../styles.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  noUser():Boolean {
    return PessoaService.currentPessoa == null
  }  

}
