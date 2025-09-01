import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Bot } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ThreeDScene from "./3d-scene";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeDScene className="opacity-60" />
      </div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30 backdrop-blur-[1px]" />
      
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <span className="text-foreground/90">Discover Your</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x">
            Perfect Career
          </span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground/90 mb-12 max-w-2xl mx-auto backdrop-blur-sm drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Take our intelligent assessment, chat with AI, and unlock personalized career insights tailored just for you
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Link href="/quiz">
            <Button 
              size="lg"
              className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-primary/30 glassmorphism-button border border-primary/20 backdrop-blur-md"
              data-testid="start-quiz-button"
            >
              <Play className="mr-3 h-6 w-6" />
              Start Career Quiz
            </Button>
          </Link>
          <Link href="/chat">
            <Button 
              variant="outline"
              size="lg"
              className="px-10 py-4 glassmorphism rounded-2xl font-bold hover:scale-105 transform transition-all duration-300 border-2 border-border/30 backdrop-blur-md shadow-2xl hover:shadow-accent/20 hover:border-accent/50"
              data-testid="chat-ai-button"
            >
              <Bot className="mr-3 h-6 w-6" />
              Chat with AI
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
