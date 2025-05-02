import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsDisplayComponent } from './wallets-display.component';

describe('WalletsDisplayComponent', () => {
  let component: WalletsDisplayComponent;
  let fixture: ComponentFixture<WalletsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
