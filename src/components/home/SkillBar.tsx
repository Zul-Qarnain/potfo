import React from 'react';
import { 
  Flame, 
  Smile, 
  Sigma, 
  Braces, 
  Code2, 
  FileText, 
  Atom, 
  Triangle, 
  Layout, 
  Palette, 
  BoxSelect, 
  Server, 
  Database, 
  DatabaseZap,
  HelpCircle, Coffee, Activity, PieChart, Table, Settings2 // Changed Chart to PieChart
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Flame, Smile, Sigma, Braces, Code2, FileText, Atom, Triangle, Layout, 
  Palette, BoxSelect, Server, Database, DatabaseZap, HelpCircle, Coffee, Activity, PieChart, Table, Settings2 // Changed Chart to PieChart
};

interface SkillBarProps {
  skillName: string;
  percentage: number;
  barColor: string;
  iconName: string;
  iconClasses?: string;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  skillName,
  percentage,
  barColor,
  iconName,
  iconClasses = '',
}) => {
  const Icon = iconMap[iconName] || iconMap.HelpCircle; // Use the map

  return (
    <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon 
          className={`w-8 h-8 ${iconClasses}`} 
          style={{ color: barColor }}
        />
      </div>
      
      {/* Skill info and progress bar */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{skillName}</span>
          <span className="text-sm text-muted-foreground font-medium">{percentage}%</span>
        </div>
        
        {/* Progress bar container */}
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          {/* Progress bar fill */}
          <div
            className="skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              backgroundColor: barColor,
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
