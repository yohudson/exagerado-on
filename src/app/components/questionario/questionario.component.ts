import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  @Output() passo = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  
  proximoPasso = (value: number) => {
    this.passo.emit(value)
  }


}
