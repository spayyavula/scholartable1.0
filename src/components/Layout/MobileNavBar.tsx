import React from 'react';
import { Home, Trophy, BookOpen, Brain, User, FileText } from 'lucide-react';
import { hapticImpact } from '../../capacitorApp';

interface MobileNavBarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ currentView, onNavigate }) => {
  const handleNavigation = (view: string) => {
    onNavigate(view);
    hapticImpact();
  };

  const navItems = [
    { icon: Home, label: 'Home', view: 'lobby' },
    { icon: Trophy, label: 'Games', view: 'games' },
    { icon: BookOpen, label: 'Learn', view: 'sat-resources' },
    { icon: Brain, label: 'AI', view: 'ai-dashboard' },
    { icon: User, label: 'Profile', view: 'profile' }
  ];

  return (
    <nav className="mobile-nav md:hidden" role="navigation" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => handleNavigation(item.view)}
          className={`mobile-nav-item ${currentView === item.view ? 'active' : ''} touch-manipulation`}
          aria-label={item.label}
          aria-current={currentView === item.view ? 'page' : undefined}
        >
          <item.icon className="w-6 h-6" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};