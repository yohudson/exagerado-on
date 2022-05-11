import { Component, OnChanges, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

import * as $ from 'jquery';

@Component({
  selector: 'app-meu-questionario',
  templateUrl: './meu-questionario.component.html',
  styleUrls: ['./meu-questionario.component.css']
})
export class MeuQuestionarioComponent implements OnChanges {

  questionario: any = {}
  periodo_compras: any = {};
  conhece_evento: boolean = false;
  dias_visita: any = {};
  forma_pagamento: any = {};
  cidade_origem: string = '';
  soube_evento: string = '';
  fechamento: any = {};
  recado: any = '';

  @Input() meuQuestionario: any;

  constructor(
    private service: ApiService,
    public global: Global,
    private router: Router
  ) { }

  ngOnChanges(): void {
    this.populaDados();
  }

  indicaConheceEvento = () => {
    this.conhece_evento = !this.conhece_evento;
    if (this.conhece_evento) {
      $('#conhece_evento').prop('checked',true);
    }
    else {
      $('#conhece_evento').prop('checked',false);
    }
  }

  populaDados = () => {
    if (Object.keys(this.meuQuestionario).length > 0) {
      this.questionario.uuid = this.meuQuestionario.questionario_uuid;
      if(this.meuQuestionario.conhece_evento){
        this.indicaConheceEvento();
      }
      this.cidade_origem = this.meuQuestionario.cidade_origem;
      this.recado = this.meuQuestionario.recado;
      this.soube_evento = this.meuQuestionario.como_soube;
      //fechamento
      this.fechamento.amigx = this.meuQuestionario.fechamento_amigx;
      this.fechamento.familia = this.meuQuestionario.fechamento_familia;
      this.fechamento.amor = this.meuQuestionario.fechamento_namoradx;
      this.fechamento.solo = this.meuQuestionario.fechamento_sozinho;
      //forma pagamento
      this.forma_pagamento.dinheiro = this.meuQuestionario.forma_pagamento_dinheiro;
      this.forma_pagamento.cartao_debito = this.meuQuestionario.forma_pagamento_debito;
      this.forma_pagamento.cartao_credito = this.meuQuestionario.forma_pagamento_credito;
      this.forma_pagamento.pix = this.meuQuestionario.forma_pagamento_pix;
      this.forma_pagamento.picpay = this.meuQuestionario.forma_pagamento_picpay;
      //horario compras
      this.periodo_compras.manha = this.meuQuestionario.horario_compras_manha;
      this.periodo_compras.noite = this.meuQuestionario.horario_compras_noite;
      this.periodo_compras.tarde = this.meuQuestionario.horario_compras_tarde;
      //melhor dia
      this.dias_visita.quarta = this.meuQuestionario.melhor_dia_quarta;
      this.dias_visita.quinta = this.meuQuestionario.melhor_dia_quinta;
      this.dias_visita.sexta = this.meuQuestionario.melhor_dia_sexta;
      this.dias_visita.sabado = this.meuQuestionario.melhor_dia_sabado;
      this.dias_visita.domingo = this.meuQuestionario.melhor_dia_domingo;
    }
  }

  atualizarQuiz = () => {
    Swal.showLoading()
    //período de compras
    if (!this.periodo_compras['manha']){
      this.periodo_compras['manha'] = false;
    }
    if (!this.periodo_compras['tarde']){
      this.periodo_compras['tarde'] = false;
    }
    if (!this.periodo_compras['noite']){
      this.periodo_compras['noite'] = false;
    }
    this.questionario['periodo_compras'] = this.periodo_compras;
    //conhece o evento
    this.questionario['conhece_evento'] = this.conhece_evento
    //dias de visita
    if (!this.dias_visita['quarta']) {
      this.dias_visita['quarta'] = false;
    }
    if (!this.dias_visita['quinta']) {
      this.dias_visita['quinta'] = false;
    }
    if (!this.dias_visita['sexta']) {
      this.dias_visita['sexta'] = false;
    }
    if (!this.dias_visita['sabado']) {
      this.dias_visita['sabado'] = false;
    }
    if (!this.dias_visita['domingo']) {
      this.dias_visita['domingo'] = false;
    }
    this.questionario['dias_visita'] = this.dias_visita
    //forma de pagamento
    if (!this.forma_pagamento['dinheiro']){
      this.forma_pagamento['dinheiro'] = false;
    }
    if (!this.forma_pagamento['cartao_debito']){
      this.forma_pagamento['cartao_debito'] = false;
    }
    if (!this.forma_pagamento['cartao_credito']){
      this.forma_pagamento['cartao_credito'] = false;
    }
    if (!this.forma_pagamento['pix']){
      this.forma_pagamento['pix'] = false;
    }
    if (!this.forma_pagamento['picpay']){
      this.forma_pagamento['picpay'] = false;
    }
    this.questionario['forma_pagamento'] = this.forma_pagamento
    //cidade de origem
    if (this.cidade_origem){
      this.questionario['cidade_origem'] = this.cidade_origem
    }
    else this.questionario['cidade_origem'] = '';
    //soube do evento
    if(this.soube_evento){
      this.questionario['soube_evento'] = this.soube_evento
    }
    else this.questionario['soube_evento'] = '';
    //fechamento
    if (!this.fechamento['amigx']){
      this.fechamento['amigx'] = false;
    }
    if (!this.fechamento['familia']){
      this.fechamento['familia'] = false;
    }
    if (!this.fechamento['amor']){
      this.fechamento['amor'] = false;
    }
    if (!this.fechamento['solo']){
      this.fechamento['solo'] = false;
    }
    this.questionario['fechamento'] = this.fechamento
    //recado
    // if(Object.keys(this.recado).length > 0) {
    //   this.questionario['recado'] = this.recado.target.value
    // }
    //else this.questionario['recado'] = '';
    if(this.global.usuario) {
      this.questionario.user_uuid = this.global.usuario.user_uuid;
    }
    console.log(this.questionario)
    Swal.close();
    this.enviarQuestionario().then(
      result => {
        Swal.close();      
        Swal.fire('Sucesso', 'Questionário atualizado com sucesso', 'success')
      },
      error => {
        Swal.close();        
        Swal.fire('Atenção', error.toString(), 'warning')
      }
    )
  }

  enviarQuestionario = () => {
    return new Promise((resolve, reject) => {
      this.service.Put(`quiz/${this.questionario.uuid}`,this.questionario).subscribe(
        result => {
          resolve('Questionário atualizado com sucesso')
        },
        error => {
          reject('Não foi possível enviar o questionário');
        }
      )
    })
  }
}
