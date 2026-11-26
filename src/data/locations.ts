export interface Location {
  slug: string;
  name: string;
  kind: string;
  region: string;
  highlight: string;
  /** polígono da região no mapa ilustrativo (viewBox 0 0 310 260) */
  points: string;
}

// O mapa é ilustrativo (sem escala): cada região é só um "pedaço" clicável.
export const locations: Location[] = [
  {
    slug: "floresta-perdida",
    name: "Floresta Perdida",
    kind: "Floresta sagrada",
    region: "Bosque dos Kokiri",
    highlight: "Labirinto de névoa e mistério ligado ao povo da floresta",
    points: "10,50 90,15 120,90 40,120",
  },
  {
    slug: "castelo-de-hyrule",
    name: "Castelo de Hyrule",
    kind: "Fortaleza real",
    region: "Coração do reino",
    highlight: "Lar da família real e da princesa Zelda",
    points: "90,15 170,30 190,95 120,90",
  },
  {
    slug: "montanha-da-morte",
    name: "Montanha da Morte",
    kind: "Vulcão",
    region: "Terras dos Gorons",
    highlight: "Montanha de fogo habitada pelos Gorons",
    points: "170,30 260,15 295,80 250,120 190,95",
  },
  {
    slug: "vila-kakariko",
    name: "Vila Kakariko",
    kind: "Vila",
    region: "Hyrule",
    highlight: "Vila tranquila que aparece em vários jogos da série",
    points: "40,120 120,90 100,170 20,190",
  },
  {
    slug: "templo-do-tempo",
    name: "Templo do Tempo",
    kind: "Templo",
    region: "Cidadela de Hyrule",
    highlight: "Onde repousa a Master Sword em Ocarina of Time",
    points: "120,90 190,95 180,175 100,170",
  },
  {
    slug: "dominio-zora",
    name: "Domínio Zora",
    kind: "Reino aquático",
    region: "Nascente do rio",
    highlight: "Lar dos Zoras, o povo das águas",
    points: "190,95 250,120 260,190 180,175",
  },
  {
    slug: "deserto-gerudo",
    name: "Deserto Gerudo",
    kind: "Deserto",
    region: "Terras dos Gerudo",
    highlight: "Território do povo Gerudo, de onde vem Ganondorf",
    points: "20,190 100,170 150,240 60,245",
  },
  {
    slug: "lago-hylia",
    name: "Lago Hylia",
    kind: "Lago",
    region: "Sul de Hyrule",
    highlight: "O maior lago do reino, presente em vários jogos",
    points: "100,170 180,175 260,190 240,245 150,240",
  },
];
