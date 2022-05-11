import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSegmentoComponent } from './cadastro-segmento.component';

describe('CadastroSegmentoComponent', () => {
  let component: CadastroSegmentoComponent;
  let fixture: ComponentFixture<CadastroSegmentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroSegmentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSegmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
