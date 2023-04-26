import { Item } from './item';

export class Monster {
  name: string;
  level: number;
  health: number;
  image: string;
  attack: number;
  defense: number;
  maxHealth: number;
  experience: number;
  drops: Item[];
  row?: number | null;
  col?: number | null;
  constructor(
    name: string,
    level: number,
    health: number,
    image: string,
    attack: number,
    defense: number,
    maxHealth: number,
    experience: number,
    drops: Item[],
    row?: number | null,
    col?: number | null
  ) {
    this.name = name;
    this.level = level;
    this.health = health;
    this.image = image;
    this.attack = attack;
    this.defense = defense;
    this.maxHealth = maxHealth;
    this.experience = experience;
    this.drops = drops;
    this.row = row;
    this.col = col;
  }

}

export const ITEMS: Item[] = [
    // your items here
  ];


export const MONSTERS: Monster[] = [
    {
    name: 'Slime',
    level: 1,
    health: 30,
    maxHealth: 30,
    image: './assets/images/monster/slime.png',
    attack: 10,
    defense: 2,
    experience: 10,
    drops: []
    },
    {
    name: 'Grey Wolf',
    level: 5,
    health: 100,
    maxHealth: 100,
    image: './assets/images/monster/grey-wolf.png',
    attack: 30,
    defense: 5,
    experience: 30,
    drops: []
    },
    {
    name: 'Giant Bear',
    level: 10,
    health: 250,
    maxHealth: 250,
    image: './assets/images/monster/giant-bear.png',
    attack: 30,
    defense: 60,
    experience: 150,
    drops: []
    },
    {
    name: 'Fire Dragon',
    level: 35,
    health: 500,
    maxHealth: 500,
    image: './assets/images/monster/fire-dragon.png',
    attack: 150,
    defense: 150,
    experience: 500,
    drops: []
    },
    {
    name: 'Demon',
    level: 100,
    health: 2000,
    maxHealth: 2000,
    image: './assets/images/monster/demon.png',
    attack: 500,
    defense: 200,
    experience: 2000,
    drops: []
    }
    ];
  


// export const SLIME = new Monster(
//     'Slime', 
//     1, 
//     10, 
//     './assets/images/slime.png', 
//     2, 
//     1, 
//     10, 
//     5, 
//     []
// );
// export const GRAY_WOLF = new Monster(
//     'Gray Wolf', 
//     3, 
//     30, 
//     './assets/images/gray_wolf.png', 
//     8, 
//     3, 
//     30, 
//     10, 
//     [],
//     4, 
//     4
// );
// export const GIANT_BEAR = new Monster(
//     'Giant Bear', 
//     5, 
//     50, 
//     './assets/images/giant_bear.png', 
//     15, 
//     5, 
//     50, 
//     20, 
//     [],
//     6, 
//     6
// );
// export const FIRE_DRAGON = new Monster(
//     'Fire Dragon', 
//     8, 
//     80, 
//     './assets/images/fire_dragon.png', 
//     25, 
//     8, 
//     80, 
//     50, 
//     [],
//     8, 
//     8
// );
// export const DEMON = new Monster(
//     'Demon', 
//     10, 
//     100, 

//     './assets/images/demon.png', 
//     40, 
//     10, 
//     100, 
//     100, 
//     [],
//     10, 
//     10
// );
