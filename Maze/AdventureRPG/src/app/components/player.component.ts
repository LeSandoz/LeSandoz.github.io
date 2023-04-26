import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player = { name: '', level: 0, health: 0, mana: 0, inventory: [] };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.player = this.gameService.getPlayer();
  }
}
