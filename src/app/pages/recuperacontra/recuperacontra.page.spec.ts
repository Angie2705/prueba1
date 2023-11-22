import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperacontraPage } from './recuperacontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RecuperacontraPage', () => {
  let component: RecuperacontraPage;
  let fixture: ComponentFixture<RecuperacontraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperacontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
