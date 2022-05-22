import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-listar-atracao',
  templateUrl: './listar-atracao.component.html',
  styleUrls: ['./listar-atracao.component.css']
})
export class ListarAtracaoComponent implements OnInit {

  listaAtracoes: any = [];
  temAtracao: boolean = false;

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterListaAtracoes();
  }

  obterListaAtracoes = () => {
    Swal.showLoading();
    this.service.Get(`attractions`).subscribe(
      result => {
        this.listaAtracoes = result;
        Swal.close()
        this.temAtracao = true;
      }
    )
  }

  alterarStatusAtracao = (atracao:any) => {
    Swal.showLoading
    atracao.status = !atracao.status;
    this.service.Put(`attraction/${atracao.atracao_uuid}`, atracao).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Status de atração alterado com sucesso', 'success').then(
          result => {
            this.obterListaAtracoes();
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error')
      }
    )
  }

}
