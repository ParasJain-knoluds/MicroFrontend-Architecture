import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipyListComponent } from './recipy-list.component';
import { ApiService } from '../../Services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';


fdescribe('RecipyListComponent', () => {
  let component: RecipyListComponent;
  let fixture: ComponentFixture<RecipyListComponent>;
  let service:ApiService
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipyListComponent ],
      imports:[HttpClientTestingModule],
      providers:[ApiService,MatSnackBar,Overlay]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipyListComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(ApiService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllRecipe', () => {
    spyOn(component, 'getAllRecipe');
    component.ngOnInit();
    expect(component.getAllRecipe).toHaveBeenCalled();
  });
});
