// import React, { useState, useEffect, useCallback, useRef } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import lightGallery from "lightgallery";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-thumbnail.css";
// import "lightgallery/css/lg-zoom.css";
// import { imageBaseUrl } from "@/config/imageBaseUrl";
// import Image from "next/image";
// import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
// import { LocateCarouselThumbsButton } from "./LocateCarouselThumbsButton";
// import { ICompanyImage } from "@/types/companyTyes";

// const LocateCarousel = ({
//   slides,
//   options,
//   locateImages,
// }: {
//   slides: number[];
//   options?: any;
//   locateImages: ICompanyImage[];
// }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   // Add `loop: true` to options for infinite scrolling
//   const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
//     ...options,
//     loop: true,
//   });
//   const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
//     containScroll: "keepSnaps",
//     dragFree: true,
//     loop: true, // Enable loop for thumbnails (if needed)
//   });

//   const lightGalleryRef = useRef<HTMLDivElement>(null);
//   const lightGalleryInstance = useRef<any>(null);

//   const scrollPrev = useCallback(() => {
//     if (emblaMainApi) emblaMainApi.scrollPrev();
//   }, [emblaMainApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaMainApi) emblaMainApi.scrollNext();
//   }, [emblaMainApi]);

//   const onThumbClick = useCallback(
//     (index: number) => {
//       if (!emblaMainApi || !emblaThumbsApi) return;
//       emblaMainApi.scrollTo(index);
//     },
//     [emblaMainApi, emblaThumbsApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaMainApi || !emblaThumbsApi) return;
//     setSelectedIndex(emblaMainApi.selectedScrollSnap());
//     emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
//   }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

//   useEffect(() => {
//     if (!emblaMainApi) return;
//     onSelect();
//     emblaMainApi.on("select", onSelect).on("reInit", onSelect);
//   }, [emblaMainApi, onSelect]);

//   // Initialize lightGallery on mount
//   useEffect(() => {
//     if (lightGalleryRef.current) {
//       lightGalleryInstance.current = lightGallery(lightGalleryRef.current, {
//         dynamic: true,
//         dynamicEl: locateImages.map((image, index) => ({
//           src: imageBaseUrl + image?.imageUrl,
//           thumb: imageBaseUrl + image?.imageUrl,
//           id: `image-${index}`,
//         })),
//       });
//     }

//     return () => {
//       if (lightGalleryInstance.current) {
//         lightGalleryInstance.current.destroy();
//       }
//     };
//   }, [locateImages]);

//   return (
//     <div className="relative">
//       <div className="custom-embla">
//         {/* Main Carousel */}
//         <div
//           className="custom-embla__viewport overflow-hidden"
//           ref={emblaMainRef}
//         >
//           <div className="custom-embla__container flex">
//             {locateImages.map((image: ICompanyImage, index: number) => (
//               <div
//                 className="custom-embla__slide flex-shrink-0 w-full px-2"
//                 key={index}
//                 onClick={() => {
//                   // Trigger lightGallery when the main image is clicked
//                   if (lightGalleryInstance.current) {
//                     lightGalleryInstance.current.openGallery(index);
//                   }
//                 }}
//               >
//                 <Image
//                   className="w-full h-80 object-contain cursor-pointer"
//                   width={200}
//                   height={200}
//                   src={imageBaseUrl + image?.imageUrl}
//                   alt={`Slide ${index + 1}`}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="custom-embla-thumbs mt-5">
//         <div className="w-full flex space-x-2 justify-end items-center mb-5">
//           <button
//             onClick={scrollPrev}
//             className="bg-primary backdrop-blur-lg text-white rounded-full p-2 shadow-md"
//           >
//             <MdOutlineArrowBackIosNew size={18} />
//           </button>

//           <button
//             onClick={scrollNext}
//             className="bg-primary backdrop-blur-lg text-white rounded-full p-2 shadow-md"
//           >
//             <MdArrowForwardIos size={18} />
//           </button>
//         </div>
//         <div
//           className="custom-embla-thumbs__viewport overflow-hidden"
//           ref={emblaThumbsRef}
//         >
//           <div className="w-full flex space-x-2">
//             {slides.map((index: number) => (
//               <LocateCarouselThumbsButton
//                 key={index}
//                 onClick={() => onThumbClick(index)}
//                 selected={index === selectedIndex}
//                 index={index}
//                 locateImages={locateImages}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Hidden div for LightGallery */}
//       <div
//         ref={lightGalleryRef}
//         style={{ display: "none" }}
//         id="lightgallery-container"
//       ></div>
//     </div>
//   );
// };

// export default LocateCarousel;

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import lightGallery from "lightgallery";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Image from "next/image";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { ICompanyImage } from "@/types/companyTyes";

const LocateCarousel = ({
  options,
  locateImages,
}: {
  slides: number[];
  options?: any;
  locateImages: ICompanyImage[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Main carousel with looping enabled
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    ...options,
    loop: true,
  });

  const lightGalleryRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<any>(null);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // Initialize LightGallery on mount
  useEffect(() => {
    if (lightGalleryRef.current) {
      lightGalleryInstance.current = lightGallery(lightGalleryRef.current, {
        dynamic: true,
        dynamicEl: locateImages.map((image, index) => ({
          src: imageBaseUrl + image?.imageUrl,
          thumb: imageBaseUrl + image?.imageUrl,
          id: `image-${index}`,
        })),
        download: false,
      });
    }

    return () => {
      if (lightGalleryInstance.current) {
        lightGalleryInstance.current.destroy();
      }
    };
  }, [locateImages]);

  return (
    <div className="relative w-full">
      {/* Previous Arrow */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-1.5 rounded-full hover:bg-primary/50 transition"
        onClick={scrollPrev}
      >
        <MdOutlineArrowBackIosNew size={18} />
      </button>

      {/* Main Carousel */}
      <div className="custom-embla">
        <div
          className="custom-embla__viewport overflow-hidden"
          ref={emblaMainRef}
        >
          <div className="custom-embla__container flex">
            {locateImages.map((image: ICompanyImage, index: number) => (
              <div
                className="custom-embla__slide flex-shrink-0 w-full px-2"
                key={index}
                onClick={() => {
                  // Open LightGallery when an image is clicked
                  if (lightGalleryInstance.current) {
                    lightGalleryInstance.current.openGallery(index);
                  }
                }}
              >
                <Image
                  className="w-full h-80 object-contain cursor-pointer"
                  width={200}
                  height={200}
                  src={imageBaseUrl + image?.imageUrl}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Arrow */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-1.5 rounded-full hover:bg-primary/50 transition"
        onClick={scrollNext}
      >
        <MdArrowForwardIos size={18} />
      </button>

      {/* LightGallery Hidden Div */}
      <div
        ref={lightGalleryRef}
        style={{ display: "none" }}
        id="lightgallery-container"
      ></div>
    </div>
  );
};

export default LocateCarousel;
