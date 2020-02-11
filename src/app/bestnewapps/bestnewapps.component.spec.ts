import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestnewappsComponent } from './bestnewapps.component';

describe('BestnewappsComponent', () => {
  let component: BestnewappsComponent;
  let fixture: ComponentFixture<BestnewappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestnewappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestnewappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
