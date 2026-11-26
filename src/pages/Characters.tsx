import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { mainCharacters } from "../data/characters";
import { useCharacters } from "../hooks/useCharacters";
import { normalize } from "../utils";

const FALLBACK = "Sem descrição disponível";

export default function Characters() {
  const { characters, loading, error } = useCharacters();
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    const t = normalize(term.trim());
    return characters.filter((c) => normalize(c.name).includes(t));
  }, [characters, term]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Personagens</h1>
          <p className="page-sub">Quem vive, luta e governa em Hyrule</p>
        </div>
      </div>

      <div className="people people--large">
        {mainCharacters.map((c) => (
          <article key={c.slug} className="person-card">
            <img src={c.image} alt={c.name} loading="lazy" />
            <div className="person-card__body">
              <span className="eyebrow">{c.role}</span>
              <h2>{c.name}</h2>
              <p>{c.description}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="section">
        <div className="section__head">
          <div>
            <h2>Outros personagens</h2>
            <p>
              {loading
                ? "Carregando…"
                : error
                  ? "Não foi possível carregar"
                  : `${filtered.length} de ${characters.length}`}
            </p>
          </div>
          <label className="field field--small">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Buscar por nome"
              aria-label="Buscar personagem"
            />
          </label>
        </div>

        {loading && (
          <div className="npc-grid" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
        )}

        {error && (
          <div className="empty">
            <h3>Não foi possível carregar essas informações</h3>
            <p>A API de personagens está indisponível no momento. Tente novamente mais tarde.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="npc-grid">
            {filtered.map((c) => (
              <article key={c.id} className="npc">
                <h3>{c.name}</h3>
                <p>{c.description || FALLBACK}</p>
                <div className="tags">
                  <span className="tag">Raça: {c.race || "—"}</span>
                  <span className="tag">Gênero: {c.gender || "—"}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
