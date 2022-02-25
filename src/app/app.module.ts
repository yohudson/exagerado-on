import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { Global } from './global'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ApiService } from './service/api.service';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { MarcasComponent } from './components/marcas/marcas.component';

import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { HomeComponent } from './pages/home/home.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ListaMarcasComponent } from './pages/lista-marcas/lista-marcas.component';
import { ListaLojasComponent } from './pages/lista-lojas/lista-lojas.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { PassaporteCovidComponent } from './pages/passaporte-covid/passaporte-covid.component';
import { DadosUsuarioComponent } from './components/dados-usuario/dados-usuario.component';

import { AplicarMascarasDirective } from './directives/aplicar-mascaras.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    NavBarComponent,
    RecuperarSenhaComponent,
    QuestionarioComponent,
    MarcasComponent,
    HomeComponent,
    NavMenuComponent,
    AgendaComponent,
    ListaMarcasComponent,
    ListaLojasComponent,
    MapaComponent,
    PassaporteCovidComponent,
    DadosUsuarioComponent,
    AplicarMascarasDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    Global,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
