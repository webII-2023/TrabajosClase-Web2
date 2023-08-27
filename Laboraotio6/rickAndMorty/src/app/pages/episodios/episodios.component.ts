import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import EpisodiosResponse from 'src/app/shared/models/EpisodiosResponse';
import { EpisodiosService } from 'src/app/shared/services/episodios.service';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.scss'],
})
export class EpisodiosComponent {
  displayedColumns: string[] = ['id', 'name', 'air_date', 'episode', 'created'];
  Episodios: EpisodiosResponse;
  dataSource = new MatTableDataSource();

  constructor(private srvEpisodios: EpisodiosService) {}
  ngOnInit() {
    this.srvEpisodios.getEpisodios().subscribe((Episodio) => {
      this.Episodios = Episodio;
    });
  }
}
