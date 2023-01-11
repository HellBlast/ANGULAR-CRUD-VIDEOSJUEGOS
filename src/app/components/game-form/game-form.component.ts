import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent {

  @HostBinding('class') classes = 'row';

  game: Game = {

    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()

  };

  edit: boolean = false;

  constructor(private gamesService: GamesService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {

    const params = this.activedRoute.snapshot.params;

    if (params['id']) {
      this.gamesService.getGame(params['id']).subscribe(
        (resul: any) => {
          this.game = resul;
          this.edit = true;
          console.log("Registro estraido: ", this.game);
        },
        (error) => { console.log("Error: ", error) }
      );
    }

  }
  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;

    this.gamesService.saveGame(this.game)
      .subscribe(
        res => {
          this.router.navigate(['/games'])
        },
        err => console.error(err)
      )
  }

  updateGame(){

    const id = ''+this.game.id;
    delete this.game.created_at;

    this.gamesService.updateGame(id, this.game)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games'])

      },
      err => console.log(err)
    )
  }

}
