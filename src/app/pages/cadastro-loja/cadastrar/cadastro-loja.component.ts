import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-cadastro-loja',
  templateUrl: './cadastro-loja.component.html',
  styleUrls: ['./cadastro-loja.component.css']
})
export class CadastroLojaComponent implements OnInit {

  loja: any = {};
  editarLoja: boolean = false;
  loja_uuid: string = '';

  //segmentos atuação da loja
  listaSegmentos: any = [];
  segmentoSelecionado: any = [];
  segmentoDetalhado: any = [];
  segmentoIndicado: string = '';
  
  //marcas vendidas pela loja
  listaMarcas: any = [];
  marcaSelecionada: any = [];
  marcaDetalhada: any = [];
  marcaIndicada: string = '';

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    Swal.showLoading()
    this.loja.status = true;
    this.obterListaSegmentos().then(result => {
      this.obterListaMarcas().then(result => {
        this.obterDadosLoja().then(result => {
          Swal.close()
        })
      })
    })
  }

  obterDadosLoja = () => {
    return new Promise<boolean>((resolve, reject) => {
      this.loja_uuid = this.route.snapshot.paramMap.get("uuid") || '';
      this.route.queryParams.subscribe(
        params => {
          if(Object.keys(params).length > 0){
            this.editarLoja = true;
            this.loja.cnpj = params['cnpj'];
            this.loja.nome_loja = params['nome'];
            this.loja.nome_responsavel = params['responsavel'];
            this.loja.telefone_contato = params['telefone'];
            this.loja.email_contato = params['email'];
            this.loja.loja_uuid = params['uuid'];
            this.loja.localizacao = params['localizacao'];
            if(params['marcas_vendidas']){
              for (let item of params['marcas_vendidas']){
                for(let marca of this.listaMarcas){
                  if (item === marca.marca_uuid){
                    this.marcaSelecionada.push(marca.nome)
                    this.marcaDetalhada.push(marca)
                  }
                }
              }
            }
            if(params['lista_segmentos']){
              for (let item of params['lista_segmentos']){
                for(let segmento of this.listaSegmentos){
                  if (item === segmento.segmento_uuid){
                    this.segmentoSelecionado.push(segmento.nome)
                    this.segmentoDetalhado.push(segmento)
                  }
                }
              }
            }
            resolve(true)
          }
          else {
            this.editarLoja = false;
            resolve(true)
          }
        }
      )
    })
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

  obterListaMarcas = () => {
    return new Promise<any>((resolve, reject) => {
      this.service.Get(`brands`).subscribe(
        result => {
          this.listaMarcas = result;
          resolve('ok')
        },
        error => {
          reject(error)
        }
      )
    })
  }

  mudaStatusLoja = () => {
    this.loja.status = !this.loja.status
  }

  salvarLoja = () => {
    var lista_marcas = []
    var lista_segmentos = []
    for (let item of this.marcaDetalhada){
      lista_marcas.push(item.marca_uuid)
    }
    for (let item of this.segmentoDetalhado){
      lista_segmentos.push(item.segmento_uuid)
    }
    this.loja.marcas_vendidas = lista_marcas
    this.loja.segmentos = lista_segmentos
    var obj = {};
    Object.assign(obj, this.loja);
    // this.validaCampos().then(
    //   result => {},
    //   error => {}
    // )
    this.manterLoja(obj).then(
      result => {
        Swal.close();
        Swal.fire('Sucesso', 'Loja cadastrada com sucesso', 'success');
        this.router.navigate(['/listar-lojas']);
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error')
      }
    )
  }

  manterLoja = (obj:any) => {
    return new Promise((resolve, reject) => {
      if(obj.loja_uuid){
        //resolve('ok')
        this.service.Put(`store/${obj.loja_uuid}`, obj).subscribe(
          result => {
            resolve('ok')
          },
          error => {
            reject(error)
          }
        )
      }
      else{
        this.service.Post(`store`, obj).subscribe(
          result => {
            resolve('ok')
          },
          error => {
            reject(error)
          }
        )
      }
    })
  }

  atualizarLoja = () => {
    var lista_marcas = []
    var lista_segmentos = []
    for (let item of this.marcaDetalhada){
      lista_marcas.push(item.marca_uuid)
    }
    for (let item of this.segmentoDetalhado){
      lista_segmentos.push(item.segmento_uuid)
    }
    this.loja.marcas_vendidas = lista_marcas
    this.loja.segmentos = lista_segmentos
    var obj = {};
    Object.assign(obj, this.loja);
    this.manterLoja(obj).then(
      result => {
        Swal.close();
        Swal.fire('Sucesso', 'Loja atualizada com sucesso', 'success').then(
          result => {
            this.router.navigate(['/listar-lojas']);
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error')
      }
    )
  }

// segmentos
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

  // marcas
  addMarcas = (e:any) => {
    var marca = e.target.value;
    for (let item of this.listaMarcas){
      if (marca.toUpperCase() === item.nome.toUpperCase()) {
        var index = this.marcaSelecionada.indexOf(marca);
        if (index == '-1') {
          this.marcaSelecionada.push(item.nome)
          this.marcaDetalhada.push(item)
        }
        else return
      }
    }
  }

  removerMarca = (item:any) => {
    var x = this.marcaSelecionada.indexOf(item);
    this.marcaSelecionada.splice(x, 1);
    for (let m of this.marcaDetalhada){
      if(item === m.nome){
        var y = this.marcaDetalhada.indexOf(m)
        this.marcaDetalhada.splice(y,1)
      }
    }
  }
}
