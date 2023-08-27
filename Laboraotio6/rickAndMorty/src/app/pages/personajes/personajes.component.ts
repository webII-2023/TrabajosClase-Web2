import { Component } from '@angular/core';
import PersonajesResponse from 'src/app/shared/models/PersonajesResponse';
import { PersonajesService } from 'src/app/shared/services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent {
  results: PersonajesResponse;
  constructor(private srvPersonajes: PersonajesService) {}
  ngOnInit() {
    this.srvPersonajes.getPersonajes().subscribe((result) => {
      this.results = result;
    });
  }
}
