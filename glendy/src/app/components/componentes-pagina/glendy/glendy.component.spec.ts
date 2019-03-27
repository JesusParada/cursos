import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlendyComponent } from './glendy.component';

describe('GlendyComponent', () => {
  let component: GlendyComponent;
  let fixture: ComponentFixture<GlendyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlendyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlendyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
