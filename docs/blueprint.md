# **App Name**: Persona

## Core Features:

- Home Section: A landing page with a rounded profile picture, links to professional profiles (Google Scholar, GitHub, ResearchGate, LinkedIn), a 'View My Resume' button, an 'Education' divider with university and major, an 'Experience' section with a brief summary, and animated skill bars.
- Navbar: A navigation bar (Home, Publications, Projects, Events, Contact Me).
- Publications: A publications section displaying research and conference papers, each with a title, date, and a link.
- Projects: A section showing project cards (title, description, tech stack, and a 'View on GitHub' button), with dynamic data.
- Events: A showcase of events, with an image, title, and a 'View Story' button that opens a modal or new page.
- Contact Form: A contact form with fields for name, email, and message, plus a submit button and a thank-you note.
- Theme Toggle: A dark/light theme toggle button on the navbar for switching between light and dark themes.

## Style Guidelines:

- Primary color: Indigo (#4F46E5), evoking intelligence, credibility, and originality. The landing page should have a futuristic and digital feel.
- Background color: Very light grey (#F4F4F8), suitable for a light color scheme, and of similar hue to the indigo, contributing to a professional yet modern look.
- Accent color: Violet (#A3A1F7), an analogous hue to indigo, providing visual interest without disrupting overall harmony. It should contrast well with both background and primary colors, creating prominence for elements like the dark/light theme toggle.
- Headline font: 'Space Grotesk' (sans-serif). Body font: 'Inter' (sans-serif). Code font: 'Source Code Pro' (monospace).
- Modern icons from Lucide, FontAwesome, or Heroicons; consistent style.
- Consistent theme, spacing, and component styling across all sections.
- Subtle hover animations and smooth transitions throughout the website.
- Ensure keyboard navigation and screen reader labels for buttons and links (ARIA attributes).
- Color contrast ratios should be tested for readability in both light and dark modes.
- Use Next.js’s next/head for metadata (title, description, OG tags).
- Optimize images with Next.js <Image /> for better performance and lazy loading.
- Use components/ folder to make Navbar.tsx, Footer.tsx, ProjectCard.tsx, SkillBar.tsx etc. for reusability and clean code.
- Add Framer Motion for more fluid animations (especially skill bars and modals).
- Use React Hook Form + Zod for form validation in the contact section.