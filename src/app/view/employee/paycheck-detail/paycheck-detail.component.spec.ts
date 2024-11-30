import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycheckDetailComponent } from './paycheck-detail.component';

describe('PaycheckDetailComponent', () => {
  let component: PaycheckDetailComponent;
  let fixture: ComponentFixture<PaycheckDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaycheckDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaycheckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
