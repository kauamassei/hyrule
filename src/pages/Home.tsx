import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import {
  featuredSlugs,
  firstYear,
  games,
  getGame,
  lastYear,
  platformOrder,
} from "../data/games";
import { mainCharacters } from "../data/characters";
import type { Game } from "../data/types";
import GameCard from "../components/GameCard";
import CoverImage from "../components/CoverImage";
import LocationExplorer from "../components/LocationExplorer";
import PlatformTags from "../components/PlatformTags";
import SectionHeader from "../components/SectionHeader";
import heroBg from "../assets/hero-bg.png";
import linkRender from "../assets/link-render.png";

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => getGame(slug))
    .filter((g): g is Game => g !== undefined);

  const platforms = platformOrder
    .map((name) => ({
      name,
      count: games.filter((g) => g.platforms.includes(name)).length,
    }))
    .filter((p) => p.count > 0);

  const latest = [...games]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  return (
    <>
      <section className="hero" id="inicio">
        <img className="hero__bg" src={heroBg} alt="" />
        <div className="hero__shade" />

        <h1 className="hero__title">
          <span>The Legend of</span>
          <b>Zelda</b>
        </h1>



        <div className="hero__right">
          <p className="hero__lead">
            Em um reino de lendas, entre a Triforce e a Master Sword, um herói
            desperta para proteger Hyrule. Explore {lastYear - firstYear} anos
            de jogos, personagens e lugares da série.
          </p>

          <div className="hero__actions">
            <Link to="/games" className="btn btn--primary">
              <Play size={16} aria-hidden="true" />
              Explorar jogos
            </Link>
            <Link to="/story" className="btn btn--ghost">
              Ler a história
            </Link>
          </div>

          <LocationExplorer />
        </div>
      </section>

      <div className="home-body">
        <dl className="statbar">
          <div>
            <dt>Anos de lenda</dt>
            <dd>{lastYear - firstYear}</dd>
          </div>
          <div>
            <dt>Jogos</dt>
            <dd>{games.length}</dd>
          </div>
          <div>
            <dt>Plataformas</dt>
            <dd>{platforms.length}</dd>
          </div>
          <div>
            <dt>Último lançamento</dt>
            <dd>{lastYear}</dd>
          </div>
        </dl>

        <section className="section" id="novidades">
          <SectionHeader
            title="Novidades"
            subtitle="Os lançamentos mais recentes da série"
            to="/games"
            linkLabel="Ver coleção"
          />
          <ol className="ranklist">
            {latest.map((game, index) => (
              <li key={game.slug}>
                <Link to={`/games/${game.slug}`} className="rank">
                  <span className="rank__n">{index + 1}</span>
                  <CoverImage game={game} className="cover--square" />
                  <div className="rank__info">
                    <strong>{game.title}</strong>
                    <PlatformTags platforms={game.platforms} />
                  </div>
                  <span className="rank__year">{game.year}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" id="jogos">
          <SectionHeader
            title="Em destaque"
            subtitle="Alguns dos jogos mais marcantes da série"
            to="/games"
            linkLabel="Todos os jogos"
          />
          <div className="rail">
            {featured.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>

        <section className="section" id="plataformas">
          <SectionHeader
            title="Navegue por plataforma"
            subtitle="Do NES ao Switch 2"
          />
          <div className="platform-grid">
            {platforms.map((p) => (
              <Link
                key={p.name}
                to={`/games?platform=${encodeURIComponent(p.name)}`}
                className="platform-tile"
              >
                <strong>{p.name}</strong>
                <span>
                  {p.count} {p.count === 1 ? "jogo" : "jogos"}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" id="personagens">
          <SectionHeader
            title="Personagens"
            subtitle="Os nomes que definem a lenda"
            to="/characters"
          />
          <div className="people">
            {mainCharacters.map((c) => (
              <Link to="/characters" key={c.slug} className="person">
                <img src={c.image} alt={c.name} loading="lazy" />
                <div className="person__info">
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}