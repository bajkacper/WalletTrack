import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletDialogComponent } from './add-wallet-dialog.component';

describe('AddWalletDialogComponent', () => {
  let component: AddWalletDialogComponent;
  let fixture: ComponentFixture<AddWalletDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWalletDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWalletDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
