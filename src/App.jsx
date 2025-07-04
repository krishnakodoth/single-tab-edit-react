import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EditPage from './components/EditPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/edit/:id' element={<EditPage />} />
    </Routes>
  )
}

export default App
