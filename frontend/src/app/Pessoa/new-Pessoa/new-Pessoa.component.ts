import { Component, OnInit } from '@angular/core';
import { PessoaModel } from '../Pessoa-model';
import { PessoaService } from '../Pessoa-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceitaService } from '../../ReceitaFederal/Receita-service'
import { ReceitaModel } from '../../ReceitaFederal/Receita-model'


@Component({
  selector: 'app-new-Pessoa',
  templateUrl: './new-Pessoa.component.html'
})
export class NewPessoaComponent implements OnInit {

  PessoaForm: FormGroup
  selectedImage: string

  constructor(
    private PessoaSvc: PessoaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private receitaSvc: ReceitaService
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    this.PessoaForm = this.formBuilder.group({
      cpf_cnpj : this.formBuilder.control('',[Validators.required]),
      nome : this.formBuilder.control('',[Validators.required]),
      email : this.formBuilder.control('',[Validators.required]),
      // CEP : this.formBuilder.control('',[Validators.required]),
      endereco : this.formBuilder.control('',[Validators.required]),
      foto : this.formBuilder.control('',[Validators.required]),
      senha: this.formBuilder.control('',[Validators.required])
    })

    this.PessoaForm.get('cpf_cnpj').valueChanges.subscribe(
      newValue => {
        if(newValue.length == 14) this.getONG(newValue)
      }
    )
  }

  getONG(cnpj: string){
    this.receitaSvc.consultaONG(cnpj).subscribe(
      resp => {
        let obj:ReceitaModel = (<ReceitaModel>resp.json())
        this.preencheDados(obj)
      }
    )
  }

  preencheDados(dados: ReceitaModel) {
    this.PessoaForm.get('nome').setValue(dados.nome)
    this.PessoaForm.get('email').setValue(dados.email)
    this.PessoaForm.get('CEP').setValue(dados.cep)
    this.PessoaForm.get('complemento').setValue(
      dados.numero + ' - ' + dados.complemento
    )
  }

  setImage(image: string){
    PessoaService.selectedImage = image
    this.selectedImage = image
  }


  setAddress(value: string){
    this.PessoaForm.get('endereco').setValue(value)
  }

  noUser():Boolean {
    return PessoaService.currentPessoa == null
  }  

}
