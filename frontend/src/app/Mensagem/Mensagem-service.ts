import { Http, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { MensagemModel } from "./Mensagem-model";
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import { AuthService } from '../login/auth-service'

const Mensagem_API = `${BASE_PATH_SERVER}/Mensagem`


@Injectable()
export class MensagemService{

    constructor(private http: Http){
    }

    carregaMensagens(cpf_cnpj: string):Observable<Response>{
        return this.http.get(
            `${Mensagem_API}?para=${cpf_cnpj}&lida=N`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    enviarMensagem(mensagem:MensagemModel):void{
        this.http.post(
            Mensagem_API,
            JSON.stringify(mensagem)
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj: RespJsonFlask = (<RespJsonFlask>resp.json())
                console.log('enviarMensagem =', obj.data)
            }
        )
    }

    marcarComoLida(idMensagens: number[]){
        const registro = {
            id: idMensagens,
            lida: 'S'
        }
        console.log('** marcarComoLida =>', idMensagens)
        this.http.put(
            Mensagem_API,
            JSON.stringify(registro)
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj: RespJsonFlask = (<RespJsonFlask>resp.json())
                console.log('marcarComoLida =', obj.data)
            }
        )
    }
}