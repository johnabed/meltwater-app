import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    data: { title: 'CIA Document Processing' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
