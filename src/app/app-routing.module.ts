import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaLojasComponent } from './pages/lista-lojas/lista-lojas.component';
import { ListaMarcasComponent } from './pages/lista-marcas/lista-marcas.component';
import { LoginComponent } from './pages/login/login.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { PassaporteCovidComponent } from './pages/passaporte-covid/passaporte-covid.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { CadastroLojaComponent } from './pages/cadastro-loja/cadastrar/cadastro-loja.component';
import { ListarLojaComponent } from './pages/cadastro-loja/listar/listar-loja.component';
import { CadastroMarcaComponent } from './pages/cadastro-marca/cadastrar/cadastro-marca.component';
import { ListarMarcaComponent } from './pages/cadastro-marca/listar/listar-marca.component';
import { CadastroAgendaComponent } from './pages/cadastro-agenda/cadastrar/cadastro-agenda.component';
import { ListarAgendaComponent } from './pages/cadastro-agenda/listar/listar-agenda.component';
import { CadastroSegmentoComponent } from './pages/cadastro-segmento/cadastrar/cadastro-segmento.component'
import { ListarSegmentoComponent } from './pages/cadastro-segmento/listar/listar-segmento.component';
import { CadastrarAtracaoComponent } from './pages/cadastro-atracao/cadastrar/cadastrar-atracao.component'
import { ListarAtracaoComponent } from './pages/cadastro-atracao/listar/listar-atracao.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

// import { SignInComponent } from './components/sign-in/sign-in.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// route guard
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
//menus frequentador
  { path:'login', component: LoginComponent },
  { path:'cadastro', component: CadastroUsuarioComponent },
  { path:'questionario', component: QuestionarioComponent },
  { path:'recuperar-senha', component: RecuperarSenhaComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path:'mapa', component: MapaComponent, canActivate: [AuthGuard] },
  { path:'passaporte', component: PassaporteCovidComponent, canActivate: [AuthGuard] },
  { path:'marcas', component: ListaMarcasComponent, canActivate: [AuthGuard] },
  { path:'lojas', component: ListaLojasComponent, canActivate: [AuthGuard] },
  { path:'agenda', component: AgendaComponent, canActivate: [AuthGuard] },
//menus administrativos
  { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//segmento
  { path:'listar-segmentos', component: ListarSegmentoComponent, canActivate: [AuthGuard] },
  { path:'add-segmento', component: CadastroSegmentoComponent, canActivate: [AuthGuard] },
  { path:'editar-segmento/:uuid', component: CadastroSegmentoComponent, canActivate: [AuthGuard] },
//marca
  { path:'listar-marcas', component: ListarMarcaComponent, canActivate: [AuthGuard] },
  { path:'add-marca', component: CadastroMarcaComponent, canActivate: [AuthGuard] },
  { path:'editar-marca/:uuid', component: CadastroMarcaComponent, canActivate: [AuthGuard] },
//loja
  { path:'listar-lojas', component: ListarLojaComponent, canActivate: [AuthGuard] },
  { path:'add-loja', component: CadastroLojaComponent, canActivate: [AuthGuard] },
  { path:'editar-loja/:uuid', component: CadastroLojaComponent, canActivate: [AuthGuard] },
//atracao
  { path:'listar-atracoes', component: ListarAtracaoComponent, canActivate: [AuthGuard] },
  { path:'add-atracao', component: CadastrarAtracaoComponent, canActivate: [AuthGuard] },
  { path:'editar-atracao/:uuid', component: CadastrarAtracaoComponent, canActivate: [AuthGuard] },
//agenda
  { path:'listar-agenda', component: ListarAgendaComponent, canActivate: [AuthGuard] },
  { path:'add-agenda', component: CadastroAgendaComponent, canActivate: [AuthGuard] },
  { path:'editar-agenda/:uuid', component: CadastroAgendaComponent, canActivate: [AuthGuard] },


  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  // { path: 'sign-in', component: SignInComponent },
  // { path: 'register-user', component: SignUpComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
