import NavLinks from "../../../../data/NavLinks";
import { Link } from "react-router-dom";

const NavItems = () => {
  return (
    <div className="flex space-x-8">
      {NavLinks.map((nav) => (
        <Link key={nav.to} to={nav.to} className="hover:text-purple-400 transition">
          {nav.label}
        </Link> 
      ))}
    </div>
  );
};

export default NavItems;
