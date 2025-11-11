import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import api from "../lib/api";

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  gambar_url: string;
}

const POLL_INTERVAL_MS = 5000;

const ProductSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    intervalRef.current = window.setInterval(fetchProducts, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= products.length) {
      setCurrentIndex(0);
    }
  }, [products, currentIndex]);

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

  const current = products[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-lg min-h-[240px] bg-muted">
        {loading ? (
          <div className="flex items-center justify-center p-8">Loading...</div>
        ) : !current ? (
          <div className="flex items-center justify-center p-8">Tidak ada produk.</div>
        ) : (
          <>
            <div className="relative aspect-video">
              <img
                src={current.gambar_url}
                alt={current.nama}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-foreground">
              <div className="inline-block bg-secondary/70 px-4 py-2 rounded-md"></div>
              <h3 className="text-3xl font-bold mb-3">{current.nama}</h3>
              <p className="text-lg text-foreground/90 max-w-2xl">
                {current.deskripsi}
              </p>
            </div>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-accent hover:text-accent-foreground border-border backdrop-blur"
        onClick={goToPrevious}
        disabled={products.length === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-accent hover:text-accent-foreground border-border backdrop-blur"
        onClick={goToNext}
        disabled={products.length === 0}
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