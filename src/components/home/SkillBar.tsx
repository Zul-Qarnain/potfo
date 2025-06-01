
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  skill: string;
  percentage: number;
  color?: string; 
}

export function SkillBar({ skill, percentage, color }: SkillBarProps) {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

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
    <div ref={setRef} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm font-medium text-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-background dark:bg-background rounded-full h-2.5">
        <div
          className={cn(
            "h-2.5 rounded-full transition-all duration-1000 ease-out skill-bar-fill",
            color || 'bg-primary' 
          )}
          style={{ width: isInView ? `${percentage}%` : '0%' }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`${skill} progress: ${percentage}%`}
        ></div>
      </div>
    </div>
  );
}
