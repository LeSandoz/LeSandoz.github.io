import { Component, OnInit, HostListener, ChangeDetectorRef, NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Player } from '../models/player';
import { MONSTERS, Monster } from '../models/monster';
import { ITEMS, Item } from '../models/item';


export class MyModule { }
@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {

  mazeMap: number[][];
  player: Player; // declare a variable of type Player
  monsters: Monster[] = MONSTERS;
  items: Item[] = ITEMS;
  inventory: any[] = [];
  playerStatusComponent: any;
  bgMusic: HTMLAudioElement; // 宣告 bgMusic 變數為 HTMLAudioElement 類型
  battleMusic: HTMLAudioElement; // 宣告 battleMusic 變數為 HTMLAudioElement 類型
  playAttackMusic: HTMLAudioElement; // 宣告 battleMusic 變數為 HTMLAudioElement 類型
  
  constructor(
    private router: Router,
    public  gameService: GameService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.mazeMap = [];
    this.player = new Player(); // create a new instance of Player

    //background music
    this.bgMusic = new Audio('/assets/sounds/default-background.mp3'); // 創建新的 Audio 元素
    this.battleMusic = new Audio('/assets/sounds/battle-background.mp3'); // 創建新的 Audio 元素
    this.playAttackMusic = new Audio('/assets/sounds/attack.mp3'); // 創建新的 Audio 元素

    this.bgMusic.loop = true; // 設置循環播放
    this.battleMusic.loop = true; // 設置循環播放
    this.playAttackMusic.loop = false; // 設置循環播放

    this.bgMusic.play(); // 播放背景音樂


  }

  generateRandomPosition(): [number, number] {
    let row = Math.floor(Math.random() * this.mazeMap.length);
    let col = Math.floor(Math.random() * this.mazeMap[0].length);
    while (this.player.row === row && this.player.col === col) {
      row = Math.floor(Math.random() * this.mazeMap.length);
      col = Math.floor(Math.random() * this.mazeMap[0].length);
    }
    return [row, col];
  }

  ngOnInit(): void {
    this.generateMazeMap();
    const weaponsAndShields = ['Wooden Sword', 'Iron Sword', 'Golden Sword', 'Wooden Shield', 'Iron Shield', 'Golden Shield'];
    for (let i = 0; i < 10; i++) { // 生成 10 個道具和藥水
      let itemName: string;
      do {
        itemName = this.getRandomItemName();
      } while (weaponsAndShields.includes(itemName) && this.items.some(item => item.name === itemName));
      this.addItemToMap(itemName);
    }
    this.changeBackgroundEveryPeriod()
  }
  
  getRandomItemName(): string {
    const items = ['Wooden Sword', 'Iron Sword', 'Golden Sword', 'Wooden Shield', 'Iron Shield', 'Golden Shield', 'Red Potion (S)', 'Red Potion (L)', 'Blue Potion (S)', 'Blue Potion (L)'];
    return items[Math.floor(Math.random() * items.length)];
  }

  generateMazeMap(): void {
    this.mazeMap = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
  }


  addItemToMap(itemName: string): void {
    const item = this.items.find(item => item.name === itemName);
    if (item) {
      let row:any, col:any;
      do {
        row = Math.floor(Math.random() * this.mazeMap.length);
        col = Math.floor(Math.random() * this.mazeMap[0].length);
      } while (this.items.some((item) => item.row === row && item.col === col) || this.mazeMap[row][col] !== 0);
      item.row = row;
      item.col = col;
      
    }
  }
  
  
  onPlayerTouchItem(): void {
    const item = this.items.find((item) => item.row === this.player.row && item.col === this.player.col);
    if (item) {
      const message = `Name: ${item.name}\nType: ${item.type}\nDescription: ${item.description}\nEffect: ${item.effect}\n\nDo you want to pick up this item?`;
      if (confirm(message)) {
        setTimeout(() => {
          // console.log(this.player.inventory);
          this.player.inventory.push(item);
          this.player.experience += 5;
          // console.log(this.player.inventory);
          item.row = null;
          item.col = null;
          // this.updateInventory();
        }, 100);
      }
    }
  }
  
  onPlayerTouchMonster(): void {
    const monster = this.monsters.find((monster) => monster.row === this.player.row && monster.col === this.player.col);
    if(monster){
      const monsterInfo = document.getElementById('monster-info');
      if (monsterInfo) {
        monsterInfo.innerHTML = `
          <h2>Monster Info</h2>
          <img src="${monster.image}" style="width: 6vw; height: 12vh; text-align:center; transform: translate(10px, 0);">
          <p>Name: ${monster.name}</p>
          <p>Level: ${monster.level}</p>
          <p>Health: ${monster.health}</p>
          <p>Attack: ${monster.attack}</p>
          <p>Defense: ${monster.defense}</p>
        `;
      }
      this.bgMusic.pause(); // 播放戰鬥音樂
      this.battleMusic.currentTime = 0; // 将播放时间归零
      this.battleMusic.play(); // 播放戰鬥音樂
      const message = `You are facing a monster,\n\nDo you want to fight?`;
      setTimeout(() => {
        if (confirm(message)) {
          // 進入戰鬥模式
          while (this.player.health > 0 && monster.health > 0) {
            // player's turn
            const damageToMonster = Math.max(this.player.attack - monster.defense, 0);
            monster.health -= damageToMonster;
            this.playAttackMusic.currentTime = 0;
            this.playAttackMusic.play();
            console.log('attack')
            alert(`Player attacks ${monster.name} and deals ${damageToMonster} damage. ${monster.name}'s health is now ${monster.health}.`);
  
          
            // slime's turn
            const damageToPlayer = Math.max(monster.attack - this.player.defense, 0);
            this.player.health -= damageToPlayer;
            alert(`${monster.name} attacks player and deals ${damageToPlayer} damage. Player's health is now ${this.player.health}.`);
          }
          
          if (this.player.health <= 0) {
            this.player.health = 0;
            alert('Player has been defeated!');
            alert('Player is sent back to the starting point!');
            this.player.row = 6;
            this.player.col = 3;
            this.battleMusic.pause(); // 播放背景音樂
            this.bgMusic.currentTime = 0; // 将播放时间归零
            this.bgMusic.play(); // 播放背景音樂

          }else{
            if(monster.name == 'Slime'){
              alert('Congratulations, you passed the game!!')
              this.battleMusic.pause(); // 播放背景音樂
              this.bgMusic.currentTime = 0; // 将播放时间归零
              this.bgMusic.play(); // 播放背景音樂

            }else{
              alert(`${monster.name} has been defeated!`);
              alert('Player get some experiences!');
              this.player.experience += monster.experience;
              monster.health = monster.maxHealth;
              monster.row = null;
              monster.col = null;
              setTimeout(() => {
                monster.row = 0;
                monster.col = 0;
              },2000)
              this.player.levelUp();
              this.battleMusic.pause(); // 播放背景音樂
              this.bgMusic.currentTime = 0; // 将播放时间归零
              this.bgMusic.play(); // 播放背景音樂
            }

            }
          
        } else {
          // 取消戰鬥
            this.battleMusic.pause(); // 播放背景音樂
            this.bgMusic.currentTime = 0; // 将播放时间归零
            this.bgMusic.play(); // 播放背景音樂
        }
      }, 100);
    }
  }
  
  
  
  
  
  moveUp(): void {
    if (this.player.row > 0 && this.mazeMap[this.player.row - 1][this.player.col] === 0) {
      this.player.row--;
      this.player.image = "./assets/images/RPG-Character-Up.gif";
    }
    // if (this.player.steps % 5 === 0) {
    //   this.addItemToMap(this.items[Math.floor(Math.random() * this.items.length)].name);
    // }
    // this.player.steps++;
    // this.onPlayerTouchItem();
  }
  
  moveDown(): void {
    if (this.player.row < this.mazeMap.length - 1 && this.mazeMap[this.player.row + 1][this.player.col] === 0) {
      this.player.row++;
      this.player.image = "./assets/images/RPG-Character-Down.gif";
    }
    // if (this.player.steps % 5 === 0) {
    //   this.addItemToMap(this.items[Math.floor(Math.random() * this.items.length)].name);
    // }
    // this.player.steps++;
    // this.onPlayerTouchItem();
  }
  
  moveLeft(): void {
    if (this.player.col > 0 && this.mazeMap[this.player.row][this.player.col - 1] === 0) {
      this.player.col--;
      this.player.image = "./assets/images/RPG-Character-Left.gif";
    }
    // if (this.player.steps % 5 === 0) {
    //   this.addItemToMap(this.items[Math.floor(Math.random() * this.items.length)].name);
    // }
    // this.player.steps++;
    // this.onPlayerTouchItem();
  }
  
  moveRight(): void {
    if (this.player.col < this.mazeMap[0].length - 1 && this.mazeMap[this.player.row][this.player.col + 1] === 0) {
      this.player.col++;
      this.player.image = "./assets/images/RPG-Character-Right.gif";
    }
    // if (this.player.steps % 5 === 0) {
    //   this.addItemToMap(this.items[Math.floor(Math.random() * this.items.length)].name);
    // }
    // this.player.steps++;
    // this.onPlayerTouchItem();
  }
  
  experienceAdd(){
    this.player.experience++; // 增加經驗值
    if (this.gameService && this.gameService.player) {
      // console.log(this.player.experience);
      this.changeDetectorRef.detectChanges();
    }
  }
  
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key === 'ArrowUp') {
      this.moveUp();
    } else if (event.key === 'ArrowDown') {
      this.moveDown();
    } else if (event.key === 'ArrowLeft') {
      this.moveLeft();
    } else if (event.key === 'ArrowRight') {
      this.moveRight();
    }
    if (this.player.steps % 5 === 0 && this.monsters.length < 5) { // 當怪物數量小於5時才繼續生成
      this.addItemToMap(this.items[Math.floor(Math.random() * this.items.length)].name);
      this.generateMonster();
    } else if (this.player.steps % 5 === 0 && this.monsters.length >= 5) { // 當怪物數量大於等於5時，替換最早生成的怪物
      this.addItemToMap(this.items[Math.floor(Math.random() * this.items.length)].name);
      let monsterIndex = Math.floor(Math.random() * this.monsters.length); // 隨機選擇一個怪物
      let row: any, col: any;
      do {
        row = Math.floor(Math.random() * this.mazeMap.length);
        col = Math.floor(Math.random() * this.mazeMap[0].length);
      } while (this.monsters.some(monster => monster.row === row && monster.col === col) || this.mazeMap[row][col] !== 0);
      this.monsters[monsterIndex] = { ...this.monsters[monsterIndex], row, col }; // 替換怪物位置
    }
    
    if (this.player.steps % 10 === 0) {
      if(this.player.health < this.player.maxHealth){
        this.player.health++;
      }
    }
    if (this.player.steps % 20 === 0) {
      if(this.player.mana < this.player.maxMana){
        this.player.mana++;
      }
    }
    this.player.steps++;
    this.onPlayerTouchItem();
    this.onPlayerTouchMonster();
    this.experienceAdd();
    this.player.levelUp();

  }


  useItem(item: {type: string, effect: {}}, index: number) {
    // console.log(this.player.inventory);
    if (item.type === 'weapon') {
      this.useWeapon(item, index);
    } else if (item.type === 'shield') {
      this.useShield(item, index);
    } else if (item.type === 'potion') {
      this.useRedPotion(item, index);
    } else if (item.type === 'manaPotion') {
      this.useManaPotion(item, index);
    }
    // console.log(this.player.inventory);

  }
  
  useWeapon(item: { type: string, effect: { attack?: number } }, index: number) {
      // 加攻擊力的邏輯
    if (item.effect.attack !== undefined) {
      this.player.attack += item.effect.attack;
      this.player.inventory.splice(index, 1);
      // console.log(this.player.attack)
    }
  }
  useShield(item: {type: string, effect: { defense?: number }}, index: number) {
    // 加防禦力的邏輯
    if (item.effect.defense !== undefined) {
      this.player.defense += item.effect.defense;
      this.player.inventory.splice(index, 1);
    }
  }
  
  useRedPotion(item: {type: string, effect: {[key: string]: number}}, index: number) {
    // 加血量的邏輯
    if (this.player.health < this.player.maxHealth) {
      this.player.health += item.effect['health'];
      alert("You used a Red Potion.")
      this.player.inventory.splice(index, 1);
      if(this.player.health > this.player.maxHealth) {
        this.player.health = this.player.maxHealth;
        alert("You are really healthy.")
        this.player.inventory.splice(index, 1);
      }
    } else if(this.player.health == this.player.maxHealth) {
      alert("You have full HP.")
    }
  }
  
  
  useManaPotion(item: {type: string, effect: {[key: string]: number}}, index: number) {
    // 加魔力的邏輯
    if (this.player.mana < this.player.maxMana) {
      this.player.mana += item.effect['mana'];
      alert("You used a Mana Potion.")
      this.player.inventory.splice(index, 1);
      if((this.player.mana > this.player.maxMana)){
        this.player.mana = this.player.maxMana;
        alert("You are really healthy.")
        this.player.inventory.splice(index, 1);
      }
    }else if(this.player.mana = this.player.maxMana){
      this.player.mana = this.player.maxMana;
      alert("You have full SP.")
    }
  }
  
  updateInventory(): void {
    this.items = this.items.filter((item) => item.row === null && item.col === null);
  }
  
  dropItem(item: {type: string}) {
    // 丟棄道具的邏輯
    // console.log(item.type + " dropped.");
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  pause(): void {
    this.bgMusic.pause();
    this.battleMusic.pause();
  }




  resetGame(): void {
    // Reset player status
    this.player.name = 'Player';
    this.player.level = 1;
    this.player.experience = 0;
    this.player.maxExperience = 100;
    this.player.health = 100;
    this.player.maxHealth = 100;
    this.player.mana = 50;
    this.player.maxMana = 50;
    this.player.attack = 10;
    this.player.defense = 10;
    this.player.row = 6;
    this.player.col = 3;
  
    // Clear inventory
    this.player.inventory = [];
  }
  

  generateMonster() {
    let monsterIndex = Math.floor(Math.random() * this.monsters.length);
    let monster = {...this.monsters[monsterIndex]}; // make a copy of the selected monster
    let row: any, col: any;


    do {
      row = Math.floor(Math.random() * this.mazeMap.length);
      col = Math.floor(Math.random() * this.mazeMap[0].length);
    } while (this.monsters.some(monster => monster.row === row && monster.col === col) || this.mazeMap[row][col] !== 0);
  
    monster.row = row;
    monster.col = col;
    this.monsters.push(monster); // add the new monster to the array
    // console.log(this.monsters)
    // console.log(this.mazeMap)
  }
  
  private currentBgIndex = 0;
  

  changeBackground(): void {
    const backgrounds = [
      'url(../../assets/images/backbround/Temple.gif)',
      'url(../../assets/images/backbround/Swamp.gif)',
      'url(../../assets/images/backbround/Valley.gif)',
    ];
  
    const cellContainers = document.querySelectorAll('.cell_container');
    cellContainers.forEach((cellContainer: Element) => {
      if (cellContainer instanceof HTMLElement) {
        cellContainer.style.backgroundImage = backgrounds[this.currentBgIndex];
      }
    });
  
    this.currentBgIndex++;
    if (this.currentBgIndex >= backgrounds.length) {
      this.currentBgIndex = 0;
    }
  }
  
  

  changeBackgroundEveryPeriod(): void{
    const backgrounds = [
      'url(../../assets/images/backbround/Temple.gif)',
      'url(../../assets/images/backbround/Swamp.gif)',
      'url(../../assets/images/backbround/Valley.gif)',
    ];
    
    let currentBgIndex = 0;
    
    setInterval(() => {
      const cellContainers = document.querySelectorAll('.cell_container');
      cellContainers.forEach((cellContainer: Element) => {
        if (cellContainer instanceof HTMLElement) {
          cellContainer.style.backgroundImage = backgrounds[currentBgIndex];
        }
      });
    
      currentBgIndex++;
      if (currentBgIndex >= backgrounds.length) {
        currentBgIndex = 0;
      }
    }, 10000);
    
    
  }
}
