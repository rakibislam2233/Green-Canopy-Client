"use client";
import image from "@/assets/qa/qa.png";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QA = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Static FAQ data for tree selling business
  const staticFAQs = [
    {
      question: "What types of trees do you sell?",
      answer: "We offer a wide variety of trees including fruit trees, ornamental trees, shade trees, evergreens, and native species. Our inventory includes both young saplings and mature trees to suit different landscaping needs."
    },
    {
      question: "How do I care for my newly planted tree?",
      answer: "Water your new tree deeply 2-3 times per week for the first month, then gradually reduce frequency. Mulch around the base, avoid fertilizing for the first year, and prune only damaged branches. We provide detailed care guides with each purchase."
    },
    {
      question: "Do you offer tree planting services?",
      answer: "Yes, we provide professional tree planting services. Our certified arborists will plant your tree in the optimal location, ensure proper soil preparation, and provide aftercare instructions to guarantee healthy growth."
    },
    {
      question: "What's the best season to plant trees?",
      answer: "Fall and early spring are typically the best seasons for tree planting as temperatures are moderate and rainfall is more consistent. However, container-grown trees can be planted successfully throughout most of the growing season with proper care."
    },
    {
      question: "Do you provide warranties on your trees?",
      answer: "We offer a one-year warranty on all our trees when planted by our professionals or following our planting guidelines. This covers tree health and survival, ensuring you get the best value for your investment."
    },
    {
      question: "How do I choose the right tree for my property?",
      answer: "Consider factors like mature size, soil type, sunlight requirements, local climate, and your landscaping goals. Our horticulture specialists offer free consultations to help you select the perfect trees for your specific needs and location."
    }
  ];
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let content = null;
    
    content = (
      <div className="space-y-2">
        {staticFAQs?.map(
          (item: { question: string; answer: string }, index: number) => (
            <div key={index} className="border-b 0 border-gray-200 pb-2 last:border-b-0">
              <div
                className="flex items-center justify-between cursor-pointer py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
                onClick={() => toggleQuestion(index)}
              >
                <p className="font-semibold text-gray-800 flex-1 pr-4">{item.question}</p>
                <div className="size-10 flex justify-center items-center bg-primary rounded-full transition-colors duration-200">
                  {activeIndex === index ? (
                    <FaMinus size={14} className="text-white" />
                  ) : (
                    <FaPlus size={14} className="text-white" />
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <div className="mt-3 px-2">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    );
  return (
    <section className="w-full px-5 py-20">
      <div className="w-full md:container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Responsive Image */}
        <div className="w-full mx-auto h-56 md:h-[500px] relative">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"
            alt="Tree Care Questions"
            fill
            className="rounded-lg absolute object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
        </div>

        {/* Question & Answer Section */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
            Question & <span className="text-green-500">Answer</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mb-8 mx-auto md:mx-0"></div>
          {/* Questions List */}
          {content}
        </div>
      </div>
    </section>
  );
};

export default QA;
