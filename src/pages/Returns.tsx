import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="w-8 h-8 text-accent-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-6">Returns & Refund Policy</h1>

          <div className="text-left bg-surface p-8 rounded-2xl shadow-soft space-y-6 text-muted-foreground">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Return Eligibility</h2>
              <p>
                HASINI EYE CLINIC AND OPTICS accepts returns within 7 days of delivery for non-prescription eyewear products. Items must be unused, in original packaging, and with invoice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Non-Returnable Items</h2>
              <p>
                Prescription glasses, contact lenses, and customized products cannot be returned unless there is a manufacturing defect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Refund Policy</h2>
              <p>
                Refunds will be processed only after product inspection. Once approved, the refund will be credited to the original payment method within 5-7 working days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Cancellation Policy</h2>
              <p>
                Orders can be cancelled within 24 hours of placing the order. Once shipped, cancellation is not possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact for Returns</h2>
              <p>
                For return requests, contact us at:
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

export default Returns;