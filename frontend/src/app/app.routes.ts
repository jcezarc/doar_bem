import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NecessidadeComponent } from "./Necessidade/Necessidade-component";
import { NewNecessidadeComponent } from "./Necessidade/new-Necessidade/new-Necessidade.component";
import { PessoaComponent } from "./Pessoa/Pessoa-component";
import { NewPessoaComponent } from "./Pessoa/new-Pessoa/new-Pessoa.component";
import { LoginGuard } from "./login/login.guard";
import { NecessidadeGuard } from './Necessidade/Necessidade-guard'
import { NewMensagemComponent } from './Mensagem/new-Mensagem/new-Mensagem.component'

export const ROUTES:Routes = [
    {path:'',component:LoginComponent},
    {path:'Necessidade',component: NecessidadeComponent
        // ,canActivate: [LoginGuard]
    },
    {path:'Necessidade/:descricao',component: NecessidadeComponent,canActivate: [LoginGuard]},
    {path:'new-Necessidade',component: NewNecessidadeComponent,canActivate: [LoginGuard, NecessidadeGuard]},
    {path:'Pessoa',component:PessoaComponent,canActivate: [LoginGuard]},
    {path:'Pessoa/:name',component:PessoaComponent,canActivate: [LoginGuard]},
    {path:'new-Pessoa',component:NewPessoaComponent
        // ,canActivate: [LoginGuard]
    },
    {path: 'new-Mensagem', component: NewMensagemComponent, canActivate: [LoginGuard]}
]