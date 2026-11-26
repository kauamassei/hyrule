import { useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { locations } from "../data/locations";

function centroid(points: string): [number, number] {
  const pts = points
    .trim()
    .split(/\s+/)
    .map((p) => p.split(",").map(Number));
  const x = pts.reduce((sum, p) => sum + p[0], 0) / pts.length;
  const y = pts.reduce((sum, p) => sum + p[1], 0) / pts.length;
  return [x, y];
}

export default function LocationExplorer() {
  const [index, setIndex] = useState(1);
  const current = locations[index];

  const go = (step: number) =>
    setIndex((i) => (i + step + locations.length) % locations.length);

  const onKey = (event: KeyboardEvent<SVGGElement>, i: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIndex(i);
    }
  };

  const [cx, cy] = centroid(current.points);

  return (
    <div className="loc" id="locais">
      <div className="loc-card" aria-live="polite">
        <button
          type="button"
          className="loc-card__arrow loc-card__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Local anterior"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        <h3>Local: {current.name}</h3>
        <dl>
          <div>
            <dt>Tipo:</dt>
            <dd>{current.kind}</dd>
          </div>
          <div>
            <dt>Região:</dt>
            <dd>{current.region}</dd>
          </div>
          <div>
            <dt>Destaque:</dt>
            <dd>{current.highlight}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="loc-card__arrow loc-card__arrow--next"
          onClick={() => go(1)}
          aria-label="Próximo local"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      <svg
        className="loc-map"
        viewBox="0 0 310 260"
        role="group"
        aria-label="Mapa ilustrativo de Hyrule"
      >
        {locations.map((loc, i) => {
          const [x, y] = centroid(loc.points);
          const active = i === index;
          return (
            <g
              key={loc.slug}
              className={active ? "loc-cell is-active" : "loc-cell"}
              role="button"
              tabIndex={0}
              aria-label={loc.name}
              aria-pressed={active}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <title>{loc.name}</title>
              <polygon points={loc.points} />
              <text x={x} y={y + 4} textAnchor="middle">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        <circle className="loc-pin__halo" cx={cx} cy={cy - 14} r="11" />
        <circle className="loc-pin" cx={cx} cy={cy - 14} r="5" />
      </svg>
      <p className="loc__caption">Mapa ilustrativo, sem escala</p>
    </div>
  );
}
