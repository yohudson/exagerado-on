import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute, Event as NavigationEvent } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-cadastro-segmento',
  templateUrl: './cadastro-segmento.component.html',
  styleUrls: ['./cadastro-segmento.component.css']
})
export class CadastroSegmentoComponent implements OnInit {

  segmento: any = {};
  editarSegmento: boolean = false;
  segmento_uuid: string = '';

  constructor(
    private service: ApiService,
    public global: Global,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.segmento_uuid = this.route.snapshot.paramMap.get("uuid")  || '{}'
    this.route.queryParams.subscribe(
      params => {
        if(Object.keys(params).length > 0) {      
          this.segmento.nome = params['nome'];
          if(params['status']==="false"){
            this.segmento.status = false;
          }
          else this.segmento.status = true;
          this.editarSegmento = false;
        }
        else this.segmento.status = true;
      }
    )
  }

  salvarSegmento = () => {
    Swal.showLoading();
    var obj: any = {}
    obj = this.segmento;
    this.validaCampos().then(
      result => {
        this.service.Post(`segments`, obj).subscribe(
          result => {
            Swal.close();
            Swal.fire('Sucesso', 'Segmento cadastrado com sucesso', 'success').then(
              result => {
                if (result['value']) {
                  this.router.navigate(['/listar-segmentos']);
                }
              },
              error => {
                Swal.close();
                Swal.fire('Erro!', error, 'error');
              }
            )
          },
          error => {
            Swal.close();
            Swal.fire('Erro!', error, 'error');
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Atenção!', error.toString(), 'warning');
      }
    )
  }

  atualizarSegmento = () => {
    Swal.showLoading();
    var obj = this.segmento;
    this.service.Put(`segment/${this.segmento_uuid}`, obj).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso', 'Segmento atualizado com sucesso', 'success').then(
          result => {
            if (result['value']) {
              this.router.navigate(['/listar-segmentos']);
            }
          },
          error => {
            Swal.close();
            Swal.fire('Erro!', error, 'error');
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error');
      }
    )
  }

  mudaStatusSegmento = () => {
    this.segmento.status = !this.segmento.status
  }

  validaCampos = () => {
    return new Promise((resolve, reject) => {
      if(!this.segmento.nome){
        reject('É preciso informar um nome para o segmento')
      }
      if(!this.segmento.status){
        reject('É preciso informar um status para o segmento')
      }
      resolve('Dados informados corretamente')
    })
  }

}
