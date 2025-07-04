import { useEffect } from 'react';

const EDIT_LOCK_KEY = 'editing-item-lock';

export function useEditLock(itemId) {
  useEffect(() => {
    // Set lock when component mounts (tab opens)
    const lock = { itemId, isReleased: false, ts: Date.now() };
    localStorage.setItem(EDIT_LOCK_KEY, JSON.stringify(lock));

    // Release on unload
    const handleUnload = () => {
      const l = JSON.parse(localStorage.getItem(EDIT_LOCK_KEY));
      if (l) {
        l.isReleased = true;
        localStorage.setItem(EDIT_LOCK_KEY, JSON.stringify(l));
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [itemId]);
}

export function isAnotherItemBeingEdited() {
  const lock = JSON.parse(localStorage.getItem(EDIT_LOCK_KEY));
  return lock && !lock.isReleased;
}

export const EDIT_LOCK_KEY_CONST = EDIT_LOCK_KEY;