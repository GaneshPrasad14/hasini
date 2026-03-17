import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, MapPin, Calendar, Microscope, Eye, Activity } from "lucide-react";

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stats = [
    { label: "Patients Benefited", value: "200,000+", icon: Users },
    { label: "Satisfied Customers", value: "50,000+", icon: Award },
    { label: "Years of Excellence", value: "15", icon: Calendar },
    { label: "Clinics", value: "5", icon: MapPin },
  ];

  const branches = [
    { year: "2010", location: "Ponneri", description: "The first ever eye clinic established in Ponneri." },
    { year: "2011", location: "Janapanchatiram", description: "Our second dedicated clinic providing expert care." },
    { year: "2015", location: "Arani", description: "Advanced facilities with specialized clinical services." },
    { year: "2022", location: "Gummidipoondi", description: "Expanding services with Occupational Optometry for industries." },
    { year: "2025", location: "Kavarapettai", description: "Serving rural communities with specialized optical care." },
  ];

  const exams = [
    "Observation", "History taking – ocular", "General health history", 
    "Visual acuity examination", "Auto refraction meter examination", 
    "Subjective acceptance", "Addition glasses given", "Ocular Motility Examination",
    "Cover test for distance and near", "Squint evaluation", "Pupillary examination",
    "Colour Vision evaluation", "Slit lamp examination", "IOP check with AT",
    "Fundus examination with dilated pupils with IDO"
  ];

  const services = [
    "Myopia management", "Contact lens fitting", "Dry eye management",
    "Low vision consultation", "Vision therapy", "Occupational optometry services",
    "YAG laser capsulotomy"
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-accent py-20">
        <div className="container-main text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-semibold tracking-widest uppercase text-sm"
          >
            Since 2010
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6"
          >
            Hasini Eye Clinic and Optics
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-muted-foreground"
          >
            Dedicated professional eye care center providing expert eye examination with Senior Optometrist and Specialized Ophthalmologist guidance.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-background border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h4>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & History */}
      <section className="section-padding bg-white">
        <div className="container-main grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Legacy</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Established in 2010 at Ponneri, Hasini Eye Clinic and Optics stands as the first ever eye clinic in the region. We are a dedicated professional eye care centre providing expert and comprehensive eye examinations.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We offer a wide range of stylish, durable eyewear with personalized fitting and extraordinary services. Our expertise includes specialized eyewear, prescription eyewear dispensing, and contact lens fitting tailored to individual face shapes.
            </p>
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="italic text-foreground">
                "Arani people cataract surgery has been coordinated with free surgery through Sankara Nethralaya Trust."
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" 
                alt="Eye Clinic" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl hidden lg:block">
              <h4 className="text-2xl font-bold mb-1">15 Years</h4>
              <p className="text-sm opacity-90">of clinical excellence</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-accent">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
            <p className="text-muted-foreground mt-4">Growth of excellence across the region</p>
          </div>
          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:flex md:border-l-0 md:border-t-2 md:pt-8 md:gap-8">
            {branches.map((branch, i) => (
              <motion.div 
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-12 md:pl-0 md:pb-0 flex-1"
              >
                <div className="absolute top-0 left-[-9px] md:left-auto md:top-[-41px] w-4 h-4 bg-primary rounded-full border-4 border-background" />
                <span className="text-primary font-bold text-lg">{branch.year}</span>
                <h4 className="text-xl font-bold text-foreground mt-2 mb-3">{branch.location}</h4>
                <p className="text-sm text-muted-foreground">{branch.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-main grid lg:grid-cols-2 gap-12">
          {/* Comprehensive Examination */}
          <motion.div {...fadeUp} className="bg-background p-10 rounded-3xl border border-border shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Comprehensive Examination</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {exams.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Optometry Services */}
          <motion.div {...fadeUp} className="bg-background p-10 rounded-3xl border border-border shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Optometry Services</h3>
            </div>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-border">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Clinical Guidance
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Following consultation, treatment and counseling are provided under the expert guidance of our specialist ophthalmologists.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-background/50">
        <div className="container-main max-w-4xl text-center">
          <motion.div {...fadeUp} className="space-y-8">
            <div className="w-32 h-32 bg-accent rounded-full mx-auto overflow-hidden border-4 border-white shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                <Users className="w-12 h-12" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Mrs B. Vijayalakshmi, B.S(Opto), M.S (Opto), MBA</h3>
              <p className="text-primary font-medium mt-2">Founder and CEO</p>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Under her leadership, Hasini Eye Clinic and Optics has expanded to 5 branches, serving over 2 lakh patients with a dedicated team of professionals committed to excellence in eye care.
              </p>
            </div>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Ponneri & Arani
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Janapanchatiram
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Gummidipoondi & Kavarapettai
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
