export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-background text-foreground text-center py-4 border-t border-gray-300">
      <p className="text-sm">
        © {new Date().getFullYear()} FitCoach. Tous droits réservés.
      </p>
    </footer>
  );
}
