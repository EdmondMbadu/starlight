import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularCommunityComponent } from './particular-community.component';

describe('ParticularCommunityComponent', () => {
  let component: ParticularCommunityComponent;
  let fixture: ComponentFixture<ParticularCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularCommunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticularCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
