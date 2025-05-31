import { EventCard } from '@/components/events/EventCard';
import { eventsData } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'A showcase of events, conferences, and activities I have participated in.',
};

export default function EventsPage() {
  return (
    <section id="events" className="section-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground sm:text-5xl">
          Events & <span className="text-primary">Activities</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore some of the significant events and activities I&apos;ve been a part of.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {eventsData.length === 0 && (
         <p className="text-center text-muted-foreground mt-12">No events to display at the moment.</p>
      )}
    </section>
  );
}
