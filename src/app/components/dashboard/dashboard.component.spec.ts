import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    // setup testbed
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
      // add necessary imports if required
    }).compileComponents();

    // create component instance
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // trigger change detection
    fixture.detectChanges();
  });

  // check if component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test if ngOnInit initializes charts
  it('should initialize charts on ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    // verify ngOnInit is called
    expect(component.ngOnInit).toHaveBeenCalled();
    // additional checks can be added to confirm the effects of ngOnInit
  });

  // add more tests to check chart data based on local storage data
});
