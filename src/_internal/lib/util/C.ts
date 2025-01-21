export function C<T>(value: T): (...args: unknown[]) => T {
  return () => value;
}
