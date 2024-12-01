import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GovernmentFormView } from './Module_cms/Government/Presentation/View/GovernmentFormView';
import { GovernmentView } from './Module_cms/Government/Presentation/View/GovernmentView';
import HomeView from './Module_cms/Home/HomeView';
import Sidebar from './Shared/Sidebar';

function App() {
  return (
  <>
  <div className="App">
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/listar" element={<GovernmentView />} />
        <Route path="/crear" element={<GovernmentFormView />} />
        <Route path="/editar/:id" element={<GovernmentFormView />} />
        <Route path="/" element={<HomeView />}/>
        <Route path="*" element={<HomeView />}/>
      </Routes>
    </BrowserRouter>
  </div>
    
  </>
  );
}

export default App;
