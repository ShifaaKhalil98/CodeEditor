import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import login_regiter from  "../../images/login_regiter.png";

import "./index.css";
const Login = (props) => {
  const { togle_component } = props;
  // const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/editor");
    }
    console.log(localStorage.getItem("token"));
  }, []);

  const loginAction = (e) => {
    setValidationErrors({});
    e.preventDefault();
    setIsSubmitting(true);
    const login_data = new FormData();
    login_data.append("email", email);
    login_data.append("password", pwd);
    axios
      .post("http://localhost:8000/api/login", login_data)
      .then((r) => {
        console.log(r);
        setIsSubmitting(false);
        localStorage.setItem("token", r.data.authorisation.token);
        // navigate("/editor", { state: { name: r.data.name } });
      })
      .catch((e) => {
        // setIsSubmitting(false);
        // if (e.response.data.errors != undefined) {
        //   setValidationErrors(e.response.data.errors);
        // }
        // if (e.response.data.error != undefined) {
        //   setValidationErrors(e.response.data.error);
        // }
      });
  };
  return (
    <>
      {success ? (
        <section className="section">
          <h1>You are logged in!</h1>
          <br />
          <p>{/* <a href="#">Go to Home</a> */}</p>
        </section>
      ) : (
        <div className="login_component">
          <div className="login_form_comp">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="title">Sign In</h1>
          <form
            onSubmit={(e) => {
              loginAction(e);
            }}
            className="login"
          >
            <label>Email:</label>
            <input
              type="email"
              id="eamil"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label>Password:</label>
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
        </div>
        <div className="imgdiv"><img className="background_image" src={login_regiter}/></div>
        </div>
      )}
     
    </>
    
  );
};

export default Login;
