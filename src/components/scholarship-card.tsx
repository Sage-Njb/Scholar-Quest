import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScholarshipCardProps {
  id: string;
  name: string;
  deadline: string; // Ensure this is in a valid date format (e.g., ISO string)
  amount: string;
  category: string;
  description: string;
  applicationUrl: string; // Ensure this is a valid URL
}

export function ScholarshipCard({
  name,
  deadline,
  amount,
  category,
  description,
  applicationUrl,
}: ScholarshipCardProps) {
  return (
    <Card className="h-full flex flex-col">
      {/* Card Header */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="outline" className="bg-slate-100">
            {category}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 mt-2">
          <CalendarIcon className="h-4 w-4" />
          <span>
            Deadline:{" "}
            {deadline
              ? new Date(deadline).toLocaleDateString()
              : "Not specified"}
          </span>
        </CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-grow">
        {/* Amount Section */}
        <div className="flex items-center gap-1 text-lg font-semibold mb-4">
          <DollarSign className="h-5 w-5" />
          <span>{amount || "Amount not specified"}</span>
        </div>

        {/* Description Section */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description || "No description available."}
        </p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter>
        {/* Apply Now Button */}
        <Button
          asChild
          className="w-full"
          disabled={!applicationUrl} // Disable the button if no URL is provided
        >
          <a
            href={applicationUrl || "#"} // Fallback to "#" if no URL is provided
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            Apply Now{" "}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}