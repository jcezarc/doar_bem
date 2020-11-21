import { Component, OnInit } from '@angular/core';
import { NecessidadeModel } from '../Necessidade-model';
import { NecessidadeService } from '../Necessidade-service';
import { Router, ActivatedRoute } from '@angular/router';
import {RespJsonFlask} from '../../app.api'
import {PessoaService} from '../../Pessoa/Pessoa-service'
import { Observable } from '../../../../node_modules/rxjs'
import { Response } from "@angular/http";


@Component({
  selector: 'app-Necessidade-list',
  styleUrls: ['Necessidade-list.component.css'],
  templateUrl: './Necessidade-list.component.html'
})
export class NecessidadeListComponent implements OnInit {

  items: NecessidadeModel[] = []
  
  constructor(
    private NecessidadeSvc: NecessidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    const param = this.activatedRoute.snapshot.paramMap.get('descricao');
    let func: Observable<Response>
    if(param){
      func = this.NecessidadeSvc.necessidadesByTitle(param)
    }else{
      func = this.NecessidadeSvc.allNecessidades()
    }
    func.subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<NecessidadeModel[]>obj.data)
      }
    )
  }

  filter(param: any){
    this.NecessidadeSvc.necessidadesByTitle(param.searchContent).subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<NecessidadeModel[]>obj.data)
      }
    )
  }

  add(){
    this.router.navigate(['/new-Necessidade'])
  }

  remove(item: NecessidadeModel){
    if(!confirm(`Remove Necessidade "${item.descricao}" ?`)){
      return
    }
    this.NecessidadeSvc.delete(item.descricao as unknown as string)
    this.items.splice(this.items.indexOf(item),1)
  }

  save(item: NecessidadeModel){
    item.quantidade *= -1 // Campanha é necessidade com qtd. negativa (faltando produto)!
    item.pessoa = PessoaService.currentPessoa
    this.NecessidadeSvc.saveNecessidade(item)
    this.items.push(item)
  }

  select(item: NecessidadeModel){
    NecessidadeService.currentNecessidade = item
    this.router.navigate(['/new-'])
  }

  isOwner(item: NecessidadeModel):Boolean{
    return item.pessoa.cpf_cnpj == PessoaService.pessoaLogin.cpf_cnpj
  }

  canDonate(item: NecessidadeModel):Boolean{
    if(item.pessoa.cpf_cnpj == PessoaService.pessoaLogin.cpf_cnpj){
      return false
    }
    return item.quantidade < 0
  }

  sendMessage(item: NecessidadeModel){
    NecessidadeService.currentNecessidade = item
    this.router.navigate(['/new-Mensagem'])
  }

}
