import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Editor from "../../pages/Editor/Editor";
const Register = () => {
  const navigate = useNavigate();
const userRef = useRef();
const errRef = useRef();
const [user, setUser] = useState("");
const [validName, setValidName] = useState(false);
const [userFocus, setUserFocus] = useState(false);
const [pwd, setPwd] = useState("");
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setPwdFocus] = useState(false);
const [matchPwd, setMatchPwd] = useState("");
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);
const [errMsg, setErrMsg] = useState("");
const [email, setEmail] = useState("")
const [success, setSuccess] = useState(false); 
const [name, setName] = useState("")
const [validationErrors, setValidationErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
useEffect(()=>{
  if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      navigate("/dashboard");
  }
},[])

const registerAction = (e) => {
  e.preventDefault();
  setIsSubmitting(true)
  let payload = {
      name: name,
      email:email,
      password:pwd,
      password_confirmation:matchPwd
  }
  axios.post('http://localhost:8000/api/login', payload)
  .then((r) => {
      setIsSubmitting(false)
      localStorage.setItem('token', r.data.token)
      navigate("/dashboard");
  })
  .catch((e) => {
      setIsSubmitting(false)
      if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.errors);
      }
  });
}
    return (
     
        <section className="section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="title">Register your account</h1>
          <form onSubmit={(e)=>{registerAction(e)}} className="register">
            <label htmlFor="text"> Username: </label>
            <input 
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={setName}
              required
            />
             <label htmlFor="email"> email: </label>
            <input
              type="email"
              id="eamil"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              id="password"
              autoComplete="off"

              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
           
           
            <label htmlFor="confirm_pwd">
              Confirm Password:
              
              
            </label>
            <input
              type="password"
              id="confirm_pwd"
              autoComplete="off"

              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              
              Must match the first password input field.
            </p>
            <button className="sign_up" >
              Sign Up
            </button>
          </form>
          <a href={"/Editor"}>
         Already registered?
         </a>
        </section>
        
     
    );
  };
  
  export default Register;