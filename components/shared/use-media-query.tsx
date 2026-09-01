"use client";

import { useEffect, useState } from "react";

/*
  Reads a media query on the client without breaking server rendering.
  Returns false on the first render, then the real value once mounted.
*/
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    function update() {
      setMatches(media.matches);
    }

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
