import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../service/api.service"
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexLegend,
  ApexPlotOptions
} from "ng-apexcharts";
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";

export type BarChart = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions;
};

export type DonutChart = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  fill: ApexFill | any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels | any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @ViewChild("bar", { static: false }) bar!: ChartComponent;
  public faixaEtariaFrequentadores!: Partial<BarChart>;
  @ViewChild("donut") donut!: ChartComponent;
  public marcaSegmento!: Partial<DonutChart>;
  @ViewChild("genero") genero!: ChartComponent;
  public graficoGenero!: Partial<DonutChart>;
  @ViewChild("favoritos") favoritos!: ChartComponent;
  public graficoMarcasFavoritas!: Partial<DonutChart>;  
  @ViewChild("conheceEvento") conheceEvento!: ChartComponent;
  public graficoConheceEvento!: Partial<DonutChart>;

  //lojas e segmentos
  numeroLojas: any = '';
  listaSegmentos:any = [];
  listaLojas:any = [];
  lojasSegmento:any = [];
  numeroLojasSegmento:any = [];
  //Usuários por gênero
  totalUsuarios:any = []
  listaUsuarios:any = []
  usuariosGenero:any = []
  numeroUsuariosGenero:any = []
  listaGeneros:any = []
  listaGenerosUsuarios:any = []
  faixaEtaria:any = []
  listaFaixas:any = []
  valoresEtarios:any = []
  //Marcas favoritas
  marcasCadastradas: any = []
  listaFavoritas: any = []
  legendaFavoritas: any = []
  totalFavoritas:any = []
  //Conhece evento
  usuariosConhecemEvento: any = []
  respostasQuiz: any = []
  
  
  constructor(
    private service: ApiService,
    public authService: AuthService
  ) { }

  ngOnInit():void {
    Swal.showLoading();
    this.obterDadosGrafico()
  }
  
  obterDadosGrafico = () => {
    this.obterLojas().then(
      result => {
        var obj:any = result;
        this.listaLojas = obj;
        this.numeroLojas = obj.length;
        this.obterSegmentos().then(
          result => {
            var seg: any = result;
            for (let s of seg){
              this.listaSegmentos.push(s.nome);
              for (let l of this.listaLojas){
                for (let segmento of l.lista_segmentos){
                  if (segmento === s.segmento_uuid){
                    this.lojasSegmento.push(s.nome);
                  }
                }
              }
            }
            const map = this.lojasSegmento.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map());            
            this.numeroLojasSegmento = [...map.values()]
            this.obterUsuarios().then(
              result => {
                this.listaUsuarios = result;
                var index:any = 0;
                this.faixaEtaria[0] = 0;
                this.faixaEtaria[1] = 0;
                this.faixaEtaria[2] = 0;
                this.faixaEtaria[3] = 0;
                this.faixaEtaria[4] = 0;
                this.faixaEtaria[5] = 0;
                this.faixaEtaria[6] = 0;
                this.faixaEtaria[7] = 0;
                this.faixaEtaria[8] = 0;
                for(let usuario of this.listaUsuarios){
                  if (usuario.perfil_id == 2){
                    index += 1;
                    if (usuario.data_nascimento) {
                      var data = usuario.data_nascimento.split("T")[0];
                      var today = new Date();
                      var hoje = today.toISOString()
                      hoje = hoje.split("T")[0]
                      var anos = parseInt(hoje.split("-")[0]) - data.split("-")[0]
                      if (anos < 18){
                        this.faixaEtaria[0] += 1
                      }
                      if (anos >= 18 && anos <= 24){
                        this.faixaEtaria[1] += 1
                      }
                      if (anos > 24 && anos <= 29){
                        this.faixaEtaria[2] += 1
                      }
                      if (anos > 29 && anos <= 39){
                        this.faixaEtaria[3] += 1
                      }
                      if (anos > 39 && anos <= 49){
                        this.faixaEtaria[4] += 1
                      }
                      if (anos > 49 && anos <= 59){
                        this.faixaEtaria[5] += 1
                      }
                      if (anos > 59 && anos <= 64){
                        this.faixaEtaria[6] += 1
                      }
                      if (anos > 64){
                        this.faixaEtaria[7] += 1
                      }
                    }
                    else {
                      this.faixaEtaria[8] += 1;
                    }                    
                  }
                }
                const map = this.faixaEtaria.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

                this.valoresEtarios = [...map.values()]

                this.listaFaixas.push('menor de 18')
                this.listaFaixas.push('de 18 a 24')
                this.listaFaixas.push('de 25 a 29')
                this.listaFaixas.push('de 30 a 39')
                this.listaFaixas.push('de 40 a 49')
                this.listaFaixas.push('de 50 a 59')
                this.listaFaixas.push('de 60 a 64')
                this.listaFaixas.push('acima de 65')
                this.listaFaixas.push('não informado')

                this.totalUsuarios = index;
                this.obterGeneros().then(
                  result => {
                    this.listaGeneros = result
                    for (let genero of this.listaGeneros){
                      for (let usuario of this.listaUsuarios){
                        if(usuario.perfil_id == 2){
                          if (usuario.genero === genero.genero_id){
                            this.usuariosGenero.push(genero.nome)
                          }
                        }
                      }
                    }
                    const map = this.usuariosGenero.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                    this.numeroUsuariosGenero = [...map.values()]
                    this.listaGenerosUsuarios = [...map.keys()]
                    this.obterMarcas().then(
                      result => {
                        this.marcasCadastradas = result;
                        this.obterMarcasFavoritas().then(
                          result => {
                            this.obterQuiz().then(
                              result =>{
                                var quiz: any = result;
                                for (let q of quiz){
                                  if (q){
                                    this.respostasQuiz.push('Sim');
                                  }
                                  else{
                                    this.respostasQuiz.push('Não');
                                  }
                                }
                                const map = this.respostasQuiz.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map());            
                                this.usuariosConhecemEvento = [...map.values()]

                                this.gerarGraficos();
                                Swal.close()
                              },
                              error => {
                                this.emiteErro(error)
                              }
                            )
                          },
                          error => {
                            this.emiteErro(error)
                          }
                        )
                      },
                      error => {
                        this.emiteErro(error)
                      }
                    )
                  },
                  error => {
                    this.emiteErro(error)
                  }
                )
              },
              error => {
                this.emiteErro(error)
              }
            )
          },
          error => {
            this.emiteErro(error)
          }
        )
      },
      error => {
        this.emiteErro(error)
      }
    )
  }

  emiteErro = (err:any) => {
    Swal.close();
    Swal.fire('Erro!', err, 'error')
  }

  obterLojas = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`stores`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
  obterSegmentos = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`segments`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
  obterUsuarios = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`users`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
  obterGeneros = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`genders`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
  gerarGraficos = () => {
    this.faixaEtariaFrequentadores = {
      series: [
        {
          data: this.faixaEtaria,
          name: 'Frequentadores'
        }
      ],
      chart: {
        type: "bar",
        height:300
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      title: {
        text: "Faixa etária dos frequentadores",
        align: 'center'
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.listaFaixas
      }
    };

    this.graficoGenero = {
      series: this.numeroUsuariosGenero,
      chart: {
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels:  this.listaGenerosUsuarios,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    
    this.graficoMarcasFavoritas = {
      series: this.totalFavoritas,
      chart: {
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels:  this.legendaFavoritas,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    
    this.marcaSegmento = {
      series: this.numeroLojasSegmento,
      chart: {
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels:  this.lojasSegmento,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    
    this.graficoConheceEvento = {
      series: this.usuariosConhecemEvento,
      chart: {
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels:  this.respostasQuiz,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  obterMarcasFavoritas = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`favorites`).subscribe(
        result => {
          var listaFavoritos = result;
          for (let item of listaFavoritos){
            for (let fav of item.lista_favoritos){
              this.listaFavoritas.push(fav);
            }
          }
          var favoritos: any = [];
          for (let marca of this.marcasCadastradas){
            for (let favorito of this.listaFavoritas){
              if(marca.marca_uuid === favorito){
                favoritos.push(marca.nome)
              }
            }
          }
          const map = favoritos.reduce((acc:any, e:any) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
          this.totalFavoritas = [...map.values()]
          this.legendaFavoritas = [...map.keys()]

          resolve('ok')
        },
        error => {
          reject(error)
        }
      )
    })
  }
  obterMarcas = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`brands`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
  obterQuiz = () => {
    return new Promise((resolve, reject) => {
      this.service.Get(`all-quiz`).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}
