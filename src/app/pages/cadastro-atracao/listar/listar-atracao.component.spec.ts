import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtracaoComponent } from './listar-atracao.component';

describe('ListarAtracaoComponent', () => {
  let component: ListarAtracaoComponent;
  let fixture: ComponentFixture<ListarAtracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
