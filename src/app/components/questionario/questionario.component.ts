import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  questionario: any = []
  periodo_compras: any = {};
  conhece_evento: boolean = false;
  dias_visita: any = {};
  forma_pagamento: any = {};
  cidade_origem: string = '';
  soube_evento: string = '';
  fechamento: any = {};
  recado: any = '';

  @Output() passo = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  
  proximoPasso = (value: number) => {
    console.log(this.periodo_compras)
    console.log(this.conhece_evento)
    if(Object.keys(this.periodo_compras).length > 0) {
      this.questionario['periodo_compras'] = this.periodo_compras
    }
    if (this.conhece_evento){
      this.questionario['conhece_evento'] = this.conhece_evento
    }
    if(Object.keys(this.dias_visita).length > 0) {
      this.questionario['dias_visita'] = this.dias_visita
    }
    if(Object.keys(this.forma_pagamento).length > 0) {
      this.questionario['forma_pagamento'] = this.forma_pagamento
    }
    if(this.cidade_origem){
      this.questionario['cidade_origem'] = this.cidade_origem
    }
    if(this.soube_evento){
      this.questionario['soube_evento'] = this.soube_evento
    }
    if(Object.keys(this.dias_visita).length > 0) {
      this.questionario['fechamento'] = this.fechamento
    }
    if(Object.keys(this.recado).length > 0) {
      this.questionario['recado'] = this.recado.target.value
    }
    console.log(this.questionario)
    this.passo.emit(value)
  }

  indicaConheceEvento = () => {
    this.conhece_evento = !this.conhece_evento;
  }


}
