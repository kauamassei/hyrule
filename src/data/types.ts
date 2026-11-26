export type Platform =
  | "NES"
  | "SNES"
  | "Satellaview"
  | "Game Boy"
  | "Game Boy Color"
  | "Nintendo 64"
  | "GameCube"
  | "Nintendo DS"
  | "Wii"
  | "Nintendo 3DS"
  | "Wii U"
  | "Nintendo Switch"
  | "Nintendo Switch 2";

export type GameKind = "original" | "remake" | "spinoff";

export interface Game {
  slug: string;
  title: string;
  year: number;
  platforms: Platform[];
  kind: GameKind;
  description: string;
  /** URL da capa (opcional: sem arquivo, o site mostra uma capa provisória) */
  cover?: string;
  /** "cover" para imagens largas, "contain" para capas quadradas/verticais */
  fit: "cover" | "contain";
  /** pixel art de baixa resolução: evita suavizar ao ampliar */
  pixel?: boolean;
}

export interface MainCharacter {
  slug: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface ApiCharacter {
  id: string;
  name: string;
  description?: string;
  gender?: string;
  race?: string;
}
