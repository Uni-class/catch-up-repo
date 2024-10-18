"use client";

import { useLoginRedirect } from "@/hook/useLoginRedirect";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string; status: number };
    reset: () => void;
}) {
    useLoginRedirect(error);
    return <h1>{error.message}</h1>;
}
