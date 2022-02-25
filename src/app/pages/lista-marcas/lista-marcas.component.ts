import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Marca } from '../../models/marca.model';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css']
})
export class ListaMarcasComponent implements OnInit {

  marca = {} as Marca;
  listaMarcas: any = [];

  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.obterMarcas()
  }

  obterMarcas(): void {
    this.service.Get(`/Marcas`).subscribe((marcas: Marca[]) => {
      this.listaMarcas = marcas;
    })
  }

}
