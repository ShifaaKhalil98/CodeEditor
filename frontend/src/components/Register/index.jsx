import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Login from "../Login";
import register_background from  "../../images/register_backgroud.png";
const Register = (props) => {
  const { togle_component } = props;

  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("token") != "" &&
      localStorage.getItem("token") != null
    ) {
      navigate("/dashboard");
    }
  }, []);

  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let payload = {
      name: name,
      email: email,
      password: pwd,
      password_confirmation: matchPwd,
    };
    axios
      .post("http://localhost:8000/api/login", payload)
      .then((r) => {
        setIsSubmitting(false);
        localStorage.setItem("token", r.data.authorisation.token);
        navigate("/dashboard");
      })
      .catch((e) => {
        setIsSubmitting(false);
        if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.errors);
        }
      });
  };
  return (
    <div className="register_component">
      <div className="register_form_comp">
    <section className="section">
      
      <h1 className="title">Register your account</h1>
      <form
        onSubmit={(e) => {
          registerAction(e);
        }}
        className="register"
      >
        <label htmlFor="text"> Username: </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Name"

          required
        />
        <label htmlFor="email"> email: </label>
        <input
          type="email"
          id="eamil"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Email"

          required
        />

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          placeholder="Enter password"

          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />

        <label htmlFor="confirm_pwd">Confirm Password:</label>
        <input
          type="password"
          id="confirm_pwd"
          autoComplete="off"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          placeholder="Re-Enter Password"

          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          Must match the first password input field.
        </p>
        <div className="buttons_div">
        <button className="sign_up">Sign Up</button>
        <button className="btnlogin" onClick={togle_component}>already registered</button>
        </div>
      </form>
     
    </section>
    </div>
    <div className="imgdiv"><img className="background_image" src={register_background}  />
        
    </div>
        
    </div>
  );
};

export default Register;
