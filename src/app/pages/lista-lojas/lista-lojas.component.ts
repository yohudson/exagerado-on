import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {
  listaMarcas: any = []

  constructor() { }

  ngOnInit(): void {
    this.listaMarcas =[
      {nome: 'Juquita', corredor:'', loja:'Praça de alimentação', segmento:'Variedades'},
      {nome: 'Cervejaria', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Hamburgeria', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Creperia', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Salgaderia', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Camiseteria', corredor:'E', loja:'5', segmento:'Alimentação'}
    ]
  }
}
