"use client";

import { useEffect } from "react";

interface PropType {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: PropType) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <h1>{`에러:${error.message}`}</h1>;
}
