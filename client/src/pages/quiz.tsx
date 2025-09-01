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
import { useAuth } from "@/hooks/use-auth";
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
  const { user } = useAuth();

  const submitQuizMutation = useMutation({
    mutationFn: async (data: { answers: QuizOption[]; result: string }) => {
      const response = await apiRequest("POST", "/api/quiz/submit", {
        userId: user?.id || "anonymous",
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
        description: user ? "Your results have been saved to your profile." : "Your results have been saved successfully.",
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
    
    // User name if available
    if (user?.fullName) {
      pdf.setFontSize(14);
      pdf.text(`For: ${user.fullName}`, margin, yPosition);
      yPosition += 15;
    }
    
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
    
    pdf.save(`career-guidance-report${user?.fullName ? '-' + user.fullName.replace(/\s+/g, '-') : ''}.pdf`);
    
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
                {/* Modern Glassmorphic Quiz Results */}
                <div className="space-y-8">
                  {/* Top Section - Career Match Category */}
                  <Card className="glassmorphism border-border/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <CardContent className="p-10 text-center">
                      <div className="mb-8">
                        <div className="relative mx-auto mb-6 w-32 h-32">
                          {result && careerStreamInfo[result as keyof typeof careerStreamInfo] && (
                            <div className={`w-full h-full bg-gradient-to-br ${careerStreamInfo[result as keyof typeof careerStreamInfo].gradient} rounded-3xl flex items-center justify-center shadow-xl ring-4 ring-white/20`}>
                              {(() => {
                                const IconComponent = iconMap[careerStreamInfo[result as keyof typeof careerStreamInfo].icon as keyof typeof iconMap];
                                return <IconComponent className="h-16 w-16 text-white drop-shadow-lg" />;
                              })()}
                            </div>
                          )}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <Trophy className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                          Your Career Match
                        </h2>
                        
                        {result && (
                          <h3 className="text-3xl font-bold mb-4 text-orange-600 dark:text-orange-400" data-testid="quiz-result">
                            {result}
                          </h3>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Middle Section - User Strengths */}
                  {result && careerStreamInfo[result as keyof typeof careerStreamInfo] && (
                    <Card className="glassmorphism border-border/10 bg-white/5 backdrop-blur-xl shadow-xl">
                      <CardContent className="p-8">
                        <div className="text-center max-w-3xl mx-auto">
                          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Your Strengths Profile</span>
                          </div>
                          
                          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                            {careerStreamInfo[result as keyof typeof careerStreamInfo].description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Bottom Section - Recommended Careers Grid */}
                  {result && careerStreamInfo[result as keyof typeof careerStreamInfo] && (
                    <Card className="glassmorphism border-border/10 bg-white/5 backdrop-blur-xl shadow-xl">
                      <CardContent className="p-8">
                        <div className="text-center mb-8">
                          <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Recommended Career Paths</h4>
                          <p className="text-slate-600 dark:text-slate-400">Explore these career opportunities that align with your interests</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                          {careerStreamInfo[result as keyof typeof careerStreamInfo].careers.map((career, index) => (
                            <motion.div
                              key={index}
                              className="group p-5 glassmorphism border-border/10 bg-white/10 rounded-2xl hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                              whileHover={{ y: -4 }}
                              data-testid={`career-suggestion-${index}`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                                <div>
                                  <h5 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    {career}
                                  </h5>
                                  <div className="w-full h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* AI Recommendation */}
                  {aiRecommendation && (
                    <Card className="glassmorphism border-border/10 bg-white/5 backdrop-blur-xl shadow-xl">
                      <CardContent className="p-8">
                        <h4 className="text-xl font-bold mb-4 flex items-center text-slate-800 dark:text-slate-200">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                          AI-Powered Analysis
                        </h4>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/30 dark:border-green-800/30">
                          <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {aiRecommendation}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Loading state */}
                  {submitQuizMutation.isPending && (
                    <Card className="glassmorphism border-border/10 bg-white/5 backdrop-blur-xl shadow-xl">
                      <CardContent className="p-6 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-orange-600" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">AI is analyzing your responses...</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <Card className="glassmorphism border-border/10 bg-white/5 backdrop-blur-xl shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                          className="glassmorphism hover:scale-105 transition-all border-slate-300/30 text-slate-700 dark:text-slate-300 hover:bg-slate-500/20"
                          data-testid="retake-quiz"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Retake Quiz
                        </Button>
                        <Link href="/chat">
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-all hover:from-blue-700 hover:to-purple-700"
                            data-testid="discuss-with-ai"
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Discuss with AI
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}