import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import Login_Register from "../../pages/Login_Register";

import "./index.css";
const Login = (props) => {
  const {togle_component}=props;
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
        console.log(localStorage.getItem('token'))
    },[])
 
    const loginAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        const login_data = new FormData()
        login_data.append('email', email)
        login_data.append('password', pwd)
        axios.post('http://localhost:8000/api/login', login_data)
        .then((r) => {
            setIsSubmitting(false)
            localStorage.setItem('token', r.data.token)
            navigate("/editor");
        })
        .catch((e) => {
            setIsSubmitting(false)
            if (e.response.data.errors != undefined) {
                setValidationErrors(e.response.data.errors);
            }
            if (e.response.data.error != undefined) {
                setValidationErrors(e.response.data.error);
            }
        });
    }
  return (
    <>
      {success ? (
        <section className="section">
          <h1 >You are logged in!</h1>
          <br />
          <p>{/* <a href="#">Go to Home</a> */}</p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="title">Sign In</h1>
          <form onSubmit={(e)=>{loginAction(e)}} className="login">
            <label For="email">Email:</label>
            <input
              type="email"
              id="eamil"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="sign_in">Sign In</button>
            
          </form>
          <button onClick={togle_component}> register </button>
            
             
            
          
        </section>
      )}
    </>
  );
};

export default Login;