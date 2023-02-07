import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadModeComponent } from './read-mode.component';
import { ApiService } from '../../Services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';





 describe('ReadModeComponent', () => {
  let component: ReadModeComponent;
  let fixture: ComponentFixture<ReadModeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadModeComponent ],
      imports:[HttpClientTestingModule],
      providers:[ApiService,MatSnackBar,Overlay],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData', () => {
    spyOn(component, 'getData');
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
  });

  
});
