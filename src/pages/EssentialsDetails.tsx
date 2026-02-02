import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Shield, Tag, Calendar, Briefcase, Users, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { id: "essentials", name: "Student Essentials", icon: ShoppingBag, color: "from-pink-500 to-rose-500" },
  { id: "safety", name: "Safety & Emergency", icon: Shield, color: "from-red-500 to-orange-500" },
  { id: "discounts", name: "Student Discounts & Deals", icon: Tag, color: "from-green-500 to-emerald-500" },
  { id: "events", name: "Events & Community", icon: Calendar, color: "from-purple-500 to-indigo-500" },
  { id: "career", name: "Career & Skill Support", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
];

const mockItems = [
  // Student Essentials
  { id: 1, name: "Campus Gym", category: "essentials", rating: 4.5, reviews: 234, distance: "0.2 km", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400", comment: "Modern equipment, student rates" },
  { id: 2, name: "Quick Laundry", category: "essentials", rating: 4.3, reviews: 156, distance: "0.5 km", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400", comment: "24/7 self-service laundry" },
  { id: 3, name: "Print & Copy Center", category: "essentials", rating: 4.6, reviews: 89, distance: "0.1 km", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400", comment: "Cheap prints for students" },
  
  // Safety & Emergency
  { id: 4, name: "Campus Security", category: "safety", rating: 4.8, reviews: 45, distance: "0 km", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400", comment: "24/7 emergency response" },
  { id: 5, name: "Health Center", category: "safety", rating: 4.7, reviews: 312, distance: "0.3 km", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400", comment: "Free consultations for students" },
  { id: 6, name: "Women's Safety Cell", category: "safety", rating: 4.9, reviews: 67, distance: "0.2 km", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400", comment: "Safe space and support" },
  
  // Student Discounts
  { id: 7, name: "Tech Store", category: "discounts", rating: 4.4, reviews: 178, distance: "1.5 km", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400", comment: "15% off with student ID" },
  { id: 8, name: "Movie Theater", category: "discounts", rating: 4.5, reviews: 456, distance: "2.0 km", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400", comment: "Student Tuesday specials" },
  { id: 9, name: "Bookstore", category: "discounts", rating: 4.6, reviews: 234, distance: "0.8 km", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400", comment: "20% off textbooks" },
  
  // Events & Community
  { id: 10, name: "Student Union", category: "events", rating: 4.7, reviews: 567, distance: "0.1 km", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400", comment: "Weekly events and meetups" },
  { id: 11, name: "Cultural Center", category: "events", rating: 4.5, reviews: 123, distance: "0.4 km", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400", comment: "Festivals and celebrations" },
  { id: 12, name: "Sports Club", category: "events", rating: 4.6, reviews: 345, distance: "0.6 km", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400", comment: "Join teams and tournaments" },
  
  // Career & Skill Support
  { id: 13, name: "Career Center", category: "career", rating: 4.8, reviews: 289, distance: "0.3 km", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400", comment: "Resume help and job fairs" },
  { id: 14, name: "Skill Workshop", category: "career", rating: 4.5, reviews: 167, distance: "0.5 km", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", comment: "Free coding bootcamps" },
  { id: 15, name: "Mentorship Program", category: "career", rating: 4.9, reviews: 78, distance: "0.2 km", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400", comment: "Connect with alumni" },
];

const ItemCard = ({ item, index }: { item: typeof mockItems[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const category = categories.find(c => c.id === item.category);

  return (
    <div
      ref={cardRef}
      className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-border hover:border-primary/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative h-40 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className={`absolute inset-0 bg-gradient-to-t ${category?.color} opacity-20`} />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm">{item.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {category && <category.icon className="w-4 h-4 text-primary" />}
          <span className="text-xs text-muted-foreground">{category?.name}</span>
        </div>
        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-3 h-3" /><span>{item.distance}</span>
        </div>
        <p className="text-muted-foreground text-xs italic">"{item.comment}"</p>
      </div>
    </div>
  );
};

const EssentialsDetails = () => {
  const [filter, setFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = mockItems.filter((item) => filter === "all" || item.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200" alt="Essentials Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/80 to-rose-600/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-5 h-5" /><span>Back</span>
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Essentials & More</h1>
              <p className="text-white/90 mt-2">Everything you need as a student</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button 
                key={cat.id}
                variant={filter === cat.id ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter(cat.id)}
                className="rounded-full gap-2"
              >
                <cat.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.name}</span>
                <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EssentialsDetails;
