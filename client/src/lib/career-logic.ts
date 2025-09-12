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
  primaryCluster: 'Science' | 'Commerce' | 'Arts' | 'Creative' | 'Social' | 'Vocational';
  top3Careers: string[];
  advice: string;
  aptitudeScore: number;
  interestScore: number;
  streamWeight: number;
  mismatchFlag?: string;
  penaltyDetails?: string;
}

// Career clusters with associated keywords and career options
const CAREER_CLUSTERS = {
  science: {
    keywords: ['research', 'experiment', 'analysis', 'discovery', 'innovation', 'technology', 'medicine', 'engineering', 'physics', 'chemistry', 'biology', 'math', 'problem-solving', 'logic', 'pilot', 'aviation', 'navy', 'marine', 'astronaut', 'space', 'genetics', 'environmental'],
    careers: {
      engineering: ['Software Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Aerospace Engineer', 'Robotics Engineer'],
      medical: ['Doctor', 'Surgeon', 'Medical Researcher', 'Pharmacist', 'Geneticist'],
      research: ['Research Scientist', 'Data Scientist', 'Biotechnologist', 'Laboratory Technician', 'Marine Biologist', 'Environmental Scientist'],
      technology: ['AI Specialist', 'Cybersecurity Expert', 'Computer Scientist', 'Space Scientist'],
      specialized: ['Pilot', 'Merchant Navy Officer', 'Astronaut', 'Nuclear Engineer', 'Meteorologist', 'Chemist']
    }
  },
  commerce: {
    keywords: ['business', 'finance', 'management', 'economics', 'accounting', 'marketing', 'sales', 'entrepreneur', 'investment', 'banking', 'trade', 'commerce', 'profit', 'strategy', 'chartered', 'audit', 'digital', 'branding', 'policy'],
    careers: {
      finance: ['Chartered Accountant', 'Investment Banker', 'Financial Analyst', 'Tax Consultant'],
      business: ['Business Manager', 'Entrepreneur', 'Operations Manager', 'Digital Marketer'],
      consulting: ['Management Consultant', 'Business Analyst', 'Strategy Consultant', 'Financial Advisor'],
      economics: ['Economist', 'Market Research Analyst', 'Business Economist', 'Policy Analyst'],
      marketing: ['Marketing Manager', 'Digital Marketer', 'Brand Manager', 'Sales Manager']
    }
  },
  arts: {
    keywords: ['literature', 'writing', 'language', 'history', 'culture', 'philosophy', 'teaching', 'education', 'humanities', 'communication', 'journalism', 'translation', 'ias', 'ips', 'civil service', 'government', 'upsc', 'administration', 'political', 'law', 'legal'],
    careers: {
      education: ['Teacher', 'Professor', 'Educational Counselor', 'Academic Researcher'],
      media: ['Journalist', 'Content Writer', 'Editor', 'News Anchor', 'Writer'],
      humanities: ['Historian', 'Linguist', 'Philosopher', 'Archaeologist'],
      government: ['IAS Officer', 'IPS Officer', 'IFS Officer', 'Civil Services', 'Administrative Officer'],
      law: ['Lawyer', 'Judge', 'Legal Advisor', 'Public Prosecutor', 'Legal Consultant']
    }
  },
  creative: {
    keywords: ['art', 'design', 'creativity', 'music', 'painting', 'drawing', 'fashion', 'photography', 'animation', 'film', 'theater', 'dance', 'creative', 'artistic', 'architecture', 'interior'],
    careers: {
      design: ['Graphic Designer', 'Fashion Designer', 'Interior Designer', 'UX/UI Designer'],
      media: ['Film Director', 'Animator', 'Photographer', 'Video Editor'],
      performing: ['Musician', 'Actor', 'Dancer', 'Theater Artist'],
      architecture: ['Architect', 'Landscape Architect', 'Urban Planner', 'Interior Architect']
    }
  },
  social: {
    keywords: ['society', 'community', 'help', 'service', 'psychology', 'sociology', 'social work', 'counseling', 'therapy', 'public service', 'ngo', 'welfare', 'human rights'],
    careers: {
      service: ['Social Worker', 'Counselor', 'Therapist', 'Community Organizer'],
      psychology: ['Psychologist', 'Clinical Psychologist', 'Child Psychologist', 'Behavioral Therapist'],
      nonprofit: ['NGO Worker', 'Human Rights Activist', 'Development Worker', 'Volunteer Coordinator']
    }
  },
  vocational: {
    keywords: ['hotel', 'hospitality', 'tourism', 'cooking', 'chef', 'culinary', 'sports', 'fitness', 'coaching', 'travel', 'event', 'catering', 'restaurant', 'food service', 'management'],
    careers: {
      hospitality: ['Hotel Manager', 'Event Manager', 'Tourism Guide', 'Travel Agent', 'Tourism Professional'],
      culinary: ['Chef', 'Food Stylist', 'Restaurant Manager', 'Catering Manager'],
      sports: ['Sports Coach', 'Fitness Trainer', 'Sports Nutritionist', 'Sports Manager'],
      service: ['Air Hostess', 'Customer Service Manager', 'Retail Manager', 'Wedding Planner']
    }
  }
};

// Stream weights for final score calculation
const STREAM_WEIGHTS = {
  science: 8,
  commerce: 7,
  arts: 6,
  creative: 5,
  social: 5,
  vocational: 4
};

// Core subjects for penalty calculation by stream
const CORE_SUBJECTS = {
  science: ['physics', 'math', 'chemistry'],
  commerce: ['accounts', 'economics', 'math'],
  arts: ['english', 'history', 'geography'],
  creative: ['arts', 'music', 'design'],
  social: ['psychology', 'sociology', 'history'],
  vocational: ['english', 'math'] // Basic requirements for vocational streams
};

export function calculateAptitude(marks: SubjectMarks, chosenStream: keyof typeof STREAM_WEIGHTS): { 
  score: number; 
  penaltyDetails: string; 
} {
  const markValues = Object.values(marks).filter((mark): mark is number => mark !== undefined && mark >= 0);
  
  if (markValues.length === 0) return { score: 0, penaltyDetails: 'No marks provided' };
  
  // Calculate average marks
  const average = markValues.reduce((sum, mark) => sum + mark, 0) / markValues.length;
  
  // Apply penalty for core subjects under 40
  const coreSubjects = CORE_SUBJECTS[chosenStream] || [];
  let penalty = 0;
  const penalizedSubjects: string[] = [];
  
  for (const subject of coreSubjects) {
    const mark = marks[subject];
    if (mark !== undefined && mark < 40) {
      penalty += 2;
      penalizedSubjects.push(`${subject.charAt(0).toUpperCase() + subject.slice(1)} (${mark}%)`);
    }
  }
  
  const penaltyDetails = penalizedSubjects.length > 0 
    ? `Penalty Applied: -${penalty} points for core subjects below 40%: ${penalizedSubjects.join(', ')}`
    : 'No penalty applied - all core subjects above 40%';
  
  return { 
    score: Math.max(0, Math.min(100, average - penalty)),
    penaltyDetails
  };
}

export function calculateInterest(answers: string[]): { score: number; cluster: keyof typeof CAREER_CLUSTERS; displayCluster: 'Science' | 'Commerce' | 'Arts' | 'Creative' | 'Social' | 'Vocational' } {
  const clusterScores: Record<keyof typeof CAREER_CLUSTERS, number> = {
    science: 0,
    commerce: 0,
    arts: 0,
    creative: 0,
    social: 0,
    vocational: 0
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
  
  // Map internal cluster names to UI display names
  const clusterDisplayMap: Record<keyof typeof CAREER_CLUSTERS, 'Science' | 'Commerce' | 'Arts' | 'Creative' | 'Social' | 'Vocational'> = {
    science: 'Science',
    commerce: 'Commerce',
    arts: 'Arts',
    creative: 'Creative',
    social: 'Social',
    vocational: 'Vocational'
  };
  
  return {
    score: clusterScores[primaryCluster],
    cluster: primaryCluster,
    displayCluster: clusterDisplayMap[primaryCluster]
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
      const chemistry = marks.chemistry || 0;
      const scienceData = CAREER_CLUSTERS.science;
      
      // High-threshold specialized careers
      if (physics >= 70 && math >= 70) {
        careers.push(...scienceData.careers.engineering);
        careers.push(...scienceData.careers.technology.slice(0, 2));
        // Add specialized careers for high performers
        if (physics >= 75 && math >= 75) {
          careers.push('Pilot', 'Astronaut'); // High-performance specialized careers
        }
      }
      if (biology >= 70) {
        careers.push(...scienceData.careers.medical);
        if (chemistry >= 65) {
          careers.push('Marine Biologist', 'Environmental Scientist');
        }
      }
      if (physics >= 65 && chemistry >= 65) {
        careers.push(...scienceData.careers.research.slice(0, 3));
      }
      
      if (careers.length === 0) {
        careers.push(...scienceData.careers.research);
        const weakSubjects = [];
        if (physics < 70) weakSubjects.push('Physics');
        if (math < 70) weakSubjects.push('Math');
        if (biology < 70) weakSubjects.push('Biology');
        advice = `Your interest aligns with Science, but marks in ${weakSubjects.join(', ')} need improvement. Consider bridging courses or focus on research-oriented careers.`;
      } else {
        advice = 'Excellent academic performance! You qualify for top-tier science careers including specialized fields.';
      }
      break;
    }
      
    case 'commerce': {
      const accounts = marks.accounts || 0;
      const mathComm = marks.math || 0;
      const economics = marks.economics || 0;
      const commerceData = CAREER_CLUSTERS.commerce;
      
      if (accounts >= 65 && mathComm >= 65) {
        careers.push(...commerceData.careers.finance);
        careers.push(...commerceData.careers.economics.slice(0, 2));
        advice = 'Strong foundation in Accounts and Math! CA, Investment Banking, and Policy Analysis are excellent options.';
      } else if (economics >= 60) {
        careers.push(...commerceData.careers.economics);
        careers.push(...commerceData.careers.business.slice(0, 2));
        careers.push(...(commerceData.careers.marketing || []).slice(0, 2));
        advice = 'Good economics foundation. Consider business management, marketing, or economic analysis roles.';
      } else {
        careers.push(...commerceData.careers.business);
        careers.push(...(commerceData.careers.marketing || []).slice(0, 2));
        const weakSubjects = [];
        if (accounts < 65) weakSubjects.push('Accounts');
        if (mathComm < 65) weakSubjects.push('Math');
        advice = `Your interest aligns with Commerce. Strengthen ${weakSubjects.join(' and ')} for finance careers, or explore business management and marketing paths.`;
      }
      break;
    }
      
    case 'arts': {
      const history = marks.history || 0;
      const english = marks.english || 0;
      const artsData = CAREER_CLUSTERS.arts;
      
      // Check for IAS/IPS eligibility (high-threshold government careers)
      if (history >= 65 && english >= 65) {
        careers.push('IAS Officer', 'IPS Officer', 'Lawyer', 'Judge');
        careers.push(...artsData.careers.media.slice(0, 2));
        advice = 'Excellent academic foundation! You qualify for prestigious government services like IAS/IPS and legal careers.';
      } else if (english >= 60) {
        careers.push(...artsData.careers.media);
        careers.push(...artsData.careers.education.slice(0, 2));
        careers.push('Writer'); // Add Writer as a specific career
        advice = 'Strong language skills! Journalism, teaching, writing, and media careers suit your profile.';
      } else {
        careers.push(...artsData.careers.humanities);
        careers.push(...artsData.careers.education.slice(0, 2));
        advice = 'Focus on strengthening English and analytical skills for better opportunities in humanities and education.';
      }
      break;
    }
      
    case 'creative': {
      const arts = marks.arts || 0;
      const english = marks.english || 0;
      const creativeData = CAREER_CLUSTERS.creative;
      
      if (arts >= 60 || english >= 70) {
        careers.push(...creativeData.careers.architecture);
        careers.push(...creativeData.careers.design.slice(0, 2));
        advice = 'Strong creative foundation! Architecture and advanced design fields are excellent choices.';
      } else {
        careers.push(...creativeData.careers.media);
        careers.push(...creativeData.careers.performing.slice(0, 2));
        advice = 'Explore multimedia and performing arts. Build a strong portfolio to showcase your creative talents.';
      }
      break;
    }
      
    case 'social': {
      const psychology = marks.psychology || 0;
      const socialData = CAREER_CLUSTERS.social;
      
      if (psychology >= 60) {
        careers.push(...socialData.careers.psychology);
        advice = 'Strong foundation in psychology! Clinical and counseling psychology offer excellent career prospects.';
      } else {
        careers.push(...socialData.careers.service);
        careers.push(...socialData.careers.nonprofit.slice(0, 2));
        advice = 'Your empathy and social awareness are valuable. Social work and NGO sectors offer meaningful career paths.';
      }
      break;
    }
      
    case 'vocational': {
      const english = marks.english || 0;
      const vocationData = CAREER_CLUSTERS.vocational;
      
      if (english >= 50) {
        careers.push('Hotel Manager', 'Tourism Professional', 'Event Manager');
        careers.push(...vocationData.careers.service.slice(0, 2));
        advice = 'Good communication skills! Hotel Management, Tourism, and customer service sectors offer diverse opportunities with practical skills focus.';
      } else {
        careers.push('Chef', 'Restaurant Manager');
        careers.push(...vocationData.careers.sports.slice(0, 2));
        advice = 'Hands-on vocational careers suit your interests. Focus on culinary arts, sports coaching, and skill development.';
      }
      break;
    }
  }
  
  // Ensure we have at least 6 career suggestions for expanded display
  while (careers.length < 6) {
    const remainingCareers = Object.values(clusterData.careers).flat().filter(c => !careers.includes(c));
    if (remainingCareers.length === 0) break;
    careers.push(remainingCareers[0]);
  }
  
  return {
    careers: careers.slice(0, 6), // Return up to 6 careers
    advice: advice || `Great alignment with ${cluster} careers! Continue developing your skills in this area.`
  };
}

export function getCareerSuggestions(
  marks: SubjectMarks,
  answers: string[],
  chosenStream: keyof typeof STREAM_WEIGHTS
): CareerSuggestion {
  // Calculate component scores
  const { score: aptitudeScore, penaltyDetails } = calculateAptitude(marks, chosenStream);
  const { score: interestScore, cluster: primaryCluster, displayCluster } = calculateInterest(answers);
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
  
  return {
    finalScore: Math.max(0, Math.min(100, finalScore)),
    confidenceLevel,
    primaryCluster: displayCluster,
    top3Careers: careers,
    advice,
    aptitudeScore: Math.round(aptitudeScore),
    interestScore: Math.round(interestScore),
    streamWeight,
    mismatchFlag,
    penaltyDetails
  };
}