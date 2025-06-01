
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Event } from '@/lib/data';
import { CalendarDays, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const primaryImage = event.images && event.images.length > 0 ? event.images[0] : 'https://placehold.co/600x400.png';

  return (
    <Dialog>
      <div className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border border-border hover:border-primary/50 flex flex-col h-full group">
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={primaryImage}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={event.imageHint}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold font-headline text-foreground mb-2">{event.title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
            {event.date}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            {event.location}
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{event.description}</p>
          
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Story
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-headline">{event.title}</DialogTitle>
          <DialogDescription asChild>
            <span className="flex items-center text-xs text-muted-foreground mt-1 mb-1">
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" /> {event.date}
                <span className="mx-2">|</span>
                <MapPin className="h-3.5 w-3.5 mr-1.5" /> {event.location}
            </span>
          </DialogDescription>
        </DialogHeader>

        {event.images && event.images.length > 0 && (
          <div className="my-4 flex-shrink-0">
            {event.images.length === 1 ? (
              <div className="relative w-full h-64 rounded-md overflow-hidden">
                <Image 
                  src={event.images[0]} 
                  alt={event.title} 
                  layout="fill" 
                  objectFit="cover" 
                  data-ai-hint={event.imageHint} 
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto"> {/* Simple grid for multiple images */}
                {event.images.map((imgSrc, index) => (
                  <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                    <Image 
                      src={imgSrc} 
                      alt={`${event.title} - image ${index + 1}`} 
                      layout="fill" 
                      objectFit="cover" 
                      data-ai-hint={index === 0 ? event.imageHint : 'event gallery image'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <ScrollArea className="flex-grow pr-2 -mr-4">
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {event.story}
          </p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
