import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ProcessingProgressProps {
  status: "idle" | "processing" | "complete" | "error";
  progress?: number;
  message?: string;
  errorMessage?: string;
  onReset?: () => void;
}

export default function ProcessingProgress({
  status,
  progress = 0,
  message = "Processing...",
  errorMessage,
  onReset,
}: ProcessingProgressProps) {
  if (status === "idle") {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Status Container */}
      <div className="p-6 bg-secondary rounded-lg border border-border">
        <div className="flex items-center gap-4">
          {status === "processing" && (
            <Loader2 className="w-6 h-6 text-primary animate-spin flex-shrink-0" />
          )}
          {status === "complete" && (
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
          )}
          {status === "error" && (
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
          )}

          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              {status === "processing" && "Processing..."}
              {status === "complete" && "Complete!"}
              {status === "error" && "Error"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {status === "error" ? errorMessage : message}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {status === "processing" && (
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {status === "complete" && onReset && (
        <button
          onClick={onReset}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Start Over
        </button>
      )}

      {status === "error" && onReset && (
        <button
          onClick={onReset}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
