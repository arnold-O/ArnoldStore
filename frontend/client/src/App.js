import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './component/Home';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';




function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        
          <Route exact  path="/" element={<Home/>} />
          {/* <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/createpost" element={<CreatePost/>} />
           {/*<Route exact path="/contact" element={ <Contact/> }/>
          <Route exact path="/footer" element={  <Footer/>} />*/}
           {/*  <Route exact path="/login" element={  <Login/>} />
          <Route exact path="/footer" element={  <Footer/>} />  */}
       
      </Routes>
      <Footer/>
    </BrowserRouter>

  
  );
}

export default App;
