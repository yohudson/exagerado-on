import { Component, OnInit } from '@angular/core';
import { Global } from '../../../global';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-listar-agenda',
  templateUrl: './listar-agenda.component.html',
  styleUrls: ['./listar-agenda.component.css']
})
export class ListarAgendaComponent implements OnInit {

  listaAgenda: any = [];
  temAgenda: boolean = false;
  showBoard: boolean = true;
  showLista: boolean = false;

  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.obterListaAgenda();
  }
  
  obterListaAgenda = () => {
    Swal.showLoading();
    this.listaAgenda = []
    this.service.Get(`agenda`).subscribe(
      result => {
        if (result){
          this.listaAgenda = result;
          this.ajustaCampos().then(
            result => {
              this.temAgenda = true;
              Swal.close();
            }, 
            error => {
              this.temAgenda = false;
            }
          )          
        }
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', error, 'error')
      }
    )
  }

  ajustaCampos = () => {
    return new Promise((resolve, reject) => {
      if (Object.keys(this.listaAgenda).length > 0){
        for (let item of this.listaAgenda){
          console.log(item)
          if(item.data_hora_inicio){
            var data = item.data_hora_inicio.split('T')[0]
            data = data.split('-')[2]+'/'+data.split('-')[1]+'/'+data.split('-')[0]
            var hora = item.data_hora_inicio.split('T')[1]
            item.data_hora_inicio = data+' '+hora
          }
          if(item.data_hora_fim){
            var data = item.data_hora_fim.split('T')[0]
            data = data.split('-')[2]+'/'+data.split('-')[1]+'/'+data.split('-')[0]
            var hora = item.data_hora_fim.split('T')[1]
            item.data_hora_fim = data+' '+hora
          }
        }
        resolve('Tudo certo com a agenda')
      }
      else{
        reject('Não há agendas para ajustar')
      }
    })
  }

  mudarVisualizacao = () => {
    this.showBoard = !this.showBoard;
    this.showLista = !this.showLista;
  }

  alteraStatus = (agenda:any) => {
    console.log(agenda)
    Swal.showLoading();
    var obj: any = {};
    Object.assign(obj, agenda)
    obj.status = !obj.status;
    obj.uuid = agenda.agenda_uuid;
    console.log(obj)
    this.padraoServidor(obj).then(
      result => {
        var refresh:any = {};
        refresh = result;
        console.log(refresh)
        this.service.Put(`agenda/${refresh['agenda_uuid']}`, refresh).subscribe(
          result => {
            Swal.close();
            if (refresh.status == true){
              Swal.fire('Sucesso!', 'Programação confirmada com sucesso', 'success').then(
                result => {
                  if(result.isConfirmed){
                    this.obterListaAgenda();
                  }
                }
              )
            }
            if (refresh.status == false){
              Swal.fire('Sucesso!', 'Programação suspensa com sucesso', 'success').then(
                result => {
                  if(result.isConfirmed){
                    this.obterListaAgenda();
                  }
                }
              )
            }
          },
          error => {
            Swal.close()
            Swal.fire('Erro!', error, 'error')
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', 'Não foi possível atualizar os dados', 'error')
      }
    )
    
  }

  padraoServidor = (item:any) => {
    return new Promise((resolve, reject) => {
      if(item.data_hora_inicio){
        var data = item.data_hora_inicio.split(' ')[0]
        data = data.split('/')[2]+'-'+data.split('/')[1]+'-'+data.split('/')[0]
        var hora = item.data_hora_inicio.split(' ')[1]       
        item.data_hora_inicio = data+'T'+hora
      }
      if(item.data_hora_fim){
        var data = item.data_hora_fim.split(' ')[0]
        data = data.split('/')[2]+'-'+data.split('/')[1]+'-'+data.split('/')[0]
        var hora = item.data_hora_fim.split(' ')[1]       
        item.data_hora_fim = data+'T'+hora
      }
      resolve(item)
    })
  }

}
