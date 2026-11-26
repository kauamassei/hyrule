import type { MainCharacter } from "./types";
import zelda from "../assets/characters/zelda.png";
import link from "../assets/characters/link.png";
import ganondorf from "../assets/characters/ganondorf.png";

export const mainCharacters: MainCharacter[] = [
  {
    slug: "zelda",
    name: "Princesa Zelda",
    role: "Detentora da Triforce da Sabedoria",
    image: zelda,
    description:
      "Filha do Rei de Hyrule, e eventualmente a Sétima Sábia e a detentora da Triforce da Sabedoria. Zelda também é a líder dos sábios. A herdeira da família real, ela é da raça Hyliana.",
  },
  {
    slug: "link",
    name: "Link",
    role: "Herói de Hyrule",
    image: link,
    description:
      "Aquele que carrega a alma de um herói lendário, amigo da Princesa Zelda e também da raça Hyliana, Link empunha a mística Master Sword usando-a contra as forças do mal que ameaçam a Terra.",
  },
  {
    slug: "ganondorf",
    name: "Ganondorf",
    role: "Rei Demônio",
    image: ganondorf,
    description:
      "Ganon é o monstruoso Rei Demônio que vira e mexe atormenta o Reino de Hyrule. Ganondorf, por sua vez, é a forma humana, de Gerudo, do vilão.",
  },
];
