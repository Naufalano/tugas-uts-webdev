import React from "react";
import Navigation from "./Navbar";
import Footer from "./Footer";

function About() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            
            <main className="flex-1">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-primary mb-8">CV Surya Prima Jaya</h1>
                        <div className="space-y-6 text-lg text-foreground/90">
                            <p>
                                Di Surya Prima Jaya, anda dapat memesan veneer kayu dengan kualitas terbaik. Dengan variasi kayu lokal
                                anda dapat memilih kayu yang sesuai untuk pemakaian anda. Kayu kami dipilih dengan ketelitian untuk
                                memastikan kepuasan anda.
                            </p>
                            <p>
                                Tunggu apa lagi? Lihat katalog produk kami, pilih produk kami, kontak narahubung kami!
                            </p>

                            <div className="bg-card border border-border rounded-lg p-8 my-8">
                                <h2 className="text-2xl font-bold text-primary mb-4">Alamat Kami</h2>
                                <p>
                                    Kampung Babakan RT 03/04, Binong, Curug, Tangerang 15810
                                </p>
                                <p>
                                    Dekat Masjid Al-Hidayah
                                </p>
                            </div>
                            <p>
                                Untuk informasi lebih lanjut hubungi +62 896 5434 3198 (Yoga Wibowo)
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default About;