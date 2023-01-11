import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';

  
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getGames(){
    return this.http.get(`${this.API_URL}/games`);
  }

  getGame(id: string){
    return this.http.get(`${this.API_URL}/games/${id}`);
  }

  saveGame(game: Game){
    return this.http.post(`${this.API_URL}/games`,game);
  }

  updateGame(id: string|number, updateGames: Game){
    return this.http.put(`${this.API_URL}/games/${id}`,updateGames);
  }

  deleteGame(id: String){
    return this.http.delete(`${this.API_URL}/games/${id}`);
  }
  
}
