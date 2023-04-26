import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { MazeComponent } from '../maze/maze.component';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // 為player屬性添加初始值
  player: Player;

  constructor() {
    this.player = new Player();
  }

  // 獲取玩家信息
  getPlayer(): Player {
    return this.player;
  }

  // 設置玩家信息
  setPlayer(player: Player): void {
    this.player = player;
  }
}
