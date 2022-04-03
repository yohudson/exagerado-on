import { Injectable } from "@angular/core";

@Injectable()
export class Global {
  nav: boolean = false;
  displayMenu: boolean = false;
  usuario: any = {}

  constructor() {}

  aplicarMascara = (value: any) => {
    if (value.cep) {
      value.cep = value.cep.replace(/^(\d{2})(\d)/g, "$1.$2");
      value.cep = value.cep.replace(/(\d)(\d{3})$/, "$1-$2");
    }
    if (value.cnpj) {
      value.cnpj = value.cnpj.replace(/(\d{2})(\d)/, "$1.$2");
      value.cnpj = value.cnpj.replace(/(\d{3})(\d)/, "$1.$2");
      value.cnpj = value.cnpj.replace(/(\d{3})(\d)/, "$1/$2");
      value.cnpj = value.cnpj.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    if (value.phone) {
      value.phone = value.phone.replace(/^(\d{2})(\d)/g, "($1) $2");
      value.phone = value.phone.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    if (value.telefone) {
      value.telefone = value.telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
      value.telefone = value.telefone.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    if (value.cel) {
      value.cel = value.cel.replace(/^(\d{2})(\d)/g, "($1) $2");
      value.cel = value.cel.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    if (value.tel) {
      value.tel = value.tel.replace(/^(\d{2})(\d)/g, "($1) $2");
      value.tel = value.tel.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    if (value.cpf) {
      value.cpf = value.cpf.replace(/(\d{3})(\d)/, "$1.$2");
      value.cpf = value.cpf.replace(/(\d{3})(\d)/, "$1.$2");
      value.cpf = value.cpf.replace(/(\d{3})(\d{2})$/, "$1-$2");
    }
    if (value.cns) {
      value.cns = value.cns.replace(/(\d{3})(\d)/, "$1 $2");
      value.cns = value.cns.replace(/(\d{4})(\d)/, "$1 $2");
      value.cns = value.cns.replace(/(\d{4})(\d{4})$/, "$1 $2");
    }
    if (value.date) {
      value.date = value.date.replace(/(\d{2})(\d)/, "$1/$2");
      value.date = value.date.replace(/(\d{2})(\d{4})$/, "$1/$2");
    }
  };
}