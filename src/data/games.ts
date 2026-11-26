import type { Game, Platform } from "./types";

// Todas as capas ficam em src/assets/games e são resolvidas pelo Vite em build.
// Aceita webp, jpg ou png. Para trocar/adicionar uma capa, basta salvar o arquivo
// com o mesmo nome do `slug` do jogo (ou do campo `file`).
const covers = import.meta.glob<string>(
  "../assets/games/*.{webp,jpg,jpeg,png}",
  { eager: true, query: "?url", import: "default" },
);

const coverFor = (name: string): string | undefined => {
  const key = Object.keys(covers).find(
    (path) => path.split("/").pop()?.replace(/\.[^.]+$/, "") === name,
  );
  return key ? covers[key] : undefined;
};

type GameInput = Omit<Game, "cover"> & { file?: string };

const input: GameInput[] = [
  {
    slug: "ocarina-of-time-switch-2",
    title: "Ocarina of Time Remake",
    year: 2026,
    platforms: ["Nintendo Switch 2"],
    kind: "remake",
    fit: "cover",
    description:
      "Lançado em 5 de novembro de 2026, exclusivo do Nintendo Switch 2. O clássico de 1998 foi reconstruído com visuais totalmente refeitos, cenas dubladas, diálogos expandidos, trilha orquestral e câmera e controles reformulados.",
  },
  {
    slug: "hyrule-warriors-age-of-imprisonment",
    title: "Hyrule Warriors: Age of Imprisonment",
    year: 2025,
    platforms: ["Nintendo Switch 2"],
    kind: "spinoff",
    fit: "cover",
    description:
      "Lançado em 6 de novembro de 2025. Spin-off de ação em larga escala, feito pela Koei Tecmo, que mistura Zelda com Dynasty Warriors e se passa no passado remoto de Hyrule, durante a invasão de Ganondorf mostrada em Tears of the Kingdom.",
  },
  {
    slug: "tears-of-the-kingdom",
    file: "tears-of-the-kingdom",
    title: "Tears of the Kingdom",
    year: 2023,
    platforms: ["Nintendo Switch", "Nintendo Switch 2"],
    kind: "original",
    fit: "cover",
    description:
      "Continuação de Breath of the Wild. Link explora as ilhas do céu e as Profundezas de Hyrule usando habilidades que permitem fundir objetos e construir engenhocas. Também ganhou uma Nintendo Switch 2 Edition em 2025.",
  },
  {
    slug: "breath-of-the-wild",
    file: "breath-of-the-wild",
    title: "Breath of the Wild",
    year: 2017,
    platforms: ["Wii U", "Nintendo Switch", "Nintendo Switch 2"],
    kind: "original",
    fit: "cover",
    description:
      "Link acorda após um sono de cem anos e explora um Hyrule aberto e cheio de liberdade para enfrentar a Calamidade Ganon. Também ganhou uma Nintendo Switch 2 Edition em 2025.",
  },
  {
    slug: "echoes-of-wisdom",
    file: "echoes-of-wisdom",
    title: "Echoes of Wisdom",
    year: 2024,
    platforms: ["Nintendo Switch"],
    kind: "original",
    fit: "cover",
    description:
      "Pela primeira vez a princesa Zelda é a protagonista de um jogo principal. Ela usa o Tri Rod para criar ecos de objetos e inimigos e resolver os desafios do caminho.",
  },
  {
    slug: "links-awakening-switch",
    file: "links-awakening-switch",
    title: "Link's Awakening",
    year: 2019,
    platforms: ["Nintendo Switch"],
    kind: "remake",
    fit: "cover",
    description:
      "Releitura do clássico de Game Boy, com visual de diorama. Link naufraga na Ilha Koholint e precisa despertar o Peixe-Vento.",
  },
  {
    slug: "skyward-sword",
    file: "skyward-sword",
    title: "Skyward Sword",
    year: 2011,
    platforms: ["Wii", "Nintendo Switch"],
    kind: "original",
    fit: "cover",
    description:
      "Do alto de Skyloft, Link parte em busca de Zelda e descobre as origens da Master Sword, com combate de espada controlado pelos movimentos.",
  },
  {
    slug: "tri-force-heroes",
    file: "tri-force-heroes",
    title: "Tri Force Heroes",
    year: 2015,
    platforms: ["Nintendo 3DS"],
    kind: "original",
    fit: "cover",
    description:
      "Aventura cooperativa para até três jogadores. Três Links com roupas diferentes precisam trabalhar em equipe para vencer as masmorras.",
  },
  {
    slug: "a-link-between-worlds",
    file: "a-link-between-worlds",
    title: "A Link Between Worlds",
    year: 2013,
    platforms: ["Nintendo 3DS"],
    kind: "original",
    fit: "contain",
    description:
      "Sequência espiritual de A Link to the Past. Link pode se transformar em pintura para andar pelas paredes e atravessar o reino de Lorule.",
  },
  {
    slug: "spirit-tracks",
    file: "spirit-tracks",
    title: "Spirit Tracks",
    year: 2009,
    platforms: ["Nintendo DS"],
    kind: "original",
    fit: "contain",
    description:
      "Link viaja de trem por um novo Hyrule enquanto o espírito de Zelda o acompanha. Todo o jogo é controlado pela tela de toque.",
  },
  {
    slug: "phantom-hourglass",
    file: "phantom-hourglass",
    title: "Phantom Hourglass",
    year: 2007,
    platforms: ["Nintendo DS"],
    kind: "original",
    fit: "contain",
    description:
      "Continuação direta de The Wind Waker. Link navega pelos mares e explora o Templo do Rei do Oceano, controlando a aventura com a caneta do DS.",
  },
  {
    slug: "twilight-princess",
    file: "twilight-princess",
    title: "Twilight Princess",
    year: 2006,
    platforms: ["GameCube", "Wii"],
    kind: "original",
    fit: "contain",
    description:
      "Um tom mais sombrio para Hyrule. Link se transforma em lobo ao entrar no Reino do Crepúsculo e conta com a ajuda de Midna.",
  },
  {
    slug: "four-swords-adventures",
    file: "four-swords-adventures",
    title: "Four Swords Adventures",
    year: 2004,
    platforms: ["GameCube"],
    kind: "original",
    fit: "cover",
    description:
      "Aventura multijogador em que vários Links, de cores diferentes, atravessam fases cooperando e competindo pelas Force Gems.",
  },
  {
    slug: "the-wind-waker",
    file: "the-wind-waker",
    title: "The Wind Waker",
    year: 2002,
    platforms: ["GameCube", "Wii U"],
    kind: "original",
    fit: "contain",
    description:
      "Link navega pelo Grande Mar em um mundo de visual cel-shading. A capa mostrada é a da versão HD, lançada para Wii U.",
  },
  {
    slug: "oracle-of-seasons-and-ages",
    file: "oracle-of-seasons-and-ages",
    title: "Oracle of Seasons / Ages",
    year: 2001,
    platforms: ["Game Boy Color"],
    kind: "original",
    fit: "cover",
    description:
      "Dois jogos ligados entre si: em Seasons, Link controla as estações; em Ages, viaja entre passado e presente.",
  },
  {
    slug: "majoras-mask",
    file: "majoras-mask",
    title: "Majora's Mask",
    year: 2000,
    platforms: ["Nintendo 64"],
    kind: "original",
    fit: "cover",
    description:
      "Em Termina, Link tem três dias para impedir que a lua caia, voltando no tempo e usando máscaras para ganhar novas habilidades.",
  },
  {
    slug: "ocarina-of-time",
    file: "ocarina-of-time",
    title: "Ocarina of Time",
    year: 1998,
    platforms: ["Nintendo 64"],
    kind: "original",
    fit: "cover",
    description:
      "Link viaja no tempo entre a infância e a vida adulta para impedir Ganondorf. Um dos jogos mais aclamados da história.",
  },
  {
    slug: "ancient-stone-tablets",
    file: "ancient-stone-tablets",
    title: "Ancient Stone Tablets",
    year: 1997,
    platforms: ["Satellaview"],
    kind: "original",
    fit: "cover",
    description:
      "Lançado em capítulos pelo Satellaview, acessório de satélite do Super Famicom que só existiu no Japão.",
  },
  {
    slug: "bs-zelda",
    file: "bs-zelda",
    title: "BS Zelda",
    year: 1995,
    platforms: ["Satellaview"],
    kind: "original",
    fit: "contain",
    pixel: true,
    description:
      "Uma releitura do primeiro jogo transmitida pelo Satellaview, no Japão.",
  },
  {
    slug: "links-awakening",
    file: "links-awakening",
    title: "Link's Awakening DX",
    year: 1993,
    platforms: ["Game Boy", "Game Boy Color"],
    kind: "original",
    fit: "cover",
    description:
      "A primeira aventura portátil de Link, na Ilha Koholint. A versão DX adicionou cores para o Game Boy Color.",
  },
  {
    slug: "a-link-to-the-past",
    file: "a-link-to-the-past",
    title: "A Link to the Past",
    year: 1991,
    platforms: ["SNES"],
    kind: "original",
    fit: "cover",
    description:
      "Link alterna entre o Mundo da Luz e o Mundo das Trevas para derrotar Ganon e salvar as descendentes dos sábios.",
  },
  {
    slug: "adventure-of-link",
    file: "adventure-of-link",
    title: "II: The Adventure of Link",
    year: 1987,
    platforms: ["NES"],
    kind: "original",
    fit: "contain",
    description:
      "Continuação com visão lateral e elementos de RPG. Link busca despertar a princesa Zelda do sono mágico.",
  },
  {
    slug: "the-legend-of-zelda",
    file: "the-legend-of-zelda",
    title: "The Legend of Zelda",
    year: 1986,
    platforms: ["NES"],
    kind: "original",
    fit: "contain",
    pixel: true,
    description:
      "Onde tudo começou. Link explora Hyrule e suas masmorras para reunir os fragmentos da Triforce da Sabedoria e resgatar Zelda de Ganon.",
  },
  {
    slug: "ocarina-of-time-3d",
    file: "ocarina-of-time-3d",
    title: "Ocarina of Time 3D",
    year: 2011,
    platforms: ["Nintendo 3DS"],
    kind: "remake",
    fit: "contain",
    description:
      "Versão remasterizada do clássico do Nintendo 64, com visual renovado e efeito 3D.",
  },
  {
    slug: "majoras-mask-3d",
    file: "majoras-mask-3d",
    title: "Majora's Mask 3D",
    year: 2015,
    platforms: ["Nintendo 3DS"],
    kind: "remake",
    fit: "contain",
    description:
      "Releitura de Majora's Mask para o 3DS, com gráficos refeitos e ajustes na jogabilidade.",
  },
];

export const games: Game[] = input.map(({ file, ...game }) => ({
  ...game,
  cover: coverFor(file ?? game.slug),
}));

export const kindLabel: Record<Game["kind"], string> = {
  original: "Original",
  remake: "Remake",
  spinoff: "Spin-off",
};

export const platformOrder: Platform[] = [
  "NES",
  "SNES",
  "Satellaview",
  "Game Boy",
  "Game Boy Color",
  "Nintendo 64",
  "GameCube",
  "Nintendo DS",
  "Wii",
  "Nintendo 3DS",
  "Wii U",
  "Nintendo Switch",
  "Nintendo Switch 2",
];

export const getGame = (slug: string): Game | undefined =>
  games.find((g) => g.slug === slug);

export const years = games.map((g) => g.year);
export const firstYear = Math.min(...years);
export const lastYear = Math.max(...years);

export const featuredSlugs = [
  "tears-of-the-kingdom",
  "breath-of-the-wild",
  "echoes-of-wisdom",
  "links-awakening-switch",
  "skyward-sword",
  "a-link-to-the-past",
];

/** Do mais antigo ao mais recente (usado na história e na navegação anterior/próximo). */
export const gamesChronological: Game[] = [...games].sort(
  (a, b) => a.year - b.year,
);
