import 'antd/dist/antd.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/auth/register';
import TableComponent from './components/contacts/viewContacts';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/auth/login';
import { Provider } from 'react-redux';
import store from './redux/store';
import EditContact from './components/contacts/editContact';
import CreateContact from './components/contacts/createContact';
import PageNotFound from './components/404';
import Auth from './components/routes';

function App() {
  return (
    <div>
      <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="*" element={<PageNotFound />} />
      
      { /* protected routes */}
      
      <Route element={<Auth />}>
      <Route path="/contacts" element={<TableComponent />}/>
      <Route path="/create" element={<CreateContact />} />
      <Route path='/edit/:slug' element={<EditContact />} />
      </Route>

      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
