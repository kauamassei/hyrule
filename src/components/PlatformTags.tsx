import type { Platform } from "../data/types";

interface Props {
  platforms: Platform[];
  max?: number;
}

export default function PlatformTags({ platforms, max }: Props) {
  const shown = max ? platforms.slice(0, max) : platforms;
  const hidden = platforms.length - shown.length;

  return (
    <div className="tags">
      {shown.map((p) => (
        <span key={p} className="tag">
          {p}
        </span>
      ))}
      {hidden > 0 && <span className="tag tag--more">+{hidden}</span>}
    </div>
  );
}
