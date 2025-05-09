// Define a generic Eligibility type for flexibility
export interface Eligibility {
  min_gpa?: number; // Example: Minimum GPA requirement
  majors?: string[]; // Example: List of eligible majors
  citizenship?: string[]; // Example: Eligible countries of citizenship
  level_of_study?: string; // Example: Undergraduate, Postgraduate, etc.
  [key: string]: any; // Allow additional dynamic eligibility criteria
}

// Base Scholarship Interface
export interface Scholarship {
  id: string; // Unique identifier for the scholarship
  name: string; // Name of the scholarship
  deadline: string; // Deadline for application (ISO date string)
  amount: string; // Scholarship amount as a string (e.g., "$10,000")
  eligibility: Eligibility; // Eligibility criteria (dynamic and flexible)
  category: string; // Category of the scholarship (e.g., "Undergraduate", "SHS")
  description: string; // Detailed description of the scholarship
  application_url: string; // URL for applying to the scholarship
  created_at: string; // Timestamp of when the scholarship was created (ISO date string)
}

// International Scholarship Interface (extends Scholarship)
export interface InternationalScholarship extends Scholarship {
  country: string; // Country offering the scholarship
}