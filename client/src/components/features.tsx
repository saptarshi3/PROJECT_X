import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Bot, TrendingUp } from "lucide-react";

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Brain,
      title: "Smart Assessment",
      description: "10 carefully crafted questions designed to analyze your skills, interests, and personality traits for accurate career matching.",
      delay: 0,
    },
    {
      icon: Bot,
      title: "AI-Powered Chat",
      description: "Get instant, personalized career advice from our advanced AI assistant powered by Google's Gemini technology.",
      delay: 0.2,
    },
    {
      icon: TrendingUp,
      title: "Career Insights",
      description: "Receive detailed analysis and personalized recommendations based on current market trends and your unique profile.",
      delay: 0.4,
    },
  ];

  return (
    <section ref={containerRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 relative z-10"
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose <span className="text-primary">CareerGuide</span>?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glassmorphism-card rounded-2xl p-8 group relative overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                duration: 0.8, 
                delay: feature.delay,
                type: "spring",
                bounce: 0.4
              }}
              viewport={{ once: true }}
              data-testid={`feature-card-${index}`}
            >
              <motion.div 
                className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group-hover:bg-primary/30 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ type: "spring", bounce: 0.6 }}
              >
                <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
