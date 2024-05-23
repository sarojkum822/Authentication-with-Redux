import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './UsersAuth/Register';
import Login from './UsersAuth/Login';
import NotFound from './pages/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './ProtectedRoutes.jsx';
import Product from './pages/product.jsx'
import CreateProduct from './pages/createproducts.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/contact" element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        } />

        <Route path="/product" element={<Product />} />
        <Route path="/createproduct" element={<CreateProduct/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
