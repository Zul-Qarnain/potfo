
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface SkillBarProps {
  skillName: string;
  percentage: number;
  barColor: string; // Tailwind CSS background color class for the fill
  iconName: string; // Lucide icon name
  iconClasses: string; // Tailwind CSS classes for icon color
}

const getIcon = (iconName: string): React.ElementType => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle; // Fallback icon
};

export function SkillBar({ skillName, percentage, barColor, iconName, iconClasses }: SkillBarProps) {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const IconComponent = getIcon(iconName);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return (
    <div ref={setRef} className="bg-card p-3 rounded-md shadow-sm flex flex-col space-y-2">
      <div className="flex items-center">
        <IconComponent className={cn('w-5 h-5 mr-2 shrink-0', iconClasses)} />
        <span className="text-sm text-foreground">{skillName}</span>
      </div>
      <div className="w-full bg-muted dark:bg-neutral-700 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-1000 ease-out",
            barColor,
            isInView ? 'skill-bar-fill' : '' // Ensure animation class is applied conditionally
          )}
          style={{ width: isInView ? `${percentage}%` : '0%' }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`${skillName} progress: ${percentage}%`}
        ></div>
      </div>
    </div>
  );
}

    