import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {

  usuario: any = {}
  listaGeneros: any = [];
  loading: boolean = false;

  //converte senha
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string = "";

  request: string = "";
  responce: string = "";

  @Output() passo = new EventEmitter<number>();
  constructor(
    private service: ApiService,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterGeneros()
  }

  proximoPasso = (value: number) => {
    Swal.showLoading()
    this.validaCadastro().then(
      result => {
        Swal.close();
        this.converteSenha().then(
          result => {
            var senhas: any = {};
            senhas = result
            const obj:any = {};
            this.usuario.cad_google = false;
            Object.assign(obj, this.usuario);            
            Object.keys(obj).forEach(a => {
              Object.keys(senhas).forEach(b => {
                if (a === b) {
                  obj[a] = senhas[b]
                }
              })
            });
            this.comparaSenha(obj.senha, obj.confirma_senha).then(
              result =>{
                if (obj.celular) {
                  obj.celular = obj.celular.replace(/\D/g,'')
                }
                delete obj.confirma_senha
                this.salvarDados(obj).then(
                  result => {
                    this.loading = false;
                    this.global.usuario = result;
                    Swal.fire('Sucesso', 'Dados cadastrados com sucesso!', 'success').then(
                      result => {
                        if (result['value']==true){
                          this.passo.emit(value)
                        }
                      },
                      error => {
                        Swal.close();        
                        Swal.fire('Aten????o', error.toString(), 'warning')
                      }
                    )
                  },
                  error => {
                    this.loading = false;
                    Swal.fire('Erro', error.toString(), 'error')
                  }
                )
              },
              error => {
                this.loading = false;
                Swal.fire('Aten????o', error.toString(), 'warning')
              }
            )
          },
          error => {
            Swal.hideLoading()
            Swal.fire('Aten????o', error.toString(), 'warning')
          }
        )
      },
      error => {
        Swal.fire('Aten????o', error.toString(), 'warning')
      }
    )
  }

  obterGeneros = () => {
    this.service.Get(`genders`).subscribe(
      result => {
        this.listaGeneros = result
        this.listaGeneros.unshift({genero_id:0,nome:'SELECIONE..'})
      }
    )
  }

  validaCadastro = () => {
    return new Promise((resolve, reject) => {
      if (!this.usuario['nome']) {
        reject('?? preciso informar o nome completo')
        return
      }
      // if (!this.usuario['celular']) {
      //   reject('?? preciso informar o seu n??mero de celular')
      //   return
      // }
      if (!this.usuario['email']) {
        reject('?? preciso informar seu e-mail')
        return
      }
      if (!this.usuario['data_nascimento']) {
        reject('?? preciso informar a data de nascimento')
        return
      }
      if (!this.usuario['senha']) {
        reject('?? preciso digitar uma senha')
        return
      }
      if (!this.usuario['confirma_senha']) {
        reject('?? preciso confirmar a senha')
        return
      }
      else {
        resolve('Dados completos')
      }
    })
  }

  comparaSenha = (senha:string, confirma:string) => {
    return new Promise((resolve, reject) => {
      if (senha === confirma) {
        resolve('Senhas iguais')
      }
      else {
        reject('As senhas n??o s??o iguais')
      }
    })
  }

  converteSenha = () => {
    return new Promise((resolve, reject) => {
      var dadosConverter: any = {}
      Object.assign(dadosConverter, this.usuario)
      var listaSenhas: any = []
      listaSenhas.senha = dadosConverter.senha;
      listaSenhas.confirma_senha = dadosConverter.confirma_senha;
      //converter a senha para hash
      var converte: number = 0;
      var senhasConvertidas: any = []
      for (var i = 0; i < Object.keys(listaSenhas).length;i++){
        var x: any = Object.values(listaSenhas)[i];
        var y: any = Object.keys(listaSenhas)[i];
        let _key = crypto.enc.Utf8.parse(x);
        let _iv = crypto.enc.Utf8.parse(x);
        let crypt = crypto.AES.encrypt(
        JSON.stringify(this.request), _key, {
          keySize: 16,
          iv: _iv,
          mode: crypto.mode.ECB,
          padding: crypto.pad.Pkcs7
        });
        var encrypted:any = crypt.toString();        
        Object.keys(listaSenhas).forEach(key => {
          if (key === y) {
            listaSenhas[key] = encrypted
          }
        });        
        converte++;
      }
      if (converte === Object.keys(listaSenhas).length){
        resolve(listaSenhas)
      }
      else {
        reject('N??o foi poss??vel converter a senha')
      }
    })
  }

  salvarDados = (obj:any) => {
    return new Promise((resolve, reject) => {
      this.service.Post(`users`, obj).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject('N??o foi poss??vel cadastrar o usu??rio');
        }
      )

    })
  }

  irQuestionario = (value:any) => {
    this.passo.emit(value)
  }

}
