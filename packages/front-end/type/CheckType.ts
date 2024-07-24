/**
 * Generic type representing a checkbox state.
 * @template K - The type of the id in origin data.
 */
export type CheckType<K=number> = { id: K; checked: boolean };