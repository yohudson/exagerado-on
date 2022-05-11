import { Injectable } from "@angular/core";

@Injectable()
export class Global {
  nav: boolean = false;
  displayMenu: boolean = false;
  usuario: any = {}

  constructor() {}

  aplicarMascara = (value: any) => {
    return new Promise((resolve, reject) => {
      //for (let objeto of Object.values(value)){
        //console.log(objeto)
        for (let item of Object.entries(value)){
          //console.log(item[0])
          if (item.includes('cep')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/^(\d{2})(\d)/g, "$1.$2");
            item[1] = text.replace(/(\d)(\d{3})$/, "$1-$2");
            resolve(item[1])
          }
          if (item.includes('cnpj')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/(\d{2})(\d)/, "$1.$2");
            item[1] = text.replace(/(\d{3})(\d)/, "$1.$2");
            item[1] = text.replace(/(\d{3})(\d)/, "$1/$2");
            item[1] = text.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
            resolve(item[1])
          }
          if (item.includes('phone')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/^(\d{2})(\d)/g, "($1) $2");
            item[1] = text.replace(/(\d)(\d{4})$/, "$1-$2");
            resolve(item[1])
          }
          if (item.includes('telefone')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/^(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
            //item[1] = text.replace(/(\d)(\d{4})$/, "$1-$2");
            resolve(item[1])
          }
          if (item[0].includes('cel')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/^(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
            //item[1] = text.replace(/(\d)(\d{4})$/, "$1-$2");
            resolve(item[1])
          }
          if (item[0].includes('tel')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/^(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
            //item[1] = text.replace(/(\d)(\d{4})$/, "$1-$2");
            resolve(item[1])
          }
          if (item.includes('cpf')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/(\d{3})(\d)/, "$1.$2");
            item[1] = text.replace(/(\d{3})(\d)/, "$1.$2");
            item[1] = text.replace(/(\d{3})(\d{2})$/, "$1-$2");
            resolve(item[1])
          }
          if (item.includes('cns')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/(\d{3})(\d)/, "$1 $2");
            item[1] = text.replace(/(\d{4})(\d)/, "$1 $2");
            item[1] = text.replace(/(\d{4})(\d{4})$/, "$1 $2");
            resolve(item[1])
          }
          if (item.includes('date')) {
            var text: any = '';
            text = item[1]
            item[1] = text.replace(/(\d{2})(\d)/, "$1/$2");
            item[1] = text.replace(/(\d{2})(\d{4})$/, "$1/$2");
            resolve(item[1])
          }
        }
      //}
    })
  };
}