import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStock } from './product.component';

describe('InventoryStock', () => {
  let component: InventoryStock;
  let fixture: ComponentFixture<InventoryStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryStock ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
