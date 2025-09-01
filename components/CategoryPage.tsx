"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Grid,
  List,
  Star,
  Sparkles,
  Flame,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  popular?: boolean;
  order?: number;
}

interface CategoryData {
  id: string;
  name: string;
  slug?: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  order?: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  sparkles: Sparkles,
  flame: Flame,
};

interface CategoryPageProps {
  category: string; // Firestore document id OR slug
  onBack: () => void;
  handleproductClick: (productId: string) => void;
}

export function CategoryPage({
  category,
  onBack,
  handleproductClick,
}: CategoryPageProps) {
  const [data, setData] = useState<CategoryData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        // Load category by ID
        let catSnap = await getDoc(doc(db, "categories", category));
        if (!catSnap.exists()) {
          throw new Error("Category not found");
        }

        const raw = catSnap.data() as any;
        const catData: CategoryData = {
          id: catSnap.id,
          name: raw?.name ?? "",
          slug: raw?.slug,
          description: raw?.description ?? "",
          icon: (raw?.icon ?? "sparkles").toLowerCase(),
          color: raw?.color ?? "from-blue-400 to-blue-600",
          image: raw?.image ?? "",
          order: raw?.order ?? 0,
        };

        if (cancelled) return;
        setData(catData);

        // ✅ Simple product query (no orderBy, no index needed)
        const prodQuery = query(
          collection(db, "products"),
          where("category", "==", catData.name)
        );
        const prodSnaps = await getDocs(prodQuery);

        const loadedProducts: Product[] = prodSnaps.docs.map((p) => {
          const pd = p.data() as any;
          return {
            id: p.id,
            name: pd?.name ?? "",
            price: pd?.price ?? "",
            rating: typeof pd?.rating === "number" ? pd.rating : 0,
            image: Array.isArray(pd?.images) ? pd.images[0] : "",
            popular: !!pd?.popular,
            order: pd?.order ?? 0,
          };
        });

        if (cancelled) return;
        setProducts(loadedProducts);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to load category");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  const IconComponent = useMemo(() => {
    const key = (data?.icon || "sparkles").toLowerCase();
    return iconMap[key] ?? Sparkles;
  }, [data?.icon]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const q = searchTerm.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-600">Loading category…</p>
      </div>
    );
  }

  if (err || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Category not found
          </h2>
          {err && <p className="text-gray-600 mb-4">{err}</p>}
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-white/20 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>

            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${data.color}`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {products.length} Products Available
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Premium Quality
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Twin Elephant Brand
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key="products-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  index={index}
                  color={data.color}
                  handleproductClick={handleproductClick}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  index: number;
  color: string;
  handleproductClick: (productId: string) => void;
}

function ProductCard({
  product,
  viewMode,
  index,
  color,
  handleproductClick,
}: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.popular && (
                  <Badge
                    className={`absolute top-2 left-2 bg-gradient-to-r ${color} text-white border-none`}
                  >
                    Popular
                  </Badge>
                )}
              </div>

              <div className="flex-1">
                <h4
                  className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1"
                  title={product.name}
                >
                  {product.name}
                </h4>

                <div className="flex items-center justify-between">
                  <Button
                    className={`bg-gradient-to-r ${color} hover:opacity-90 text-white`}
                    onClick={() => handleproductClick(product.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {product.popular && (
            <Badge
              className={`absolute top-3 left-3 bg-gradient-to-r ${color} text-white border-none shadow-lg`}
            >
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}

          <div
            className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
          />
        </div>

        <CardContent className="p-6">
          <h4
            className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h4>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              {product.price}
            </span>
            <Button
              size="sm"
              className={`bg-gradient-to-r ${color} hover:opacity-90 text-white`}
              onClick={() => handleproductClick(product.id)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
