import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Game } from "../data/types";
import { kindLabel } from "../data/games";
import CoverImage from "./CoverImage";
import PlatformTags from "./PlatformTags";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link to={`/games/${game.slug}`} className="card">
      <div className="card__media">
        <CoverImage game={game} />
        <span className="badge">{game.year}</span>
        {game.kind !== "original" && (
          <span className="badge badge--right">{kindLabel[game.kind]}</span>
        )}
      </div>
      <div className="card__body">
        <div className="card__row">
          <h3 className="card__title">{game.title}</h3>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
        <PlatformTags platforms={game.platforms} max={2} />
      </div>
    </Link>
  );
}
