import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Showcase from "@/components/showcase";
import ExamNotifications from "@/components/exam-notifications";
import { Twitter, Linkedin, Github, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      
      {/* Exam Notifications Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <ExamNotifications />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/20 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">CareerGuide</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering your career journey with AI-powered insights and personalized guidance.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2" data-testid="social-twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2" data-testid="social-linkedin">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2" data-testid="social-github">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Career Quiz</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">AI Assistant</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Career Insights</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Skill Assessment</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Help Center</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">Contact Us</Button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CareerGuide. Built with ❤️by Team Hackademics</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
