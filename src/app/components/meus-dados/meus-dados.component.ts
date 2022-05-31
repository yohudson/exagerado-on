import { Component, OnChanges, Input, Directive } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

import * as $ from 'jquery';
import { AuthService } from "../../shared/services/auth.service";

import * as crypto from 'crypto-js';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent implements OnChanges {

  usuario: any = {}
  listaGeneros: any = [];
  loading: boolean = false;
  cadGoogle: boolean = false;

  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string = "";

  request: string = "";
  responce: string = "";

  @Input() meusDados: any;


  constructor(
    private service: ApiService,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnChanges(): void {
    if (this.meusDados) {
      this.usuario = this.meusDados;
      this.usuario.celular = this.meusDados.telefone
      var data_nascimento = this.usuario.data_nascimento.split("T")[0]
      this.usuario.data_nascimento = data_nascimento
      if (this.usuario.celular == "0") {
        delete this.usuario.celular
      }
      if (this.usuario.telefone == "0") {
        delete this.usuario.telefone
      }
      if (this.usuario.cad_google == true) {
        this.cadGoogle = true;
      }
      if (this.usuario.data_nascimento == "0001-01-01") {
        delete this.usuario.data_nascimento
      }
      this.global.aplicarMascara(this.usuario).then(
        result => {
          this.usuario.celular = result;
          this.usuario.telefone = result;
        },
        error => {}
      )
    }
    this.obterGeneros();
  }

  obterGeneros = () => {
    this.service.Get(`genders`).subscribe(
      result => {
        this.listaGeneros = result
        this.listaGeneros.unshift({genero_id:0,nome:'SELECIONE..'})
      }
    )
  }

  atualizarDados = () => {
    Swal.showLoading();
    var senha: any = [];
    if (this.usuario.nohash == '' || this.usuario.nohash == null && this.usuario.confirma_senha == '' || this.usuario.confirma_senha == null){
      var user = JSON.parse(localStorage.getItem('login') || '');
      this.usuario.senha = user.senha
      var obj:any = {}
      Object.assign(obj, this.usuario)
      if (obj.telefone) {
        obj.telefone = obj.telefone.replace(/\D/g,'')
      }
      this.service.Put(`users/${obj.user_uuid}`, obj).subscribe(
        result => {
          Swal.close();
          Swal.fire('Sucesso!', 'Dados atualizados com sucesso', 'success').then(
            result => {
              this.obterUsuario(obj.user_uuid)
            }
          );
        },
        error => {
            Swal.close();
            Swal.fire('Erro!', error.toString(), 'error');
        }
      )
      return
    }

    else {
      senha.senha1 = this.usuario.nohash
      senha.senha2 = this.usuario.confirma_senha
    }
    this.gerarHash(this.usuario.nohash).then(
      result => {
        this.usuario.senha = result;
        this.gerarHash(this.usuario.confirma_senha).then(
          result => {
            this.usuario.confirma_hash = result;
            this.comparaSenha(this.usuario.senha, this.usuario.confirma_hash).then(
              result => {
                delete this.usuario.confirma_senha;
                delete this.usuario.nohash;
                var obj:any = {}
                Object.assign(obj, this.usuario)
                if (obj.telefone) {
                  obj.telefone = obj.telefone.replace(/\D/g,'')
                }
                this.service.Put(`users/${obj.user_uuid}`, obj).subscribe(
                  result => {
                    Swal.close();
                    Swal.fire('Sucesso!', 'Dados atualizados com sucesso', 'success').then(
                      result => {
                        this.obterUsuario(obj.user_uuid)
                      }
                    );
                  },
                  error => {
                      Swal.close();
                      Swal.fire('Erro!', error.toString(), 'error');
                    }
                )
              },
              error => {
                Swal.close();
                if (error.mensagem) Swal.fire('Erro', error.mensagem, 'error');
                if (error) Swal.fire('Erro', error, 'error');
              }
            )
          },
          error => {
            Swal.close();
            if (error.mensagem) Swal.fire('Erro', error.mensagem, 'error');
            if (error) Swal.fire('Erro', 'Falha ao comparar a confirmação de senha', 'error');
          }
        )
      },
      error => {
        Swal.close();
        if (error.mensagem) Swal.fire('Erro', error.mensagem, 'error');
        if (error) Swal.fire('Erro', 'Falha ao comparar a senha', 'error');
      } 
    )
  }

  obterUsuario = (usuario:any) => {
    this.service.Get(`users/${usuario}`).subscribe(
      result => {
        var usuario = result;
        usuario.data_nascimento = usuario.data_nascimento.split("T")[0]
        this.global.aplicarMascara(usuario).then(
          result => {
            usuario.telefone = result
          }
        )
        this.usuario = usuario;
        this.global.usuario = usuario;
        localStorage.setItem('login', JSON.stringify(this.usuario))
      }
    )
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

  comparaSenha = (senha:any, confirma_senha:any) => {
    return new Promise((resolve, reject) => {
      if (senha === confirma_senha){
        resolve('Senhas iguais')
      }
      else {
        reject('Senhas não são iguais')
      }
    })
  }

}
