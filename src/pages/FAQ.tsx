import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      q: "What are your clinic hours?",
      a: "Our clinic is open Monday to Saturday from 10:00 AM to 8:00 PM."
    },
    {
      q: "Do you offer free eye checkups?",
      a: "Yes, we provide complimentary basic eye examinations with every purchase."
    },
    {
      q: "How long does it take to get my glasses?",
      a: "Typically, prescription glasses are ready within 2-3 business days."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-main">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-surface p-6 rounded-xl shadow-soft">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
