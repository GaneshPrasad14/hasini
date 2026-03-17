import { motion } from "framer-motion";
import { Truck } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-8 h-8 text-accent-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-6">Shipping Policy</h1>

          <div className="text-left bg-surface p-8 rounded-2xl shadow-soft space-y-6 text-muted-foreground">

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Order Processing</h2>
              <p>
                Orders are processed within 24-48 hours after successful payment confirmation. Orders are not processed on Sundays or public holidays.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Delivery Timeline</h2>
              <p>
                Delivery usually takes 3-5 business days depending on your location. Remote areas may take longer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Shipping Charges</h2>
              <p>
                Shipping charges may vary based on location and order value. Any applicable shipping charges will be displayed at checkout.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Delays</h2>
              <p>
                HASINI EYE CLINIC AND OPTICS is not responsible for delays caused by courier services, natural disasters, or unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact Information</h2>
              <p>
                For shipping-related queries, contact us at:
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

export default Shipping;