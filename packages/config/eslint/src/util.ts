export type AwaitedModule<T> = Promise<T> | T

export async function interopDefault<T>(
  m: AwaitedModule<T>
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}
