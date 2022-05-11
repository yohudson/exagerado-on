import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  listaAtracoes: any = [];
  exibirAtracoes: any = [];
  diasAgenda: any = [];
  indexNav: any = 0;

  constructor(
    private service: ApiService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    Swal.showLoading()
    this.obterAgenda()
  }
  
  obterAgenda(): void {
    this.service.Get(`agenda`).subscribe(
      result =>{
        this.listaAtracoes = result;
        //Object.assign(this.exibirAtracoes, this.listaAtracoes);
        this.obterDatas().then(
          result => {
            this.filtrarDatas().then(
              result => {
                Swal.close()
              },
              error => {
                Swal.close();
                Swal.fire('Atenção!', 'Há um problema com as datas dos eventos', 'warning');
              }
            )
          },
          error => {
            Swal.close();
            Swal.fire('Atenção!', 'Houve um problema ao carregar a agenda de eventos', 'warning');
          }
        )
      },
      error => {
        Swal.close();
        Swal.fire('Erro!', 'Não foi possível carregar a agenda de eventos', 'error');
      }
    )
  }

  obterDatas = () => {
    return new Promise((resolve, reject) => {
      var datas:any = [];
      var dias:any = []
      this.listaAtracoes.forEach( (atracao:any) => {
        datas.push(atracao.data_hora_inicio.split("T")[0])
      })
      for (let dia of datas){
        dia = dia.split("-")[2]+'/'+dia.split("-")[1]+'/'+dia.split("-")[0]
        dias.push(dia)
      }
      //console.log(dias)
      this.diasAgenda = [... new Set(dias)]
      this.diasAgenda.sort()
      if (this.diasAgenda.length == 0) {
        reject('Datas não puderam ser ajustadas')
        return
      }
      for (let atracao of this.listaAtracoes){
        atracao.data_inicio = atracao.data_hora_inicio.split("T")[0]
        atracao.data_inicio = atracao.data_inicio.split("-")[2]+'/'+atracao.data_inicio.split("-")[1]+'/'+atracao.data_inicio.split("-")[0]
        atracao.hora_inicio = atracao.data_hora_inicio.split("T")[1]
        atracao.data_fim = atracao.data_hora_fim.split("T")[0]
        atracao.data_fim = atracao.data_fim.split("-")[2]+'/'+atracao.data_fim.split("-")[1]+'/'+atracao.data_fim.split("-")[0]
        atracao.hora_fim = atracao.data_hora_fim.split("T")[1]
      }
      resolve('Datas ajustadas com sucesso')
    })
  }

  mudarData = (e:any) => {
    Swal.showLoading();
      if (e.type == 'click'){
        this.exibirAtracoes = []
        var novaData = e.srcElement.text;
        var idBtn = parseInt(e.target.parentElement.id);
        this.indexNav = idBtn;
        for (let atracao of this.listaAtracoes){
          if (atracao.data_inicio === novaData) {
            this.exibirAtracoes.push(atracao)
          }
        }
        Swal.close()
      }
  }

  filtrarDatas = () => {
    return new Promise((resolve, reject) => {
      Swal.showLoading();
      var data = this.diasAgenda[0];
      this.exibirAtracoes = []
      for (let atracao of this.listaAtracoes) {
        if (atracao.data_inicio === data) {
          this.exibirAtracoes.push(atracao);
        }
      }
      Swal.close()
      resolve('ok')
    })
  }

}
