import { useEffect } from "react";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Gamepad2, LayoutGrid, ScrollText, Search, Users } from "lucide-react";
import { firstYear, lastYear } from "../data/games";
import triforce from "../assets/triforce.png";

const navItems = [
  { to: "/", label: "Início", icon: LayoutGrid, end: true },
  { to: "/games", label: "Jogos", icon: Gamepad2, end: false },
  { to: "/characters", label: "Personagens", icon: Users, end: false },
  { to: "/story", label: "História", icon: ScrollText, end: false },
];

// Atalhos do topo da página inicial (rolam até cada seção)
const homeTabs = [
  { id: "inicio", label: "A lenda" },
  { id: "locais", label: "Locais" },
  { id: "novidades", label: "Novidades" },
  { id: "jogos", label: "Jogos" },
  { id: "personagens", label: "Personagens" },
];

function scrollToSection(id: string) {
  if (id === "inicio") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Layout() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/games?q=${encodeURIComponent(term)}` : "/games");
    setQuery("");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <Link to="/" className="brand" aria-label="Hyrule - início">
          <img src={triforce} alt="" width={28} height={28} />
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              aria-label={label}
              data-label={label}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <Icon size={21} aria-hidden="true" />
              <span className="nav__label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <span className="sidebar__foot">
          {firstYear} – {lastYear}
        </span>
      </aside>

      <div className={isHome ? "main main--home" : "main"}>
        <header className={isHome ? "topbar topbar--home" : "topbar"}>
          <Link to="/" className="brand brand--mobile" aria-label="Hyrule - início">
            <img src={triforce} alt="" width={26} height={26} />
          </Link>

          {isHome && (
            <nav className="tabs" aria-label="Seções da página inicial">
              {homeTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          )}

          <form
            className={isHome ? "search search--compact" : "search"}
            onSubmit={onSubmit}
            role="search"
          >
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar jogos"
              aria-label="Buscar jogos"
            />
          </form>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="footer">
          The Legend of Zelda é uma marca da Nintendo. Projeto de fã, sem fins
          comerciais.
        </footer>
      </div>
    </div>
  );
}
