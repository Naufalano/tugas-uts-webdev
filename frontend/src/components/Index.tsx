import Navigation from "../components/Navbar";
import ProductSlider from "../components/ProductSlider";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-primary mb-6">
              Variasi Kayu Berkualitas
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dengan kayu pilihan terbaik, anda tidak perlu khawatir kayu pesanan anda dimakan usia.
            </p>
          </div>

          {/* Product Slider */}
          <ProductSlider />
        </section>

        {/* Features Section */}
        <section className="bg-card py-16 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌳</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Bahan Baku Berkelanjutan</h3>
                <p className="text-muted-foreground">
                  Kayu yang diambil dari hutan yang dikelola
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Penanganan Andal</h3>
                <p className="text-muted-foreground">
                  Penanganan kayu yang profesional menjamin kualitas kayu sepanjang alur produksi
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">♾️</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Tahan Lama</h3>
                <p className="text-muted-foreground">
                  Kayu yang kuat tidak perlu khawatir termakan usia
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
