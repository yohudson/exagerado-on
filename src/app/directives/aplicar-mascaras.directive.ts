import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[aplicarMascaras]'
})
export class AplicarMascarasDirective {

  constructor(
    private element: ElementRef
  ) { }

  @HostListener("keyup") onKeyUp() {
    const input = this.element.nativeElement;
    input.value = input.value.replace(/\D/g, "");
    if (input.id.toUpperCase().includes("CEP")) {
      input.value = input.value.replace(/^(\d{2})(\d)/g, "$1.$2");
      input.value = input.value.replace(/(\d)(\d{3})$/, "$1-$2");
      input.setAttribute("maxlength", 10);
    }
    if (input.id.toUpperCase().includes("CNPJ")) {
      input.value = input.value.replace(/(\d{2})(\d)/, "$1.$2");
      input.value = input.value.replace(/(\d{3})(\d)/, "$1.$2");
      input.value = input.value.replace(/(\d{3})(\d)/, "$1/$2");
      input.value = input.value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
      input.setAttribute("maxlength", 18);
    }
    if (input.id.toUpperCase().includes("PHONE") ||
      input.id.toUpperCase().includes("CEL") ||
      input.id.toUpperCase().includes("TEL")) {
      input.value = input.value.replace(/^(\d{2})(\d)/g, "($1) $2");
      input.value = input.value.replace(/(\d)(\d{4})$/, "$1-$2");
      input.setAttribute("maxlength", 15);
    }
    if (input.id.toUpperCase().includes("CPF")) {
      input.value = input.value.replace(/(\d{3})(\d)/, "$1.$2");
      input.value = input.value.replace(/(\d{3})(\d)/, "$1.$2");
      input.value = input.value.replace(/(\d{3})(\d{2})$/, "$1-$2");
      input.setAttribute("maxlength", 14);
    }
    if (input.id.toUpperCase().includes("CNS")) {
      input.value = input.value.replace(/(\d{3})(\d)/, "$1 $2");
      input.value = input.value.replace(/(\d{4})(\d)/, "$1 $2");
      input.value = input.value.replace(/(\d{4})(\d{4})$/, "$1 $2");
      input.setAttribute("maxlength", 18);
    }
    if (input.id.toUpperCase().includes("NUMBER") ||
        input.id.toUpperCase().includes("NUM") ||
        input.id.toUpperCase().includes("CODE")) {
      input.setAttribute("maxlength", 6);
    }
    if (input.id.toUpperCase().includes("CNES")) {
      input.setAttribute("maxlength", 7);
    }
    if (input.id.toUpperCase().includes("DATE") ||
        input.id.toUpperCase().includes("DATA") ||
        input.id.toUpperCase().includes("DAY")) {
      input.value = input.value.replace(/(\d{2})(\d)/, "$1/$2");
      input.value = input.value.replace(/(\d{2})(\d{4})$/, "$1/$2");
      input.setAttribute("maxlength", 10);
    }
  }

}
