type SaveFromLocalStorage<T> = {
  value: T;
  key: string;
};

export function saveToLocalStorage<T>({ value, key }: SaveFromLocalStorage<T>) {
  try {
    const serialisedState = JSON.stringify(value);
    localStorage.setItem(key, serialisedState);
  } catch (error) {
    console.warn(error);
  }
}

type ReadFromLocalStorage<T> = {
  key: string;
  fallbackValue: T;
};

export function readFromLocalStorage<T>({
  key,
  fallbackValue,
}: ReadFromLocalStorage<T>) {
  try {
    const serialisedState = localStorage.getItem(key);
    if (!serialisedState) {
      return fallbackValue;
    }
    return JSON.parse(serialisedState);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

export function removeStorageValue(key: string) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}
