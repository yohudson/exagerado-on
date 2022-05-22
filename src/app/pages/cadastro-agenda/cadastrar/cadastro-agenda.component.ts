import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-cadastro-agenda',
  templateUrl: './cadastro-agenda.component.html',
  styleUrls: ['./cadastro-agenda.component.css']
})
export class CadastroAgendaComponent implements OnInit {

  agenda: any = {};
  editarAgenda: boolean = false;
  agenda_uuid: string = '';
  listaAtracoes: any = [];
  atracaoSelecionada: string = '';
  data_inicio:any = '';
  data_inicio_string:any = '';
  hora_inicio_string:any = '';
  hora_inicio:any = '';
  hora_fim_string:any = '';
  hora_fim:any = '';
  local: any = ''
  descricao: any = ''

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.agenda.status = false;
    this.obterDadosAgenda().then(
      result => {
        this.obterListaAtracoes();
      }
    )
  }

  obterDadosAgenda = () => {
    return new Promise((resolve) => {
          this.agenda_uuid = this.route.snapshot.paramMap.get("uuid") || '';
          this.route.queryParams.subscribe(
            params => {
              if(Object.keys(params).length > 0){
                this.editarAgenda = true;
                this.agenda.uuid = params['uuid'];
                this.agenda.atracao_nome = params['atracao_nome'];
                this.agenda.atracao_uuid = params['atracao_uuid'];
                var data_hora_inicio = params['inicio'];
                var data_hora_fim = params['fim'];
                this.agenda.local = params['local'];
                this.agenda.descricao = params['descricao'];

                var data = data_hora_inicio.split(' ')[0]
                var hora_inicio = data_hora_inicio.split(' ')[1]
                var hora_fim = data_hora_fim.split(' ')[1]

                this.data_inicio_string = data
                this.hora_inicio_string = hora_inicio;
                this.hora_fim_string = hora_fim;

                resolve(true)
              }
              else {
                this.editarAgenda = false;
                resolve(true)
              }
            }
          )
    })
  }

  obterListaAtracoes = () =>{
    this.service.Get(`attractions`).subscribe(
      result => {
        Swal.close();
        this.listaAtracoes = result;
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error');
      }
    )
  }

  mudaStatusAgenda = () => {
    this.agenda.status = !this.agenda.status
  }

  salvarAgenda = () => {
    Swal.showLoading()
    var obj:any = {};
    Object.assign(obj, this.agenda);
    this.validaCampos().then(
      result => {
        this.service.Post(`agenda`, obj).subscribe(
          result => {
            Swal.close();
            Swal.fire('Sucesso!', 'Atração agendada com sucesso', 'success').then(
              result => {
                if (result){
                  this.router.navigate(['/listar-agenda']);
                }
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
        Swal.fire('Erro!', error, 'error');
      }
    )
  }

  atualizarAgenda = () => {
    var obj:any = {};
    Object.assign(obj, this.agenda);
    this.service.Put(`agenda/${obj.uuid}`, obj).subscribe(
      result => {
        Swal.close();
        Swal.fire('Sucesso!', 'Atração editada com sucesso', 'success').then(
          result => {
            if (result){
              this.router.navigate(['/listar-agenda']);
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

  addAtracao = (atracao:any) => {
    this.agenda.atracao_nome = atracao.target.value
    for (let item of this.listaAtracoes){
      if (item.atracao_nome === this.agenda.atracao_nome){
        this.agenda.atracao_uuid = item.atracao_uuid
      }
    }
  }

  addPeriodo = () => {
    this.data_inicio_string = '';
    this.hora_fim_string = '';

    this.data_inicio_string = this.data_inicio.split('-')[2]+'/'+this.data_inicio.split('-')[1]+'/'+this.data_inicio.split('-')[0]

    this.agenda.data_hora_inicio = this.data_inicio + 'T' +this.hora_inicio
    this.agenda.data_hora_fim = this.data_inicio + 'T' +this.hora_fim
    this.hora_inicio_string  = this.hora_inicio;
    this.hora_fim_string = this.hora_fim;
  }

  addLocal = () => {
    this.agenda.local = this.local
  }
  
  addDescricao = () => {
    this.agenda.descricao = this.descricao
  }

  validaCampos = () => {
    return new Promise((resolve, reject) => {
      if (this.agenda.status == null){
        reject('É preciso informar se a atração foi confirmada ou não')
      }
      if (!this.agenda.atracao_nome){
        reject('É preciso informar uma atração')
      }
      // if (!this.data_inicio){
      //   reject('É preciso informar uma data')
      // }
      // if (!this.hora_inicio){
      //   reject('É preciso informar uma hora de início')
      // }
      // if (!this.hora_fim){
      //   reject('É preciso informar uma hora de fim')
      // }
      if (!this.agenda.data_hora_inicio){
        reject('É preciso informar uma data e hora de início')
      }
      if (!this.agenda.data_hora_fim){
        reject('É preciso informar uma data e hora de fim')
      }
      if (!this.agenda.local){
        reject('É preciso informar o local de apresentação da atração')
      }
      resolve('Dados conferidos')
    })
  }

}
