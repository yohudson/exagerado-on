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
    this.passo.emit(value)
  }

  obterGeneros = () => {
    this.service.Get(`/Usuario`).subscribe((result) => {
      console.log(result)
    })
  }

}
