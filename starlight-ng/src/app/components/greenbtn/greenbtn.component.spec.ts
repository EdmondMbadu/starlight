import { ComponentFixture, TestBed } from '@angular/core/testing';

import GreenbtnComponent from './greenbtn.component';

describe('GreenbtnComponent', () => {
  let component: GreenbtnComponent;
  let fixture: ComponentFixture<GreenbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenbtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
