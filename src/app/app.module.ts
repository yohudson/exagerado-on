import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Global } from './global'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { FormsModule } from '@angular/forms';

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
    PassaporteCovidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
