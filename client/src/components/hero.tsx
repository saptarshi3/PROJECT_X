import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-accent rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -4 }}
        />
      </div>
      
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Discover Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {" "}Perfect Career
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Take our intelligent assessment, chat with AI, and unlock personalized career insights tailored just for you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quiz">
            <Button 
              size="lg"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="start-quiz-button"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Career Quiz
            </Button>
          </Link>
          <Link href="/chat">
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 glassmorphism rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 border border-border"
              data-testid="chat-ai-button"
            >
              <Bot className="mr-2 h-5 w-5" />
              Chat with AI
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
