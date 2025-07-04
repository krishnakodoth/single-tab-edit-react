import { useEffect, useState } from 'react';
import { items } from '../data/items';
import { EDIT_LOCK_KEY_CONST } from '../hooks/useEditLock';

export default function Dashboard() {
  const [warning, setWarning] = useState('');

  const handleEdit = (id) => {
    const lock = JSON.parse(localStorage.getItem(EDIT_LOCK_KEY_CONST));

    if (lock && !lock.isReleased) {
      setWarning(`Item ${lock.itemId} is already being edited in another tab.`);
      return;
    }

    // Clear any previous warning; the lock itself is set by the EditPage
    setWarning('');
    window.open(`/edit/${id}`, '_blank');
  };

  // Listen for lock release via `storage` event
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === EDIT_LOCK_KEY_CONST) {
        const lock = JSON.parse(e.newValue);
        if (lock?.isReleased) setWarning('');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      {warning && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{warning}</p>
      )}
      <table border='1' cellPadding='8'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.description}</td>
              <td>
                <button onClick={() => handleEdit(i.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}