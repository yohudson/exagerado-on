import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  questionario: any = {}
  periodo_compras: any = {};
  conhece_evento: boolean = false;
  dias_visita: any = {};
  forma_pagamento: any = {};
  cidade_origem: string = '';
  soube_evento: string = '';
  fechamento: any = {};
  recado: any = '';

  @Output() passo = new EventEmitter<number>();
  constructor(
    private service: ApiService,
    public global: Global
  ) { }

  ngOnInit(): void {
  }
  
  proximoPasso = (value: number) => {
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
    if(Object.keys(this.recado).length > 0) {
      this.questionario['recado'] = this.recado.target.value
    }
    else this.questionario['recado'] = '';
    if(this.global.usuario) {
      this.questionario.user_uuid = this.global.usuario.user_uuid;
    }
    this.enviarQuestionario().then(
      result => {
        Swal.close();      
        Swal.fire('Sucesso', 'Formulário enviado com sucesso!', 'success').then(
          result => {
            if (result['value']==true){
              this.passo.emit(value)
            }
          },
          error => {
            Swal.close();        
            Swal.fire('Atenção', error.toString(), 'warning')
          }
        )
      },
      error => {
        Swal.close();        
        Swal.fire('Atenção', error.toString(), 'warning')
      }
    )
  }

  indicaConheceEvento = () => {
    this.conhece_evento = !this.conhece_evento;
  }

  enviarQuestionario = () => {
    return new Promise((resolve, reject) => {
      this.service.Post(`quiz`,this.questionario).subscribe(
        result => {
          resolve('Questionário enviado com sucesso')
        },
        error => {
          reject('Não foi possível enviar o questionário');
        }
      )
    })
  }

  irMarcas = (value:any) => {
    this.passo.emit(value)
  }


}
