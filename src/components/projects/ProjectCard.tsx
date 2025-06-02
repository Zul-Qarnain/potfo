
import Link from 'next/link';
import { Bot, GalleryHorizontalEnd, Gamepad2, MessageSquare, Link as LinkIcon, HelpCircle } from 'lucide-react'; // Import used icons directly
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

const iconMap: { [key: string]: React.ElementType } = { Bot, GalleryHorizontalEnd, Gamepad2, MessageSquare, HelpCircle };

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = iconMap[project.icon] || iconMap.HelpCircle; // Use the map, fallback to HelpCircle

  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center h-full border border-border hover:border-primary/30">
      <div className="mb-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-full inline-flex">
        {Icon && <Icon className="w-8 h-8 text-primary" />}
      </div>
      <h3 className="text-xl font-semibold font-headline text-foreground mb-2">{project.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[60px]">{project.description}</p>
      
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs px-2 py-0.5">{tech}</Badge>
          ))}
        </div>
      )}

      <div className="mt-auto">
        <Link
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-primary hover:text-primary/80 hover:underline"
          aria-label={`View ${project.title} project details`}
        >
          <LinkIcon className="mr-1.5 h-4 w-4" />
          View Project
        </Link>
      </div>
    </div>
  );
}
