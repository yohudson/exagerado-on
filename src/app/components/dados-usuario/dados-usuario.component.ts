import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Global } from '../../global'

@Component({
  selector: 'app-dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {

  usuario: any = []
  listaGeneros: any = [];

  @Output() passo = new EventEmitter<number>();
  constructor(
    private service: ApiService,
    public global: Global
  ) { }

  ngOnInit(): void {
    this.obterGeneros()
  }

  proximoPasso = (value: number) => {
    console.log(this.usuario)
    //this.validaCadastro(this.usuario).then(
      //result => {
        //this.loading = false;
        //this.converteSenha(this.usuario).then(
        //  result => {
            //this.comparaSenha(this.usuario.senha, this.usuario.confirma_senha).then(
              //result =>{
                //this.salvarDados().then(
                //  result => {
                    //this.loading = false;
                    //console.log(result);
                    this.passo.emit(value)
                //  },
                //  error => {
                //    console.log(error)
                    //this.loading = false;
                    //Swal.fire('Erro', error.toString(), 'error')
                //  }
                //)
              //},
              //error => {
                //console.log(error)
                //this.loading = false;
                //Swal.fire('Atenção', error.toString(), 'warning')
              //}
              //)
        //  },
        //  error => {}
        //)
      //},
      //error => {
      //  console.log(error)
        //this.loading = false;
        //Swal.fire('Atenção', error.toString(), 'warning')
      //}
    //)
  }

  obterGeneros = () => {
    this.service.Get(`/Usuario`).subscribe((result) => {
      console.log(result)
    })
  }

  validaCadastro = (dados: any) => {
    return new Promise((resolve, reject) => {
      if (!dados['nome']) {
        reject('É preciso informar o nome completo')
        return
      }
      if (!dados['celular']) {
        reject('É preciso informar o seu número de celular')
        return
      }
      if (!dados['email']) {
        reject('É preciso informar seu e-mail')
        return
      }
      if (!dados['nome']) {
        reject('É preciso informar a data de nascimento')
        return
      }
      if (!dados['senha']) {
        reject('É preciso digitar uma senha')
        return
      }
      if (!dados['confirma_senha']) {
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
      //converter a senha para MD5
      var converte;
      if (converte){
        resolve(listaSenhas)
      }
      else {
        reject('Não foi possível converter a senha')
      }
    })
  }

  salvarDados = () => {
    return new Promise((resolve, reject) => {
      this.service.Post(`Usuario`, this.usuario).then(
        result => {
          resolve('Dados pessoais cadastrados com sucesso')
        },
        error => {
          reject('Não foi possível cadastrar o usuário');
        }
      )

    })
  }

}
