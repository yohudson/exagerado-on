import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {


  @Output() passo = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  proximoPasso = (value: number) => {
    this.passo.emit(value)
  }

}
