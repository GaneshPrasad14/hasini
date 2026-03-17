import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          </div>

          <div className="space-y-8 bg-surface p-8 rounded-2xl shadow-soft text-muted-foreground">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Use of Services</h2>
              <p className="leading-relaxed">
                By using our website, you agree to comply with all applicable laws and these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Payments</h2>
              <p className="leading-relaxed">
                All payments are securely processed through Razorpay. Users must provide accurate payment information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Refund Policy</h2>
              <p className="leading-relaxed">
                Refunds are applicable only in case of service cancellation by the clinic or duplicate payment. Refunds will be processed within 5-7 working days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Appointment Cancellation</h2>
              <p className="leading-relaxed">
                Appointments can be cancelled up to 24 hours in advance. No refunds for missed appointments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Medical Disclaimer</h2>
              <p className="leading-relaxed">
                Information on this website is for general purposes only and not a substitute for professional medical advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact Information</h2>
              <p className="leading-relaxed">
                HASINI EYE CLINIC AND OPTICS
                <br />
                Email: vijayalakshmitamil761@gmail.com
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;