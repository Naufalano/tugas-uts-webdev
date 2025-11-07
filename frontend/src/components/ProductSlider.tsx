import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import product1 from "../assets/lokal/amara.jpg";
import product2 from "../assets/lokal/ebony.jpg";
import product3 from "../assets/lokal/jatilokal.jpg";

const products = [
  {
    id: 1,
    title: "Kayu Amara",
    description: "Warna kayu yang sejuk di mata dan memiliki kesan elegan dengan aksen warna yang gelap.",
    image: product1,
  },
  {
    id: 2,
    title: "Kayu Ebony",
    description: "Warna kayu yang gelap memiliki kesan seperti kayu basah, cocok untuk menjadi bahan dasar konstruksi outdoor.",
    image: product2,
  },
  {
    id: 3,
    title: "Kayu Jati Lokal",
    description: "Warna yang segar dan terang diambil dari hutan jati tanah air, dengan kekokohan yang tak habis dimakan usia.",
    image: product3,
  },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-video">
          <img
            src={products[currentIndex].image}
            alt={products[currentIndex].title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-foreground">
          <h3 className="text-3xl font-bold mb-3">{products[currentIndex].title}</h3>
          <p className="text-lg text-foreground/90 max-w-2xl">
            {products[currentIndex].description}
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-accent hover:text-accent-foreground border-border backdrop-blur"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-accent hover:text-accent-foreground border-border backdrop-blur"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted hover:bg-muted-foreground/50"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
