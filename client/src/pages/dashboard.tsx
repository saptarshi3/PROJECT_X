import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Download, 
  Settings, 
  Heart, 
  PieChart, 
  Palette, 
  BookOpen,
  TrendingUp,
  GraduationCap,
  Quote,
  User,
  Star,
  Award,
  Target,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import { careerStreamInfo } from "@/lib/quiz-data";
import { collegeData } from "@/lib/college-data";
import jsPDF from 'jspdf';

const iconMap = {
  Settings,
  Heart,
  PieChart,
  Palette,
  BookOpen,
};

// Motivational quotes for career guidance
const motivationalQuotes = [
  {
    text: "Your career is your story. Make it a masterpiece.",
    author: "Anonymous"
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  {
    text: "Choose a job you love, and you will never have to work a day in your life.",
    author: "Confucius"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Your only limit is your mind. Dream big, work hard, achieve greatness.",
    author: "Anonymous"
  }
];

// Career data with INR salaries
const careerSalaryDataINR = {
  "Science": [
    { title: "Software Engineer", salaryRange: "₹6-25 LPA", description: "Design and develop software applications" },
    { title: "Data Scientist", salaryRange: "₹8-30 LPA", description: "Analyze complex data for insights" },
    { title: "Mechanical Engineer", salaryRange: "₹4-18 LPA", description: "Design and develop mechanical systems" },
    { title: "Civil Engineer", salaryRange: "₹3-15 LPA", description: "Plan and design infrastructure projects" },
    { title: "Doctor", salaryRange: "₹8-50 LPA", description: "Provide medical care to patients" },
    { title: "Research Scientist", salaryRange: "₹5-20 LPA", description: "Conduct scientific research" }
  ],
  "Commerce": [
    { title: "Chartered Accountant", salaryRange: "₹6-35 LPA", description: "Manage financial accounts and taxation" },
    { title: "Investment Banker", salaryRange: "₹12-60 LPA", description: "Provide financial advisory services" },
    { title: "Business Manager", salaryRange: "₹5-25 LPA", description: "Oversee business operations" },
    { title: "Financial Analyst", salaryRange: "₹4-20 LPA", description: "Analyze financial data and trends" },
    { title: "Marketing Manager", salaryRange: "₹5-22 LPA", description: "Develop marketing strategies" },
    { title: "Entrepreneur", salaryRange: "₹0-∞ LPA", description: "Start and run own business" }
  ],
  "Arts": [
    { title: "Teacher", salaryRange: "₹3-12 LPA", description: "Educate and inspire students" },
    { title: "Journalist", salaryRange: "₹3-15 LPA", description: "Report news and write articles" },
    { title: "Lawyer", salaryRange: "₹5-40 LPA", description: "Provide legal representation" },
    { title: "Content Writer", salaryRange: "₹3-10 LPA", description: "Create written content" },
    { title: "Historian", salaryRange: "₹3-12 LPA", description: "Study and interpret historical events" },
    { title: "Professor", salaryRange: "₹6-20 LPA", description: "Teach at university level" }
  ],
  "Creative": [
    { title: "Graphic Designer", salaryRange: "₹3-15 LPA", description: "Create visual designs" },
    { title: "Fashion Designer", salaryRange: "₹3-25 LPA", description: "Design clothing and accessories" },
    { title: "Film Director", salaryRange: "₹5-50 LPA", description: "Direct movies and videos" },
    { title: "Animator", salaryRange: "₹4-18 LPA", description: "Create animated content" },
    { title: "Musician", salaryRange: "₹2-30 LPA", description: "Perform and create music" },
    { title: "Interior Designer", salaryRange: "₹3-20 LPA", description: "Design interior spaces" }
  ],
  "Social": [
    { title: "Social Worker", salaryRange: "₹2-8 LPA", description: "Help communities and individuals" },
    { title: "Counselor", salaryRange: "₹3-12 LPA", description: "Provide guidance and therapy" },
    { title: "Civil Servant", salaryRange: "₹5-15 LPA", description: "Work in government administration" },
    { title: "NGO Worker", salaryRange: "₹3-10 LPA", description: "Work for social causes" },
    { title: "Public Policy Analyst", salaryRange: "₹6-18 LPA", description: "Analyze and develop policies" },
    { title: "Diplomat", salaryRange: "₹8-25 LPA", description: "Represent country internationally" }
  ]
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const { toast } = useToast();

  // Fetch user's quiz results - must be declared before any conditional returns
  const { data: quizResults = [] } = useQuery({
    queryKey: ["/api/quiz/results", user?.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/quiz/results?userId=${user?.id}`);
      return response.json();
    },
    enabled: !!user?.id && isAuthenticated,
  });

  // Get latest quiz result
  const latestQuizResult = useMemo(() => {
    if (quizResults.length === 0) return null;
    return quizResults.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [quizResults]);

  // Parse quiz result data
  const quizData = useMemo(() => {
    if (!latestQuizResult) return null;
    
    try {
      // Extract information from the result string
      const resultText = latestQuizResult.result;
      const clusterMatch = resultText.match(/(\w+)\s*\(Score:\s*(\d+)\)/);
      
      if (clusterMatch) {
        const cluster = clusterMatch[1];
        const score = parseInt(clusterMatch[2]);
        
        return {
          cluster,
          score,
          answers: latestQuizResult.answers,
          date: new Date(latestQuizResult.createdAt).toLocaleDateString(),
          recommendations: careerSalaryDataINR[cluster as keyof typeof careerSalaryDataINR] || []
        };
      }
    } catch (error) {
      console.error('Error parsing quiz data:', error);
    }
    
    return null;
  }, [latestQuizResult]);

  // Get recommended colleges based on user's stream
  const recommendedColleges = useMemo(() => {
    if (!quizData?.cluster) return [];
    
    let streamFilter: string[] = [];
    
    switch (quizData.cluster) {
      case 'Science':
        streamFilter = ['Engineering', 'Medical', 'Science'];
        break;
      case 'Commerce':
        streamFilter = ['Commerce', 'Management'];
        break;
      case 'Arts':
        streamFilter = ['Arts', 'Law', 'Humanities'];
        break;
      case 'Creative':
        streamFilter = ['Arts', 'Design'];
        break;
      case 'Social':
        streamFilter = ['Arts', 'Law', 'Social Work'];
        break;
    }
    
    return collegeData
      .filter(college => college.stream.some(s => streamFilter.includes(s)))
      .sort((a, b) => (a.nirfRank || 999) - (b.nirfRank || 999))
      .slice(0, 6);
  }, [quizData?.cluster]);

  // Generate downloadable career report
  const generateCareerReport = async () => {
    try {
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('Career Assessment Report', 20, 30);
      
      // Add user info
      pdf.setFontSize(12);
      pdf.text(`Generated for: ${user?.fullName || user?.username || 'User'}`, 20, 50);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
      
      if (quizData) {
        // Add quiz results
        pdf.setFontSize(16);
        pdf.text('Quiz Results', 20, 80);
        
        pdf.setFontSize(12);
        pdf.text(`Recommended Stream: ${quizData.cluster}`, 20, 100);
        pdf.text(`Assessment Score: ${quizData.score}/100`, 20, 110);
        pdf.text(`Assessment Date: ${quizData.date}`, 20, 120);
        
        // Add career recommendations
        pdf.setFontSize(16);
        pdf.text('Recommended Careers', 20, 140);
        
        pdf.setFontSize(12);
        let yPosition = 160;
        quizData.recommendations.slice(0, 5).forEach((career, index) => {
          pdf.text(`${index + 1}. ${career.title}`, 25, yPosition);
          pdf.text(`   Salary: ${career.salaryRange}`, 25, yPosition + 10);
          pdf.text(`   ${career.description}`, 25, yPosition + 20);
          yPosition += 35;
        });
        
        // Add college recommendations
        if (recommendedColleges.length > 0) {
          pdf.addPage();
          pdf.setFontSize(16);
          pdf.text('Recommended Colleges', 20, 30);
          
          pdf.setFontSize(12);
          let collegeYPosition = 50;
          recommendedColleges.slice(0, 5).forEach((college, index) => {
            pdf.text(`${index + 1}. ${college.name}`, 25, collegeYPosition);
            pdf.text(`   Location: ${college.city}, ${college.state}`, 25, collegeYPosition + 10);
            pdf.text(`   NIRF Rank: ${college.nirfRank}`, 25, collegeYPosition + 20);
            pdf.text(`   Courses: ${college.courses.join(', ')}`, 25, collegeYPosition + 30);
            collegeYPosition += 45;
          });
        }
      }
      
      // Save the PDF
      pdf.save(`career-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Report Downloaded!",
        description: "Your career assessment report has been saved.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const streamInfo = quizData?.cluster ? careerStreamInfo[quizData.cluster as keyof typeof careerStreamInfo] : null;
  const IconComponent = streamInfo ? iconMap[streamInfo.icon as keyof typeof iconMap] || Settings : User;

  // Redirect to home if not authenticated - moved after all hooks
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header with User Profile */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center mb-6">
              {/* User Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4">
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-white" />
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back, {user?.fullName || user?.username}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Your personalized career dashboard
              </p>
            </div>

            {/* Motivational Quote */}
            <motion.div 
              className="glassmorphism rounded-xl p-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Quote className="h-8 w-8 mx-auto mb-4 text-primary" />
              <blockquote className="text-lg italic font-medium mb-2">
                "{selectedQuote.text}"
              </blockquote>
              <cite className="text-sm text-muted-foreground">
                — {selectedQuote.author}
              </cite>
            </motion.div>
          </motion.div>

          {/* Main Dashboard Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Quiz Results & Stream Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Quiz Results Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="glassmorphism border-border/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Your Quiz Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {quizData ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold">{quizData.cluster} Stream</h3>
                            <p className="text-muted-foreground">Assessment taken on {quizData.date}</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{quizData.score}</div>
                            <div className="text-sm text-muted-foreground">out of 100</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Assessment Score</span>
                            <span className="text-sm text-muted-foreground">{quizData.score}%</span>
                          </div>
                          <Progress value={quizData.score} className="h-3" />
                        </div>

                        <div className="flex gap-4">
                          <Button onClick={generateCareerReport} className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Report
                          </Button>
                          <Link href="/quiz">
                            <Button variant="outline">Retake Quiz</Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No Quiz Results Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Take our career assessment to get personalized recommendations
                        </p>
                        <Link href="/quiz">
                          <Button>Take Career Quiz</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommended Careers */}
              {quizData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="glassmorphism border-border/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Recommended Careers for You
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {quizData.recommendations.slice(0, 6).map((career, index) => (
                          <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/20">
                            <h4 className="font-semibold mb-1">{career.title}</h4>
                            <p className="text-sm text-primary font-medium mb-2">{career.salaryRange}</p>
                            <p className="text-sm text-muted-foreground">{career.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Recommended Colleges */}
              {recommendedColleges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="glassmorphism border-border/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Recommended Colleges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {recommendedColleges.map((college, index) => (
                          <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/20">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{college.name}</h4>
                              <Badge variant="secondary">#{college.nirfRank}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {college.city}, {college.state}
                            </p>
                            <p className="text-xs text-primary">
                              {college.courses.slice(0, 3).join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Link href="/colleges">
                          <Button variant="outline" size="sm">View All Colleges</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Column - Stream Information */}
            <div className="space-y-8">
              {streamInfo && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="glassmorphism border-border/20">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-gradient-to-br ${streamInfo.gradient} rounded-xl flex items-center justify-center mb-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{quizData?.cluster} Stream</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {streamInfo.description}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Popular Careers:</h4>
                        <div className="flex flex-wrap gap-2">
                          {streamInfo.careers.slice(0, 4).map((career, index) => (
                            <Badge key={index} variant="secondary">{career}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Exams:</h4>
                        <div className="space-y-1">
                          {streamInfo.recommendedExams.slice(0, 3).map((exam, index) => (
                            <p key={index} className="text-sm text-muted-foreground">• {exam}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="glassmorphism border-border/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/chat" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Chat with AI Counselor
                      </Button>
                    </Link>
                    <Link href="/colleges" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Building className="h-4 w-4 mr-2" />
                        Explore Colleges
                      </Button>
                    </Link>
                    <Link href="/quiz" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Star className="h-4 w-4 mr-2" />
                        Retake Assessment
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}