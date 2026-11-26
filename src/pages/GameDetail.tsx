import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { games, gamesChronological, getGame, kindLabel } from "../data/games";
import CoverImage from "../components/CoverImage";
import GameCard from "../components/GameCard";
import PlatformTags from "../components/PlatformTags";
import SectionHeader from "../components/SectionHeader";
import NotFound from "./NotFound";

export default function GameDetail() {
  const { slug = "" } = useParams();
  const game = getGame(slug);

  if (!game) return <NotFound />;

  const related = games
    .filter(
      (g) =>
        g.slug !== game.slug &&
        g.platforms.some((p) => game.platforms.includes(p)),
    )
    .sort((a, b) => Math.abs(a.year - game.year) - Math.abs(b.year - game.year))
    .slice(0, 4);

  const index = gamesChronological.findIndex((g) => g.slug === game.slug);
  const previous = gamesChronological[index - 1];
  const next = gamesChronological[index + 1];

  return (
    <>
      <Link to="/games" className="back">
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar para os jogos
      </Link>

      <section className="detail">
        {game.cover && (
          <img className="detail__bg" src={game.cover} alt="" aria-hidden="true" />
        )}

        <CoverImage game={game} className="detail__cover" eager />

        <div className="detail__info">
          <span className="eyebrow">The Legend of Zelda</span>
          <h1>{game.title}</h1>

          <div className="meta">
            <span className="pill">
              <Calendar size={14} aria-hidden="true" />
              {game.year}
            </span>
            <span className="pill">
              {game.kind === "original" ? "Lançamento original" : kindLabel[game.kind]}
            </span>
          </div>

          <PlatformTags platforms={game.platforms} />
          <p className="detail__text">{game.description}</p>
        </div>
      </section>

      <nav className="pager" aria-label="Linha do tempo">
        {previous ? (
          <Link to={`/games/${previous.slug}`} className="pager__item">
            <small>
              <ArrowLeft size={14} aria-hidden="true" /> Anterior · {previous.year}
            </small>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/games/${next.slug}`}
            className="pager__item pager__item--next"
          >
            <small>
              Próximo · {next.year} <ArrowRight size={14} aria-hidden="true" />
            </small>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {related.length > 0 && (
        <section className="section">
          <SectionHeader
            title="Mais nas mesmas plataformas"
            to="/games"
            linkLabel="Todos os jogos"
          />
          <div className="grid">
            {related.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
