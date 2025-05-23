import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth";

function App() {
  const auth = useSelector((state) => state.auth);

    return (
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              auth.authenticated ? (
                <Home />
              ) : (
                <Auth />
              )
            }
          />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
