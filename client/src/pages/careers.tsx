import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Bookmark, BookmarkCheck, MapPin, TrendingUp, DollarSign, GraduationCap, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface Career {
  id: string;
  title: string;
  description: string;
  industry: string;
  skills: string[];
  salaryRange: string;
  education: string;
  experience: string;
  growth: string;
  featured: string;
  tags: string[];
  resources?: {
    certifications?: string[];
    courses?: string[];
    platforms?: string[];
  };
  roadmap?: {
    junior?: string;
    mid?: string;
    senior?: string;
  };
}

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [savedCareers, setSavedCareers] = useState<Set<string>>(new Set());
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch careers data
  const { data: careersData, isLoading } = useQuery({
    queryKey: ['/api/careers', selectedIndustry, selectedSkills.join(','), searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedIndustry && selectedIndustry !== "all") params.append('industry', selectedIndustry);
      if (selectedSkills.length > 0) params.append('skills', selectedSkills.join(','));
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/careers?${params}`);
      const data = await response.json();
      return data.careers as Career[];
    },
  });

  const careers = careersData || [];

  // Get unique industries for filter
  const industries = Array.from(new Set(careers.map(career => career.industry)));

  // Get unique skills for filter
  const allSkills = Array.from(new Set(careers.flatMap(career => career.skills)));

  const saveCareer = async (career: Career) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save careers",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/careers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          careerId: career.id,
          notes: `Saved from Career Explorer`
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSavedCareers(prev => new Set([...Array.from(prev), career.id]));
        toast({
          title: "Career Saved!",
          description: `${career.title} has been added to your dashboard`,
        });
      } else {
        toast({
          title: "Already Saved",
          description: "This career is already in your saved list",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving career:', error);
      toast({
        title: "Error",
        description: "Failed to save career. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-20 right-20 w-40 h-40 bg-primary/30 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-32 h-32 bg-accent/30 rounded-full blur-lg"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Explore Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x">
                Dream Career
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover exciting career opportunities across diverse industries. Find your perfect match with detailed insights, salary ranges, and growth potential.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glassmorphism-card rounded-2xl p-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search careers, skills, or industries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg border-border/30 focus:border-primary/50 bg-background/50"
                  data-testid="career-search"
                />
              </div>
              
              {/* Industry Filter */}
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full lg:w-64 h-12 border-border/30 focus:border-primary/50 bg-background/50" data-testid="industry-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Cards Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glassmorphism-card rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-muted-foreground/20 rounded mb-4" />
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2" />
                  <div className="h-4 bg-muted-foreground/20 rounded mb-4" />
                  <div className="h-8 bg-muted-foreground/20 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedIndustry}-${selectedSkills.join('-')}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {careers.map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      bounce: 0.4
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    className="group"
                  >
                    <Card className="glassmorphism-card border-border/30 h-full relative overflow-hidden transition-all duration-300 hover:border-primary/40">
                      {career.featured === "true" && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {career.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {career.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Industry & Salary */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{career.industry}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">{career.salaryRange}</span>
                          </div>
                        </div>

                        {/* Experience & Education */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span>{career.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-purple-500" />
                            <span className="truncate">{career.education}</span>
                          </div>
                        </div>

                        {/* Growth */}
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">{career.growth}</span>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {career.skills.slice(0, 3).map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {career.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{career.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-4">
                        <Button
                          onClick={() => saveCareer(career)}
                          className="w-full glassmorphism-button"
                          variant={savedCareers.has(career.id) ? "default" : "outline"}
                          data-testid={`save-career-${career.id}`}
                        >
                          {savedCareers.has(career.id) ? (
                            <>
                              <BookmarkCheck className="h-4 w-4 mr-2" />
                              Saved
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-4 w-4 mr-2" />
                              Save Career
                            </>
                          )}
                        </Button>
                      </CardFooter>

                      {/* Hover gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        initial={false}
                      />
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && careers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="glassmorphism-card rounded-2xl p-12 max-w-md mx-auto">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No careers found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedIndustry("all");
                    setSelectedSkills([]);
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}