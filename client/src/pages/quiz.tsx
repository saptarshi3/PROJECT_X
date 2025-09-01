import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, RotateCcw, MessageCircle, Settings, Heart, PieChart, Palette, Download, Loader2, BookOpen, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import { quizData, careerStreamInfo, type QuizOption } from "@/lib/quiz-data";
import { examData, scholarshipData } from "@/lib/scholarship-data";
import jsPDF from 'jspdf';

const iconMap = {
  Settings,
  Heart,
  PieChart,
  Palette,
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizOption[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState<string>("");
  const [aiRecommendation, setAiRecommendation] = useState<string>("");
  const { toast } = useToast();

  const submitQuizMutation = useMutation({
    mutationFn: async (data: { answers: QuizOption[]; result: string }) => {
      const response = await apiRequest("POST", "/api/quiz/submit", {
        userId: "anonymous",
        answers: data.answers,
        result: data.result,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data?.result?.result) {
        const fullResult = data.result.result;
        if (fullResult.includes('| AI Analysis:')) {
          const aiPart = fullResult.split('| AI Analysis:')[1];
          setAiRecommendation(aiPart.trim());
        }
      }
      toast({
        title: "Quiz Completed!",
        description: "Your results have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save quiz results. Please try again.",
        variant: "destructive",
      });
    },
  });

  const selectAnswer = (option: QuizOption) => {
    const newAnswers = [...userAnswers, option];
    setUserAnswers(newAnswers);

    if (currentQuestion < quizData.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calculate results
      const streamCounts: Record<string, number> = {};
      newAnswers.forEach(answer => {
        streamCounts[answer.stream] = (streamCounts[answer.stream] || 0) + 1;
      });
      
      const topStream = Object.keys(streamCounts).reduce((a, b) => 
        streamCounts[a] > streamCounts[b] ? a : b
      );
      
      setResult(topStream);
      setQuizCompleted(true);
      
      // Submit to backend
      submitQuizMutation.mutate({ answers: newAnswers, result: topStream });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setResult("");
    setAiRecommendation("");
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;
    
    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Career Guidance Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Career Match
    pdf.setFontSize(16);
    pdf.text('Your Career Match:', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(result, margin, yPosition);
    yPosition += 15;
    
    // Description
    if (result && careerStreamInfo[result as keyof typeof careerStreamInfo]) {
      const streamInfo = careerStreamInfo[result as keyof typeof careerStreamInfo];
      const description = streamInfo.description;
      const splitDescription = pdf.splitTextToSize(description, pageWidth - 2 * margin);
      pdf.text(splitDescription, margin, yPosition);
      yPosition += splitDescription.length * 7 + 10;
      
      // Recommended Careers
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommended Careers:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      const careers = streamInfo.careers;
      careers.forEach((career, index) => {
        pdf.text(`${index + 1}. ${career}`, margin + 5, yPosition);
        yPosition += 7;
      });
      
      // Recommended Exams
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommended Entrance Exams:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      const recommendedExams = examData.filter(exam => streamInfo.recommendedExams.includes(exam.id));
      recommendedExams.forEach((exam, index) => {
        pdf.text(`${index + 1}. ${exam.name} - ${exam.fullName}`, margin + 5, yPosition);
        yPosition += 7;
      });
      
      // Recommended Scholarships
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommended Scholarships:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      const recommendedScholarships = scholarshipData.filter(scholarship => streamInfo.recommendedScholarships.includes(scholarship.id));
      recommendedScholarships.forEach((scholarship, index) => {
        pdf.text(`${index + 1}. ${scholarship.name} - ${scholarship.provider}`, margin + 5, yPosition);
        yPosition += 7;
      });
    }
    
    // AI Recommendation
    if (aiRecommendation) {
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI-Powered Analysis:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const splitAI = pdf.splitTextToSize(aiRecommendation, pageWidth - 2 * margin);
      pdf.text(splitAI, margin, yPosition);
    }
    
    // Footer
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(10);
    pdf.text('Generated by CareerGuide Platform', pageWidth / 2, pageHeight - 20, { align: 'center' });
    
    pdf.save('career-guidance-report.pdf');
    
    toast({
      title: "PDF Downloaded!",
      description: "Your career guidance report has been saved.",
    });
  };

  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
  const currentQuestionData = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
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
              Career Assessment Quiz
            </motion.h1>
            <p className="text-muted-foreground">Answer 8 questions to discover your ideal career path</p>
          </div>

          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      <span data-testid="current-question">{currentQuestion + 1}</span>/{quizData.length}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {/* Quiz Question */}
                <Card className="glassmorphism border-border/20">
                  <CardContent className="p-8">
                    <h2 className="text-xl md:text-2xl font-semibold mb-8" data-testid="question-text">
                      {currentQuestionData.question}
                    </h2>
                    <div className="space-y-4">
                      {currentQuestionData.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => selectAnswer(option)}
                          className="w-full p-4 text-left glassmorphism rounded-xl hover:scale-105 hover:bg-white/20 transition-all duration-300 border border-border/20"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          data-testid={`quiz-option-${index}`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-6 h-6 border-2 border-border rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span>{option.text}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Quiz Results */}
                <Card className="glassmorphism border-border/20">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Career Match!</h2>
                    </div>
                    
                    {result && careerStreamInfo[result as keyof typeof careerStreamInfo] && (
                      <div className="max-w-2xl mx-auto">
                        <div className="mb-6">
                          <div className={`w-24 h-24 bg-gradient-to-br ${careerStreamInfo[result as keyof typeof careerStreamInfo].gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                            {(() => {
                              const IconComponent = iconMap[careerStreamInfo[result as keyof typeof careerStreamInfo].icon as keyof typeof iconMap];
                              return <IconComponent className="h-12 w-12 text-white" />;
                            })()}
                          </div>
                          <h3 className="text-2xl font-bold text-primary mb-4" data-testid="quiz-result">
                            {result}
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            {careerStreamInfo[result as keyof typeof careerStreamInfo].description}
                          </p>
                        </div>
                        
                        <Card className="glassmorphism border-border/20">
                          <CardContent className="p-6">
                            <h4 className="font-semibold mb-4">Recommended Careers:</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {careerStreamInfo[result as keyof typeof careerStreamInfo].careers.map((career, index) => (
                                <div key={index} className="bg-muted/30 rounded-lg p-3 text-sm" data-testid={`career-suggestion-${index}`}>
                                  {career}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        {aiRecommendation && (
                          <Card className="glassmorphism border-border/20 mt-6">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-4 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                AI-Powered Analysis
                              </h4>
                              <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {aiRecommendation}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {/* Recommended Exams */}
                        {result && careerStreamInfo[result as keyof typeof careerStreamInfo]?.recommendedExams && (
                          <Card className="glassmorphism border-border/20 mt-6">
                            <CardHeader>
                              <CardTitle className="flex items-center text-lg">
                                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                Recommended Entrance Exams
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="grid gap-3">
                                {examData
                                  .filter(exam => careerStreamInfo[result as keyof typeof careerStreamInfo].recommendedExams.includes(exam.id))
                                  .map((exam) => (
                                    <div key={exam.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                      <div className="flex-1">
                                        <div className="font-medium text-sm">{exam.name}</div>
                                        <div className="text-xs text-muted-foreground">{exam.fullName}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          Application: {exam.applicationPeriod}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="secondary" className="text-xs">{exam.category}</Badge>
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          onClick={() => window.open(exam.website, '_blank')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <div className="mt-4">
                                <Link href="/scholarships">
                                  <Button variant="outline" size="sm" className="w-full">
                                    View All Exams
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {/* Recommended Scholarships */}
                        {result && careerStreamInfo[result as keyof typeof careerStreamInfo]?.recommendedScholarships && (
                          <Card className="glassmorphism border-border/20 mt-6">
                            <CardHeader>
                              <CardTitle className="flex items-center text-lg">
                                <Award className="h-5 w-5 mr-2 text-primary" />
                                Recommended Scholarships
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="grid gap-3">
                                {scholarshipData
                                  .filter(scholarship => careerStreamInfo[result as keyof typeof careerStreamInfo].recommendedScholarships.includes(scholarship.id))
                                  .map((scholarship) => (
                                    <div key={scholarship.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                      <div className="flex-1">
                                        <div className="font-medium text-sm">{scholarship.name}</div>
                                        <div className="text-xs text-muted-foreground">{scholarship.provider}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          Amount: {scholarship.amount}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-700">{scholarship.type}</Badge>
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          onClick={() => window.open(scholarship.website, '_blank')}
                                          className="h-8 w-8 p-0"
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <div className="mt-4">
                                <Link href="/scholarships">
                                  <Button variant="outline" size="sm" className="w-full">
                                    View All Scholarships
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {submitQuizMutation.isPending && (
                          <Card className="glassmorphism border-border/20 mt-6">
                            <CardContent className="p-6 text-center">
                              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">AI is analyzing your responses...</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                      <Button
                        onClick={downloadPDF}
                        variant="outline"
                        className="glassmorphism hover:scale-105 transition-all bg-orange-500/20 border-orange-500/30 text-orange-700 dark:text-orange-300 hover:bg-orange-500/30"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button
                        onClick={restartQuiz}
                        variant="outline"
                        className="glassmorphism hover:scale-105 transition-all"
                        data-testid="retake-quiz"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Retake Quiz
                      </Button>
                      <Link href="/chat">
                        <Button
                          className="bg-primary text-primary-foreground hover:scale-105 transition-all"
                          data-testid="discuss-with-ai"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Discuss with AI
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
