# Hyrule

Conheça o mundo de The Legend of Zelda: jogos, histórias e personagens.

Refeito do zero com **React + TypeScript + Vite**.

## Rodando

```bash
npm install
npm run dev
```

Build de produção: `npm run build` (saída em `dist/`).

## Estrutura

- `src/data` – lista de jogos e personagens (tipados)
- `src/pages` – Início, Jogos, Detalhe do jogo, Personagens, História
- `src/components` – layout, cards, hero etc.
- `src/hooks` – `useCharacters` (consome a Zelda Fan API)
- `src/styles` – CSS global com variáveis de tema

As rotas usam `HashRouter`, então o site funciona no GitHub Pages sem configuração extra.

## Adicionando capas de jogos

Salve a imagem em `src/assets/games/` com o mesmo nome do `slug` do jogo
(`.webp`, `.jpg` ou `.png`). Ela é detectada automaticamente. Jogos sem arquivo
mostram uma capa provisória.

Capas que ainda faltam:

- `ocarina-of-time-switch-2` (Ocarina of Time Remake, 2026)
- `hyrule-warriors-age-of-imprisonment` (2025)

## Mapa de locais

Os locais do mapa da página inicial ficam em `src/data/locations.ts`
(cada um tem um polígono SVG no mapa ilustrativo).
