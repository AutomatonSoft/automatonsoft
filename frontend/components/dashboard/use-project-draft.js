import { useEffect, useState } from 'react';
import { keepPictures, readDraft, readPictures, removeDraft, removeTextDraft, writeDraft } from '@/components/dashboard/drafts';

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Form state that cannot get lost: every change is copied aside, and a copy found on opening is offered back.
// `initial` is the form as the server has the project.
export function useProjectDraft(id, initial) {
  const [base] = useState(initial);
  const [values, setValues] = useState(base);
  const [files, setFiles] = useState(() => readPictures(id));
  // A stored copy that differs from the server and still waits for "restore" or "discard".
  const [found, setFound] = useState(() => {
    const draft = readDraft(id);
    return draft && !same({ ...base, ...draft.values }, base) ? draft : null;
  });
  const [copiedAt, setCopiedAt] = useState(null);
  const changed = !same(values, base);

  useEffect(() => {
    if (found) return; // the waiting copy must not be overwritten
    if (!changed) { removeTextDraft(id); setCopiedAt(null); return; }
    const savedAt = Date.now();
    setCopiedAt(writeDraft(id, { savedAt, base, values }) ? savedAt : null);
  }, [id, base, values, changed, found]);

  useEffect(() => { keepPictures(id, files); }, [id, files]);

  return {
    values,
    setValues,
    files,
    setFiles,
    copiedAt,
    dirty: changed || files.length > 0,
    found: found && { savedAt: found.savedAt, outdated: !same(found.base, base) },
    restore: () => { setValues({ ...base, ...found.values }); setFound(null); },
    discard: () => { removeDraft(id); setFiles([]); setFound(null); },
  };
}
