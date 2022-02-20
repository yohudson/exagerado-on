import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Global } from './global'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { HomeComponent } from './pages/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

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
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
