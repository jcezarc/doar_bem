import { Component, OnInit } from '@angular/core';
import { NecessidadeModel } from '../Necessidade-model';
import { NecessidadeService } from '../Necessidade-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {PessoaService} from '../../Pessoa/Pessoa-service'


@Component({
  selector: 'app-new-Necessidade',
  styleUrls: ['../../../styles.css'],
  templateUrl: './new-Necessidade.component.html'
})
export class NewNecessidadeComponent implements OnInit {

  NecessidadeForm: FormGroup

  constructor(
    private NecessidadeSvc: NecessidadeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    this.NecessidadeForm = this.formBuilder.group({
      descricao : this.formBuilder.control('',[Validators.required]),
      quantidade : this.formBuilder.control('1',[Validators.required]),
      logotipo : this.formBuilder.control('',[Validators.required]),
      hashtags : this.formBuilder.control('',[Validators.required]),
      dia : this.formBuilder.control('',[Validators.required]),

      pessoa : this.formBuilder.control(
        PessoaService.getCurrPessoa(),
        [Validators.required]
      ),

    })

        this.NecessidadeForm.get('descricao').valueChanges.subscribe(
        newValue => {
            this.NecessidadeForm.get('logotipo').setValue(
            `assets/img/produtos/${newValue}.jpg`
            )
        }
        )
                
  }
}
