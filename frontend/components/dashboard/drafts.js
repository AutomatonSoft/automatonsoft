// Unsaved edits of a project, kept until it is saved or the copy is discarded. `id` is the project id or 'new'.
// The text goes into localStorage, so it survives a reload or a closed tab. Picked pictures are too large for it and
// stay in memory only, as does the text when the browser refuses to store it (private mode, full storage).
const PREFIX = 'admin-draft:';
const texts = new Map(); // id → draft that could not be stored
const pictures = new Map(); // id → File[]

export function readDraft(id) {
  if (texts.has(id)) return texts.get(id);
  try {
    return JSON.parse(window.localStorage.getItem(PREFIX + id));
  } catch {
    return null;
  }
}

export function writeDraft(id, draft) {
  try {
    window.localStorage.setItem(PREFIX + id, JSON.stringify(draft));
    texts.delete(id);
    return true;
  } catch {
    texts.set(id, draft);
    return false;
  }
}

export function removeTextDraft(id) {
  texts.delete(id);
  try {
    window.localStorage.removeItem(PREFIX + id);
  } catch {
    // Nothing was stored, so there is nothing to remove.
  }
}

export const readPictures = (id) => pictures.get(id) || [];

export function keepPictures(id, files) {
  if (files.length) pictures.set(id, files);
  else pictures.delete(id);
}

export function removeDraft(id) {
  removeTextDraft(id);
  pictures.delete(id);
}

export const hasDraft = (id) => pictures.has(id) || Boolean(readDraft(id));

// Whether closing or reloading the page would lose something.
export const wouldLoseWork = () => pictures.size > 0 || texts.size > 0;
