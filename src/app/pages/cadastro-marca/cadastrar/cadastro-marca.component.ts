import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.component.html',
  styleUrls: ['./cadastro-marca.component.css']
})
export class CadastroMarcaComponent implements OnInit {

  marca: any = {};
  editarMarca: boolean = false;
  listaSegmentos: any = [];
  segmentoSelecionado: any = [];
  segmentoDetalhado: any = [];
  segmentoIndicado: string = '';

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    Swal.showLoading();
    this.marca.status = true;
    this.obterListaSegmentos().then(
      result => {
        this.obterDadosMarca()
      },
      error => {
        Swal.close()
        Swal.fire('Erro',error,'error')
      }
    )
  }

  obterDadosMarca = () => {
    this.marca.marca_uuid = this.route.snapshot.paramMap.get("uuid") || ''
    if (Object.keys(this.marca.marca_uuid).length > 0){
      this.editarMarca = true;
      this.route.queryParams.subscribe(
        params => {
          if(Object.keys(params).length > 0){
            if(params['status'] ==="false"){
              this.marca.status = false;
            }
            this.marca.nome = params['nome'];
            if (params['lista_segmentos']){
              for (let item of params['lista_segmentos']){
                for (let segmento of this.listaSegmentos){
                  if(item === segmento.segmento_uuid){
                    this.segmentoSelecionado.push(segmento.nome)
                    this.segmentoDetalhado.push(segmento)
                  }
                }
              }
            }
            else {
              for (let segmento of this.listaSegmentos){
                if(params['segmento'] === segmento.segmento_uuid){
                  this.segmentoSelecionado.push(segmento.nome)
                  this.segmentoDetalhado.push(segmento)
                }
              }
            }

            Swal.close()
          }
          else {
            Swal.close()
          }
        }
      )
    }
    else {
      Swal.close()
    }
  }

  obterListaSegmentos = () => {
    return new Promise<any>((resolve, reject) => {
      this.service.Get(`segments`).subscribe(
        result => {
          this.listaSegmentos = result;
          resolve('ok')
        },
        error => {
          reject(error)
        }
      )
    })
  }

  salvarMarca = () => {
    Swal.showLoading()
    var obj = this.marca;
    obj.lista_segmentos = [];
    for (let segmento of this.segmentoDetalhado){
      obj.lista_segmentos.push(segmento.segmento_uuid);
    }
    obj.segmento = this.segmentoDetalhado[0].segmento_uuid
    this.service.Post(`brand`, obj).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Marca cadastrada com sucesso', 'success').then(
          result => {
            if (result['value']) {
              this.router.navigate(['/listar-marcas']);
            }
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error')
      }
    )
  }

  atualizarMarca = () => {
    Swal.showLoading()
    var obj = this.marca;
    obj.lista_segmentos = [];
    for (let segmento of this.segmentoDetalhado){
      obj.lista_segmentos.push(segmento.segmento_uuid);
    }
    obj.segmento = this.segmentoDetalhado[0].segmento_uuid
    this.service.Put(`brand/${this.marca.marca_uuid}`, obj).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Marca editada com sucesso', 'success').then(
          result => {
            if (result['value']) {
              this.router.navigate(['/listar-marcas']);
            }
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error')
      }
    )
  }

  mudaStatusMarca = () => {
    this.marca.status = !this.marca.status
  }

  addSegmentos = (e:any) => {
    var segmento = e.target.value;
    for (let item of this.listaSegmentos){
      if (segmento.toUpperCase() === item.nome.toUpperCase()) {
        var index = this.segmentoSelecionado.indexOf(segmento);
        if (index == '-1') {
          this.segmentoSelecionado.push(item.nome)
          this.segmentoDetalhado.push(item)
        }
        else return
      }
    }
  }

  removerSegmento = (item:any) => {
    var x = this.segmentoSelecionado.indexOf(item);
    this.segmentoSelecionado.splice(x, 1);
    for (let s of this.segmentoDetalhado){
      if(item === s.nome){
        var y = this.segmentoDetalhado.indexOf(s)
        this.segmentoDetalhado.splice(y,1)
      }
    }
  }

}
