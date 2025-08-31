import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Bot, User, TrendingUp, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI career assistant. I can help you explore career options, discuss your interests, and provide guidance on your professional journey. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat/send", {
        message,
        userId: "anonymous",
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + "-ai",
          text: data.response,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    },
    onError: () => {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Send to AI
    sendMessageMutation.mutate(inputMessage);
  };

  const sendSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
    // Auto submit the suggestion
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: Date.now().toString() + "-user",
        text: suggestion,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");
      setIsTyping(true);
      sendMessageMutation.mutate(suggestion);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
                data-testid="back-to-home"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI Career Assistant
            </motion.h1>
            <p className="text-muted-foreground">Get personalized career advice powered by Google Gemini</p>
          </div>

          {/* Chat Container */}
          <Card className="glassmorphism border-border/20 overflow-hidden">
            {/* Chat Header */}
            <div className="border-b border-border/20 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Career Assistant</h3>
                  <p className="text-sm text-muted-foreground">Powered by Google Gemini</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.sender === "user" ? "justify-end" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  data-testid={`message-${message.sender}-${message.id}`}
                >
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`${
                    message.sender === "user" 
                      ? "chat-bubble-user rounded-2xl rounded-tr-md" 
                      : "chat-bubble-ai rounded-2xl rounded-tl-md"
                  } p-4 max-w-xs md:max-w-md`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <span className={`text-xs mt-2 block ${
                      message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="chat-bubble-ai rounded-2xl rounded-tl-md p-4">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-muted-foreground rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Chat Input */}
            <div className="border-t border-border/20 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <Input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about careers, skills, or your future..."
                  className="flex-1 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={sendMessageMutation.isPending}
                  data-testid="chat-input"
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || sendMessageMutation.isPending}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sendSuggestion('What career should I choose based on my interests?')}
                  className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  data-testid="suggestion-career"
                >
                  Career suggestions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sendSuggestion('How do I improve my skills for my dream job?')}
                  className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  data-testid="suggestion-skills"
                >
                  Skill development
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sendSuggestion('What are the job market trends?')}
                  className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  data-testid="suggestion-trends"
                >
                  Market trends
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => sendSuggestion('What skills are most in demand right now?')}
              className="glassmorphism rounded-xl p-4 h-auto text-left hover:scale-105 transition-all justify-start"
              data-testid="quick-action-skills"
            >
              <div>
                <TrendingUp className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">In-Demand Skills</h4>
                <p className="text-sm text-muted-foreground">Learn about trending skills</p>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => sendSuggestion('How do I choose between multiple career paths?')}
              className="glassmorphism rounded-xl p-4 h-auto text-left hover:scale-105 transition-all justify-start"
              data-testid="quick-action-decisions"
            >
              <div>
                <MapPin className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Career Decisions</h4>
                <p className="text-sm text-muted-foreground">Get help choosing your path</p>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => sendSuggestion('What education do I need for my target career?')}
              className="glassmorphism rounded-xl p-4 h-auto text-left hover:scale-105 transition-all justify-start"
              data-testid="quick-action-education"
            >
              <div>
                <GraduationCap className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Education Planning</h4>
                <p className="text-sm text-muted-foreground">Plan your educational journey</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
