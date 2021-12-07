import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ModifyComponent } from '../modify/modify.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@NgModule({
  declarations: [
    DetailsComponent,
    AddComponent,
    ModifyComponent,
    DeleteComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DataService],
  exports: [DetailsComponent, RouterModule],
})
export class DetailsModule {}
