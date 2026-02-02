import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Wifi, Car, Shield, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mockAccommodations = [
  { id: 1, name: "Sunrise Hostel", type: "Hostel", price: 8000, rating: 4.5, reviews: 89, distance: "0.5 km", amenities: ["wifi", "parking", "security"], image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400", comment: "Great community vibes!" },
  { id: 2, name: "Green Valley PG", type: "PG", price: 12000, rating: 4.7, reviews: 156, distance: "1.2 km", amenities: ["wifi", "meals", "laundry"], image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400", comment: "Home-cooked meals included" },
  { id: 3, name: "Student Villa", type: "Apartment", price: 15000, rating: 4.3, reviews: 67, distance: "0.8 km", amenities: ["wifi", "gym", "parking"], image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", comment: "Modern amenities" },
  { id: 4, name: "Campus Lodge", type: "Hostel", price: 6500, rating: 4.2, reviews: 203, distance: "0.3 km", amenities: ["wifi", "security"], image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400", comment: "Walking distance to campus" },
  { id: 5, name: "Royal Residency", type: "PG", price: 18000, rating: 4.8, reviews: 45, distance: "2.0 km", amenities: ["wifi", "ac", "meals", "laundry"], image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400", comment: "Premium facilities" },
  { id: 6, name: "Budget Bunks", type: "Hostel", price: 5000, rating: 4.0, reviews: 312, distance: "1.5 km", amenities: ["wifi"], image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400", comment: "Affordable and clean" },
];

type TypeFilter = "all" | "Hostel" | "PG" | "Apartment";
type SortType = "default" | "price-low" | "price-high" | "rating" | "distance";

const AccommodationCard = ({ item, index }: { item: typeof mockAccommodations[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi className="w-4 h-4" />;
      case "parking": return <Car className="w-4 h-4" />;
      case "security": return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-border hover:border-primary/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {item.type}
        </Badge>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-medium">{item.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3 h-3" />
          <span>{item.distance} from campus</span>
        </div>
        
        <div className="flex gap-2 mb-3">
          {item.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="p-1.5 bg-secondary rounded-lg" title={amenity}>
              {getAmenityIcon(amenity)}
            </div>
          ))}
        </div>
        
        <p className="text-muted-foreground text-xs italic mb-3">"{item.comment}"</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">₹{item.price.toLocaleString()}</span>
            <span className="text-muted-foreground text-xs">/month</span>
          </div>
          <span className="text-xs text-muted-foreground">{item.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

const AccommodationDetails = () => {
  const [filter, setFilter] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<SortType>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = mockAccommodations
    .filter((item) => filter === "all" || item.type === filter)
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200"
            alt="Accommodation Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-purple-600/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Accommodation</h1>
              <p className="text-white/90 mt-2">Find your perfect home away from home</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="text-muted-foreground text-sm">{filteredItems.length} options found</span>
            
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                {(["all", "Hostel", "PG", "Apartment"] as TypeFilter[]).map((f) => (
                  <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
                    {f === "all" ? "All" : f}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort:</span>
                <Button variant={sort === "price-low" ? "default" : "outline"} size="sm" onClick={() => setSort("price-low")}>Price ↑</Button>
                <Button variant={sort === "rating" ? "default" : "outline"} size="sm" onClick={() => setSort("rating")}>Rating</Button>
                <Button variant={sort === "distance" ? "default" : "outline"} size="sm" onClick={() => setSort("distance")}>Nearest</Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="md:hidden bg-card rounded-xl p-4 mb-6 border border-border animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}><X className="w-4 h-4" /></Button>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Type</span>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "Hostel", "PG", "Apartment"] as TypeFilter[]).map((f) => (
                      <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>{f === "all" ? "All" : f}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Sort</span>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={sort === "price-low" ? "default" : "outline"} size="sm" onClick={() => setSort("price-low")}>Price ↑</Button>
                    <Button variant={sort === "rating" ? "default" : "outline"} size="sm" onClick={() => setSort("rating")}>Rating</Button>
                    <Button variant={sort === "distance" ? "default" : "outline"} size="sm" onClick={() => setSort("distance")}>Nearest</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <AccommodationCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccommodationDetails;
