import { useEffect, useState } from "react";
import type { ApiCharacter } from "../data/types";

const URL = "https://zelda.fanapis.com/api/characters?limit=100";

interface State {
  characters: ApiCharacter[];
  loading: boolean;
  error: boolean;
}

export function useCharacters(): State {
  const [state, setState] = useState<State>({
    characters: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ data: ApiCharacter[] }>;
      })
      .then((json) =>
        setState({ characters: json.data, loading: false, error: false }),
      )
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ characters: [], loading: false, error: true });
      });

    return () => controller.abort();
  }, []);

  return state;
}
