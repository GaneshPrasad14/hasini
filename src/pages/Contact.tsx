import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-12">We're here to help you with your vision needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
            <div className="bg-surface p-8 rounded-2xl shadow-soft">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Phone & WhatsApp</h3>
              <p className="text-muted-foreground">+91 99656 51800</p>
              <p className="text-muted-foreground">9965651800</p>
            </div>
            <div className="bg-surface p-8 rounded-2xl shadow-soft">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-muted-foreground">care@hasinieyecare.com</p>
              <p className="text-muted-foreground">info@hasinieyecare.com</p>
            </div>
            <div className="bg-surface p-8 rounded-2xl shadow-soft">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-muted-foreground">No 30., Sai Kripa nagar,</p>
              <p className="text-muted-foreground">2nd Main Road, Behind RS Bhavan hotel,</p>
              <p className="text-muted-foreground">Janapanchatiram, Chennai 67</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
