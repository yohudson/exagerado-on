import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-listar-loja',
  templateUrl: './listar-loja.component.html',
  styleUrls: ['./listar-loja.component.css']
})
export class ListarLojaComponent implements OnInit {

  listaLojas: any = [];
  temLojas: boolean = false;

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterListaLojas();
  }

  obterListaLojas = () => {
    Swal.showLoading();
    this.service.Get(`stores`).subscribe(
      result => {
        this.listaLojas = result;
        Swal.close()
        this.temLojas = true;
      }
    )
  }

  alterarStatusLojas = (loja:any) => {}

}
