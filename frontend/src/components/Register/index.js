import { useRef, useState, useEffect, useContext } from "react";
import "./index.css";
const Register = () => {
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
const [success, setSuccess] = useState(false);
    return (
      <>
        <section className="section">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="title">Register your account</h1>
          <form className="login">
            <label htmlFor="username">
              Username:
              
            
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            
            <label htmlFor="password">
              Password:
              
              
            </label>
            <input
              type="password"
              id="password"
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
          <a href="#">
            Already registered?
          </a>
        </section>
        
      </>
    );
  };
  
  export default Register;