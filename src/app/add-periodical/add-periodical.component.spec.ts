import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeriodicalComponent } from './add-periodical.component';

describe('AddPeriodicalComponent', () => {
  let component: AddPeriodicalComponent;
  let fixture: ComponentFixture<AddPeriodicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeriodicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeriodicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
