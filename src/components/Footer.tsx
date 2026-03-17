import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background/70">
    <div className="container-main section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-lg font-bold text-background mb-4">HASINI EYE CLINIC AND OPTICS</h3>
          <p className="text-sm leading-relaxed">Premium eyewear designed for comfort, clarity, and style. Your vision, our mission.</p>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm">Shop</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/shop?category=men" className="hover:text-background transition-colors">Men</Link>
            <Link to="/shop?category=women" className="hover:text-background transition-colors">Women</Link>
            <Link to="/shop?category=kids" className="hover:text-background transition-colors">Kids</Link>
            <Link to="/shop?category=sunglasses" className="hover:text-background transition-colors">Sunglasses</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm">Support</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/faq" className="hover:text-background transition-colors">FAQ</Link>
            <Link to="/shipping" className="hover:text-background transition-colors">Shipping</Link>
            <Link to="/returns" className="hover:text-background transition-colors">Returns</Link>
            <Link to="/contact" className="hover:text-background transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm">Company</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/about" className="hover:text-background transition-colors">About Us</Link>
            <Link to="/careers" className="hover:text-background transition-colors">Careers</Link>
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-background transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm">
        © 2026 HASINI EYE CLINIC AND OPTICS. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
