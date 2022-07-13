import React from "react";

const options = {
  root: null,
  rootMargin: "200px",
  threshold: 0,
};

export default function useIntersectionObserver(ref, callback, dependencies = []) {
  const onIntersection = ([entry], _observer) => {
    if (entry.isIntersecting) {
      callback();
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, dependencies);

  return [ref];
}
