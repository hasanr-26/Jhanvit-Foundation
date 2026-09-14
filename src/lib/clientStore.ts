'use client';

import { useSyncExternalStore } from 'react';

/**
 * Wraps a localStorage-backed value as a React external store.
 *
 * Reading localStorage inside useEffect + setState causes a cascading render
 * on every page, and admin edits only show up after a refresh. Going through
 * useSyncExternalStore instead gives us the server snapshot during hydration,
 * the stored value straight after, and a live update in every mounted
 * component the moment the admin saves — including other browser tabs.
 */
export function createClientStore<T>(key: string, read: () => T, serverValue: T) {
  let cache: { raw: string | null; value: T } | null = null;
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((listener) => listener());

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    // `storage` only fires in *other* tabs, so saves in this tab call notify().
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === key) listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  // Must return a stable reference while the underlying string is unchanged,
  // otherwise React re-renders forever.
  const getSnapshot = (): T => {
    const raw = localStorage.getItem(key);
    if (!cache || cache.raw !== raw) {
      cache = { raw, value: read() };
    }
    return cache.value;
  };

  const getServerSnapshot = (): T => serverValue;

  return {
    /** Call after every write so mounted components pick the change up. */
    notify: () => {
      cache = null;
      emit();
    },
    useValue: () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  };
}
