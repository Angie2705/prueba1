import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFoundPageRoutingModule } from './not-found-routing.module';

import { NotFoundPage } from './not-found.page';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { IconoComponent } from 'src/app/components/icono/icono.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundPageRoutingModule,
    MatProgressBarModule
  ],

  declarations: [
    NotFoundPage,
    IconoComponent
  ]
})

export class NotFoundPageModule {}