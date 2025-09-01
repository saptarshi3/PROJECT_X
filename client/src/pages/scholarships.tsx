import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, Calendar, IndianRupee, Award, BookOpen, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import { examData, scholarshipData, examCategories, scholarshipCategories, type Exam, type Scholarship } from "@/lib/scholarship-data";

export default function Scholarships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [examCategory, setExamCategory] = useState<string>("All");
  const [scholarshipCategory, setScholarshipCategory] = useState<string>("All");

  const filteredExams = useMemo(() => {
    return examData.filter((exam) => {
      const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = examCategory === "All" || exam.category === examCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, examCategory]);

  const filteredScholarships = useMemo(() => {
    return scholarshipData.filter((scholarship) => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = scholarshipCategory === "All" || scholarship.type === scholarshipCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, scholarshipCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setExamCategory("All");
    setScholarshipCategory("All");
  };

  const ExamCard = ({ exam }: { exam: Exam }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glassmorphism-card h-full hover:scale-105 transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight mb-2">
                {exam.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-2">
                {exam.fullName}
              </p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {exam.category}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {exam.streams.map((stream) => (
              <Badge key={stream} variant="secondary" className="text-xs">
                {stream}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">
            {exam.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <BookOpen className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Eligibility:</div>
                <div className="text-xs text-muted-foreground">{exam.eligibility}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Application:</div>
                <div className="text-xs text-muted-foreground">{exam.applicationPeriod}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Exam Date:</div>
                <div className="text-xs text-muted-foreground">{exam.examDate}</div>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 glassmorphism-button"
            onClick={() => window.open(exam.website, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Official Website
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ScholarshipCard = ({ scholarship }: { scholarship: Scholarship }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glassmorphism-card h-full hover:scale-105 transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight mb-2">
                {scholarship.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-2">
                {scholarship.provider}
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
              {scholarship.type}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {scholarship.category.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">
            {scholarship.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <IndianRupee className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Amount:</div>
                <div className="text-xs text-muted-foreground">{scholarship.amount}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <BookOpen className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Eligibility:</div>
                <div className="text-xs text-muted-foreground">{scholarship.eligibility}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">Application Period:</div>
                <div className="text-xs text-muted-foreground">{scholarship.applicationPeriod}</div>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 glassmorphism-button"
            onClick={() => window.open(scholarship.website, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

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
              Scholarships & Exams
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore entrance exams and scholarship opportunities across India. Find the right path to fund your education and achieve your career goals.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="exams" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="glassmorphism border-border/30">
                <TabsTrigger value="exams" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Entrance Exams
                </TabsTrigger>
                <TabsTrigger value="scholarships" className="flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Scholarships
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="exams">
              {/* Exam Filters */}
              <motion.div 
                className="glassmorphism rounded-xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search exams..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glassmorphism border-border/30"
                    />
                  </div>
                  
                  <Select value={examCategory} onValueChange={setExamCategory}>
                    <SelectTrigger className="w-full lg:w-[200px] glassmorphism border-border/30">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {examCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    onClick={clearFilters}
                    variant="outline"
                    className="glassmorphism border-border/30"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  Found {filteredExams.length} exams
                </div>
              </motion.div>

              {/* Exam Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scholarships">
              {/* Scholarship Filters */}
              <motion.div 
                className="glassmorphism rounded-xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search scholarships..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glassmorphism border-border/30"
                    />
                  </div>
                  
                  <Select value={scholarshipCategory} onValueChange={setScholarshipCategory}>
                    <SelectTrigger className="w-full lg:w-[200px] glassmorphism border-border/30">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {scholarshipCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    onClick={clearFilters}
                    variant="outline"
                    className="glassmorphism border-border/30"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  Found {filteredScholarships.length} scholarships
                </div>
              </motion.div>

              {/* Scholarship Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* No Results */}
          {((filteredExams.length === 0 && examCategory !== "All") || 
            (filteredScholarships.length === 0 && scholarshipCategory !== "All")) && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
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