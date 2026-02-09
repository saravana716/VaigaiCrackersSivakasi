"use client"; // 👈 Add this at the very top

import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { db } from "../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import * as React from "react";

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

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
          (a, b) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime()
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl pb-3 font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Our Categories
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our extensive range of premium Sparklers, carefully selected to create unforgettable moments
          </p>
        </motion.div>

        {/* Categories Swiper */}
        {isLoading ? (
          <p className="text-center text-gray-400">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-400">No categories found.</p>
        ) : (
          <div className="relative pt-5">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={2} // 👈 Default for mobile: 2 cards
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-yellow-400',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-yellow-500',
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              breakpoints={{
                // Mobile (default): 2 per view
                320: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                // Tablet
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // Desktop
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              loop={categories.length > 2} // Only loop if more than 2 items
              className="!pb-12"
            >
              {categories.map((category, index) => (
                <SwiperSlide key={category.id} style={{ height: 'auto' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                    className="group cursor-pointer h-full"
                    onClick={() => onCategoryClick?.(category.id)}
                  >
                    <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 overflow-hidden hover:border-gray-600 transition-colors w-full rounded-lg shadow-lg h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <ImageWithFallback
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30 group-hover:opacity-40 transition-opacity`}
                        />
                      </div>
                      <CardContent className="p-4 flex-grow">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {category.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                        <motion.div
                          className="mt-3 text-yellow-400 font-medium text-sm"
                          whileHover={{ x: 5 }}
                        >
                          Explore Collection →
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="swiper-button-prev !text-yellow-400 !w-8 !h-8 !top-1/2 !-left-2 after:!text-lg" />
            <div className="swiper-button-next !text-yellow-400 !w-8 !h-8 !top-1/2 !-right-2 after:!text-lg" />
          </div>
        )}
      </div>
    </section>
  );
}