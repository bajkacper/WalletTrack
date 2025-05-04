import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletComponent } from './add-wallet.component';

describe('AddWalletComponent', () => {
  let component: AddWalletComponent;
  let fixture: ComponentFixture<AddWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
