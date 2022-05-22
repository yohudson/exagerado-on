import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-listar-segmento',
  templateUrl: './listar-segmento.component.html',
  styleUrls: ['./listar-segmento.component.css']
})
export class ListarSegmentoComponent implements OnInit {

  listaSegmentos: any = [];

  constructor(
    private service: ApiService,
    private router: Router,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterListaSegmentos()
  }

  obterListaSegmentos = () => {
    Swal.showLoading();
    this.service.Get(`segments`).subscribe(
      result => {
        this.listaSegmentos = result;
        Swal.close()
      }
    )
  }

  alterarStatusSegmento = (segmento:any) => {
    segmento.status = !segmento.status;
    Swal.showLoading();
    this.service.Put(`segment/${segmento.segmento_uuid}`, segmento).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso', 'Status do segmento alterado com sucesso', 'success').then(
          result => {
            if (result['value']) {
              this.obterListaSegmentos();
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

}
