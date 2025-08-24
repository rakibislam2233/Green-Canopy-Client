"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCalendarAlt, FaUser, FaArrowRight, FaLeaf } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
}

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(3); // Show 3 blog posts at a time

  // Static blog posts data for tree selling business
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Best Trees for Small Spaces: Maximizing Your Garden",
      excerpt:
        "Discover the perfect trees for compact gardens and urban spaces. Learn which varieties offer beauty without overwhelming your landscape.",
      author: "Dr. Emily Green",
      date: "December 15, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      category: "Garden Design",
      slug: "best-trees-small-spaces",
    },
    {
      id: 2,
      title: "Spring Tree Care: Essential Tips for Healthy Growth",
      excerpt:
        "Spring is the perfect time to care for your trees. Learn about pruning, fertilizing, and pest prevention to ensure vibrant growth all season.",
      author: "Mike Rodriguez",
      date: "December 10, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      category: "Tree Care",
      slug: "spring-tree-care-tips",
    },
    {
      id: 3,
      title: "Native Trees: Why They're Perfect for Your Local Landscape",
      excerpt:
        "Explore the benefits of native trees for your garden. From low maintenance to wildlife support, discover why native species are the smart choice.",
      author: "Sarah Chen",
      date: "December 8, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop",
      category: "Sustainability",
      slug: "native-trees-benefits",
    },
    {
      id: 4,
      title: "Fruit Trees 101: Growing Your Own Orchard",
      excerpt:
        "Start your home orchard with confidence. Learn about the best fruit tree varieties, planting techniques, and maintenance for delicious harvests.",
      author: "James Wilson",
      date: "December 5, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
      category: "Fruit Trees",
      slug: "fruit-trees-guide",
    },
    {
      id: 5,
      title: "Winter Tree Protection: Keeping Your Trees Safe",
      excerpt:
        "Protect your investment during harsh winter months. Essential strategies for tree wrapping, mulching, and cold weather care.",
      author: "Dr. Emily Green",
      date: "December 1, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      category: "Seasonal Care",
      slug: "winter-tree-protection",
    },
    {
      id: 6,
      title: "The Art of Tree Placement: Design Principles for Your Landscape",
      excerpt:
        "Master the fundamentals of tree placement for stunning landscapes. Learn about spacing, height considerations, and creating visual harmony.",
      author: "Lisa Park",
      date: "November 28, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop",
      category: "Landscape Design",
      slug: "tree-placement-design",
    },
  ];

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentPosts = () => {
    const startIndex = currentIndex * itemsPerPage;
    return blogPosts.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-5">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
            Tree Care <span className="text-green-600">Blog</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-5"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Expert insights, care tips, and the latest trends in horticulture to
            help your garden thrive
          </p>
        </motion.div>

        {/* Blog Slider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
          >
            <IoIosArrowBack size={24} className="text-green-600 group-hover:text-green-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
          >
            <IoIosArrowForward size={24} className="text-green-600 group-hover:text-green-700" />
          </button>

          {/* Blog Cards Container */}
          <div className="w-full p-4 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getCurrentPosts().map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <FaCalendarAlt className="mr-2" />
                      <span className="mr-4">{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <FaUser className="mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-300 group"
                      >
                        Read More
                        <FaArrowRight className="ml-1 inline group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-500 scale-125"
                    : "bg-green-200 hover:bg-green-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center bg-primary  text-white px-8 py-3 rounded font-semibold"
          >
            View All Posts
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
