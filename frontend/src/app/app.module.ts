import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { NecessidadeComponent } from './Necessidade/Necessidade-component';
import { NecessidadeItemComponent } from './Necessidade/Necessidade-item/Necessidade-item.component';
import { NecessidadeService } from './Necessidade/Necessidade-service';
import { NecessidadeListComponent } from './Necessidade/Necessidade-list/Necessidade-list.component';
import { NewNecessidadeComponent } from './Necessidade/new-Necessidade/new-Necessidade.component';
import { PessoaComponent } from './Pessoa/Pessoa-component';
import { PessoaItemComponent } from './Pessoa/Pessoa-item/Pessoa-item.component';
import { PessoaService } from './Pessoa/Pessoa-service';
import { PessoaListComponent } from './Pessoa/Pessoa-list/Pessoa-list.component';
import { NewPessoaComponent } from './Pessoa/new-Pessoa/new-Pessoa.component';
// import { MensagemComponent } from './Mensagem/Mensagem-component';
import { MensagemItemComponent } from './Mensagem/Mensagem-item/Mensagem-item.component';
import { MensagemListComponent } from './Mensagem/Mensagem-list/Mensagem-list.component';
import { MensagemService } from './Mensagem/Mensagem-service';
import { NewMensagemComponent } from './Mensagem/new-Mensagem/new-Mensagem.component';
import {LoginComponent} from './login/login.component'
import { NavigatorComponent } from './shared/navigator/navigator.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { DeleteButtonComponent } from './shared/delete-button/delete-button.component';
import { HeaderComponent } from './header/header.component'
import {ZipCodeService} from './ZipCode/ZipCode-service'
import { ZipCodeComponent } from './ZipCode/ZipCode-component'
import { AuthService } from './login/auth-service'
import { LoginGuard } from './login/login.guard'
import { ReceitaService } from './ReceitaFederal/Receita-service'
import { NecessidadeGuard } from './Necessidade/Necessidade-guard'

@NgModule({
  declarations: [
    AppComponent,
    NecessidadeComponent,
    NecessidadeItemComponent,
    NecessidadeListComponent,
    NewNecessidadeComponent,
    PessoaComponent,
    PessoaItemComponent,
    PessoaListComponent,
    NewPessoaComponent,
    // MensagemComponent,
    MensagemItemComponent,
    MensagemListComponent,
    NewMensagemComponent,
    LoginComponent,
    HeaderComponent,
    SearchBarComponent,
    NavigatorComponent,
    DeleteButtonComponent,
    ZipCodeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    NecessidadeService,
    NecessidadeGuard,
    PessoaService,
    MensagemService,
    ZipCodeService,
    AuthService,
    LoginGuard,
    ReceitaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
