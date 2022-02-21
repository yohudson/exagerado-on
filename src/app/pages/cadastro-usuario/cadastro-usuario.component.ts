import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  passo: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  proximaEtapa = (val: any) =>{
    this.passo = val;
  }

}
