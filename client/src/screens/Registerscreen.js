import React, {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../components/Loader'
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
    const[name, setname] = useState('')
    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')
    const[cpassword, setcpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

async function register(){
    
    if(password==cpassword)
    {
        const user={
            name,
            email,
            password,
            cpassword
        }

        try {
            setloading(true);
            const result = (await axios.post('api/users/register' , user)).data
            setloading(false);
            setsuccess(true)

            setname('')
            setemail('')
            setpassword('')
            setcpassword('')

        } catch (error) {
            console.log(error);
            seterror(true);
            setloading(false);
            setsuccess(true)
        }
    }
    else{
        alert('Passwords do not match')
    }

}

    return (
        <div className="landing-login-reg">
            {loading && (<Loader/>)}
            {error && (<Error message='Invalid Credintials'/>)}
            {/* <div className="row justify-content-center pr-4"> */}
                <div className="col-md-12 reg input-reg-log">
                    {success && (<Success message='Registration Successful'/>)}
                    <div className="boxshadow" style={{backgroundColor:'white'}}>
                        <h2 className="h2-register">Register</h2>
                        <input style={{fontSize:'1.6rem'}} type="text" className="form-control mt-3 mb-2" placeholder="Name" 
                        value={name} onChange={(e)=>{setname(e.target.value)}}
                        />
                        <input style={{fontSize:'1.6rem'}} type="email" className="form-control mt-3 mb-2" placeholder="Email"
                        value={email} onChange={(e)=>{setemail(e.target.value)}}
                        />
                        <input style={{fontSize:'1.6rem'}} type="password" className="form-control mt-3 mb-2" placeholder="Password"
                        value={password} onChange={(e)=>{setpassword(e.target.value)}}
                        />
                        <input style={{fontSize:'1.6rem'}} type="password" className="form-control mt-3 mb-2" placeholder="Confirm Password"
                        value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}
                        />
                    <button className="btn btn-lg btn-gradient mt-4 form-control justify-content-center" style={{fontSize:'20px' , marginBottom:'20px'}} onClick={register}>
                        Register
                    </button>
                    </div>
                    
                </div>    
            {/* </div>  */}
        </div>
    )
}

export default Registerscreen