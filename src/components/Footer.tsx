import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const developers = [
  { name: "Developer One", role: "Full Stack Developer" },
  { name: "Developer Two", role: "Frontend Developer" },
  { name: "Developer Three", role: "Backend Developer" },
];

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-text))]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--footer-text))]">
                Uni<span className="text-primary">Easy</span>
              </span>
            </div>
            <p className="text-[hsl(var(--footer-muted))] mb-6 text-sm md:text-base">
              Your trusted companion for discovering the best spots around your campus. Built by students, for students.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-[hsl(var(--footer-border))] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 text-[hsl(var(--footer-muted))]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[hsl(var(--footer-border))] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 text-[hsl(var(--footer-muted))]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[hsl(var(--footer-border))] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 text-[hsl(var(--footer-muted))]">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[hsl(var(--footer-text))] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/home" className="text-[hsl(var(--footer-muted))] hover:text-primary transition-colors text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[hsl(var(--footer-muted))] hover:text-primary transition-colors text-sm md:text-base">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[hsl(var(--footer-muted))] hover:text-primary transition-colors text-sm md:text-base">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[hsl(var(--footer-muted))] hover:text-primary transition-colors text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[hsl(var(--footer-text))] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[hsl(var(--footer-muted))] text-sm md:text-base">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="truncate">support@unieasy.com</span>
              </li>
              <li className="flex items-center gap-3 text-[hsl(var(--footer-muted))] text-sm md:text-base">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--footer-muted))] text-sm md:text-base">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Tech Hub, Innovation Park, Bengaluru, India 560001</span>
              </li>
            </ul>
          </div>

          {/* Development Team */}
          <div>
            <h3 className="text-lg font-semibold text-[hsl(var(--footer-text))] mb-4">Development Team</h3>
            <ul className="space-y-3">
              {developers.map((dev, index) => (
                <li key={index} className="text-[hsl(var(--footer-muted))]">
                  <span className="font-medium text-[hsl(var(--footer-text))] text-sm md:text-base">{dev.name}</span>
                  <br />
                  <span className="text-xs md:text-sm opacity-80">{dev.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--footer-border))] mt-10 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[hsl(var(--footer-muted))] text-xs md:text-sm text-center md:text-left opacity-80">
            © {new Date().getFullYear()} UniEasy. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-[hsl(var(--footer-muted))]">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
