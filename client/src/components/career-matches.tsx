import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, MapPin, DollarSign, TrendingUp, BookOpen, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  careerMatchesData, 
  careerClusters, 
  getCareersByCluster, 
  type CareerMatchData 
} from '@/lib/career-matches-data';

interface CareerMatchesProps {
  className?: string;
}

const CareerMatches = ({ className }: CareerMatchesProps) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerMatchData | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  const filteredCareers = selectedCluster === 'all' 
    ? careerMatchesData 
    : getCareersByCluster(selectedCluster);

  const openModal = (career: CareerMatchData) => {
    setSelectedCareer(career);
  };

  const closeModal = () => {
    setSelectedCareer(null);
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
            Top Career Matches
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore detailed career paths, requirements, and opportunities across all major fields
        </p>

        {/* Cluster Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCluster('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCluster === 'all'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-white/10 backdrop-blur-xl border border-white/20 text-foreground hover:bg-white/20'
            }`}
          >
            All Careers
          </motion.button>
          {careerClusters.map((cluster) => (
            <motion.button
              key={cluster.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCluster(cluster.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCluster === cluster.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-white/10 backdrop-blur-xl border border-white/20 text-foreground hover:bg-white/20'
              }`}
            >
              <span>{cluster.icon}</span>
              <span>{cluster.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Career Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="wait">
          {filteredCareers.map((career, index) => (
            <motion.div
              key={career.id}
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
                scale: 1.03,
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
              onClick={() => openModal(career)}
            >
              <Card className="glassmorphism border-border/30 h-full overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 rounded-2xl">
                {/* Card Header with Gradient Background */}
                <div className={`bg-gradient-to-br ${careerClusters.find(c => career.cluster.toLowerCase().includes(c.id))?.color || 'from-gray-500 to-gray-600'} p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  <div className="relative z-10">
                    <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {career.title}
                    </CardTitle>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {career.cluster}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <CardDescription className="text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors">
                    {career.description}
                  </CardDescription>

                  {/* Key Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{career.salaryRange}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="truncate">High Growth Potential</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{career.courses[0]}</span>
                    </div>
                  </div>

                  {/* Skills Preview */}
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

                  {/* CTA */}
                  <div className="pt-4 border-t border-border/20">
                    <Button 
                      className="w-full glassmorphism-button group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300"
                      variant="outline"
                    >
                      View Details
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  initial={false}
                />
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="glassmorphism max-w-4xl max-h-[90vh] overflow-y-auto border-border/30 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-br ${careerClusters.find(c => selectedCareer.cluster.toLowerCase().includes(c.id))?.color || 'from-gray-500 to-gray-600'} p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedCareer.title}
                    </h2>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {selectedCareer.cluster}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeModal}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">About This Career</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {selectedCareer.description}
                  </p>
                </div>

                {/* Key Information Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Salary & Growth */}
                  <div className="glassmorphism p-6 rounded-xl border-border/20">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      Salary Range
                    </h4>
                    <p className="text-2xl font-bold text-primary mb-2">{selectedCareer.salaryRange}</p>
                    <p className="text-sm text-muted-foreground">{selectedCareer.futureScope}</p>
                  </div>

                  {/* Career Path */}
                  <div className="glassmorphism p-6 rounded-xl border-border/20">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Career Path
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedCareer.path}</p>
                  </div>
                </div>

                {/* Opportunities */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-500" />
                    Career Opportunities
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {selectedCareer.opportunities.map((opportunity, index) => (
                      <motion.div
                        key={opportunity}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glassmorphism p-4 rounded-lg border-border/20 text-center"
                      >
                        <p className="font-medium">{opportunity}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                    Recommended Courses
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.courses.map((course) => (
                      <Badge 
                        key={course} 
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top Colleges */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-teal-500" />
                    Top Colleges
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/20">
                          <th className="text-left py-3 px-4 font-semibold">College</th>
                          <th className="text-left py-3 px-4 font-semibold">Cutoff</th>
                          <th className="text-left py-3 px-4 font-semibold">Fees</th>
                          <th className="text-left py-3 px-4 font-semibold">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCareer.colleges.map((college, index) => (
                          <motion.tr
                            key={college.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-border/10 hover:bg-primary/5 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium">{college.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{college.cutoff}</td>
                            <td className="py-3 px-4 text-green-600 font-medium">{college.fees}</td>
                            <td className="py-3 px-4 text-muted-foreground">{college.location}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Skills & Work Environment */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="bg-blue-500/10 text-blue-700 dark:text-blue-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Work Environments</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.workEnvironments.map((env) => (
                        <Badge 
                          key={env} 
                          variant="secondary" 
                          className="bg-green-500/10 text-green-700 dark:text-green-300"
                        >
                          {env}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Careers */}
                <div>
                  <h4 className="font-semibold mb-4">Related Career Roles</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedCareer.careers.map((career) => (
                      <div
                        key={career}
                        className="glassmorphism p-3 rounded-lg border-border/20 text-center"
                      >
                        <p className="text-sm font-medium">{career}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerMatches;