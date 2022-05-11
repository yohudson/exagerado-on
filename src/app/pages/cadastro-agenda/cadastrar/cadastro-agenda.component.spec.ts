import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgendaComponent } from './cadastro-agenda.component';

describe('CadastroAgendaComponent', () => {
  let component: CadastroAgendaComponent;
  let fixture: ComponentFixture<CadastroAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
