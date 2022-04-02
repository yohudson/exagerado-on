import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  listaMarcas: any = [];
  marcasFavoritas: any = []
  marcaSelecionada: any = '';

  @Output() passo = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.listaMarcas = [
      {nome: 'Nike', segmento: 'esportes', id: 1},
      {nome: 'Adidas', segmento: 'esportes', id: 2},
      {nome: 'H&M', segmento: 'esportes', id: 3},
      {nome: 'Zara', segmento: 'esportes', id: 4},
      {nome: 'Louis Vitton', segmento: 'esportes', id: 5},
      {nome: 'Uniqlo', segmento: 'esportes', id: 6},
      {nome: 'Hermès', segmento: 'esportes', id: 7},
      {nome: 'Rolex', segmento: 'esportes', id: 8},
      {nome: 'Gucci', segmento: 'esportes', id: 9},
      {nome: 'Cartier', segmento: 'esportes', id: 10},
      {nome: 'Ralph Lauren', segmento: 'esportes', id: 11},
      {nome: 'Lacoste', segmento: 'esportes', id: 12},
      {nome: 'Tommy Hilfiger', segmento: 'esportes', id: 13},
      {nome: 'Victor Hugo', segmento: 'esportes', id: 14},
    ];
  }

  addFavoritas = (f:any) =>{
    var marca = f.target.value;
    var index = this.marcasFavoritas.indexOf(marca)
      if (index == '-1'){
        this.marcasFavoritas.push(marca)
      }
    console.log(this.marcasFavoritas)
  }
  
  removerFavorita = (m: any)=>{
    var x = this.marcasFavoritas.indexOf(m);
    this.marcasFavoritas.splice(x, 1); 
  }

  
  proximoPasso = (value: number) => {
    this.passo.emit(value)
  }

}
