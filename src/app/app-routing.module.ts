import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'cadastro', component: CadastroUsuarioComponent },
  { path:'questionario', component: QuestionarioComponent },
  { path:'recuperar-senha', component: RecuperarSenhaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
