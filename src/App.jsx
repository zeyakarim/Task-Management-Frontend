import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";

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
                <SignIn />
              )
            }
          />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          {/* <Route path='/hotels' element={<Dashboard />} />
          <Route path='/hotels/:id/booking' element={<Booking />} />
          <Route path='/checkin/:id' element={<CheckIn />} /> */}
        </Routes>
      </BrowserRouter>
    )
}

export default App
