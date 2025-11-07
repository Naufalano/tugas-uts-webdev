import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

function Navbar() {
    const location = useLocation();

    const navLinks = [
        { path: "/", label: "Beranda" },
        { path: "/about", label: "Tentang Kami" },
    ];
    
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
                        Surya Prima Mandiri
                    </Link>
                    
                    <div className="flex gap-8">
                        {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                            "text-sm font-medium transition-colors hover:text-accent",
                            location.pathname === link.path
                                ? "text-primary border-b-2 border-primary"
                                : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;