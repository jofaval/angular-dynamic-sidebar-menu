import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlListComponent } from './ul-list.component';

describe('UlListComponent', () => {
  let component: UlListComponent;
  let fixture: ComponentFixture<UlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UlListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
