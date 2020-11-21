import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { PessoaService } from "../Pessoa/Pessoa-service";
import { Injectable } from "@angular/core";


@Injectable()
export class NecessidadeGuard implements CanActivate{

    constructor(
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        if(PessoaService.isONG()){ 
            return true
        }
        alert('Somente ONG´s podem criar campanhas.')
        this.router.navigate([''])
        return false
    }
}
