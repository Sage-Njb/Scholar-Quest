import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getScholarships } from "@/lib/scholarship-service";
import { ScholarshipCard } from "@/components/scholarship-card";

export default async function Home() {
  const scholarships = await getScholarships();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to ScholarQuest
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Explore scholarships, improve essays, and practice interviews with AI
          assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/international-scholarships">
              Explore International Scholarships
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/">Local Scholarships</Link>
          </Button>
        </div>
      </section>

      {/* Local Scholarships Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Local Scholarships</h2>
          <Button variant="outline" asChild>
            <Link href="/">View All</Link>
          </Button>
        </div>

        {scholarships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No scholarships found. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.slice(0, 6).map((scholarship: any) => (
              <ScholarshipCard
                key={scholarship.id}
                id={scholarship.id}
                name={scholarship.name}
                deadline={scholarship.deadline}
                amount={scholarship.amount}
                category={scholarship.category}
                description={scholarship.description}
                applicationUrl={scholarship.application_url}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 rounded-lg p-8 my-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Why Choose ScholarQuest?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Scholarships</h3>
            <p className="text-muted-foreground">
              Discover local and international scholarships tailored to your
              profile.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Improve Essays</h3>
            <p className="text-muted-foreground">
              Get feedback on your scholarship essays to increase your chances.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Practice Interviews</h3>
            <p className="text-muted-foreground">
              Prepare for scholarship interviews with our AI-powered practice
              tool.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
