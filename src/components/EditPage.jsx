import { useParams, useNavigate } from 'react-router-dom';
import { items } from '../data/items';
import { useEditLock } from '../hooks/useEditLock';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = Number(id);
  const item = items.find((i) => i.id === itemId);

  useEditLock(itemId); // acquire + release lock automatically

  const handleSave = () => {
    alert('Changes saved (mock)');
  };

  const handleClose = () => {
    window.close(); // Will work if this really is a new tab
    // Fallback for same‑tab navigation when pop‑ups blocked
    navigate('/');
  };

  if (!item) return <p>Item not found</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Editing Item {item.id}</h2>
      <p>
        <strong>Name:</strong> {item.name}
      </p>
      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <button onClick={handleSave}>Save</button>{' '}
      <button onClick={handleClose}>Close</button>
    </div>
  );
}