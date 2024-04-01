import React, { useState } from 'react'
import axios from 'axios';
// import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="na-item">
            <a className="thead" href="/demo">Welcome to Property Administration System</a>
        </nav>
    );
};
export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [HouseNum, setHouseNum] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("here")
    const signupValues = {fname: firstName, lname: lastName,username,password,phoneNum:number,HouseNum}
    axios.post('http://localhost:9000/createUser', signupValues)
        .then((res) => alert("User register successful"))
        .catch((err) => alert('Error in Signing Up'))
}


  return (
    <>
    <Navbar />
    <section className="text-center">
    <div className="card mx-4 mx-md-5 shadow-5-strong" >
        <div className="card-body py-5 px-md-5">

        <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
            <h2 className="fw-bold mb-5">Sign up now</h2>
            <form>
                {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" className="form-control"  placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />

                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={handleLastNameChange}/>
                    </div>
                </div>
                </div>

                {/* <!-- Username input --> */}
                <div className="form-outline mb-4">
                <input type="text" className="form-control" placeholder="Username" value={username} onChange={handleUsernameChange} />
                
                </div>

                {/* <!-- Username input --> */}
                <div className="form-outline mb-4">
                <input type="text" className="form-control" placeholder="House No." value={HouseNum} onChange={(e) => {setHouseNum(e.target.value)}} />
                
                </div>

                <div className="form-outline mb-4">
                <input type="number" className="form-control" placeholder="Phone Number" value={number} onChange={(e) => {setNumber(e.target.value)}} />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </div>


                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>
                Sign up
                </button>
                
                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?<a href="/login"
                            className="link-danger">Login</a></p>

            </form>
            </div>
        </div>
        </div>
    </div>
    </section>
    </>
  );
}

