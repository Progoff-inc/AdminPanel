import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrochetComponent } from './add-crochet.component';

describe('AddCrochetComponent', () => {
  let component: AddCrochetComponent;
  let fixture: ComponentFixture<AddCrochetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrochetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrochetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
