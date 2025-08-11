import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Scholars Casino - Free Gamified Learning Platform | Educational Games & Quizzes",
  description = "Transform your education with interactive quizzes, coding challenges, and tournaments. Learn math, physics, chemistry, and programming through engaging games. Join 10,000+ students worldwide!",
  keywords = "educational games, online quizzes, math games, physics challenges, chemistry quizzes, coding challenges, programming tutorials, interactive learning, gamified education, student competitions, AI tutoring, free learning platform",
  canonicalUrl = "https://scholarscasino.com/",
  ogImage = "https://scholarscasino.com/og-image.jpg",
  structuredData
}) => {
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Update structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, structuredData]);

  return null; // This component doesn't render anything
};

export const getSubjectSEO = (subject: string) => {
  const seoData = {
    mathematics: {
      title: "Math Games & Quizzes - Interactive Mathematics Learning | Scholars Casino",
      description: "Master mathematics with engaging quizzes and challenges. From basic arithmetic to advanced calculus, learn math concepts through gamified exercises. Free math games for all skill levels.",
      keywords: "math games, mathematics quizzes, algebra challenges, calculus practice, geometry games, interactive math learning, math competitions, educational math games",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Interactive Mathematics Learning",
        "description": "Comprehensive mathematics education through gamified quizzes and challenges",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Scholars Casino"
        },
        "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
        "teaches": ["Arithmetic", "Algebra", "Geometry", "Calculus", "Statistics"]
      }
    },
    physics: {
      title: "Physics Games & Challenges - Interactive Physics Learning | Scholars Casino",
      description: "Explore physics concepts through interactive games and quizzes. Master mechanics, thermodynamics, quantum physics, and more. Engaging physics education for students.",
      keywords: "physics games, physics quizzes, mechanics challenges, thermodynamics, quantum physics, interactive physics, physics competitions, educational physics games",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Interactive Physics Learning",
        "description": "Comprehensive physics education through gamified experiments and challenges",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Scholars Casino"
        },
        "teaches": ["Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics", "Relativity"]
      }
    },
    chemistry: {
      title: "Chemistry Games & Quizzes - Interactive Chemistry Learning | Scholars Casino",
      description: "Learn chemistry through interactive games and molecular challenges. Master organic chemistry, periodic table, chemical reactions, and more through engaging quizzes.",
      keywords: "chemistry games, chemistry quizzes, organic chemistry, periodic table games, chemical reactions, molecular structure, interactive chemistry learning",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Interactive Chemistry Learning",
        "description": "Comprehensive chemistry education through gamified experiments and molecular challenges",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Scholars Casino"
        },
        "teaches": ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"]
      }
    },
    programming: {
      title: "Coding Challenges & Programming Games - Learn to Code | Scholars Casino",
      description: "Master programming with interactive coding challenges. Learn HTML, CSS, JavaScript, Python, React, and more through hands-on coding exercises and games.",
      keywords: "coding challenges, programming games, learn to code, HTML tutorials, CSS games, JavaScript challenges, Python programming, React tutorials, coding competitions",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Interactive Programming Learning",
        "description": "Comprehensive programming education through hands-on coding challenges and projects",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Scholars Casino"
        },
        "teaches": ["HTML", "CSS", "JavaScript", "Python", "React", "Angular", "Vue", "Node.js"]
      }
    }
  };

  return seoData[subject as keyof typeof seoData] || {
    title: "Educational Games & Quizzes | Scholars Casino",
    description: "Interactive learning games and quizzes for students of all levels",
    keywords: "educational games, online learning, interactive quizzes",
    structuredData: {}
  };
};