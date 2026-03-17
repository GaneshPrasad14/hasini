import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Truck, Eye, Shield, RotateCcw, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

import heroImg from "@/assets/hero-glasses.png";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catComputer from "@/assets/cat-computer.jpg";
import catSunglasses from "@/assets/cat-sunglasses.jpg";

const categories = [
  { name: "Men", image: catMen, link: "/shop?category=men" },
  { name: "Women", image: catWomen, link: "/shop?category=women" },
  { name: "Kids", image: catKids, link: "/shop?category=kids" },
  { name: "Computer", image: catComputer, link: "/shop?category=computer" },
  { name: "Sunglasses", image: catSunglasses, link: "/shop?category=sunglasses" },
];

const features = [
  { icon: Shield, title: "Premium Frames", desc: "Crafted from the finest materials for lasting quality." },
  { icon: Eye, title: "Complete Eye Examination", desc: "Comprehensive eye examinations by our expert optometrists." },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders over ₹5,000, delivered in 2-3 days." },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns and exchanges." },
];

const reviews = [
  { name: "Sarah M.", rating: 5, text: "Absolutely love my new frames! The quality is amazing and they arrived so quickly.", avatar: "S" },
  { name: "James R.", rating: 5, text: "Best online eyewear shopping experience. The virtual try-on feature is incredible.", avatar: "J" },
  { name: "Priya K.", rating: 4, text: "Great selection and competitive prices. Customer service was very helpful too.", avatar: "P" },
];

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Index = () => {
  const [productsList, setProductsList] = useState<any[]>([]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/products`)
      .then(res => res.json())
      .then(data => setProductsList(data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/fvf6q6b9qxrmw0cwwt2bnyxwjg_result_.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container-main relative z-10 section-padding py-24 md:py-32">
          {/* Hero text and buttons removed as per user request */}
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div className="text-center mb-12" {...fade}>
            <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="mt-3 text-muted-foreground">Find the perfect frames for every occasion</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link
                  to={cat.link}
                  className="group block rounded-xl overflow-hidden bg-surface shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-sm font-semibold text-foreground">{cat.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <motion.div className="flex items-center justify-between mb-12" {...fade}>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
              <p className="mt-2 text-muted-foreground">Our most popular frames this season</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {productsList.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-main">
          <motion.h2 className="text-3xl font-bold text-center text-foreground mb-12" {...fade}>Why Choose HASINI EYE CLINIC AND OPTICS</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <motion.h2 className="text-3xl font-bold text-center text-foreground mb-12" {...fade}>What Our Customers Say</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-soft"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    {r.avatar}
                  </div>
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div className="max-w-xl mx-auto text-center" {...fade}>
            <Mail className="w-10 h-10 mx-auto text-primary mb-4" />
            <h2 className="text-3xl font-bold text-foreground">Get Exclusive Eyewear Offers</h2>
            <p className="mt-3 text-muted-foreground">Subscribe to our newsletter for the latest styles and deals.</p>
            <div className="mt-8 flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="rounded-full px-6">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
