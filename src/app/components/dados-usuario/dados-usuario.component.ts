import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {

  usuario: any = {}
  listaGeneros: any = [];
  loading: boolean = false;

  @Output() passo = new EventEmitter<number>();
  constructor(
    private service: ApiService,
    public global: Global
  ) { }

  ngOnInit(): void {
    this.obterGeneros()
  }

  proximoPasso = (value: number) => {
    Swal.showLoading()
    this.validaCadastro().then(
      result => {
        Swal.close();
        //this.converteSenha(this.usuario).then(
        //  result => {
        const obj:any = {};
        Object.assign(obj, this.usuario);
        this.comparaSenha(this.usuario.senha, this.usuario.confirma_senha).then(
          result =>{
            if (obj.celular) {
              obj.celular = obj.celular.replace(/\D/g,'')
            }
            delete obj.confirmar_senha
            this.salvarDados(obj).then(
              result => {
                this.loading = false;
                this.global.usuario = result;
                Swal.fire('Sucesso', 'Dados cadastrados com sucesso!', 'success').then(
                  result => {
                    if (result['value']==true){
                      this.passo.emit(value)
                    }
                  },
                  error => {
                    Swal.close();        
                    Swal.fire('Atenção', error.toString(), 'warning')
                  }
                )
              },
              error => {
                console.log(error)
                this.loading = false;
                Swal.fire('Erro', error.toString(), 'error')
              }
            )
          },
          error => {
            console.log(error)
            this.loading = false;
            Swal.fire('Atenção', error.toString(), 'warning')
          }
        //)
        //  },
        //  error => {
        //     console.log(error)
        //  Swal.hideLoading()
        //   Swal.fire('Atenção', error.toString(), 'warning')
        //}
        )
      },
      error => {
        console.log(error)
        Swal.fire('Atenção', error.toString(), 'warning')
      }
    )
  }

  obterGeneros = () => {
    this.service.Get(`genders`).subscribe(
      result => {
        this.listaGeneros = result
        this.listaGeneros.unshift({genero_id:0,nome:'SELECIONE..'})
      }
    )
  }

  validaCadastro = () => {
    return new Promise((resolve, reject) => {
      if (!this.usuario['nome']) {
        reject('É preciso informar o nome completo')
        return
      }
      if (!this.usuario['celular']) {
        reject('É preciso informar o seu número de celular')
        return
      }
      if (!this.usuario['email']) {
        reject('É preciso informar seu e-mail')
        return
      }
      if (!this.usuario['data_nascimento']) {
        reject('É preciso informar a data de nascimento')
        return
      }
      if (!this.usuario['senha']) {
        reject('É preciso digitar uma senha')
        return
      }
      if (!this.usuario['confirma_senha']) {
        reject('É preciso confirmar a senha')
        return
      }
      else {
        resolve('Dados completos')
      }
    })
  }

  comparaSenha = (senha:string, confirma:string) => {
    return new Promise((resolve, reject) => {
      if (senha === confirma) {
        resolve('Senhas iguais')
      }
      else {
        reject('As senhas não são iguais')
      }
    })
  }

  converteSenha = () => {
    var listaSenhas: any = {}
    Object.assign(listaSenhas.senha, this.usuario.senha)
    Object.assign(listaSenhas.confirma, this.usuario.confirma_senha)
    return new Promise((resolve, reject) => {
      //converter a senha para hash
      var converte;
      if (converte){
        resolve(listaSenhas)
      }
      else {
        reject('Não foi possível converter a senha')
      }
    })
  }

  salvarDados = (obj:any) => {
    return new Promise((resolve, reject) => {
      this.service.Post(`users`, obj).subscribe(
        result => {
          resolve(result)
        },
        error => {
          reject('Não foi possível cadastrar o usuário');
        }
      )

    })
  }

  irQuestionario = (value:any) => {
    this.passo.emit(value)
  }

}
