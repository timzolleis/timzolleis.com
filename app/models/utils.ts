import localforage from 'localforage'

export async function getOrDefaultValue<T>(key: string, defaultValue: T): Promise<T> {
  return (await localforage.getItem<T>(key)) ?? defaultValue
}
