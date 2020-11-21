import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { PessoaService } from "../Pessoa/Pessoa-service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        if(!PessoaService.pessoaLogin){ 
            this.router.navigate([''])
            return false
        }
        return true
    }
}
