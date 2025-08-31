import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Download, BookmarkPlus, BookmarkMinus, Settings, Heart, PieChart, Palette, GraduationCap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import { careerStreamInfo } from "@/lib/quiz-data";
import { type SavedCareer } from "@shared/schema";

const iconMap = {
  Settings,
  Heart,
  PieChart,
  Palette,
};

interface CareerData {
  title: string;
  stream: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  roadmap: RoadmapStep[];
  exams: ExamInfo[];
}

interface RoadmapStep {
  title: string;
  description: string;
  timeframe: string;
  items: string[];
}

interface ExamInfo {
  name: string;
  description: string;
  website: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const careerDatabase: Record<string, CareerData[]> = {
  "Engineering & Technology": [
    {
      title: "Software Developer",
      stream: "Engineering & Technology",
      salaryRange: "$70k - $180k",
      description: "Design, develop, and maintain software applications and systems using various programming languages and technologies.",
      requiredSkills: ["Programming", "Problem Solving", "Version Control", "Testing", "System Design"],
      roadmap: [
        {
          title: "Foundation Skills",
          description: "Build core programming competencies",
          timeframe: "0-6 months",
          items: ["Learn a programming language (Python/JavaScript)", "Understand data structures and algorithms", "Practice coding challenges", "Learn version control (Git)"]
        },
        {
          title: "Practical Experience",
          description: "Apply skills through projects",
          timeframe: "6-12 months",
          items: ["Build 3-5 personal projects", "Contribute to open source", "Learn web frameworks", "Create a portfolio website"]
        },
        {
          title: "Professional Development",
          description: "Prepare for the job market",
          timeframe: "12-18 months",
          items: ["Apply for internships/entry jobs", "Network with developers", "Practice technical interviews", "Keep learning new technologies"]
        }
      ],
      exams: [
        { name: "AWS Certified Developer", description: "Cloud development certification", website: "https://aws.amazon.com/certification/", difficulty: "Intermediate" },
        { name: "Oracle Java Certification", description: "Java programming certification", website: "https://education.oracle.com/java", difficulty: "Intermediate" },
        { name: "Google Cloud Professional Developer", description: "Google Cloud development certification", website: "https://cloud.google.com/certification", difficulty: "Advanced" }
      ]
    },
    {
      title: "Data Scientist",
      stream: "Engineering & Technology",
      salaryRange: "$85k - $200k",
      description: "Analyze complex data to derive insights and build predictive models using statistics, machine learning, and programming.",
      requiredSkills: ["Python/R", "Statistics", "Machine Learning", "Data Visualization", "SQL"],
      roadmap: [
        {
          title: "Mathematical Foundation",
          description: "Build statistical and mathematical skills",
          timeframe: "0-6 months",
          items: ["Learn statistics and probability", "Master Python/R programming", "Understand linear algebra", "Practice data manipulation"]
        },
        {
          title: "Machine Learning",
          description: "Learn ML algorithms and tools",
          timeframe: "6-12 months",
          items: ["Study ML algorithms", "Use scikit-learn, pandas", "Build prediction models", "Learn data visualization"]
        },
        {
          title: "Specialization",
          description: "Focus on specific domain expertise",
          timeframe: "12-24 months",
          items: ["Choose specialization (NLP/Computer Vision/etc)", "Work on real datasets", "Build portfolio projects", "Apply for data science roles"]
        }
      ],
      exams: [
        { name: "Microsoft Azure Data Scientist", description: "Azure ML platform certification", website: "https://docs.microsoft.com/certifications/", difficulty: "Advanced" },
        { name: "Google Professional Data Engineer", description: "Data engineering on Google Cloud", website: "https://cloud.google.com/certification", difficulty: "Advanced" },
        { name: "Databricks Certified Data Scientist", description: "Databricks platform certification", website: "https://databricks.com/learn/certification", difficulty: "Intermediate" }
      ]
    }
  ],
  "Medicine & Healthcare": [
    {
      title: "Medical Doctor",
      stream: "Medicine & Healthcare",
      salaryRange: "$200k - $500k+",
      description: "Diagnose, treat, and provide medical care to patients while maintaining the highest standards of medical practice.",
      requiredSkills: ["Medical Knowledge", "Patient Care", "Communication", "Critical Thinking", "Empathy"],
      roadmap: [
        {
          title: "Pre-Medical Education",
          description: "Complete undergraduate requirements",
          timeframe: "4 years",
          items: ["Bachelor's degree (preferably in sciences)", "Complete pre-med requirements", "Maintain high GPA (3.7+)", "Gain healthcare experience"]
        },
        {
          title: "Medical School",
          description: "Complete medical education",
          timeframe: "4 years",
          items: ["Pass MCAT exam", "Complete MD program", "Pass USMLE Step 1 & 2", "Choose medical specialty"]
        },
        {
          title: "Residency & Practice",
          description: "Specialized training and practice",
          timeframe: "3-7 years",
          items: ["Complete residency program", "Pass USMLE Step 3", "Obtain medical license", "Consider fellowship training"]
        }
      ],
      exams: [
        { name: "MCAT", description: "Medical College Admission Test", website: "https://www.aamc.org/students/applying/mcat", difficulty: "Advanced" },
        { name: "USMLE", description: "United States Medical Licensing Examination", website: "https://www.usmle.org/", difficulty: "Advanced" },
        { name: "Board Certifications", description: "Specialty board examinations", website: "https://www.abms.org/", difficulty: "Advanced" }
      ]
    }
  ],
  "Commerce & Finance": [
    {
      title: "Financial Analyst",
      stream: "Commerce & Finance",
      salaryRange: "$60k - $150k",
      description: "Analyze financial data, market trends, and investment opportunities to provide recommendations for business decisions.",
      requiredSkills: ["Financial Modeling", "Excel", "Data Analysis", "Communication", "Market Research"],
      roadmap: [
        {
          title: "Educational Foundation",
          description: "Build finance and business knowledge",
          timeframe: "0-12 months",
          items: ["Learn financial fundamentals", "Master Excel and financial modeling", "Study accounting principles", "Understand market analysis"]
        },
        {
          title: "Professional Certification",
          description: "Obtain relevant certifications",
          timeframe: "12-24 months",
          items: ["Pursue CFA Level 1", "Get familiar with Bloomberg/Reuters", "Build financial models", "Network with finance professionals"]
        },
        {
          title: "Career Advancement",
          description: "Progress to senior roles",
          timeframe: "2-5 years",
          items: ["Complete CFA program", "Specialize in sector/industry", "Lead analysis projects", "Mentor junior analysts"]
        }
      ],
      exams: [
        { name: "CFA Charter", description: "Chartered Financial Analyst certification", website: "https://www.cfainstitute.org/", difficulty: "Advanced" },
        { name: "FRM", description: "Financial Risk Manager certification", website: "https://www.garp.org/frm", difficulty: "Advanced" },
        { name: "FINRA Series 7", description: "Securities representative license", website: "https://www.finra.org/registration-exams-ce", difficulty: "Intermediate" }
      ]
    }
  ],
  "Arts & Humanities": [
    {
      title: "UX/UI Designer",
      stream: "Arts & Humanities",
      salaryRange: "$65k - $140k",
      description: "Create intuitive and visually appealing user interfaces while ensuring excellent user experiences across digital products.",
      requiredSkills: ["Design Thinking", "Prototyping", "User Research", "Visual Design", "Collaboration"],
      roadmap: [
        {
          title: "Design Fundamentals",
          description: "Learn core design principles",
          timeframe: "0-6 months",
          items: ["Study design principles", "Learn Figma/Sketch", "Understand color theory", "Practice typography"]
        },
        {
          title: "UX Skills",
          description: "Develop user experience expertise",
          timeframe: "6-12 months",
          items: ["Learn user research methods", "Practice wireframing", "Study usability principles", "Build design portfolio"]
        },
        {
          title: "Professional Practice",
          description: "Apply skills in real projects",
          timeframe: "12-18 months",
          items: ["Work on client projects", "Join design communities", "Get feedback and iterate", "Apply for UX positions"]
        }
      ],
      exams: [
        { name: "Google UX Design Certificate", description: "Google's UX design program", website: "https://www.coursera.org/google-certificates/ux-design-certificate", difficulty: "Beginner" },
        { name: "Adobe Certified Expert", description: "Adobe Creative Suite certification", website: "https://www.adobe.com/training/certification.html", difficulty: "Intermediate" },
        { name: "Nielsen Norman UX Certification", description: "UX research and design certification", website: "https://www.nngroup.com/ux-certification/", difficulty: "Advanced" }
      ]
    }
  ]
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState<CareerData | null>(null);
  const [roadmapOpen, setRoadmapOpen] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">Please sign in to access your dashboard</h1>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { data: savedCareers = [] } = useQuery<SavedCareer[]>({
    queryKey: ["/api/careers/saved", user?.id],
    enabled: !!user?.id,
  });

  const saveCareerMutation = useMutation({
    mutationFn: async (career: CareerData) => {
      const response = await apiRequest("POST", "/api/careers/save", {
        userId: user?.id,
        careerTitle: career.title,
        careerStream: career.stream,
        salaryRange: career.salaryRange,
        description: career.description,
        requiredSkills: career.requiredSkills,
        roadmap: career.roadmap,
        exams: career.exams,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Career Saved!",
        description: "Added to your saved careers.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/careers/saved", user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save career. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeSavedCareerMutation = useMutation({
    mutationFn: async (careerId: string) => {
      const response = await apiRequest("DELETE", `/api/careers/saved/${careerId}?userId=${user?.id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Career Removed",
        description: "Removed from your saved careers.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/careers/saved", user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove career. Please try again.",
        variant: "destructive",
      });
    },
  });

  const isCareerSaved = (careerTitle: string) => {
    return savedCareers.some((saved) => saved.careerTitle === careerTitle);
  };

  const exportToPDF = async () => {
    try {
      const jsPDF = (await import("jspdf")).default;
      const html2canvas = (await import("html2canvas")).default;
      
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(255, 115, 34); // Orange color
      pdf.text("CareerGuide Report", 20, 30);
      
      // Add user info
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Name: ${user?.fullName || user?.username}`, 20, 50);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
      
      // Add saved careers
      let yPosition = 80;
      pdf.setFontSize(16);
      pdf.text("Recommended Careers:", 20, yPosition);
      yPosition += 20;
      
      savedCareers.forEach((career, index: number) => {
        pdf.setFontSize(12);
        pdf.text(`${index + 1}. ${career.careerTitle}`, 30, yPosition);
        yPosition += 10;
        pdf.text(`Stream: ${career.careerStream}`, 40, yPosition);
        yPosition += 10;
        if (career.salaryRange) {
          pdf.text(`Salary: ${career.salaryRange}`, 40, yPosition);
          yPosition += 10;
        }
        yPosition += 10;
      });
      
      pdf.save(`${user?.username}-career-report.pdf`);
      
      toast({
        title: "PDF Downloaded!",
        description: "Your career report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getAllCareers = () => {
    return Object.values(careerDatabase).flat();
  };

  const toggleRoadmapStep = (stepIndex: number) => {
    setRoadmapOpen(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
                  data-testid="back-to-home"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Welcome, {user?.fullName || user?.username}!
              </motion.h1>
              <p className="text-muted-foreground mt-2">Explore and save your ideal career paths</p>
            </div>
            <Button
              onClick={exportToPDF}
              className="bg-primary text-primary-foreground hover:scale-105 transition-all"
              data-testid="export-pdf"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>

          {/* Saved Careers Count */}
          <div className="mb-8">
            <Card className="glassmorphism border-border/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Your Career Journey</h3>
                <p className="text-muted-foreground">
                  You have <span className="text-primary font-semibold">{savedCareers.length}</span> saved career{savedCareers.length !== 1 ? 's' : ''} to explore
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Career Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllCareers().map((career, index) => {
              const streamInfo = careerStreamInfo[career.stream as keyof typeof careerStreamInfo];
              const IconComponent = iconMap[streamInfo?.icon as keyof typeof iconMap] || Settings;
              const isSaved = isCareerSaved(career.title);
              
              return (
                <motion.div
                  key={index}
                  className="tilt-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  data-testid={`career-card-${index}`}
                >
                  <Card className="glassmorphism border-border/20 h-full cursor-pointer"
                        onClick={() => setSelectedCareer(career)}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className={`w-12 h-12 bg-gradient-to-br ${streamInfo?.gradient} rounded-xl flex items-center justify-center mb-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSaved) {
                              const savedCareer = savedCareers.find((s) => s.careerTitle === career.title);
                              if (savedCareer) {
                                removeSavedCareerMutation.mutate(savedCareer.id);
                              }
                            } else {
                              saveCareerMutation.mutate(career);
                            }
                          }}
                          className="p-2 hover:scale-110 transition-all"
                          data-testid={`save-career-${index}`}
                        >
                          {isSaved ? 
                            <BookmarkMinus className="h-4 w-4 text-primary" /> : 
                            <BookmarkPlus className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          }
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="mb-3">{career.stream}</Badge>
                      <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-primary">{career.salaryRange}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {career.requiredSkills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {career.requiredSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{career.requiredSkills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Career Detail Modal */}
      <Dialog open={!!selectedCareer} onOpenChange={() => setSelectedCareer(null)}>
        <DialogContent className="glassmorphism border-border/20 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedCareer?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedCareer && (
            <div className="space-y-6">
              {/* Career Overview */}
              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-muted-foreground">{selectedCareer.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Salary Range</h4>
                      <p className="text-primary font-semibold">{selectedCareer.salaryRange}</p>
                      
                      <h4 className="font-semibold mt-4 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Roadmap */}
              <Card className="glassmorphism border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Career Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCareer.roadmap.map((step, stepIndex) => (
                    <Collapsible
                      key={stepIndex}
                      open={roadmapOpen[stepIndex]}
                      onOpenChange={() => toggleRoadmapStep(stepIndex)}
                    >
                      <CollapsibleTrigger asChild>
                        <Card className="glassmorphism border-border/20 cursor-pointer hover:scale-105 transition-all">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold">{step.title}</h4>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                              </div>
                              <Badge variant="outline">{step.timeframe}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <Card className="glassmorphism border-border/20 ml-4">
                          <CardContent className="p-4">
                            <ul className="space-y-2">
                              {step.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>

              {/* Recommended Exams */}
              <Card className="glassmorphism border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Recommended Certifications & Exams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCareer.exams.map((exam, examIndex) => (
                    <Card key={examIndex} className="glassmorphism border-border/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{exam.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{exam.description}</p>
                            <Badge 
                              variant={exam.difficulty === "Beginner" ? "secondary" : exam.difficulty === "Intermediate" ? "outline" : "default"}
                              className="text-xs"
                            >
                              {exam.difficulty}
                            </Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(exam.website, '_blank')}
                            className="ml-4 hover:scale-105 transition-all"
                            data-testid={`exam-link-${examIndex}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}