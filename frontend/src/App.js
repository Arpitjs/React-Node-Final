import Register from './components/auth/register';
import TableComponent from './components/table';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './components/auth/login';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
      <Route path="/contacts" element={<TableComponent />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
