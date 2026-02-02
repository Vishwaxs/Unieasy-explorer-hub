import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
        <GraduationCap className="w-6 h-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">
        Uni<span className="text-primary">Easy</span>
      </span>
    </Link>
  );
};

export default Logo;
