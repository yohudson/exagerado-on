import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAgendaComponent } from './listar-agenda.component';

describe('ListarAgendaComponent', () => {
  let component: ListarAgendaComponent;
  let fixture: ComponentFixture<ListarAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
