import React, {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../components/Loader'
import Error from "../components/Error";

function Loginscreen() {
    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

async function Login(){
    
        const user={
            email,
            password,
        }
        try {

            setloading(true);
            const result = (await axios.post('/api/users/login' , user)).data
            setloading(false);

            localStorage.setItem('currentUser' , JSON.stringify(result));
            window.location.href='/home'

        } catch (error) {
            console.log(error)
            setloading(false);
            seterror(true)
        }
        

}
    return (
        <div className="landing-login-reg">
            {loading && (<Loader/>)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && (<Error message='Invalid Credintials'/>)}
                    <div className="boxshadow">
                        <h2 className="h2-register">Login</h2>

                        <input style={{fontSize:'1.6rem'}} type="email" className="form-control mb-2" placeholder="Email"
                        value={email} onChange={(e)=>{setemail(e.target.value)}}
                        />
                        <input style={{fontSize:'1.6rem'}} type="text" className="form-control mb-2" placeholder="Password"
                        value={password} onChange={(e)=>{setpassword(e.target.value)}}
                        />
                    <button className="btn btn-lg btn-gradient mt-4" onClick={Login}>
                        Login
                    </button>
                    </div>
                    
                </div>    
            </div> 
        </div>
    )
}

export default Loginscreen