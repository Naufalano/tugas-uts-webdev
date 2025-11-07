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
                <h3 className="text-xl font-bold text-primary mb-2">Sustainable Materials</h3>
                <p className="text-muted-foreground">
                  Only responsibly sourced hardwoods from sustainable forests
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Master Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Each piece handcrafted by experienced artisans with decades of expertise
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">♾️</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Built to Last</h3>
                <p className="text-muted-foreground">
                  Quality construction ensures your furniture lasts for generations
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
