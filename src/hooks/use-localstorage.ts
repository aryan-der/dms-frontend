import { useSyncExternalStore } from "react"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener("localstorage-update", callback)

  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("localstorage-update", callback)
  }
}

const cache = new Map<string, { raw: string | null; parsed: unknown | null }>()

function getSnapshot<T>(key: string): T | null {
  if (typeof window === "undefined") return null

  const current = localStorage.getItem(key)

  const cached = cache.get(key)

  if (cached?.raw === current) {
    return cached.parsed as T | null
  }

  try {
    const parsed = current ? JSON.parse(current) : null
    cache.set(key, { raw: current, parsed })
    return parsed
  } catch {
    cache.set(key, { raw: current, parsed: null })
    return null
  }
}

export default function useLocalStorage<T = unknown>(key: string) {
  const value = useSyncExternalStore(
    subscribe,
    () => getSnapshot<T>(key),
    () => null
  )

  const setValue = (data: T) => {
    localStorage.setItem(key, JSON.stringify(data))
    window.dispatchEvent(new Event("localstorage-update"))
  }

  const removeValue = () => {
    localStorage.removeItem(key)
    window.dispatchEvent(new Event("localstorage-update"))
  }

  return { value, setValue, removeValue }
}
