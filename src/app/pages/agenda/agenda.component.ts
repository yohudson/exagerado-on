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
      {nome: 'Happy Hour', data_hora_inicio: '2022-04-22T18:00:00', data_hora_fim: '2022-04-22T23:00:00', local: 'Praça de alimentação', observacao:''}
    ]
  }

}
