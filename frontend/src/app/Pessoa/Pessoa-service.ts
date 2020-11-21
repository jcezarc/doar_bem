import { Http, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { PessoaModel } from "./Pessoa-model";
import { Router } from '@angular/router';
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import { AuthService } from '../login/auth-service'

const Pessoa_API = `${BASE_PATH_SERVER}/Pessoa`


@Injectable()
export class PessoaService{

    static pessoaLogin: PessoaModel
    static currentPessoa: PessoaModel
    static selectedImage: string

    static getCurrPessoa(): string{
        if(PessoaService.currentPessoa){
            return PessoaService.currentPessoa.nome
        }else{
            return ''
        }
    }

    static isONG():Boolean{
        const pessoa = PessoaService.pessoaLogin.cpf_cnpj
        return pessoa.length == 14
    }

    loginPessoa(params: PessoaModel):void{
        this.http.get(
            `${Pessoa_API}?email=${params.email}&senha=${params.senha}`
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            (resp) => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                const pessoa:PessoaModel = (<PessoaModel> (obj.data) ? obj.data[0] : null)
                PessoaService.pessoaLogin = pessoa
                PessoaService.currentPessoa = pessoa
                if (pessoa){
                    this.router.navigate(['Necessidade'])
                }else{
                    alert('Dados incorretos.')
                }
            }
        )
    }
    
    constructor(
        private http: Http,
        private router: Router,
        private authSvc: AuthService
    ){  }

    allPessoas():Observable<Response>{
        if(!AuthService.header){
            this.authSvc.handShake()
        }
        return this.http.get(
            Pessoa_API
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    pessoasByName(text: string):Observable<Response>{
        return this.http.get(
            `${Pessoa_API}?nome=${text}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    delete(cpf_cnpj: string): void{
        if(cpf_cnpj == PessoaService.pessoaLogin.cpf_cnpj){
            alert('Você não pode deletar você mesmo.')
            return
        }
        this.http.delete(
            `${Pessoa_API}/${cpf_cnpj}`
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:PessoaModel = (<PessoaModel>obj.data)
                console.log('"Pessoa.Delete" = ', data)
            }
        )
    }

    savePessoa(newPessoa: PessoaModel): void{
        newPessoa.foto = PessoaService.selectedImage
        this.http.post(
            Pessoa_API,
            JSON.stringify(newPessoa)
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                console.log('Resposta da inclusão de Pessoa: ', obj)
                PessoaService.currentPessoa = newPessoa
            }
        )
    }

}