import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuQuestionarioComponent } from './meu-questionario.component';

describe('MeuQuestionarioComponent', () => {
  let component: MeuQuestionarioComponent;
  let fixture: ComponentFixture<MeuQuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuQuestionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuQuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
