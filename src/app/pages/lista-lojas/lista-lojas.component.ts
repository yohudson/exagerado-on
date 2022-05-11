import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Loja } from '../../models/loja.model';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {
  
  loja = {} as Loja;
  listaLojas: any = [];
  exibirLojas:any = [];
  listaSegmentos: any = [];
  listaMarcas: any = [];
  segmento: any;
  marca: any;

  constructor(
    private service: ApiService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterLojas();
  }

  obterSegmentos = () => {
    return new Promise((resolve, reject) =>{
      this.service.Get(`segments`).subscribe(
        result => {
          this.listaSegmentos = result
          this.listaSegmentos.unshift({segmento_uuid: '0', nome: 'Todos', status: true})
          resolve('Segmentos carregados com sucesso')
        },
        error => {
          Swal.close()
          Swal.fire('Atenção!', 'Não foi possível carregar os dados para a tela', 'warning')
        }
      )
    })
  }
  
  obterMarcas = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`brands`).subscribe(
        result => {
          this.listaMarcas = result
          this.listaMarcas.unshift({marca_uuid: '0', nome: 'Todas', status: true})
          resolve('Marcas carregadas com sucesso')
        },
        error => {
          Swal.close()
          Swal.fire('Atenção!', 'Não foi possível carregar os dados para a tela', 'warning')
        }
      )
    })
  }

  obterLojas(): void {
    Swal.showLoading()
    this.obterSegmentos().then(
      result => {
        this.obterMarcas().then(
          result => {
            this.service.Get(`stores`).subscribe(
              result => {
                this.listaLojas = result;
                var nomeSegmentos = []
                for (let loja of this.listaLojas){
                  for (let segmento of this.listaSegmentos){
                    for (let segmentoLoja of loja.lista_segmentos){
                      if (segmentoLoja === segmento.segmento_uuid){
                        nomeSegmentos.push(segmento.nome)
                      }
                    }
                  }
                  loja.nomeSegmentos = nomeSegmentos
                }
                Object.assign(this.exibirLojas,this.listaLojas)
                Swal.close()
              },
              error => {
                Swal.close()
                Swal.fire('Atenção!', 'Não foi possível carregar a lista de lojas', 'warning')
              }
            )
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

  aplicarFiltroSegmento = (segmentoFiltro:any) => {
    this.marca = 0;
    Swal.showLoading()
    this.exibirLojas = []
    if (segmentoFiltro === '0'){
      this.exibirLojas = this.listaLojas;
      Swal.close()
      return
    }
    for (let loja of this.listaLojas){
      for (let segmentoLoja of loja.lista_segmentos) {
        if (segmentoFiltro === segmentoLoja){
          this.exibirLojas.push(loja);
        }
      }
    }
    Swal.close()    
  }

  aplicarFiltroMarca = (marcaFiltro:any) => {
    this.segmento = 0;
    Swal.showLoading()
    this.exibirLojas = []
    if (marcaFiltro === '0'){
      this.exibirLojas = this.listaLojas;
      Swal.close()
      return
    }
    for (let loja of this.listaLojas){
      for (let marcaLoja of loja.marcas_vendidas) {
        if (marcaFiltro === marcaLoja){
          this.exibirLojas.push(loja);
        }
      }
    }
    Swal.close()    
  }
}
