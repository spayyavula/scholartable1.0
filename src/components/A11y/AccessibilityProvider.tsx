import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReduceMotion: () => void;
  toggleScreenReader: () => void;
}

const defaultContext: AccessibilityContextType = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  screenReader: false,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleReduceMotion: () => {},
  toggleScreenReader: () => {}
};

const AccessibilityContext = createContext<AccessibilityContextType>(defaultContext);

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('a11y-highContrast');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [largeText, setLargeText] = useState(() => {
    const saved = localStorage.getItem('a11y-largeText');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('a11y-reduceMotion');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return saved ? JSON.parse(saved) : prefersReducedMotion;
  });
  
  const [screenReader, setScreenReader] = useState(() => {
    const saved = localStorage.getItem('a11y-screenReader');
    return saved ? JSON.parse(saved) : false;
  });

  // Toggle functions
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleLargeText = () => {
    setLargeText(prev => !prev);
  };

  const toggleReduceMotion = () => {
    setReduceMotion(prev => !prev);
  };

  const toggleScreenReader = () => {
    setScreenReader(prev => !prev);
  };

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('a11y-highContrast', JSON.stringify(highContrast));
    localStorage.setItem('a11y-largeText', JSON.stringify(largeText));
    localStorage.setItem('a11y-reduceMotion', JSON.stringify(reduceMotion));
    localStorage.setItem('a11y-screenReader', JSON.stringify(screenReader));
    
    // Apply preferences to document
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('large-text', largeText);
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    document.documentElement.classList.toggle('screen-reader', screenReader);
    
  }, [highContrast, largeText, reduceMotion, screenReader]);

  // Listen for system preference changes
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('a11y-reduceMotion') === null) {
        setReduceMotion(e.matches);
      }
    };
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        reduceMotion,
        screenReader,
        toggleHighContrast,
        toggleLargeText,
        toggleReduceMotion,
        toggleScreenReader
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};