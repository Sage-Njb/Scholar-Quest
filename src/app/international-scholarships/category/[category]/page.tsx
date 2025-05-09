import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScholarshipCard } from "@/components/scholarship-card";
import {
  getInternationalScholarships,
  getScholarshipCategories,
} from "@/lib/scholarship-service";

// ✅ Use this instead of your own props interface
type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  const categories = await getScholarshipCategories();
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = (await params).category;

  return {
    title: `${category} Scholarships - ScholarQuest`,
    description: `Find ${category.toLowerCase()} scholarships for global opportunities.`,
  };
}

// ✅ Correct prop typing on page component
export default async function Page({ params }: Props) {
  const category = (await params).category;
  const scholarships = await getInternationalScholarships(category);
  const categories = await getScholarshipCategories();

  if (!categories.includes(category)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{category} Scholarships</h1>

      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-4">
          <Button variant="outline" asChild>
            <Link
              href="/international-scholarships"
              className="whitespace-nowrap"
            >
              All Categories
            </Link>
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "default" : "outline"}
              asChild
            >
              <Link
                href={`/international-scholarships/category/${cat}`}
                className="whitespace-nowrap"
              >
                {cat}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {scholarships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No scholarships found in this category. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
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
    </div>
  );
}
