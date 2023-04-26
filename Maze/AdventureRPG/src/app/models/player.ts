import { Item } from '../models/item';

export class Player {
  name: string;
  level: number;
  health: number;
  mana: number;
  row: number; // 新增 row 屬性
  col: number; // 新增 col 屬性
  image: string; // 新增 image 屬性
  attack: number; // 新增攻擊力屬性
  defense: number; // 新增防禦力屬性
  maxHealth: number; // 新增最大生命力屬性
  maxMana: number; // 新增最大魔力屬性
  experience: number;
  maxExperience: number;
  // public initialItems: Item[] = [
  //   new Item('Wooden Sword', 'A basic wooden sword.', 'weapon', { attack: 5 }),
  //   new Item('Red Potion', 'A small vial of red liquid.', 'potion', { health: 10 }),
  // ];
  inventory: Item[]; // 修改道具型別為 Item 陣列
  steps: number;

  constructor() { // 新增 initialItems 參數
    this.name = 'Player Name';
    this.level = 1;
    this.health = 100;
    this.maxHealth = 100; // 新增最大生命力屬性
    this.mana = 50;
    this.maxMana = 50; // 新增最大魔力屬性
    this.row = 6; // 初始 row 值為 6
    this.col = 3; // 初始 col 值為 3
    this.image = './assets/images/RPG-Character-Down.gif'; // 初始圖片為下方
    this.attack = 10; // 初始攻擊力為 10
    this.defense = 5; // 初始防禦力為 5
    this.experience = 0;
    this.maxExperience = 100;
    this.inventory = []; // 複製 initialItems 陣列
    this.steps = 0;
  }

  // gainExperience(exp: number): void {
  //   this.experience += exp;
  //   while (this.experience >= this.maxExperience) {
  //     this.levelUp();
  //   }
  // }

  levelUp(): void {
    if(this.experience >= this.maxExperience){
      this.level++;
      this.health += 10;
      this.mana += 5;
      this.experience -= this.maxExperience;
      this.maxExperience = Math.round(this.maxExperience * 1.2);
      if(this.health >= this.maxHealth){
        this.health = this.maxHealth;
      }
      if(this.mana >= this.maxMana){
        this.mana = this.maxMana;
      }
      this.maxHealth = Math.round(this.maxHealth * 1.3);
      this.maxMana = Math.round(this.maxMana * 1.2);
      this.attack = Math.round(this.attack * 1.1);
      this.defense = Math.round(this.defense * 1.1);

      setTimeout(() => {
        alert(`Level up! ${this.name} is now level ${this.level}.`);
      }, 50);
    }
  }
}
