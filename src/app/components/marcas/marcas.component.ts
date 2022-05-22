import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  listaMarcas: any = [];
  marcasFavoritas: any = []
  marcaSelecionada: any = '';

  @Output() passo = new EventEmitter<number>();
  constructor(
    private service: ApiService,
    public global: Global,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obterListaMarcas();
  }

  obterListaMarcas = () => {
    this.service.Get(`brands`).subscribe(
      result => {
        this.listaMarcas = result
      }
    )
  }

  addFavoritas = (f:any) =>{
    var marca = f.target.value;
    for (let item of this.listaMarcas) {
      if (marca.toUpperCase() === item.nome.toUpperCase()){
        var index = this.marcasFavoritas.indexOf(marca)
        if (index == '-1'){
          this.marcasFavoritas.push(marca)
        }
        else return
      }
    }
    
  }
  
  removerFavorita = (m: any)=>{
    var x = this.marcasFavoritas.indexOf(m);
    this.marcasFavoritas.splice(x, 1); 
  }

  salvarFavoritos = () => {
    var obj:any = {};
    this.listaIds(obj).then(
      result => {
        obj.lista_marcas = result;
        obj.user_uuid = this.global.usuario.user_uuid;
        this.manterFavoritos(obj).then(
          result => {
            Swal.close;
            Swal.fire('Sucesso!', 'Favoritos foram enviados com sucesso!', 'success').then(
              result => {
                if (result['value']) {
                  this.router.navigate(['/login']);
                }
              }
            )
          },
          error => {
            Swal.close();
            Swal.fire('Erro!', error.toString(), 'error');
          }
        )
      },
      error => {
        Swal.close();
            Swal.fire('Erro!', error.toString(), 'error');
      }
    )  
  }

  buscaMarca = (marca:any) => {
    return new Promise((resolve, reject) => {
      for (let item of this.listaMarcas) {
        if (marca === item.nome){
          resolve(item.marca_uuid)
        }
        else reject
      }
    })
  }

  manterFavoritos = (obj:any) => {
    return new Promise((resolve, reject) => {
      this.service.Post(`favorites`,obj).subscribe(
        result => {
          resolve('Favoritos foram enviados com sucesso!')
        },
        error => {
          reject('Falha ao enviar os favoritos!')
        }
      )
    })
  }

  listaIds = (obj:any) => {
    return new Promise((resolve, reject) => {
      var lista_marcas: any = []
      for (let item of this.marcasFavoritas){
        this.buscaMarca(item).then(
          result => {
            lista_marcas.push(result);
          },
          error => {
            reject('Falha ao listar as marcas')
          }
        )
      }
      resolve(lista_marcas);
    })
  }
  
  proximoPasso = (value: number) => {
    this.passo.emit(value)
  }

}
