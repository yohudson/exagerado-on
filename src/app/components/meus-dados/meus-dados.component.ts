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
      delete this.usuario.senha
      this.global.aplicarMascara(this.usuario).then(
        result => {
          console.log(result)
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
    console.log(this.usuario)
  }

}
