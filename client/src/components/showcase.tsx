import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Settings, Heart, PieChart, Palette } from "lucide-react";

export default function Showcase() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const careerStreams = [
    {
      title: "Engineering & Technology",
      icon: Settings,
      description: "Build the future with innovation, coding, and cutting-edge technology solutions.",
      gradient: "from-blue-500 to-purple-600",
      delay: 0,
    },
    {
      title: "Medicine & Healthcare",
      icon: Heart,
      description: "Heal, care, and make a difference in people's lives through medical expertise.",
      gradient: "from-red-500 to-pink-600",
      delay: 0.1,
    },
    {
      title: "Commerce & Finance",
      icon: PieChart,
      description: "Drive business growth through strategic thinking and financial expertise.",
      gradient: "from-green-500 to-emerald-600",
      delay: 0.2,
    },
    {
      title: "Arts & Humanities",
      icon: Palette,
      description: "Express creativity and explore human culture through art, literature, and philosophy.",
      gradient: "from-yellow-500 to-orange-600",
      delay: 0.3,
    },
  ];

  return (
    <section ref={containerRef} className="py-20 px-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background/50 to-primary/5"
        style={{ y: backgroundY }}
      />
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-pulse" />
      </motion.div>
      <motion.div 
        className="container mx-auto max-w-6xl relative z-10"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Career <span className="text-primary">Streams</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the four main career paths our assessment covers, each with unique opportunities and growth potential.
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerStreams.map((stream, index) => (
            <motion.div
              key={index}
              className="glassmorphism-card rounded-2xl p-6 text-center group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                z: 50
              }}
              transition={{ 
                duration: 0.8, 
                delay: stream.delay,
                type: "spring",
                bounce: 0.4
              }}
              viewport={{ once: true }}
              data-testid={`career-stream-${index}`}
            >
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-br ${stream.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden`}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 10,
                  boxShadow: "0 20px 40px rgba(255, 107, 53, 0.3)"
                }}
                transition={{ type: "spring", bounce: 0.6 }}
              >
                <stream.icon className="h-8 w-8 text-white relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <h3 className="text-xl font-semibold mb-2">{stream.title}</h3>
              <p className="text-muted-foreground text-sm">{stream.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
