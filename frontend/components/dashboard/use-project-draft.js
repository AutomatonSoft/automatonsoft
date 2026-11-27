import { useEffect, useState } from 'react';
import { keepPictures, readDraft, readPictures, removeDraft, removeTextDraft, writeDraft } from '@/components/dashboard/drafts';

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Form state that cannot get lost: every change is copied aside, and a copy found on opening is offered back.
// `toValues(project)` is the form as the server has the project; `merge(base, stored)` lays a stored copy over it, so
// fields the copy does not know keep the server's value.
export function useProjectDraft(project, toValues, merge) {
  const id = project.id || 'new';
  const [source, setSource] = useState(project);
  const [base, setBase] = useState(() => toValues(project));
  const [values, setValues] = useState(base);
  const [files, setFiles] = useState(() => readPictures(id));
  // A stored copy that differs from the server and still waits for "restore" or "discard".
  const [found, setFound] = useState(() => {
    const draft = readDraft(id);
    return draft && !same(merge(base, draft.values), base) ? draft : null;
  });
  const [copiedAt, setCopiedAt] = useState(null);

  // The saved project came back from the server: the form starts again from it. Done while rendering, so that no
  // effect sees the new project together with the old values.
  if (source !== project) {
    const next = toValues(project);
    setSource(project);
    setBase(next);
    setValues(next);
    setFiles([]);
    setFound(null);
  }
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
    found: found && { savedAt: found.savedAt, outdated: !same(merge(base, found.base), base) },
    restore: () => { setValues(merge(base, found.values)); setFound(null); },
    discard: () => { removeDraft(id); setFiles([]); setFound(null); },
  };
}
