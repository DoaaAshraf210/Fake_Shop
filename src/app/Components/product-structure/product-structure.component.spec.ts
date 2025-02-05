import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStructureComponent } from './product-structure.component';

describe('ProductStructureComponent', () => {
  let component: ProductStructureComponent;
  let fixture: ComponentFixture<ProductStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
