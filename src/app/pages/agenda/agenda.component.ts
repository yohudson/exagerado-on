import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  listaAtracoes: any = []

  constructor() { }

  ngOnInit(): void {
    this.listaAtracoes =[
      {nome: 'Happy Hour', data_hora_inicio: '11/05/2022 18:00', data_hora_fim: '11/05/2022 23:00', local: 'Praça de alimentação', observacao:''}
    ]
  }

}
