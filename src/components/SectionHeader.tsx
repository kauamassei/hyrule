import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  to?: string;
  linkLabel?: string;
}

export default function SectionHeader({ title, subtitle, to, linkLabel }: Props) {
  return (
    <div className="section__head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="link-more">
          {linkLabel ?? "Ver tudo"}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
