import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { firstYear, games, lastYear, platformOrder } from "../data/games";
import type { Platform } from "../data/types";
import GameCard from "../components/GameCard";
import { normalize } from "../utils";

type SortKey = "newest" | "oldest" | "az";
type KindKey = "all" | "original" | "remake" | "spinoff";

const kinds: { value: KindKey; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "original", label: "Originais" },
  { value: "remake", label: "Remakes" },
  { value: "spinoff", label: "Spin-offs" },
];

export default function Games() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const platform = params.get("platform") ?? "all";
  const sort = (params.get("sort") ?? "newest") as SortKey;
  const kind = (params.get("kind") ?? "all") as KindKey;

  const setParam = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const platforms = useMemo(
    () =>
      platformOrder
        .map((name) => ({
          name,
          count: games.filter((g) => g.platforms.includes(name)).length,
        }))
        .filter((p) => p.count > 0),
    [],
  );

  const visible = useMemo(() => {
    const term = normalize(q.trim());
    const list = games.filter(
      (g) =>
        (platform === "all" || g.platforms.includes(platform as Platform)) &&
        (kind === "all" || g.kind === kind) &&
        (!term ||
          normalize(`${g.title} ${g.platforms.join(" ")} ${g.year}`).includes(
            term,
          )),
    );

    return list.sort((a, b) => {
      if (sort === "oldest") return a.year - b.year;
      if (sort === "az") return a.title.localeCompare(b.title, "pt-BR");
      return b.year - a.year || a.title.localeCompare(b.title, "pt-BR");
    });
  }, [q, platform, kind, sort]);

  const hasFilters = q !== "" || platform !== "all" || kind !== "all";

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Jogos</h1>
          <p className="page-sub">
            {firstYear} – {lastYear} · {visible.length}{" "}
            {visible.length === 1 ? "título" : "títulos"}
          </p>
        </div>
      </div>

      <div className="toolbar">
        <label className="field">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setParam("q", e.target.value, "")}
            placeholder="Filtrar por nome, plataforma ou ano"
          />
        </label>

        <div className="segmented" role="group" aria-label="Tipo de lançamento">
          {kinds.map((k) => (
            <button
              key={k.value}
              type="button"
              className={kind === k.value ? "is-active" : undefined}
              onClick={() => setParam("kind", k.value, "all")}
            >
              {k.label}
            </button>
          ))}
        </div>

        <select
          className="select"
          value={sort}
          onChange={(e) => setParam("sort", e.target.value, "newest")}
          aria-label="Ordenar por"
        >
          <option value="newest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="az">A – Z</option>
        </select>
      </div>

      <div className="chips" role="group" aria-label="Plataformas">
        <button
          type="button"
          className={`chip ${platform === "all" ? "is-active" : ""}`}
          onClick={() => setParam("platform", "all", "all")}
        >
          Todas
        </button>
        {platforms.map((p) => (
          <button
            key={p.name}
            type="button"
            className={`chip ${platform === p.name ? "is-active" : ""}`}
            onClick={() => setParam("platform", p.name, "all")}
          >
            {p.name} <small>{p.count}</small>
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid">
          {visible.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>Nenhum jogo encontrado</h3>
          <p>Tente outro termo ou remova alguns filtros.</p>
          {hasFilters && (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setParams({}, { replace: true })}
            >
              <X size={16} aria-hidden="true" />
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </>
  );
}
