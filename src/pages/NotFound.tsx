import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty">
      <h1 className="page-title">404</h1>
      <p>Essa região de Hyrule ainda não foi explorada.</p>
      <Link to="/" className="btn btn--primary">
        Voltar ao início
      </Link>
    </div>
  );
}
