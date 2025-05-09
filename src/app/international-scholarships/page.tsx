"use client"
import {
  getInternationalScholarships,
  getScholarshipCategories,
} from "@/lib/scholarship-service";
import { ScholarshipCard } from "@/components/scholarship-card";
import { Button } from "@/components/ui/button"; // Ensure the path is correct
import { useState, useEffect } from "react";

// Import the Scholarship type
import type { Scholarship } from "@/types/scholarship";

export default function InternationalScholarshipsPage() {
  // State to track scholarships, categories, loading, and selected category
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch scholarships and categories on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all scholarships
        const allScholarships = await getInternationalScholarships();
        setScholarships(allScholarships);

        // Fetch scholarship categories
        const fetchedCategories = await getScholarshipCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load scholarships. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter scholarships based on the selected category
  const filteredScholarships = selectedCategory
    ? scholarships.filter((scholarship) => scholarship.category === selectedCategory)
    : scholarships;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-12">
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading scholarships...</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          <h1 className="text-4xl font-bold mb-8">International Scholarships</h1>

          {/* Categories */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-4">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap ${
                  selectedCategory === null ? "bg-blue-500 text-white" : ""
                }`}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category ? "bg-blue-0 text-white" : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Scholarships Grid */}
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No scholarships found. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((scholarship) => (
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
        </>
      )}
    </div>
  );
}