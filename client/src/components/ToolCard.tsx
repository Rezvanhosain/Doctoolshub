import { Link } from "wouter";
import { Star } from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";

interface ToolCardProps {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  implemented: boolean;
}

export default function ToolCard({
  name,
  slug,
  shortDescription,
  icon,
  implemented,
}: ToolCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Get icon component dynamically
  const IconComponent = (Icons as any)[icon] || Icons.FileText;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const cardContent = (
    <div className="relative h-full flex flex-col p-6 bg-white border border-border rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group">
      {/* Favorite button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label="Add to favorites"
      >
        <Star
          className={`w-5 h-5 transition-colors ${
            isFavorite
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground group-hover:text-primary"
          }`}
        />
      </button>

      {/* Icon */}
      <div className="mb-4 flex-shrink-0">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {shortDescription}
        </p>
      </div>

      {/* Status badge */}
      {!implemented && (
        <div className="mt-4 pt-4 border-t border-border">
          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );

  if (!implemented) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/tools/${slug}`} className="h-full block">
      {cardContent}
    </Link>
  );
}
