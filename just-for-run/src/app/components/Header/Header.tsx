import axios from "axios";
import "./Header.css";
import { FunctionComponent } from "react";
import getData from "@/util/fetchData";
import ConnectToStravaBtn from "../ConnectToStravaBtn/ConnectToStravaBtn";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <section className="header">
      <div className="header-left">
        <span className="header-title">Just For Run</span>
      </div>
      <div className="header-right">
        <ConnectToStravaBtn></ConnectToStravaBtn>
      </div>
    </section>
  );
};

export default Header;
