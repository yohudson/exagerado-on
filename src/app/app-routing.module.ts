import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaLojasComponent } from './pages/lista-lojas/lista-lojas.component';
import { ListaMarcasComponent } from './pages/lista-marcas/lista-marcas.component';
import { LoginComponent } from './pages/login/login.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { PassaporteCovidComponent } from './pages/passaporte-covid/passaporte-covid.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'cadastro', component: CadastroUsuarioComponent },
  { path:'questionario', component: QuestionarioComponent },
  { path:'recuperar-senha', component: RecuperarSenhaComponent },
  { path:'mapa', component: MapaComponent },
  { path:'passaporte', component: PassaporteCovidComponent },
  { path:'marcas', component: ListaMarcasComponent },
  { path:'lojas', component: ListaLojasComponent },
  { path:'agenda', component: AgendaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
