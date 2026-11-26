import type { Game } from "../data/types";

interface Props {
  game: Game;
  className?: string;
  eager?: boolean;
}

function Triforce() {
  return (
    <svg viewBox="0 0 100 72" aria-hidden="true" className="cover__triforce">
      <polygon points="50,6 36,34 64,34" />
      <polygon points="36,38 22,66 50,66" />
      <polygon points="64,38 50,66 78,66" />
    </svg>
  );
}

/**
 * Capas têm proporções diferentes (banners largos e capas quadradas).
 * Para as quadradas, usamos a própria imagem desfocada como fundo.
 * Jogos sem arquivo de capa mostram uma capa provisória.
 */
export default function CoverImage({ game, className = "", eager }: Props) {
  if (!game.cover) {
    return (
      <div
        className={`cover cover--placeholder ${className}`}
        role="img"
        aria-label={`Capa de ${game.title} (em breve)`}
      >
        <Triforce />
        <span>Capa em breve</span>
      </div>
    );
  }

  const contain = game.fit === "contain";
  const classes = [
    "cover",
    contain ? "cover--contain" : "",
    game.pixel ? "cover--pixel" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {contain && (
        <img
          className="cover__blur"
          src={game.cover}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      )}
      <img
        className="cover__img"
        src={game.cover}
        alt={`Capa de ${game.title}`}
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );
}
