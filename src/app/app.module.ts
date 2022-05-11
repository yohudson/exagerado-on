import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from "ng-apexcharts";

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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroLojaComponent } from './pages/cadastro-loja/cadastrar/cadastro-loja.component';
import { ListarLojaComponent } from './pages/cadastro-loja/listar/listar-loja.component'
import { CadastroMarcaComponent } from './pages/cadastro-marca/cadastrar/cadastro-marca.component';
import { ListarMarcaComponent } from './pages/cadastro-marca/listar/listar-marca.component'
import { CadastroAgendaComponent } from './pages/cadastro-agenda/cadastrar/cadastro-agenda.component';
import { ListarAgendaComponent } from './pages/cadastro-agenda/listar/listar-agenda.component'
import { CadastroSegmentoComponent } from './pages/cadastro-segmento/cadastrar/cadastro-segmento.component';
import { ListarSegmentoComponent } from './pages/cadastro-segmento/listar/listar-segmento.component';
import { CadastrarAtracaoComponent } from './pages/cadastro-atracao/cadastrar/cadastrar-atracao.component';
import { ListarAtracaoComponent } from './pages/cadastro-atracao/listar/listar-atracao.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
// Auth service
import { AuthService } from "./shared/services/auth.service";
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MeusDadosComponent } from './components/meus-dados/meus-dados.component';
import { MeuQuestionarioComponent } from './components/meu-questionario/meu-questionario.component';
import { MeusFavoritosComponent } from './components/meus-favoritos/meus-favoritos.component';


@NgModule({
  declarations: [
    AplicarMascarasDirective,
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
    AplicarMascarasDirective,
    DashboardComponent,
    CadastroLojaComponent,
    ListarLojaComponent,
    CadastroMarcaComponent,
    ListarMarcaComponent,
    CadastroSegmentoComponent,
    ListarSegmentoComponent,
    CadastroAgendaComponent,
    ListarAgendaComponent,
    CadastrarAtracaoComponent,
    ListarAtracaoComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PerfilComponent,
    MeusDadosComponent,
    MeuQuestionarioComponent,
    MeusFavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    NgApexchartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    Global,
    ApiService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
