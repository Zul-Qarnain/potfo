
import { EventCard } from '@/components/events/EventCard';
import { eventsData, type Event } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'A showcase of events, conferences, and activities I have participated in.',
};

interface GroupedEvents {
  [year: string]: Event[];
}

const getYearFromDate = (dateString: string): string => {
  try {
    // Attempt to parse common date string format like "Month Day, Year"
    const date = new Date(dateString);
    if (!isNaN(date.getFullYear())) {
      return date.getFullYear().toString();
    }
  } catch (e) {
    // Fallback for less standard date strings, try to extract year with regex
    const yearMatch = dateString.match(/\b\d{4}\b/);
    if (yearMatch) return yearMatch[0];
  }
  return "Unknown Year"; // Fallback if year cannot be determined
};


export default function EventsPage() {
  const groupedEvents = eventsData.reduce<GroupedEvents>((acc, event) => {
    const year = getYearFromDate(event.date);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedEvents).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section id="events" className="section-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground sm:text-5xl">
          Events & <span className="text-primary">Activities</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore some of the significant events and activities I&apos;ve been a part of, organized by year.
        </p>
      </div>

      {sortedYears.length === 0 && (
         <p className="text-center text-muted-foreground mt-12">No events to display at the moment.</p>
      )}

      {sortedYears.map((year) => (
        <div key={year} className="mb-16">
          <h2 className="text-3xl font-bold font-headline text-primary mb-8 text-center md:text-left">
            {year}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groupedEvents[year].map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
