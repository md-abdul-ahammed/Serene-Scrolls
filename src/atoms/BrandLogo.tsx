import BrandLogoPNG from "../assets/images/boi-poka.png";
import { Link } from "react-router-dom";

export function BrandLogo() {
  return (
    <div>
      <Link to="/">
        <img
          src={BrandLogoPNG}
          alt=""
          style={{ transform: "scale(4.5)" }}
          height={50}
        />
      </Link>
    </div>
  );
}

export default BrandLogo;
