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
import { class10QuizData, class1112QuizData, careerStreamInfo, type QuizOption } from "@/lib/quiz-data";
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

  const currentQuizData = classLevel === "10" ? class10QuizData : class1112QuizData;

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
                <div className="mb-6">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-3xl font-bold mb-2">Your Career Path</h2>
                  <p className="text-xl text-primary font-semibold">{result.cluster}</p>
                  <div className="text-3xl font-bold text-primary mt-4">
                    Final Score: {result.finalScore}/100
                  </div>
                </div>
                
                {/* Score Breakdown */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="text-lg font-semibold">{result.breakdown.marks}</div>
                    <div className="text-sm text-muted-foreground">Marks Score (40%)</div>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="text-lg font-semibold">{result.breakdown.quiz}</div>
                    <div className="text-sm text-muted-foreground">Quiz Score (40%)</div>
                  </div>
                  <div className="glassmorphism p-4 rounded-lg">
                    <div className="text-lg font-semibold">{result.breakdown.stream}</div>
                    <div className="text-sm text-muted-foreground">Stream Weight (20%)</div>
                  </div>
                  {result.penalty > 0 && (
                    <div className="glassmorphism p-4 rounded-lg border-red-500/20">
                      <div className="text-lg font-semibold text-red-500">-{result.penalty}</div>
                      <div className="text-sm text-red-400">Penalty (Weak Subjects)</div>
                    </div>
                  )}
                </div>

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

              {/* Career Suggestions */}
              <Card className="glassmorphism-card">
                <CardHeader>
                  <CardTitle>Top Career Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {result.suggestions.map((career, index) => (
                      <div key={index} className="glassmorphism p-4 rounded-lg text-center">
                        <div className="text-lg font-semibold mb-1">#{index + 1}</div>
                        <div className="font-medium">{career}</div>
                      </div>
                    ))}
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
                      AI-Powered Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.aiAnalysis}
                    </p>
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