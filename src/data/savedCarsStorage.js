// Lightweight saved-cars store using localStorage
const KEY = 'autohub_saved_cars';

export const getSavedIds = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const saveCarId = (id) => {
  const ids = getSavedIds();
  if (!ids.includes(id)) {
    localStorage.setItem(KEY, JSON.stringify([...ids, id]));
  }
};

export const unsaveCarId = (id) => {
  const ids = getSavedIds().filter((i) => i !== id);
  localStorage.setItem(KEY, JSON.stringify(ids));
};

export const isCarSaved = (id) => getSavedIds().includes(id);
