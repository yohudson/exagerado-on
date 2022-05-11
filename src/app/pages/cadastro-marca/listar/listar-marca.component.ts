import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {

  listaMarcas: any = []

  constructor(
    private service: ApiService,
    private router: Router,
    public global: Global,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.obterListaMarcas();
  }

  obterListaMarcas = () => {
    Swal.showLoading();
    this.service.Get(`brands`).subscribe(
      result => {
        console.log(result)
        this.listaMarcas = result;
        Swal.close()
      }
    )
  }

  alterarStatusMarcas = (marca:any) => {
    marca.status = !marca.status;
    Swal.showLoading();
    console.log(marca)
    this.service.Put(`brand/${marca.marca_uuid}`, marca).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso', 'Status da marca alterado com sucesso', 'success').then(
          result => {
            if (result['value']) {
              this.obterListaMarcas();
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
