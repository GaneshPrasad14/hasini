import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            At HASINI EYE CLINIC AND OPTICS, we are always looking for passionate optometrists and customer care specialists. Build your career with the leaders in eye care.
          </p>
          <div className="bg-surface p-8 rounded-2xl shadow-soft text-left">
            <h2 className="text-xl font-semibold mb-4">Why Work With Us?</h2>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>Advanced clinical environment with modern equipment.</li>
              <li>Collaborative team of senior optometrists and ophthalmologists.</li>
              <li>Ongoing training and professional development.</li>
              <li>Competitive compensation and benefits.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
