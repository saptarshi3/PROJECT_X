// Career Path Suggestion Engine for Class 11-12 Students
// Integrated scoring system with marks, interests, and stream analysis

export interface SubjectMarks {
  physics?: number;
  math?: number;
  chemistry?: number;
  biology?: number;
  accounts?: number;
  economics?: number;
  english?: number;
  history?: number;
  geography?: number;
  psychology?: number;
  sociology?: number;
  arts?: number;
  music?: number;
  design?: number;
  [key: string]: number | undefined;
}

export interface CareerSuggestion {
  finalScore: number;
  confidenceLevel: 'High' | 'Moderate' | 'Low';
  primaryCluster: 'Science' | 'Commerce' | 'Arts' | 'Creative' | 'Social';
  top3Careers: string[];
  advice: string;
  aptitudeScore: number;
  interestScore: number;
  streamWeight: number;
  mismatchFlag?: string;
}

// Career clusters with associated keywords and career options
const CAREER_CLUSTERS = {
  science: {
    keywords: ['research', 'experiment', 'analysis', 'discovery', 'innovation', 'technology', 'medicine', 'engineering', 'physics', 'chemistry', 'biology', 'math', 'problem-solving', 'logic'],
    careers: {
      engineering: ['Software Engineer', 'Mechanical Engineer', 'Civil Engineer'],
      medical: ['Doctor', 'Surgeon', 'Medical Researcher'],
      research: ['Research Scientist', 'Data Scientist', 'Biotechnologist'],
      technology: ['AI Specialist', 'Cybersecurity Expert', 'Robotics Engineer']
    }
  },
  commerce: {
    keywords: ['business', 'finance', 'management', 'economics', 'accounting', 'marketing', 'sales', 'entrepreneur', 'investment', 'banking', 'trade', 'commerce', 'profit', 'strategy'],
    careers: {
      finance: ['Chartered Accountant', 'Investment Banker', 'Financial Analyst'],
      business: ['Business Manager', 'Entrepreneur', 'Marketing Manager'],
      consulting: ['Management Consultant', 'Business Analyst', 'Strategy Consultant']
    }
  },
  arts: {
    keywords: ['literature', 'writing', 'language', 'history', 'culture', 'philosophy', 'teaching', 'education', 'humanities', 'communication', 'journalism', 'translation'],
    careers: {
      education: ['Teacher', 'Professor', 'Educational Counselor'],
      media: ['Journalist', 'Content Writer', 'Editor'],
      humanities: ['Historian', 'Linguist', 'Philosopher']
    }
  },
  creative: {
    keywords: ['art', 'design', 'creativity', 'music', 'painting', 'drawing', 'fashion', 'photography', 'animation', 'film', 'theater', 'dance', 'creative', 'artistic'],
    careers: {
      design: ['Graphic Designer', 'Fashion Designer', 'Interior Designer'],
      media: ['Film Director', 'Animator', 'Photographer'],
      performing: ['Musician', 'Actor', 'Dancer']
    }
  },
  social: {
    keywords: ['society', 'community', 'help', 'service', 'psychology', 'sociology', 'social work', 'counseling', 'therapy', 'public service', 'government', 'law'],
    careers: {
      service: ['Social Worker', 'Counselor', 'Therapist'],
      law: ['Lawyer', 'Judge', 'Legal Advisor'],
      government: ['Civil Servant', 'Public Policy Analyst', 'Diplomat']
    }
  }
};

// Stream weights for final score calculation
const STREAM_WEIGHTS = {
  science: 8,
  commerce: 7,
  arts: 6,
  creative: 5,
  social: 5
};

// Core subjects for penalty calculation by stream
const CORE_SUBJECTS = {
  science: ['physics', 'math', 'chemistry'],
  commerce: ['accounts', 'economics', 'math'],
  arts: ['english', 'history', 'geography'],
  creative: ['arts', 'music', 'design'],
  social: ['psychology', 'sociology', 'history']
};

export function calculateAptitude(marks: SubjectMarks, chosenStream: keyof typeof STREAM_WEIGHTS): number {
  const markValues = Object.values(marks).filter((mark): mark is number => mark !== undefined && mark >= 0);
  
  if (markValues.length === 0) return 0;
  
  // Calculate average marks
  const average = markValues.reduce((sum, mark) => sum + mark, 0) / markValues.length;
  
  // Apply penalty for core subjects under 40
  const coreSubjects = CORE_SUBJECTS[chosenStream] || [];
  let penalty = 0;
  
  for (const subject of coreSubjects) {
    const mark = marks[subject];
    if (mark !== undefined && mark < 40) {
      penalty += 2;
    }
  }
  
  return Math.max(0, Math.min(100, average - penalty));
}

export function calculateInterest(answers: string[]): { score: number; cluster: keyof typeof CAREER_CLUSTERS } {
  const clusterScores: Record<keyof typeof CAREER_CLUSTERS, number> = {
    science: 0,
    commerce: 0,
    arts: 0,
    creative: 0,
    social: 0
  };
  
  // Count keyword matches for each cluster
  for (const answer of answers) {
    const lowerAnswer = answer.toLowerCase();
    
    for (const [cluster, data] of Object.entries(CAREER_CLUSTERS)) {
      for (const keyword of data.keywords) {
        if (lowerAnswer.includes(keyword)) {
          clusterScores[cluster as keyof typeof CAREER_CLUSTERS] += 10;
        }
      }
    }
  }
  
  // Cap each cluster at 100 points
  for (const cluster in clusterScores) {
    clusterScores[cluster as keyof typeof CAREER_CLUSTERS] = Math.min(100, clusterScores[cluster as keyof typeof CAREER_CLUSTERS]);
  }
  
  // Find the cluster with highest score
  const primaryCluster = Object.entries(clusterScores).reduce((a, b) => 
    clusterScores[a[0] as keyof typeof CAREER_CLUSTERS] > clusterScores[b[0] as keyof typeof CAREER_CLUSTERS] ? a : b
  )[0] as keyof typeof CAREER_CLUSTERS;
  
  return {
    score: clusterScores[primaryCluster],
    cluster: primaryCluster
  };
}

export function detectMismatch(aptitude: number, interest: number): string | undefined {
  if (interest > 70 && aptitude < 50) {
    return 'Interest-Driven, Needs Skill Boost';
  }
  if (aptitude > 70 && interest < 50) {
    return 'Academically Strong, Explore Interest';
  }
  if (aptitude < 50 && interest < 50) {
    return 'Explore Multiple Streams';
  }
  return undefined;
}

export function suggestCareers(cluster: keyof typeof CAREER_CLUSTERS, marks: SubjectMarks): {
  careers: string[];
  advice: string;
} {
  const clusterData = CAREER_CLUSTERS[cluster];
  let careers: string[] = [];
  let advice = '';
  
  // Check specific requirements for certain career paths
  switch (cluster) {
    case 'science': {
      const physics = marks.physics || 0;
      const math = marks.math || 0;
      const biology = marks.biology || 0;
      const scienceData = CAREER_CLUSTERS.science;
      
      if (physics >= 70 && math >= 70) {
        careers.push(...scienceData.careers.engineering);
      }
      if (biology >= 70) {
        careers.push(...scienceData.careers.medical);
      }
      if (careers.length === 0) {
        careers.push(...scienceData.careers.research);
        advice = `Your interest aligns with Science, but marks in ${physics < 70 ? 'Physics' : ''} ${math < 70 ? 'Math' : ''} ${biology < 70 ? 'Biology' : ''} need improvement. Consider bridging courses or alternative science careers.`;
      }
      break;
    }
      
    case 'commerce': {
      const accounts = marks.accounts || 0;
      const mathComm = marks.math || 0;
      const commerceData = CAREER_CLUSTERS.commerce;
      
      if (accounts >= 65 && mathComm >= 65) {
        careers.push(...commerceData.careers.finance);
      } else {
        careers.push(...commerceData.careers.business);
        if (accounts < 65 || mathComm < 65) {
          advice = `Your interest aligns with Commerce, but marks in ${accounts < 65 ? 'Accounts' : ''} ${mathComm < 65 ? 'Math' : ''} need improvement. Consider strengthening these areas or explore other business fields.`;
        }
      }
      break;
    }
      
    case 'arts':
    case 'creative':
    case 'social':
      // No hard cutoffs for these streams, but provide strengthening advice
      const allCareers = Object.values(clusterData.careers).flat();
      careers.push(...allCareers.slice(0, 3));
      
      const lowMarks = Object.entries(marks).filter(([_, mark]) => mark !== undefined && mark < 50);
      if (lowMarks.length > 0) {
        const subjects = lowMarks.map(([subject]) => subject).join(', ');
        advice = `Consider strengthening your foundation in ${subjects} to improve your prospects in ${cluster} fields.`;
      }
      break;
  }
  
  // Ensure we have at least 3 career suggestions
  if (careers.length < 3) {
    const remainingCareers = Object.values(clusterData.careers).flat().filter(c => !careers.includes(c));
    careers.push(...remainingCareers.slice(0, 3 - careers.length));
  }
  
  return {
    careers: careers.slice(0, 3),
    advice: advice || `Great alignment with ${cluster} careers! Continue developing your skills in this area.`
  };
}

export function getCareerSuggestions(
  marks: SubjectMarks,
  answers: string[],
  chosenStream: keyof typeof STREAM_WEIGHTS
): CareerSuggestion {
  // Calculate component scores
  const aptitudeScore = calculateAptitude(marks, chosenStream);
  const { score: interestScore, cluster: primaryCluster } = calculateInterest(answers);
  const streamWeight = STREAM_WEIGHTS[chosenStream];
  
  // Calculate final score
  const finalScore = Math.round((aptitudeScore * 0.4) + (interestScore * 0.4) + (streamWeight * 2));
  
  // Determine confidence level
  let confidenceLevel: 'High' | 'Moderate' | 'Low';
  if (finalScore >= 75) {
    confidenceLevel = 'High';
  } else if (finalScore >= 50) {
    confidenceLevel = 'Moderate';
  } else {
    confidenceLevel = 'Low';
  }
  
  // Detect mismatches
  const mismatchFlag = detectMismatch(aptitudeScore, interestScore);
  
  // Get career suggestions
  const { careers, advice } = suggestCareers(primaryCluster, marks);
  
  // Convert cluster to title case for interface compatibility
  const titleCaseCluster = primaryCluster.charAt(0).toUpperCase() + primaryCluster.slice(1) as 'Science' | 'Commerce' | 'Arts' | 'Creative' | 'Social';
  
  return {
    finalScore: Math.max(0, Math.min(100, finalScore)),
    confidenceLevel,
    primaryCluster: titleCaseCluster,
    top3Careers: careers,
    advice,
    aptitudeScore: Math.round(aptitudeScore),
    interestScore: Math.round(interestScore),
    streamWeight,
    mismatchFlag
  };
}