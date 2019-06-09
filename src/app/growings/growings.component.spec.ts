import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowingsComponent } from './growings.component';

describe('GrowingsComponent', () => {
  let component: GrowingsComponent;
  let fixture: ComponentFixture<GrowingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
