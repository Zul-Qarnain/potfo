import Link from 'next/link';
import { ExternalLink, BookOpen, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Publication } from '@/lib/data';

interface PublicationItemProps {
  publication: Publication;
}

export function PublicationItem({ publication }: PublicationItemProps) {
  const Icon = publication.type === 'Journal' ? BookOpen : Mic;

  return (
    <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-border hover:border-primary/50 group">
      <div className="flex items-start space-x-4">
        <Icon className="h-8 w-8 text-primary mt-1 shrink-0" />
        <div>
          <h3 className="text-xl font-semibold font-headline text-foreground mb-1 group-hover:text-primary transition-colors">
            {publication.title}
          </h3>
          <p className="text-sm text-muted-foreground italic mb-2">{publication.authors}</p>
          <p className="text-sm text-foreground mb-1">
            Published in <span className="font-medium">{publication.venue}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
            <span>{publication.date}</span>
            <Badge variant={publication.type === 'Journal' ? 'secondary' : 'outline'} className="capitalize">
              {publication.type}
            </Badge>
          </div>
          <Link
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline group-hover:font-medium"
            aria-label={`Read more about ${publication.title}`}
          >
            View Publication
            <ExternalLink className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
