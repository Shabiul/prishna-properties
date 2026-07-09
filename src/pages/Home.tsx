import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Clock, Star, ArrowRight } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import LocationCard from '../components/LocationCard';
import StatsCounter from '../components/StatsCounter';
import { locations } from '../data/properties';
import { usePropertyStore } from '../stores/propertyStore';
import { useScrollReveal, useSectionReveal, useParallax } from '../hooks/useScrollReveal';
import { SEO } from '../components/SEO';

export default function Home() {
  const { properties: allProperties, fetchProperties } = usePropertyStore();

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])
  // Feature Brigade & Godrej premium properties
  const featuredIds = ['550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440015']; // Brigade (10,11,12) + Godrej (14,15)
  const featuredProperties = featuredIds
    .map(id => allProperties.find(p => p.id === id))
    .filter(Boolean) as typeof allProperties;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Scroll-triggered reveal refs
  const statsRef = useScrollReveal({ direction: 'up', stagger: 0.12 });
  const locationsHeaderRef = useSectionReveal();
  const locationsGridRef = useScrollReveal({ direction: 'up', stagger: 0.1 });
  const featuredHeaderRef = useSectionReveal();
  const featuredGridRef = useScrollReveal({ direction: 'up', stagger: 0.1 });
  const whyHeaderRef = useSectionReveal();
  const whyGridRef = useScrollReveal({ direction: 'up', stagger: 0.15 });
  const ctaRef = useScrollReveal({ direction: 'up', distance: 50, duration: 0.9 });
  const heroParallaxRef = useParallax<HTMLImageElement>(0.2);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <SEO
        title="Prishna Properties - Premium Real Estate in Bangalore"
        description="Find your dream home with Prishna Properties. Premium residential and commercial properties for rent and sale in Bangalore, India. Browse verified listings in Murgeshpalya, CV Raman Nagar, GM Palya, and more."
        keywords="real estate Bangalore, properties for rent Bangalore, houses for sale Bangalore, residential properties Bangalore, commercial real estate, Prishna Properties, Murgeshpalya, CV Raman Nagar, GM Palya, Kaggadasapura"
        type="website"
        location="Bangalore, Karnataka, India"
        geoRegion="IN-KA"
        geoPosition="12.9716;77.5946"
      />
      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            ref={heroParallaxRef}
            src="/properties/godrej-lakeside/hero-bg.jpg"
            alt="Luxury property"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block px-3 sm:px-4 py-1.5 bg-brand-500/25 border border-brand-500/25 text-brand-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-full mb-4 sm:mb-6 backdrop-blur-md">
              Premium Properties in Bangalore
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-4 sm:mb-6 tracking-wide">
              Find Your
              <br />
              <span className="gradient-text">Perfect Home</span>
            </h1>
            <p className="text-sm sm:text-lg text-neutral-300 mb-6 sm:mb-8 max-w-lg leading-relaxed font-light">
              Discover handpicked luxury homes and premium residential properties in Bangalore's most premium neighborhoods.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl shadow-glass p-2 max-w-xl border border-white/10">
              <div className="flex items-center flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 py-2 w-full">
                  <Search className="h-4 sm:h-5 w-4 sm:w-5 text-neutral-400 mr-2 sm:mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location or property type..."
                    className="flex-1 bg-transparent outline-none text-navy-900 placeholder-neutral-400 text-xs sm:text-sm w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 text-xs sm:text-sm flex-shrink-0 active:scale-[0.98] w-full sm:w-auto"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick location pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
              {['Murgeshpalya', 'CV Raman Nagar', 'GM Palya', 'Kaggadasapura'].map(loc => (
                <Link
                  key={loc}
                  to={`/listings?location=${encodeURIComponent(loc)}`}
                  className="px-2.5 sm:px-3.5 py-1 bg-white/10 backdrop-blur-md text-white/90 hover:bg-white/20 hover:text-white text-[10px] sm:text-xs font-semibold rounded-full transition-all border border-white/5"
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─────────────────────────── */}
      <section className="py-6 sm:py-10 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <StatsCounter end={50} suffix="+" label="Properties Listed" />
            <StatsCounter end={200} suffix="+" label="Happy Families" />
            <StatsCounter end={6} label="Prime Locations" />
            <StatsCounter end={5} suffix="+" label="Years Experience" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ──────────────── */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuredHeaderRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-navy-900 mb-1.5 sm:mb-2">
                Featured Properties
              </h2>
              <p className="text-neutral-500 text-sm">Handpicked homes, ready for you to move in</p>
            </div>
            <Link
              to="/listings"
              className="flex items-center space-x-1.5 sm:space-x-2 text-brand-500 hover:text-brand-600 font-semibold transition-colors group text-sm"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div ref={featuredGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPLORE LOCATIONS ─────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={locationsHeaderRef} className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-navy-900 mb-2 sm:mb-3">
              Explore by Location
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
              Browse properties in Bangalore's most desirable neighborhoods
            </p>
          </div>

          <div ref={locationsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {locations.map((loc) => (
              <LocationCard key={loc.name} {...loc} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─────────────────────── */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={whyHeaderRef} className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-navy-900 mb-2 sm:mb-3">
              Why Families Trust Us
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
              We go beyond listings — we help you find a home
            </p>
          </div>

          <div ref={whyGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: Shield, title: 'Verified Properties', desc: 'Every property is personally inspected and verified by our team before listing. No surprises, no hidden issues.' },
              { icon: Clock, title: 'Quick Move-In', desc: 'Most properties are available for immediate occupancy. We handle paperwork so you can move in stress-free.' },
              { icon: Star, title: 'Premium Service', desc: 'Dedicated support throughout your rental journey — from property search to move-in day and beyond.' },
            ].map((item) => (
              <div key={item.title} className="group p-4 sm:p-6 lg:p-8 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-card-hover transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-100 transition-colors">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-500" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-navy-900 mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION (AEO OPTIMIZED) ───────── */}
      <section className="py-10 sm:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-navy-900 mb-2 sm:mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
              Answers to common questions about finding and renting properties with Prishna Properties
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question: "What areas in Bangalore do you cover?",
                answer: "We cover prime locations in Bangalore including Murgeshpalya, CV Raman Nagar, GM Palya, Kaggadasapura, Whitefield, Electronic City, and more. Our focus is on residential properties in well-connected neighborhoods with good access to amenities and employment hubs."
              },
              {
                question: "Are your properties verified?",
                answer: "Yes, every property listed on Prishna Properties is personally inspected and verified by our team before going live. We check for authenticity, documentation, amenities, and overall condition to ensure you get exactly what you see."
              },
              {
                question: "What documents do I need to rent a property?",
                answer: "Typically, you'll need identity proof (Aadhaar, PAN), address proof, income proof (salary slips, IT returns), passport-sized photos, and a security deposit. Specific requirements may vary by property, and our team will guide you through the entire process."
              },
              {
                question: "How long does the rental process take?",
                answer: "The rental process usually takes 2-7 days from the time you select a property. This includes documentation verification, agreement signing, and move-in. Most of our properties are available for immediate occupancy."
              },
              {
                question: "Do you charge any brokerage fees?",
                answer: "Our fee structure is transparent and clearly communicated upfront. For specific details about charges for a particular property, please contact our team. We believe in honest pricing with no hidden costs."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 sm:p-6 lg:p-7 shadow-sm border border-neutral-100">
                <h3 className="text-base sm:text-lg font-semibold text-navy-900 mb-1.5 sm:mb-3">{faq.question}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-navy-900 to-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400 rounded-full blur-3xl" />
        </div>
        <div ref={ctaRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-sm sm:text-lg text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Get in touch with our team today. We'll help you find the perfect property that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 text-sm"
            >
              Browse Properties
            </Link>
            <Link
              to="/about#contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all border border-white/10 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
