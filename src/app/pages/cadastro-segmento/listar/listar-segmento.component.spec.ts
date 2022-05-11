import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSegmentoComponent } from './listar-segmento.component';

describe('ListarSegmentoComponent', () => {
  let component: ListarSegmentoComponent;
  let fixture: ComponentFixture<ListarSegmentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSegmentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSegmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
