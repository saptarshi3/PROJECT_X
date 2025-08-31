import { motion } from "framer-motion";
import { Brain, Bot, TrendingUp } from "lucide-react";

export default function Features() {
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
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose <span className="text-primary">CareerGuide</span>?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glassmorphism rounded-2xl p-8 hover:scale-105 transform transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              data-testid={`feature-card-${index}`}
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
