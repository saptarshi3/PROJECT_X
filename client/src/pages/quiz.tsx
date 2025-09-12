import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Trophy, RotateCcw, MessageCircle, Settings, Heart, PieChart, Palette, Download, Loader2, BookOpen, Award, ExternalLink, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/navbar";
import { class10QuizData, class1112QuizData, scienceStreamQuizData, commerceStreamQuizData, artsStreamQuizData, careerStreamInfo, type QuizOption } from "@/lib/quiz-data";
import { examData, scholarshipData } from "@/lib/scholarship-data";
import CareerFlowchart from "@/components/career-flowchart";
import jsPDF from 'jspdf';

const iconMap = {
  Settings,
  Heart,
  PieChart,
  Palette,
  BookOpen,
  GraduationCap,
};

type ClassLevel = "10" | "11-12";
type Stream = "Science" | "Commerce" | "Arts";

interface Marks {
  [subject: string]: number;
}

interface QuizResult {
  finalScore: number;
  cluster: string;
  penalty: number;
  suggestions: string[];
  breakdown: {
    marks: number;
    quiz: number;
    stream: number;
    penalty: number;
  };
  aiAnalysis: string;
}

const class10Subjects = [
  "Science",
  "Mathematics", 
  "English",
  "Social Science",
  "Regional Language/Other"
];

const streamSubjects = {
  Science: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
  Commerce: ["Economics", "Business Studies", "Accountancy", "Mathematics", "English"],
  Arts: ["History", "Political Science", "Geography", "English", "Psychology"]
};

export default function Quiz() {
  const [step, setStep] = useState<"class" | "marks" | "quiz" | "results">("class");
  const [classLevel, setClassLevel] = useState<ClassLevel>("10");
  const [stream, setStream] = useState<Stream>("Science");
  const [marks, setMarks] = useState<Marks>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizOption[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const currentQuizData = classLevel === "10" 
    ? class10QuizData 
    : classLevel === "11-12" && stream === "Science" 
      ? scienceStreamQuizData
      : classLevel === "11-12" && stream === "Commerce"
        ? commerceStreamQuizData
        : classLevel === "11-12" && stream === "Arts"
          ? artsStreamQuizData
          : class1112QuizData; // fallback for backward compatibility

  const submitQuizMutation = useMutation({
    mutationFn: async (data: {
      classLevel: ClassLevel;
      stream?: Stream;
      marks: Marks;
      answers: QuizOption[];
    }) => {
      const response = await apiRequest("POST", "/api/quiz/submit", {
        ...data,
        userId: user?.id || "anonymous",
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data?.result) {
        setResult(data.result);
      }
      toast({
        title: "Assessment Completed!",
        description: user ? "Your results have been saved to your profile." : "Your results have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClassSelection = (selectedClass: ClassLevel) => {
    setClassLevel(selectedClass);
    setStep("marks");
    // Reset marks when changing class
    setMarks({});
  };

  const handleStreamSelection = (selectedStream: Stream) => {
    setStream(selectedStream);
    // Reset marks when changing stream
    setMarks({});
  };

  const handleMarksEntry = (subject: string, mark: string) => {
    const numMark = Math.min(100, Math.max(0, parseInt(mark) || 0));
    setMarks(prev => ({ ...prev, [subject]: numMark }));
  };

  const canProceedToQuiz = () => {
    const subjects = classLevel === "10" ? class10Subjects : streamSubjects[stream];
    return subjects.every(subject => marks[subject] !== undefined && marks[subject] >= 0);
  };

  const selectAnswer = (option: QuizOption) => {
    const newAnswers = [...userAnswers, option];
    setUserAnswers(newAnswers);

    if (currentQuestion < currentQuizData.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Submit complete assessment
      submitQuizMutation.mutate({
        classLevel,
        stream: classLevel === "11-12" ? stream : undefined,
        marks,
        answers: newAnswers,
      });
      setStep("results");
    }
  };

  const restartQuiz = () => {
    setStep("class");
    setClassLevel("10");
    setStream("Science");
    setMarks({});
    setCurrentQuestion(0);
    setUserAnswers([]);
    setResult(null);
  };

  const downloadPDF = () => {
    if (!result) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;
    
    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Smart Career Guidance Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // User info
    if (user?.fullName) {
      pdf.setFontSize(14);
      pdf.text(`For: ${user.fullName}`, margin, yPosition);
      yPosition += 10;
    }
    pdf.text(`Class: ${classLevel}`, margin, yPosition);
    if (classLevel === "11-12") {
      yPosition += 7;
      pdf.text(`Stream: ${stream}`, margin, yPosition);
    }
    yPosition += 20;
    
    // Score breakdown
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Score Breakdown:', margin, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Final Score: ${result.finalScore}/100`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Marks Score: ${result.breakdown.marks}/40`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Quiz Score: ${result.breakdown.quiz}/40`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Stream Weight: ${result.breakdown.stream}/20`, margin, yPosition);
    yPosition += 7;
    if (result.penalty > 0) {
      pdf.setTextColor(255, 0, 0);
      pdf.text(`Penalty: -${result.penalty}`, margin, yPosition);
      pdf.setTextColor(0, 0, 0);
    }
    yPosition += 20;
    
    // Career match
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Your Career Match:', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(14);
    pdf.text(result.cluster, margin, yPosition);
    yPosition += 15;
    
    // Career suggestions
    pdf.text('Top Career Suggestions:', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    result.suggestions.forEach((career, index) => {
      pdf.text(`${index + 1}. ${career}`, margin + 5, yPosition);
      yPosition += 7;
    });
    
    // AI Analysis
    if (result.aiAnalysis) {
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI Analysis:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const splitAI = pdf.splitTextToSize(result.aiAnalysis, pageWidth - 2 * margin);
      pdf.text(splitAI, margin, yPosition);
    }
    
    pdf.save(`smart-career-assessment-${classLevel}${user?.fullName ? '-' + user.fullName.replace(/\s+/g, '-') : ''}.pdf`);
    
    toast({
      title: "PDF Downloaded!",
      description: "Your career assessment report has been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Career Assessment
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized career recommendations based on your academic performance and interests
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[
                { step: "class", label: "Class", icon: GraduationCap },
                { step: "marks", label: "Marks", icon: BookOpen },
                { step: "quiz", label: "Quiz", icon: Settings },
                { step: "results", label: "Results", icon: Trophy }
              ].map(({ step: stepName, label, icon: Icon }, index) => (
                <div key={stepName} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    step === stepName 
                      ? "bg-primary text-primary-foreground" 
                      : index < ["class", "marks", "quiz", "results"].indexOf(step)
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:inline">{label}</span>
                  {index < 3 && <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>

          {/* Class Selection */}
          {step === "class" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glassmorphism-card max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">Select Your Current Class</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={classLevel === "10" ? "default" : "outline"}
                        size="lg"
                        className="w-full h-20 text-lg"
                        onClick={() => handleClassSelection("10")}
                      >
                        <div className="text-center">
                          <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                          Class 10
                        </div>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={classLevel === "11-12" ? "default" : "outline"}
                        size="lg"
                        className="w-full h-20 text-lg"
                        onClick={() => handleClassSelection("11-12")}
                      >
                        <div className="text-center">
                          <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                          Class 11/12
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Marks Entry */}
          {step === "marks" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glassmorphism-card max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">
                    Enter Your Subject Marks {classLevel === "11-12" && `(${stream} Stream)`}
                  </CardTitle>
                  <p className="text-center text-muted-foreground">
                    Enter your marks for each subject (0-100). Low marks in core subjects may affect recommendations.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stream Selection for Class 11/12 */}
                  {classLevel === "11-12" && (
                    <div className="space-y-2">
                      <Label>Select Your Stream</Label>
                      <Select value={stream} onValueChange={(value: Stream) => handleStreamSelection(value)}>
                        <SelectTrigger className="glassmorphism">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Marks Input */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {(classLevel === "10" ? class10Subjects : streamSubjects[stream]).map((subject) => (
                      <div key={subject} className="space-y-2">
                        <Label htmlFor={subject}>{subject}</Label>
                        <Input
                          id={subject}
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Enter marks"
                          value={marks[subject] || ""}
                          onChange={(e) => handleMarksEntry(subject, e.target.value)}
                          className="glassmorphism"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep("class")}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep("quiz")}
                      disabled={!canProceedToQuiz()}
                      className="flex-1"
                    >
                      Continue to Quiz
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quiz Questions */}
          {step === "quiz" && !submitQuizMutation.isPending && !result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glassmorphism-card max-w-3xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStep("marks")}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Badge variant="secondary">
                      Question {currentQuestion + 1} of {currentQuizData.length}
                    </Badge>
                  </div>
                  <Progress value={((currentQuestion + 1) / currentQuizData.length) * 100} className="mb-4" />
                  <CardTitle className="text-xl text-center">
                    {currentQuizData[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {currentQuizData[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full p-4 h-auto text-left justify-start glassmorphism-card hover:bg-primary/10"
                          onClick={() => selectAnswer(option)}
                        >
                          <span className="text-sm sm:text-base">{option.text}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Loading */}
          {submitQuizMutation.isPending && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <Card className="glassmorphism-card p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Analyzing Your Results</h3>
                <p className="text-muted-foreground">
                  Our AI is processing your answers and marks to generate personalized recommendations...
                </p>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          {step === "results" && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 mb-12"
            >
              {/* Main Result Card */}
              <Card className="glassmorphism-card text-center p-8">
                <div className="mb-8">
                  <Trophy className="w-20 h-20 mx-auto mb-6 text-primary drop-shadow-lg" />
                  <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    Your Career Path
                  </h2>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full px-6 py-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <p className="text-xl text-primary font-bold">{result.cluster}</p>
                  </div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-primary mt-6 drop-shadow-md">
                      {result.finalScore}<span className="text-2xl text-muted-foreground">/100</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2 font-medium">
                      {result.finalScore >= 75 ? '🎉 Excellent Match!' : result.finalScore >= 50 ? '👍 Good Match!' : '💪 Keep Growing!'}
                    </div>
                  </div>
                </div>
                
                {/* Score Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glassmorphism p-6 rounded-xl border border-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-blue-400">Academic Performance</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-500">{result.breakdown.marks}</div>
                    <div className="text-xs text-muted-foreground mt-1">Marks Score (40%)</div>
                  </div>
                  <div className="glassmorphism p-6 rounded-xl border border-green-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-green-400">Interest Level</span>
                    </div>
                    <div className="text-2xl font-bold text-green-500">{result.breakdown.quiz}</div>
                    <div className="text-xs text-muted-foreground mt-1">Quiz Score (40%)</div>
                  </div>
                  <div className="glassmorphism p-6 rounded-xl border border-purple-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-400"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium text-purple-400">Stream Match</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-500">{result.breakdown.stream}</div>
                    <div className="text-xs text-muted-foreground mt-1">Stream Weight (20%)</div>
                  </div>
                </div>
                
                {/* Penalty Alert */}
                {result.penalty > 0 && (
                  <div className="glassmorphism p-4 rounded-lg border-amber-500/30 bg-amber-500/10 mb-6">
                    <div className="flex items-center gap-2 text-amber-500 mb-1">
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-semibold">Improvement Opportunity</span>
                    </div>
                    <div className="text-sm text-amber-400">-{result.penalty} points penalty for subjects under 40%</div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button onClick={downloadPDF} className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                  <Button onClick={restartQuiz} variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Take Again
                  </Button>
                  <Link href="/chat">
                    <Button variant="outline" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat with AI
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Personalized Advice - Prominent Display */}
              {result.aiAnalysis && result.aiAnalysis.includes('interest aligns with') && (
                <Card className="glassmorphism-card border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                      <ExternalLink className="w-5 h-5" />
                      🎥 Action Required - Bridge the Gap!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-amber-500/20">
                      <p className="text-lg font-semibold text-amber-100 mb-2">
                        💡 Your Path Forward:
                      </p>
                      <p className="text-amber-200 leading-relaxed">
                        {result.aiAnalysis.split('|')[0].trim()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Career Suggestions */}
              <Card className="glassmorphism-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    🎆 Top Career Matches
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your interests and academic performance
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {result.suggestions.map((career, index) => {
                      const colors = ['from-blue-500/20 to-blue-600/20 border-blue-500/30', 'from-green-500/20 to-green-600/20 border-green-500/30', 'from-purple-500/20 to-purple-600/20 border-purple-500/30'];
                      const textColors = ['text-blue-400', 'text-green-400', 'text-purple-400'];
                      const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                      return (
                        <div key={index} className={`glassmorphism p-6 rounded-xl bg-gradient-to-br ${colors[index]} border relative overflow-hidden group hover:scale-105 transition-all duration-300`}>
                          <div className={`absolute top-3 right-3 ${bgColors[index]} text-white text-xs px-2 py-1 rounded-full font-bold`}>
                            #{index + 1}
                          </div>
                          <div className="text-center pt-4">
                            <div className="text-2xl mb-2">
                              {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                            </div>
                            <div className={`font-bold text-lg ${textColors[index]} mb-1`}>{career}</div>
                            <div className="text-xs text-muted-foreground">
                              {index === 0 ? 'Best Match' : index === 1 ? 'Great Option' : 'Good Alternative'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Career Pathway Flowchart */}
              <Card className="glassmorphism-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Career Pathway for {result.cluster}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Interactive flowchart showing your career progression path
                  </p>
                </CardHeader>
                <CardContent>
                  <CareerFlowchart stream={result.cluster as any} />
                </CardContent>
              </Card>

              {/* AI Analysis */}
              {result.aiAnalysis && (
                <Card className="glassmorphism-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      🤖 AI-Powered Insights
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Detailed analysis based on your responses and academic performance
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-muted-foreground leading-relaxed">
                        {result.aiAnalysis}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}