import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Collections from './screens/Collections';
import CollectionDetails from './screens/CollectionDetails';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Collections />} />
        <Route path='/collections/:id' element={<CollectionDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
