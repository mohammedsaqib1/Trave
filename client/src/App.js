import "./App.css";
import Landingscreen from "./screens/Landingscreen";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route} from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from './screens/Loginscreen';
import Bookingscreen from './screens/Bookingscreen';
import Profilescreen from './screens/Profilescreen';

function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Navbar/>
        <Route path= "/home" exact component={Homescreen}/>
        <Route path= "/register" exact component={Registerscreen}/>
        <Route path= "/login" exact component={Loginscreen}/>
        <Route path= "/" exact component={Landingscreen}/>
        <Route path= "/book/:roomid/:fromdate/:todate" exact component={Bookingscreen}/>
        <Route path= "/profile" exact component={Profilescreen}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
