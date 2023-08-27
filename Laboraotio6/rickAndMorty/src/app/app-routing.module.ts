import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'personajes',
    loadChildren: () =>
      import('./pages/personajes/personajes.module').then(
        (m) => m.PersonajesModule
      ),
  },
  {
    path: 'episodios',
    loadChildren: () =>
      import('./pages/episodios/episodios.module').then(
        (m) => m.EpisodiosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
