import { useState, useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
};

const useElementQuadrant = (ref) => {
  const [quadrant, setQuadrant] = useState({ x: 0, y: 0 });

  let viewportWidth = null;
  let viewportHeight = null;
  let page_section = null;
  if (typeof window !== "undefined") {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    page_section = document.getElementsByClassName("page-section");
  }

  useEffect(() => {
    if (!viewportWidth || !viewportHeight) {
      return false;
    }
    if (!ref || !ref.current) {
      return false;
    }
    if (!page_section || page_section.length !== 1) {
      return false;
    }

    const updateQuadrant = () => {
      if (!ref || !ref.current) {
        // questo controlle deve essere ripetuto perchè, nella tabella
        //  se visualizzo 30 record, apro il contextual sulle ultime righe
        //  e poi visualizzo 10 record, da un errore perchè non trova il ref..
        //  Il controllo sopra non funziona perchè la funzione dello useEffect
        //  non cambia perchè non cambiano le dipendenze
        return false;
      }
      const rect = ref.current.getBoundingClientRect();
      let x = 0;
      let y = 0;
      if (rect.left > viewportWidth / 2) {
        x = 1;
      }
      if (rect.top > viewportHeight / 2) {
        y = 1;
      }
      setQuadrant({ x, y });
    };
    page_section[0].addEventListener("scroll", updateQuadrant);
    updateQuadrant();
    return () => {
      if (!page_section || page_section.length !== 1) {
        return false;
      }
      return page_section[0].removeEventListener("scroll", updateQuadrant);
    };
  }, [ref, page_section, viewportWidth, viewportHeight]);

  return quadrant;
};

// const useElementPosition = (ref) => {
//   const [position, setPosition] = useState({ left: 0, top: 0 });

//   let page_section = null;
//   if (typeof window !== "undefined") {
//     page_section = document.getElementsByClassName("page-section");
//   }

//   useEffect(() => {
//     if (!ref || !ref.current) {
//       return false;
//     }
//     if (!page_section || page_section.length !== 1) {
//       return false;
//     }

//     const updatePosition = () => {
//       const rect = ref.current.getBoundingClientRect();
//       setPosition({ left: rect.left, top: rect.top });
//     };
//     page_section[0].addEventListener("scroll", updatePosition);
//     updatePosition();
//     return () => page_section[0].removeEventListener("scroll", updatePosition);
//   }, [ref, page_section]);

//   return position;
// };

export { useOnClickOutside, useElementQuadrant };
