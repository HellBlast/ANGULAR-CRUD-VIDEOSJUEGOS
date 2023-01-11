import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{
  
  @HostBinding ('class') classes = 'row';

  games: any = []

  constructor(private gamesService: GamesService, private router: Router){  }

  ngOnInit() {
    this.getGames();
  }

  getGames(){
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err)
    );
  }

  deleteGame(id: string){
    this.gamesService.deleteGame(id).subscribe(
      res => {
        console.log(res)
        this.getGames();

      },

      err => console.log(err)
    )
  }
}
