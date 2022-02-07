import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ViewContacts from "./components/contacts/ViewContact";
import EditContact from "./components/contacts/editContact";
import CreateContact from "./components/contacts/createContact";
import PageNotFound from "./components/404";
import Auth from "./components/routes";
import Welcome from './components/Welcome';

function App() {
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* protected routes */}

            <Route element={<Auth />}>
              <Route path="/contacts" element={<ViewContacts />} />
              <Route path="/create" element={<CreateContact />} />
              <Route path="/edit/:slug" element={<EditContact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
