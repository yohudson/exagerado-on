import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Marca } from '../../models/marca.model';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  dadosUsuario: any = [];
  questionario: any = [];
  marcasFavoritas: any = [];
  innerWidth: any;
  innerHeight: any;
  mobile: boolean = false;

  abaAtiva: any = 1;

  @HostListener('window:resize', ['$event']) onResize(event:any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth < this.innerHeight) {
      this.mobile = true
    }
    if (this.innerWidth > this.innerHeight) {
      this.mobile = false
    }
  }

  constructor(
    private service: ApiService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    var login: any;
    login = localStorage.getItem('login')
    login = JSON.parse(login);
    this.dadosUsuario = login;
    this.obterDados(login.user_uuid);
  }

  obterDados = (user:any) => {
    this.obterQuiz(user).then(
      result => {
        this.questionario = result;
        this.obterMarcasFavoritas(user).then(
          result => {
            var favoritos:any;
            favoritos = result
            this.marcasFavoritas = favoritos[0].lista_favoritos;
          },
          error => {
            this.emiteErro(error);
          }
        )
      },
      error => {
        this.emiteErro(error);
      }
    )
  }

  obterQuiz = (user:any) => {
    return new Promise((resolve, reject) => {
      this.service.Get(`quiz/${user}`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject('Não foi possível obter os dados do questionário')
        }
      )
    })
  }

  obterMarcasFavoritas = (user:any) => {
    return new Promise((resolve, reject) => {
      this.service.Get(`favorite/${user}`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject('Não foi possível obter suas marcas favoritas')
        }
      )
    })
  }

  emiteErro = (erro:any) => {
    Swal.close()
    Swal.fire('Erro!', erro, 'error')
  }

  mudaAba = (aba:any) => {
    this.abaAtiva = aba;
  }

}
