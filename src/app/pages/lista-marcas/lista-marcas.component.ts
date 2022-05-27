import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Marca } from '../../models/marca.model';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";

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
    private service: ApiService,
    public authService: AuthService
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
        this.obterLojas().then(
          result => {
            this.listaLojas = result;
            this.listaLojas.unshift({loja_uuid: '0', loja_nome:'Todas'})
            this.obterMarcas().then(
              result => {
                Swal.close()
              },
              error => {
                Swal.close()
                Swal.fire('Atenção!', 'Não foi possível carregar as marcas', 'warning')
              }
            )
          },
          error => {
            Swal.close()
            Swal.fire('Atenção!', error, 'warning')
          }
        )
      },
      error => {
        Swal.close()
        Swal.fire('Atenção!', 'Não foi possível carregar os segmentos', 'warning')
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

  obterLojas = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`stores`).subscribe(
        result => {
          resolve(result);
        },
        error=> {
          reject('Não foi possível carregar as lojas')
        }
      )
    })
  }

  filtroSegmentos = (seg:any) => {
    this.loja = 0;
    Swal.showLoading()
    this.marcasFiltradas = [];
    if (seg != 0) {
      for(let marca of this.listaMarcas){
        for (let segmentoMarca of marca.lista_segmento_uuid){
          if (segmentoMarca === seg){
            this.marcasFiltradas.push(marca)
          }
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
      for (let marca of this.marcasFiltradas) {
        marca.lista_segmento_nome = [];
        console.log(marca)
        for (let marca_segmento of marca.lista_segmento_uuid) {
          console.log(marca_segmento)
          for (let segmento of this.listaSegmentos) {
            console.log(segmento.nome)
            if (marca_segmento == segmento.segmento_uuid){
              console.log(segmento.segmento_uuid)
              marca.lista_segmento_nome.push(segmento.nome)
            }
            console.log(marca)
          }
        }
      }
      console.log(this.marcasFiltradas)
      resolve(this.marcasFiltradas)
    })
  }

  filtroLoja = (lojaFiltro:any) => {
    this.segmento = 0;
    Swal.showLoading()
    this.marcasFiltradas = []
    if(lojaFiltro === '0') {
      this.marcasFiltradas = this.listaMarcas;
      Swal.close();
      return;
    }
    for (let lojaEvento of this.listaLojas) {
      if (lojaFiltro == lojaEvento.loja_uuid){
        for (let marcaVendida of lojaEvento.marcas_vendidas){
          for (let marca of this.listaMarcas){
            if (marca.marca_uuid === marcaVendida){
              this.marcasFiltradas.push(marca)
            }
          }
        }
      }
    }
    Swal.close()
  }

}
