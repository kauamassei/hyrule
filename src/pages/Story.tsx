import { Link } from "react-router-dom";
import { gamesChronological } from "../data/games";
import type { Game } from "../data/types";
import historyBg from "../assets/history-bg.webp";

const paragraphs = [
  "The Legend of Zelda é uma série de jogos de ação-aventura criada em 1986 por Shigeru Miyamoto e Takashi Tezuka, publicada principalmente pela Nintendo. Situada no reino fictício de Hyrule, a franquia combina aventura, RPG e resolução de quebra-cabeças.",
  "O protagonista, Link, é um jovem herói Hylian que frequentemente protege a princesa Zelda e o reino contra o vilão Ganon, além de buscar a Triforce, uma relíquia das deusas criadoras de Hyrule.",
  "Desde o lançamento do primeiro jogo, a série conta com mais de 20 títulos principais, spin-offs, adaptações em mangá e uma série animada de 1989. Reconhecida como uma das franquias mais influentes e bem-sucedidas da Nintendo, muitos de seus jogos são aclamados como alguns dos melhores de todos os tempos.",
];

const facts = [
  { label: "Criação", value: "1986" },
  { label: "Criadores", value: "Miyamoto e Tezuka" },
  { label: "Editora", value: "Nintendo" },
  { label: "Reino", value: "Hyrule" },
];

function groupByDecade(list: Game[]): [string, Game[]][] {
  const groups = new Map<string, Game[]>();
  for (const game of list) {
    const decade = `${Math.floor(game.year / 10) * 10}s`;
    groups.set(decade, [...(groups.get(decade) ?? []), game]);
  }
  return Array.from(groups.entries());
}

export default function Story() {
  const decades = groupByDecade(gamesChronological);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">História</h1>
          <p className="page-sub">De uma aventura no NES a uma saga de gerações</p>
        </div>
      </div>

      <section className="story">
        <img className="story__bg" src={historyBg} alt="" />
        <div className="story__text">
          <span className="eyebrow">The Legend of Zelda</span>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <h2>Linha do tempo dos lançamentos</h2>
            <p>Os jogos catalogados, década por década</p>
          </div>
        </div>

        <div className="timeline">
          {decades.map(([decade, list]) => (
            <div key={decade} className="decade">
              <h3>{decade}</h3>
              <ul>
                {list.map((game) => (
                  <li key={game.slug}>
                    <Link to={`/games/${game.slug}`}>
                      <span className="decade__year">{game.year}</span>
                      <strong>{game.title}</strong>
                      <small>{game.platforms.join(" · ")}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
