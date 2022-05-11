import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAtracaoComponent } from './cadastrar-atracao.component';

describe('CadastrarAtracaoComponent', () => {
  let component: CadastrarAtracaoComponent;
  let fixture: ComponentFixture<CadastrarAtracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarAtracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAtracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
