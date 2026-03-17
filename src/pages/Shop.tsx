import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
// // import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const categories = ["all", "men", "women", "kids", "computer", "sunglasses"] as const;
const shapes = ["all", "rectangular", "round", "oval", "cat-eye", "aviator", "geometric", "square", "clubmaster"] as const;
const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "New Arrivals", value: "new" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [shape, setShape] = useState("all");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleCategoryChange = (c: string) => {
    if (c === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: c });
    }
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (shape !== "all") result = result.filter((p) => p.shape === shape);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [category, shape, sort, products]);

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="bg-accent section-padding !py-12">
        <div className="container-main text-center">
          <h1 className="text-3xl font-bold text-foreground">Shop Eyewear</h1>
          <p className="text-muted-foreground mt-2">Find your perfect pair from our curated collection</p>
        </div>
      </div>

      <div className="container-main section-padding !py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-input rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-1" /> Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-56 shrink-0`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between lg:hidden">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-4 h-4" /></button>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Shape</h4>
                <div className="flex flex-col gap-2">
                  {shapes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`text-left text-sm capitalize px-3 py-1.5 rounded-md transition-colors ${
                        shape === s ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence>
                {filtered.map((p) => <ProductCard key={p._id || p.id} product={p} />)}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => handleCategoryChange("all")}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
