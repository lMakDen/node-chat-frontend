import { useEffect } from "react";

function useOnClickOutside(el, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!el || el.contains(event.target)) {
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
    [el, handler]
  );
}

export default useOnClickOutside;