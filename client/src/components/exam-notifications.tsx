import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Search, Filter, BookOpen, Users, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  examData,
  examStreams,
  getExamsByStream,
  calculateDaysUntil,
  isRegistrationOpen,
  getExamStatus,
  searchExams,
  type ExamData 
} from '@/lib/exam-data';

interface ExamNotificationsProps {
  className?: string;
}

const ExamNotifications = ({ className }: ExamNotificationsProps) => {
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredExams, setFilteredExams] = useState<ExamData[]>(examData);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update time every minute for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Filter exams based on stream and search query
  useEffect(() => {
    let filtered = searchQuery ? searchExams(searchQuery) : examData;
    if (selectedStream !== 'all') {
      filtered = filtered.filter(exam => 
        exam.stream.toLowerCase() === selectedStream.toLowerCase()
      );
    }
    setFilteredExams(filtered);
  }, [selectedStream, searchQuery]);

  // Format countdown display
  const formatCountdown = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day left';
    if (days > 365) return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} left`;
    if (days > 30) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} left`;
    return `${days} days left`;
  };

  // Get status badge color and text
  const getStatusInfo = (exam: ExamData) => {
    const status = getExamStatus(exam);
    switch (status) {
      case 'registration-open':
        return { 
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          text: 'Registration Open',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case 'registration-closed':
        return { 
          color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          text: 'Registration Closed',
          icon: <AlertCircle className="h-3 w-3" />
        };
      case 'completed':
        return { 
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          text: 'Completed',
          icon: <X className="h-3 w-3" />
        };
      default:
        return { 
          color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          text: 'Upcoming',
          icon: <Clock className="h-3 w-3" />
        };
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedStream('all');
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x">
            Upcoming Exam Notifications
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Stay updated with important exam dates, registration deadlines, and application links for your career path
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 space-y-6"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exams by name or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glassmorphism border-border/30 bg-white/10 backdrop-blur-xl"
          />
        </div>

        {/* Stream Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {examStreams.map((stream) => (
            <motion.button
              key={stream.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStream(stream.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedStream === stream.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'glassmorphism border-border/30 text-foreground hover:bg-white/20'
              }`}
            >
              <span>{stream.icon}</span>
              <span>{stream.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Active Filters Display */}
        {(selectedStream !== 'all' || searchQuery) && (
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>
              {searchQuery && `"${searchQuery}"`}
              {searchQuery && selectedStream !== 'all' && ' in '}
              {selectedStream !== 'all' && examStreams.find(s => s.id === selectedStream)?.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2 text-xs hover:bg-white/10"
            >
              Clear
            </Button>
          </div>
        )}
      </motion.div>

      {/* Exam Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => {
              const daysUntil = calculateDaysUntil(exam.examDate);
              const statusInfo = getStatusInfo(exam);
              const streamInfo = examStreams.find(s => s.id === exam.stream.toLowerCase());
              const isRegOpen = isRegistrationOpen(exam.registrationStart, exam.registrationEnd);

              return (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="group cursor-pointer"
                >
                  <Card className="glassmorphism border-border/30 h-full overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 rounded-xl">
                    {/* Card Header with Stream Gradient */}
                    <div className={`bg-gradient-to-br ${streamInfo?.color || 'from-gray-500 to-gray-600'} p-4 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-lg font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                              {exam.name}
                            </CardTitle>
                            <p className="text-white/80 text-sm font-medium">
                              {exam.conductedBy}
                            </p>
                          </div>
                          <Badge className={`${statusInfo.color} backdrop-blur-sm flex items-center gap-1 text-xs`}>
                            {statusInfo.icon}
                            {statusInfo.text}
                          </Badge>
                        </div>
                        
                        {/* Countdown Display */}
                        <div className="flex items-center gap-2 text-white/90">
                          <Calendar className="h-4 w-4" />
                          <span className="font-semibold text-sm">
                            {formatCountdown(daysUntil)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-4">
                      {/* Exam Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {exam.description}
                      </p>

                      {/* Exam Details */}
                      <div className="space-y-3">
                        {/* Exam Date */}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-2 text-blue-500">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">Exam Date:</span>
                          </div>
                          <span className="text-foreground">
                            {new Date(exam.examDate).toLocaleDateString('en-IN', { 
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Registration Period */}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-2 text-green-500">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Registration:</span>
                          </div>
                          <span className="text-foreground">
                            {new Date(exam.registrationStart).toLocaleDateString('en-IN', { 
                              day: 'numeric',
                              month: 'short'
                            })} - {new Date(exam.registrationEnd).toLocaleDateString('en-IN', { 
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Exam Mode & Fees */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-purple-500" />
                            <span className="text-muted-foreground">Mode:</span>
                            <Badge variant="secondary" className="text-xs">
                              {exam.examMode}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-orange-500" />
                            <span className="text-muted-foreground">Fees:</span>
                            <span className="font-medium text-foreground text-xs">
                              {exam.fees}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Apply Now Button */}
                      <div className="pt-2">
                        <Button 
                          asChild
                          className="w-full glassmorphism-button group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300"
                          variant="outline"
                        >
                          <a 
                            href={exam.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <span>{isRegOpen ? 'Apply Now' : 'Visit Website'}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                      initial={false}
                    />
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="glassmorphism border-border/30 rounded-xl p-8 max-w-md mx-auto">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Exams Found</h3>
                <p className="text-muted-foreground mb-4">
                  No exams match your current filters. Try adjusting your search or stream selection.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="glassmorphism-button"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Statistics Footer */}
      {filteredExams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="glassmorphism border-border/30 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {filteredExams.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Exams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {filteredExams.filter(exam => getExamStatus(exam) === 'registration-open').length}
                </div>
                <div className="text-sm text-muted-foreground">Registration Open</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  {filteredExams.filter(exam => calculateDaysUntil(exam.examDate) <= 30 && calculateDaysUntil(exam.examDate) > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500 mb-1">
                  {new Set(filteredExams.map(exam => exam.stream)).size}
                </div>
                <div className="text-sm text-muted-foreground">Streams</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExamNotifications;