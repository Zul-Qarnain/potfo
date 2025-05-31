import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/toaster"; // For contact form messages

export const metadata: Metadata = {
  title: {
    default: 'Persona | Your Name - Personal Portfolio',
    template: '%s | Persona',
  },
  description: 'A modern, visually stunning personal portfolio for Your Name, showcasing skills, projects, publications, and events.',
  openGraph: {
    title: 'Persona | Your Name - Personal Portfolio',
    description: 'Explore the professional journey of Your Name.',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com', // Replace with actual domain
    siteName: 'Persona',
    // images: [ // Add a default OG image if available
    //   {
    //     url: 'https://your-domain.com/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Persona Portfolio',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20"> {/* pt-20 for fixed navbar height */}
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
