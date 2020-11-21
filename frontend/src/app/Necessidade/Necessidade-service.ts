import { Http, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { NecessidadeModel } from "./Necessidade-model";
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import { AuthService } from '../login/auth-service'

const Necessidade_API = `${BASE_PATH_SERVER}/Necessidade`


@Injectable()
export class NecessidadeService{

    static currentNecessidade: NecessidadeModel

    static getCurrNecessidade(): string{
        if(NecessidadeService.currentNecessidade){
            return NecessidadeService.currentNecessidade.descricao
        }else{
            return ''
        }
    }

    constructor(private http: Http){
    }

    allNecessidades():Observable<Response>{
        return this.http.get(
            Necessidade_API
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    parse(s: string): string{
        /*
        Ex.: 
            parse("#retirar Alcool #zonaSul 100-500")
                => descricao=Alcool&quantidade=min:100+max:500&hashtags=retirar+zonaSul 
            parse("#retirar -500")
                => quantidade=max:500&hashtags=retirar 
            parse("Alcool")
                => descricao=Alcool 
        */
        let field: string[][] = [[],[],[]]
        s.split(' ').map(item => {
            if(item.includes('-')){
                const v = item.split('-')
                if(v[0]) field[1].push(`min:${v[0]}`)
                if(v[1]) field[1].push(`max:${v[1]}`)
            }else if(item.includes('#')){
                field[2].push(item.replace('#', ''))
            }else{
                field[0].push(item)
            }
        })
        let result = []
        const names: string[] = ['descricao', 'quantidade', 'hashtags']
        for (let i = 0; i < field.length; i++) {
            const item: string[] = field[i];
            const name: string = names[i]
            if(item) result.push(
                `${name}=${item.join('+')}`
            )
        }
        return result.join('&')
    }

    necessidadesByTitle(text: string):Observable<Response>{
        const params: string = this.parse(text)
        return this.http.get(
            `${Necessidade_API}?${params}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    delete(descricao: string): void{
        this.http.delete(
            `${Necessidade_API}/${descricao}`
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:NecessidadeModel = (<NecessidadeModel>obj.data)
                console.log('"Necessidade.Delete" = ', data)
            }
        )
    }

    saveNecessidade(newItem: NecessidadeModel): void{
        this.http.post(
            Necessidade_API,
            JSON.stringify(newItem)
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:NecessidadeModel = (<NecessidadeModel>obj.data)
                console.log('"saveNecessidade" = ', data)
            }
        )
    }

}