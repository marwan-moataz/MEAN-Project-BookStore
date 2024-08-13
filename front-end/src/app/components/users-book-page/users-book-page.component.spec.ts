import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBookPageComponent } from './users-book-page.component';

describe('UsersBookPageComponent', () => {
  let component: UsersBookPageComponent;
  let fixture: ComponentFixture<UsersBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersBookPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
