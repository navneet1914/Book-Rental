import logo from "../../assets/Logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faBell,faCartShopping,} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  return (
    <div className="bg-blue-700 flex justify-between items-center px-4 py-2 h-20">
      <div>
        <img className="h-20" src={logo} alt="BookRenter" />
      </div>
      <div className="flex space-x-16 pr-32">
        <FontAwesomeIcon icon={faUser} className="h-6" />
        <FontAwesomeIcon icon={faBell} className="h-6" />
        <FontAwesomeIcon icon={faCartShopping} className="h-6" />
      </div>
    </div>
  );
}
