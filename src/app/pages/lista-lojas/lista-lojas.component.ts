import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Loja } from '../../models/loja.model';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {
  
  loja = {} as Loja;
  listaLojas: any = [];

  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.obterLojas();
  }

  obterLojas(): void {
    this.service.Get(`/Loja`).subscribe((lojas: Loja[]) => {
      //this.listaLojas = lojas;
    })
    this.listaLojas =[
      {nome: 'Juquita', corredor:'', loja:'Praça de alimentação', segmento:'Variedades'},
      {nome: 'Cervejaria', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Hamburgeria', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Creperia', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Salgaderia', corredor:'', loja:'Praça de alimentação', segmento:'Alimentação'},
      {nome: 'Camiseteria', corredor:'E', loja:'5', segmento:'Alimentação'}
    ]
  }
}
