import { Player } from '../models/player';

export class Item {
  id: number;
  name: string;
  description: string;
  type: string;
  effect: { attack?: number; defense?: number; health?: number; mana?: number; };
  image: string;
  row?: number | null;
  col?: number | null;

  constructor(id: number, name: string, description: string, type: string, effect: { attack?: number; defense?: number; health?: number; mana?: number; }, image: string, row: number,
    col: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.effect = effect;
    this.image = image;
    this.row = row;
    this.col = col;
  }
}
export const ITEMS: Item[] = [
  { id: 1, name: 'Wooden Sword', description: 'A basic sword made of wood.', type: 'weapon', effect: { attack: 5 }, image: './assets/images/items/wooden-sword.png' },
  { id: 2, name: 'Iron Sword', description: 'A sturdy sword made of iron.', type: 'weapon', effect: { attack: 10 }, image: './assets/images/items/iron-sword.png' },
  { id: 3, name: 'Golden Sword', description: 'A shiny sword made of gold.', type: 'weapon', effect: { attack: 20 }, image: './assets/images/items/golden-sword.png' },
  { id: 4, name: 'Wooden Shield', description: 'A basic shield made of wood.', type: 'shield', effect: { defense: 3 }, image: './assets/images/items/wooden-shield.png' },
  { id: 5, name: 'Iron Shield', description: 'A sturdy shield made of iron.', type: 'shield', effect: { defense: 6 }, image: './assets/images/items/iron-shield.png' },
  { id: 6, name: 'Golden Shield', description: 'A shiny shield made of gold.', type: 'shield', effect: { defense: 12 }, image: './assets/images/items/golden-shield.png' },
  { id: 7, name: 'Red Potion (S)', description: 'A small vial of red liquid that restores a small amount of health.', type: 'potion', effect: { health: 20 }, image: './assets/images/items/red-potion-S.png' },
  { id: 8, name: 'Red Potion (L)', description: 'A large vial of red liquid that restores a significant amount of health.', type: 'potion', effect: { health: 50 }, image: './assets/images/items/red-potion-L.png' },
  { id: 9, name: 'Blue Potion (S)', description: 'A small vial of blue liquid that restores a small amount of mana.', type: 'manaPotion', effect: { mana: 10 }, image: './assets/images/items/blue-potion-S.png' },
  { id: 10, name: 'Blue Potion (L)', description: 'A large vial of blue liquid that restores a significant amount of mana.', type: 'manaPotion', effect: { mana: 30 }, image: './assets/images/items/blue-potion-L.png' },
];


