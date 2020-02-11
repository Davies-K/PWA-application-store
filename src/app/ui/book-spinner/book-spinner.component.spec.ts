import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSpinnerComponent } from './book-spinner.component';

describe('BookSpinnerComponent', () => {
  let component: BookSpinnerComponent;
  let fixture: ComponentFixture<BookSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
