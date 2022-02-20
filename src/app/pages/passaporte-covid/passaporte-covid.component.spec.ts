import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassaporteCovidComponent } from './passaporte-covid.component';

describe('PassaporteCovidComponent', () => {
  let component: PassaporteCovidComponent;
  let fixture: ComponentFixture<PassaporteCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassaporteCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassaporteCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
