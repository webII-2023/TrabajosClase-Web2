import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoferesComponent } from './choferes.component';

const routes: Routes = [{ path: '', component: ChoferesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoferesRoutingModule {}
