// import { route } from "../../routes/roomsRoute";
import "./App.css";
import Homepage1screen from "./screens/Homepage1screen";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route} from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from './screens/Loginscreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Navbar/>
        <Route path= "/home" exact component={Homescreen}/>
        <Route path= "/register" exact component={Registerscreen}/>
        <Route path= "/login" exact component={Loginscreen}/>
        <Route path= "/homepage1" exact component={Homepage1screen}/>

      </BrowserRouter>
    </div>
  );
}

export default App;
