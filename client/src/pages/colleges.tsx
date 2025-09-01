import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, ExternalLink, Filter, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import { collegeData, indianStates, streams, type College } from "@/lib/college-data";

export default function Colleges() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedStream, setSelectedStream] = useState<string>("all");

  const filteredColleges = useMemo(() => {
    return collegeData.filter((college) => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState === "all" || college.state === selectedState;
      const matchesStream = selectedStream === "all" || college.stream.includes(selectedStream);
      
      return matchesSearch && matchesState && matchesStream;
    });
  }, [searchTerm, selectedState, selectedStream]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("all");
    setSelectedStream("all");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              College Finder
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover top colleges across India. Find the perfect institution for your academic journey with detailed information about courses, rankings, and more.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="glassmorphism rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges or cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glassmorphism border-border/30"
                />
              </div>
              
              {/* State Filter */}
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full lg:w-[200px] glassmorphism border-border/30">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Stream Filter */}
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger className="w-full lg:w-[200px] glassmorphism border-border/30">
                  <SelectValue placeholder="All Streams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  {streams.map((stream) => (
                    <SelectItem key={stream} value={stream}>
                      {stream}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="glassmorphism border-border/30"
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Found {filteredColleges.length} colleges
            </div>
          </motion.div>

          {/* College Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glassmorphism-card h-full hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2">
                          {college.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {college.city}, {college.state}
                        </div>
                      </div>
                      {college.nirfRank && (
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          <Award className="h-3 w-3 mr-1" />
                          #{college.nirfRank}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {college.stream.map((stream) => (
                        <Badge key={stream} variant="secondary" className="text-xs">
                          {stream}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {college.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">Est. {college.establishedYear}</span>
                        <span className="ml-auto text-muted-foreground">{college.type}</span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Key Courses:</div>
                        <div className="text-xs text-muted-foreground">
                          {college.courses.slice(0, 3).join(', ')}
                          {college.courses.length > 3 && ` +${college.courses.length - 3} more`}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 glassmorphism-button"
                      onClick={() => window.open(college.website, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredColleges.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No colleges found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or clearing the filters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}