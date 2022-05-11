import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-cadastrar-atracao',
  templateUrl: './cadastrar-atracao.component.html',
  styleUrls: ['./cadastrar-atracao.component.css']
})
export class CadastrarAtracaoComponent implements OnInit {

  atracao: any = {};
  editarAtracao: boolean = false;
  atracao_uuid: string = '';

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.atracao.status = true;
    this.obterDadosAtracao();
  }

  obterDadosAtracao = () => {
      this.atracao_uuid = this.route.snapshot.paramMap.get("uuid") || '';
      this.route.queryParams.subscribe(
        params => {
          if(Object.keys(params).length > 0){
            this.editarAtracao = true;
            this.atracao.atracao_nome = params['nome'];
            this.atracao.nome_contato = params['responsavel'];
            this.atracao.telefone_contato = params['telefone'];
            this.atracao.email_contato = params['email'];
            this.atracao.atracao_uuid = params['uuid'];
            if (params['status'] == "false"){
              this.atracao.status = false;
            }
          }
          else {
            this.editarAtracao = false;
          }
        }
      )
  }

  mudaStatusAtracao = () => {
    this.atracao.status = !this.atracao.status
  }

  salvarAtracao = () => {
    var obj:any = {};
    Object.assign(obj, this.atracao);
    this.service.Post(`attraction`, obj).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Atração cadastrada com sucesso', 'success').then(
          result => {
            if (result){
              this.router.navigate(['/listar-atracoes']);
            }
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error');
      }
    )
  }

  atualizarAtracao = () => {
    var obj:any = {};
    Object.assign(obj, this.atracao);
    this.service.Put(`attraction/${this.atracao_uuid}`, obj).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Atração editada com sucesso', 'success').then(
          result => {
            if (result){
              this.router.navigate(['/listar-atracoes']);
            }
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
