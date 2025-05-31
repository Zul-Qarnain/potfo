export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="section-container text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Persona. Built with Next.js and Tailwind CSS.
        </p>
        <p className="text-xs mt-1">
          Designed by an expert designer.
        </p>
      </div>
    </footer>
  );
}
