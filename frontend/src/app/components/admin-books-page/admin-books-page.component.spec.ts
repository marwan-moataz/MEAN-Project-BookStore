import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBooksPageComponent } from './admin-books-page.component';

describe('AdminBooksPageComponent', () => {
  let component: AdminBooksPageComponent;
  let fixture: ComponentFixture<AdminBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBooksPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
