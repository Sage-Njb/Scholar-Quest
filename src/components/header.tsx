import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ScholarQuest
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link
            href="/international-scholarships"
            className="hover:text-primary transition-colors"
          >
            International Scholarships
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/international-scholarships">Explore Scholarships</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
