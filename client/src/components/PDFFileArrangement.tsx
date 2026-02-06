import { useState, useEffect } from "react";
import { GripVertical, X, Loader2 } from "lucide-react";
import { generatePDFThumbnails } from "@/lib/pdf-thumbnail";

interface FileWithThumbnail {
  file: File;
  thumbnail: string;
  id: string;
}

interface PDFFileArrangementProps {
  files: File[];
  onArranged: (arrangedFiles: File[]) => void;
}

export default function PDFFileArrangement({
  files,
  onArranged,
}: PDFFileArrangementProps) {
  const [arrangedFiles, setArrangedFiles] = useState<FileWithThumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Generate thumbnails on mount
  useEffect(() => {
    const loadThumbnails = async () => {
      setLoading(true);
      try {
        const thumbnails = await generatePDFThumbnails(files);
        const withIds = thumbnails.map((item, index) => ({
          ...item,
          id: `${index}-${item.file.name}`,
        }));
        setArrangedFiles(withIds);
        onArranged(withIds.map((item) => item.file));
      } catch (error) {
        console.error("Error loading thumbnails:", error);
      } finally {
        setLoading(false);
      }
    };

    if (files.length > 0) {
      loadThumbnails();
    }
  }, [files, onArranged]);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-primary/5");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-primary/5");
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-primary/5");

    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = arrangedFiles.findIndex((f) => f.id === draggedId);
    const targetIndex = arrangedFiles.findIndex((f) => f.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newArranged = [...arrangedFiles];
    const [draggedItem] = newArranged.splice(draggedIndex, 1);
    newArranged.splice(targetIndex, 0, draggedItem);

    setArrangedFiles(newArranged);
    setDraggedId(null);
    onArranged(newArranged.map((item) => item.file));
  };

  const handleRemove = (id: string) => {
    const newArranged = arrangedFiles.filter((f) => f.id !== id);
    setArrangedFiles(newArranged);
    onArranged(newArranged.map((item) => item.file));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newArranged = [...arrangedFiles];
    [newArranged[index - 1], newArranged[index]] = [
      newArranged[index],
      newArranged[index - 1],
    ];
    setArrangedFiles(newArranged);
    onArranged(newArranged.map((item) => item.file));
  };

  const handleMoveDown = (index: number) => {
    if (index === arrangedFiles.length - 1) return;
    const newArranged = [...arrangedFiles];
    [newArranged[index], newArranged[index + 1]] = [
      newArranged[index + 1],
      newArranged[index],
    ];
    setArrangedFiles(newArranged);
    onArranged(newArranged.map((item) => item.file));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-primary animate-spin mr-2" />
        <span className="text-muted-foreground">Loading thumbnails...</span>
      </div>
    );
  }

  if (arrangedFiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Arrange Files</h3>
        <span className="text-sm text-muted-foreground">
          {arrangedFiles.length} file{arrangedFiles.length !== 1 ? "s" : ""}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        Drag files to reorder them, or use the arrow buttons. Files will be merged in this order.
      </p>

      <div className="space-y-2">
        {arrangedFiles.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item.id)}
            className={`flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all cursor-move ${
              draggedId === item.id ? "opacity-50 bg-primary/5" : ""
            }`}
          >
            {/* Drag Handle */}
            <div className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors">
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <img
                src={item.thumbnail}
                alt={item.file.name}
                className="h-24 w-20 object-cover rounded border border-border bg-secondary"
              />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {item.file.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {(item.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Position: {index + 1} of {arrangedFiles.length}
              </p>
            </div>

            {/* Order Controls */}
            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="px-3 py-2 text-sm font-medium rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === arrangedFiles.length - 1}
                className="px-3 py-2 text-sm font-medium rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Move down"
              >
                ↓
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item.id)}
              className="flex-shrink-0 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 bg-secondary rounded-lg border border-border">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Merge order:</span>{" "}
          <span className="text-muted-foreground">
            {arrangedFiles.map((f) => f.file.name).join(" → ")}
          </span>
        </p>
      </div>
    </div>
  );
}
