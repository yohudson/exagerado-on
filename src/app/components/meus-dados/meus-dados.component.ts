import { Component, OnChanges, Input, Directive } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

import * as $ from 'jquery';
import { AuthService } from "../../shared/services/auth.service";

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
      //delete this.usuario.senha
      console.log(this.usuario)
      if (this.usuario.celular == "0") {
        delete this.usuario.celular
      }
      if (this.usuario.telefone == "0") {
        delete this.usuario.telefone
      }
      if (this.usuario.data_nascimento != "0001-01-01") {
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
    console.log(this.usuario)

    this.service.Put(`users/${this.usuario.user_uuid}`, this.usuario).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Dados atualizados com sucesso', 'success').then(
          result => {
            this.obterUsuario(this.usuario.user_uuid)
          }
        );
        // Swal.fire('Sucesso!', result.toString(), 'success');
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error.toString(), 'error');
      }
    )
  }

  obterUsuario = (usuario:any) => {
    this.service.Get(`users/${usuario}`).subscribe(
      result => {
        this.usuario = result;
      }
    )
  }

}
