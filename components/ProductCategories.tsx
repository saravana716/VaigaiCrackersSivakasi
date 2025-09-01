"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { db, storage } from "../firebase"; // adjust path if needed
import { collection, getDocs } from "firebase/firestore";
import * as React from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
  createdAt: Date;
}

interface ProductCategoriesProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function ProductCategories({ onCategoryClick }: ProductCategoriesProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchCategories = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: (data.createdAt as Timestamp)?.toDate?.() ?? new Date(),
        } as Category;
      });
      setCategories(
        categoriesData.sort(
          (a, b) =>
            (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime()
        )
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section id="categories" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Our Categories
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our extensive range of premium fireworks, carefully
            selected to create unforgettable moments
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="text-center text-gray-400 col-span-full">
              Loading categories...
            </p>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No categories found.
            </p>
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => {
                  if (onCategoryClick) {
                    onCategoryClick(category.id);
                  }
                }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 overflow-hidden hover:border-gray-600 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30 group-hover:opacity-40 transition-opacity`}
                    ></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </h3>
                    <p
                      className="text-gray-400 leading-relaxed truncate"
                      title={category.description}
                    >
                      {category.description}
                    </p>

                    <motion.div
                      className="mt-4 text-yellow-400 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Explore Collection →
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
