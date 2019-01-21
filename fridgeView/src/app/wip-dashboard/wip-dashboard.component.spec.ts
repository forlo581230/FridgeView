import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipDashboardComponent } from './wip-dashboard.component';

describe('WipDashboardComponent', () => {
  let component: WipDashboardComponent;
  let fixture: ComponentFixture<WipDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
