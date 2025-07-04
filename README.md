# React + Vite

To restrict multiple tabs for a React application (i.e., prevent users from opening and using the app in more than one browser tab),

/* Notes
───────────────────────────────────────────────────────────────
• Dashboard checks `editing-item-lock` in localStorage and refuses to open a new edit tab if another item is locked.
• EditPage sets that lock on mount and marks `isReleased = true` on unload.
• Cross‑tab communication relies on the browser's `storage` event.
• Works per browser & origin; multiple devices/browsers will each allow one tab.
*/