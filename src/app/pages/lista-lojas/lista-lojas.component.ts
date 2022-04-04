import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Loja } from '../../models/loja.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {
  
  loja = {} as Loja;
  listaLojas: any = [];
  listaSegmentos: any = [];
  listaMarcas: any = [];
  segmento: any;
  marca: any;

  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.obterLojas();
  }

  obterSegmentos = () => {
    return new Promise((resolve, reject) =>{
      this.service.Get(`segments`).subscribe(
        result => {
          this.listaSegmentos = result
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
    // this.service.Get(`/Loja`).subscribe(
    //    result => {
    //   //this.listaLojas = lojas;
    // })
  }
}
