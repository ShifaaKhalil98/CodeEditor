import { VscGithub } from "react-icons/vsc";
import { FaDiscord } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerIcons">
        <p>
          <VscGithub />
        </p>
        <p>
          <BsTwitter />
        </p>
        <p>
          <FaDiscord />
        </p>
      </div>
      <p className="footerText">© 2023 PyScribe. All Rights Reserved</p>
    </div>
  );
};

export default Footer;
