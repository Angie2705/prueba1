import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaPage } from './mapa.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('MapaPage', () => {
  let component: MapaPage;
  let fixture: ComponentFixture<MapaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});