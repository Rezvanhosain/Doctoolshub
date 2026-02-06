import { useState, useMemo } from "react";
import { Search, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { TOOLS, CATEGORIES } from "@shared/const";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool: any) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get implemented tools count
  const implementedCount = TOOLS.filter((t: any) => t.implemented).length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 md:py-24">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {implementedCount} tools ready to use
            </span>
          </div>

          <h1 className="h1 mb-4 text-foreground">
            Free PDF Tools for Everyone
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Merge, split, compress, and convert PDFs online. No installation required. All processing happens in your browser.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools... (e.g., merge, compress, convert)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-white">
        <div className="container py-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              All Tools
            </button>
            {CATEGORIES.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container py-16">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No tools found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool: any) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                100% Free
              </h3>
              <p className="text-muted-foreground">
                All tools are completely free to use. No hidden costs, no premium plans, no ads.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                Secure & Private
              </h3>
              <p className="text-muted-foreground">
                Your files are processed locally in your browser. We never store or access your documents.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                No Installation
              </h3>
              <p className="text-muted-foreground">
                Works directly in your web browser. No software to download or install.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
