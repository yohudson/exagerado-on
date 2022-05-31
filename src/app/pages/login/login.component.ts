import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};

  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string = "";

  request: string = "";
  responce: string = "";

  @Output() hideBarEvent = new EventEmitter<boolean>();

  constructor(
    private service: ApiService,
    private router: Router,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showNavBar()
  }

  showNavBar = () => {
    this.hideBarEvent.emit(true);
  }

  realizarLogin = () =>{
    Swal.showLoading()  
    this.gerarHash(this.login.no_hash).then(
      result => {
        this.login.senha=result
        this.service.Post(`login`,this.login).subscribe(
          result => {
            Swal.close();
            this.global.usuario = result;
            if (result.senha === this.login.senha){
              if(this.global.usuario.perfil_id == 2){
                this.router.navigate(['/']);
              }
              if(this.global.usuario.perfil_id == 1){
                this.router.navigate(['/dashboard']);
              }
              delete this.global.usuario.senha
              localStorage.setItem('login', JSON.stringify(this.global.usuario));
              this.global.nav = true;
            }
            else{
              Swal.fire('Erro', 'Não foi possível realizar o login', 'error');
            }
          },
          error => {
            Swal.close();
            if (error.mensagem) Swal.fire('Erro', error.mensagem, 'error');
            if (error) Swal.fire('Erro', 'Não foi possível realizar o login', 'error');
          }
        )
      }
    )
  }
  
  cadGoogle = () => {
    Swal.showLoading()
    this.authService.GetDataGoogle().then(
      result => {
        Swal.close();
        var user: any = []
        var email: '';
        user = result;
        email = user.user.multiFactor.user.email;
        var usuario: any = {};
        usuario.usuario = user.user.multiFactor.user.email;
        usuario.senha = user.user.multiFactor.user.uid;
        this.loginGoogle(usuario).then(
          result => {
            var retorno: any;
            retorno = result;
            Swal.close();
            this.global.usuario = result;
            if(this.global.usuario.perfil_id == 2){
              this.router.navigate(['/']);
            }
            if(this.global.usuario.perfil_id == 1){
              this.router.navigate(['/dashboard']);
            }
            localStorage.setItem('login', JSON.stringify(this.global.usuario));
            this.global.nav = true;
          },
          error => {
            var cadUsuario: any = {};
            cadUsuario.nome = user.user.multiFactor.user.displayName;
            cadUsuario.celular = user.user.multiFactor.user.phoneNumber;
            if (cadUsuario.celular === null) {
              cadUsuario.celular = 0;
            }
            cadUsuario.data_nascimento = '0001-01-01';
            cadUsuario.email = user.user.multiFactor.user.email;
            cadUsuario.senha = user.user.multiFactor.user.uid;
            cadUsuario.cad_google = true;
            this.salvarDadosGooge(cadUsuario).then(
              result => {
                Swal.close();
                var novoUsuario: any = {};
                var retorno: any = {};
                retorno = result;
                novoUsuario.usuario = retorno.email
                novoUsuario.senha = retorno.senha
                this.loginGoogle(novoUsuario).then(
                  result => {
                    var retorno: any;
                    retorno = result;
                    Swal.close();
                    this.global.usuario = result;
                    if(this.global.usuario.perfil_id == 2){
                      this.router.navigate(['/']);
                    }
                    if(this.global.usuario.perfil_id == 1){
                      this.router.navigate(['/dashboard']);
                    }
                    localStorage.setItem('login', JSON.stringify(this.global.usuario));
                    this.global.nav = true;
                  },
                  error => {
                    Swal.close();
                    Swal.fire('Error', error.toString(), 'error')
                  }
                )
              },
              error => {
                Swal.close();
                Swal.fire('Error', error.toString(), 'error')
              }
            )
          }
        )
      },
      error => {
        Swal.close();        
        Swal.fire('Error', error.toString(), 'error')
      }
    )
  }
  
  loginGoogle = (usuario:any) => {
    return new Promise((resolve, reject) => {
      this.service.Post(`login`,usuario).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject('Usuário não existe');
        }
      )
    })
  }

  gerarHash = (senha: any) => {
    return new Promise((resolve, reject) => {
      let _key = crypto.enc.Utf8.parse(senha);
      let _iv = crypto.enc.Utf8.parse(senha);
      let encrypted = crypto.AES.encrypt(
        JSON.stringify(this.request), _key, {
          keySize: 16,
          iv: _iv,
          mode: crypto.mode.ECB,
          padding: crypto.pad.Pkcs7
        });
      this.encrypted = encrypted.toString();
      resolve(this.encrypted)
    })
  }

  salvarDadosGooge = (usuario:any) => {
    return new Promise((resolve, reject) => {
      this.service.Post(`users`, usuario).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error);
        }
      )

    })
  }

}
