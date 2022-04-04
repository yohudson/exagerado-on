import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Marca } from '../../models/marca.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css']
})
export class ListaMarcasComponent implements OnInit {

  //marca = {} as Marca;
  listaLojas: any = [];
  listaMarcas: any = [];
  listaSegmentos: any = [];  
  segmento: any;
  loja: any;
  marcasFiltradas: any = []

  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.obterSegmentos();
  }

  obterSegmentos = () => {
    Swal.showLoading()
    this.service.Get(`segments`).subscribe(
      result => {
        this.listaSegmentos = result;
        this.listaSegmentos.unshift({segmento_uuid:0,nome:"Todos"})
        this.obterMarcas().then(
          result => {
            Swal.close()
          },
          error => {
            Swal.close()
            Swal.fire('Atenção!', 'Não foi possível carregar os dados para a tela', 'warning')
          }
        )
      },
      error => {
        Swal.close()
        Swal.fire('Atenção!', 'Não foi possível carregar os dados para a tela', 'warning')
      }
    )
  }

  obterMarcas = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`brands`).subscribe(
        result => {
          this.listaMarcas = result
          Object.assign(this.marcasFiltradas, this.listaMarcas);
          this.obterSegmentoMarcas().then(
            result => {
              console.log(result)
              resolve('Marcas carregadas com sucesso')
            },
            error => {}
          )          
        },
        error => {
          Swal.close()
          Swal.fire('Atenção!', 'Não foi possível carregar os dados para a tela', 'warning')
        }
      )
    })
  }

  filtroSegmentos = (seg:any) => {
    Swal.showLoading()
    this.marcasFiltradas = [];
    if (seg != 0) {
      console.log(seg)
      for(let marca of this.listaMarcas){
        if(marca.segmento_uuid === seg){
          this.marcasFiltradas.push(marca)
        }
      }
      Swal.close()
    }
    else {
      this.marcasFiltradas = this.listaMarcas
      Swal.close()
    }
  }

  obterSegmentoMarcas = () => {
    return new Promise((resolve, reject) => {
      for (let marca of this.marcasFiltradas) {
        for (let segmento of this.listaSegmentos) {
          if (marca.segmento_uuid === segmento.segmento_uuid){
            marca.segmento_nome = segmento.nome
          }
        }
      }
      resolve(this.marcasFiltradas)
    })
  }

}
