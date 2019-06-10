import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrowingComponent } from './add-growing.component';

describe('AddGrowingComponent', () => {
  let component: AddGrowingComponent;
  let fixture: ComponentFixture<AddGrowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGrowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
