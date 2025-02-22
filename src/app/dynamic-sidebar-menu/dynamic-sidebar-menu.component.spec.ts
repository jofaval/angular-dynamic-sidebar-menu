import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSidebarMenuComponent } from './dynamic-sidebar-menu.component';

describe('DynamicSidebarMenuComponent', () => {
  let component: DynamicSidebarMenuComponent;
  let fixture: ComponentFixture<DynamicSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
