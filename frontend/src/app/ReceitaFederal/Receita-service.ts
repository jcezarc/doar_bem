import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "../../../node_modules/rxjs";
import { AuthService } from '../login/auth-service'


@Injectable()
export class ReceitaService{

    constructor(
        private http: Http,
        private authSvc: AuthService
    ){}

    consultaONG(cnpj: string):Observable<Response>{
        const headers = this.authSvc.getHeaders()
        console.log('** headers =>', headers)
        return this.http.get(
            `http://www.receitaws.com.br/v1/cnpj/${cnpj}`,
            new RequestOptions({headers:headers})
        )
    }

}
