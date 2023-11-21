import { Component } from '@angular/core';
import { DbservicioService } from '../services/dbservicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private db: DbservicioService) {}

}
