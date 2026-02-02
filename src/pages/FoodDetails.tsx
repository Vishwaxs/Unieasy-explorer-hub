import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MessageSquare, Leaf, Drumstick, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock food data - will be replaced with DB data
const mockFoodItems = [
  { id: 1, name: "Margherita Pizza", restaurant: "Pizza Palace", price: 249, rating: 4.5, reviews: 128, isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400", comment: "Best cheese pizza in town!" },
  { id: 2, name: "Butter Chicken", restaurant: "Spice Garden", price: 320, rating: 4.8, reviews: 256, isVeg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", comment: "Creamy and flavorful" },
  { id: 3, name: "Paneer Tikka", restaurant: "Tandoor Express", price: 180, rating: 4.3, reviews: 89, isVeg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400", comment: "Perfectly grilled!" },
  { id: 4, name: "Chicken Biryani", restaurant: "Biryani House", price: 280, rating: 4.7, reviews: 312, isVeg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", comment: "Authentic Hyderabadi taste" },
  { id: 5, name: "Masala Dosa", restaurant: "South Cafe", price: 120, rating: 4.4, reviews: 156, isVeg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400", comment: "Crispy and delicious" },
  { id: 6, name: "Fish Curry", restaurant: "Coastal Kitchen", price: 350, rating: 4.6, reviews: 98, isVeg: false, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400", comment: "Fresh catch daily" },
  { id: 7, name: "Veg Thali", restaurant: "Annapurna", price: 150, rating: 4.2, reviews: 203, isVeg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", comment: "Complete meal experience" },
  { id: 8, name: "Egg Fried Rice", restaurant: "Wok Station", price: 160, rating: 4.1, reviews: 145, isVeg: false, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400", comment: "Quick and tasty" },
  { id: 9, name: "Chole Bhature", restaurant: "Punjab Dhaba", price: 130, rating: 4.5, reviews: 178, isVeg: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400", comment: "Authentic Punjabi flavors" },
  { id: 10, name: "Mutton Rogan Josh", restaurant: "Kashmir Flavors", price: 420, rating: 4.9, reviews: 87, isVeg: false, image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=400", comment: "Rich and aromatic" },
];

type FilterType = "all" | "veg" | "nonveg";
type SortType = "default" | "price-low" | "price-high" | "rating";

const FoodCard = ({ item, index }: { item: typeof mockFoodItems[0]; index: number }) => {
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge 
          className={`absolute top-3 left-3 ${item.isVeg ? "bg-green-500" : "bg-red-500"} text-white border-0`}
        >
          {item.isVeg ? <Leaf className="w-3 h-3 mr-1" /> : <Drumstick className="w-3 h-3 mr-1" />}
          {item.isVeg ? "Veg" : "Non-Veg"}
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
        <p className="text-muted-foreground text-sm mb-3">{item.restaurant}</p>
        
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
          <MessageSquare className="w-3 h-3" />
          <span className="italic">"{item.comment}"</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{item.price}</span>
          <span className="text-xs text-muted-foreground">{item.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

const FoodDetails = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = mockFoodItems
    .filter((item) => {
      if (filter === "veg") return item.isVeg;
      if (filter === "nonveg") return !item.isVeg;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8">
        {/* Hero Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
            alt="Food Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-red-600/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Food & Eating</h1>
              <p className="text-white/90 mt-2">Discover the best food spots around campus</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">{filteredItems.length} items found</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                <div className="flex gap-1">
                  {(["all", "veg", "nonveg"] as FilterType[]).map((f) => (
                    <Button
                      key={f}
                      variant={filter === f ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(f)}
                      className="capitalize"
                    >
                      {f === "nonveg" ? "Non-Veg" : f === "all" ? "All" : "Veg"}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort:</span>
                <div className="flex gap-1">
                  <Button
                    variant={sort === "price-low" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSort("price-low")}
                  >
                    Price: Low to High
                  </Button>
                  <Button
                    variant={sort === "price-high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSort("price-high")}
                  >
                    Price: High to Low
                  </Button>
                  <Button
                    variant={sort === "rating" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSort("rating")}
                  >
                    Top Rated
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden bg-card rounded-xl p-4 mb-6 border border-border animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Type</span>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "veg", "nonveg"] as FilterType[]).map((f) => (
                      <Button
                        key={f}
                        variant={filter === f ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(f)}
                        className="capitalize"
                      >
                        {f === "nonveg" ? "Non-Veg" : f === "all" ? "All" : "Veg"}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Sort by</span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sort === "price-low" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSort("price-low")}
                    >
                      Price ↑
                    </Button>
                    <Button
                      variant={sort === "price-high" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSort("price-high")}
                    >
                      Price ↓
                    </Button>
                    <Button
                      variant={sort === "rating" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSort("rating")}
                    >
                      Rating
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <FoodCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FoodDetails;
