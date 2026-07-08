import ContactForm from '../components/ContactForm';
import StatsCounter from '../components/StatsCounter';
import { Shield, Users, MapPin, Clock, Star, Award, ExternalLink } from 'lucide-react';
import { useScrollReveal, useSectionReveal } from '../hooks/useScrollReveal';
import { SEO } from '../components/SEO';

export default function About() {
  const address = '31, GM Palya Main Rd, KG Colony, GM Palya, C V Raman Nagar, Bengaluru, Karnataka 560075';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  // Scroll reveal refs
  const statsRef = useScrollReveal({ direction: 'up', stagger: 0.12 });
  const storyRef = useScrollReveal({ direction: 'up', stagger: 0.15 });
  const diffHeaderRef = useSectionReveal();
  const diffGridRef = useScrollReveal({ direction: 'up', stagger: 0.1 });
  const officeHeaderRef = useSectionReveal();
  const officeRef = useScrollReveal({ direction: 'up', stagger: 0.15 });
  const contactRef = useScrollReveal({ direction: 'up', stagger: 0.12 });

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us - Prishna Properties Bangalore"
        description="Learn about Prishna Properties, your trusted partner for premium homes in Bangalore. We offer verified properties, exceptional service, and a seamless rental and sale experience."
        keywords="Prishna Properties, about real estate Bangalore, property management Bangalore, trusted realtor Bangalore, GM Palya, Bengaluru"
        type="website"
        location="Bengaluru, Karnataka, India"
        geoRegion="IN-KA"
        geoPosition="12.9716;77.5946"
      />
      {/* Hero */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-300 text-sm font-medium rounded-full mb-6">
            About Trishna
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
            Your Trusted Partner for<br className="hidden sm:block" />
            <span className="gradient-text">Premium Homes</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            We specialize in connecting families with quality-verified rental and sale properties across Bangalore's finest neighborhoods.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 sm:py-10 bg-white border-b border-neutral-100 -mt-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <StatsCounter end={50} suffix="+" label="Properties Listed" />
            <StatsCounter end={200} suffix="+" label="Happy Families" />
            <StatsCounter end={6} label="Prime Locations" />
            <StatsCounter end={5} suffix="+" label="Years Experience" />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-5 sm:mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Trishna Properties was founded with a simple mission — to make finding a quality home in Bangalore hassle-free and transparent. Whether you want to <strong>Buy, Rent, or Sell</strong>, we're here to help.
                </p>
                <p>
                  We understand that finding the right home is more than just a transaction. It's about finding a space where memories are made, where families grow, and where every day feels comfortable and secure.
                </p>
                <p>
                  Our team personally inspects every property before listing, ensuring you see only the best options. We handle everything from property visits to paperwork, making your experience seamless.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="/properties/brigade-insignia/our-story.jpg"
                alt="Premium Property"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={diffHeaderRef} className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-3">What Makes Us Different</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm sm:text-base">
              We go above and beyond to ensure every family finds the perfect home
            </p>
          </div>

          <div ref={diffGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: 'Verified Listings', desc: 'Every property is personally visited and verified. We check legality, condition, and amenities.' },
              { icon: Users, title: 'Dedicated Support', desc: 'A dedicated property manager assists you from search to move-in and throughout your stay.' },
              { icon: MapPin, title: 'Prime Locations', desc: 'Properties across Murgeshpalya, CV Raman Nagar, GM Palya, Bommasandra, Yelahanka, and more.' },
              { icon: Clock, title: 'Quick Process', desc: 'Most tenants move in within a week. We handle documentation and coordination with owners.' },
              { icon: Star, title: 'Quality Interiors', desc: 'We list only well-maintained properties with modern fittings and clean interiors.' },
              { icon: Award, title: 'Fair Pricing', desc: 'Transparent pricing with no hidden charges. Rent and deposit clearly stated upfront.' },
            ].map(item => (
              <div key={item.title} className="p-5 sm:p-6 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-card-hover transition-all duration-300 group text-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-100 group-hover:scale-110 transition-all duration-300 mx-auto">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-500" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Map Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={officeHeaderRef} className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-3">Visit Our Office</h2>
            <p className="text-neutral-500 text-sm sm:text-base">Come meet us in person — we'd love to help you find your dream home</p>
          </div>

          <div ref={officeRef} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Map */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-card border border-neutral-100 bg-white">
              <iframe
                src={mapsEmbed}
                title="Trishna Property Management Office"
                className="w-full h-64 sm:h-80 lg:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>

            {/* Office Info */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo.jpeg" alt="Trishna" className="h-12 w-12 rounded-xl object-contain bg-white shadow-sm border border-neutral-100" />
                <div>
                  <h3 className="font-display font-bold text-navy-900 tracking-wide">Trishna Properties</h3>
                  <p className="text-[10px] font-semibold text-brand-500 uppercase tracking-widest">Buy · Rent · Sell</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-navy-900 uppercase tracking-wide mb-1">Address</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">{address}</p>
                  </div>
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contactRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 mb-4">Get in Touch</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Whether you're looking for a rental home, want to buy a property, or list your property with us, we'd love to hear from you.
              </p>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-navy-900">Office</h4>
                    <p className="text-sm text-neutral-500 mt-1">{address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-navy-900">Areas We Serve</h4>
                    <p className="text-sm text-neutral-500 mt-1">Murgeshpalya, CV Raman Nagar, GM Palya, Bommasandra, Yelahanka, Devinagar, Kaggadasapura & more</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm contactEmail="trishnaproperties78@gmail.com" />
          </div>
        </div>
      </section>
    </div>
  );
}
