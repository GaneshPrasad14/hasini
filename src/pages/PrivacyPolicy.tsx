import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
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
              <ShieldCheck className="w-6 h-6 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>

          <div className="space-y-8 bg-surface p-8 rounded-2xl shadow-soft text-muted-foreground">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p className="leading-relaxed">
                HASINI EYE CLINIC AND OPTICS collects personal details such as name, phone number, email address, and medical-related information when you book appointments or purchase products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use your information to provide eye care services, process orders, send appointment reminders, and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Payment Information</h2>
              <p className="leading-relaxed">
                All payments are processed securely via Razorpay. We do not store your card or banking details on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Protection</h2>
              <p className="leading-relaxed">
                We implement strong security measures to protect your personal data from unauthorized access or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Third-Party Sharing</h2>
              <p className="leading-relaxed">
                We do not sell or share your personal data with third parties except for payment processing and legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, contact us at:
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

export default PrivacyPolicy;