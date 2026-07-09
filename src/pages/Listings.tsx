import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { usePropertyStore } from '../stores/propertyStore';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SEO } from '../components/SEO';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'area-desc';

export default function Listings() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [propertyType, setPropertyType] = useState<'all' | 'rent' | 'sale'>(
    (searchParams.get('type') as 'rent' | 'sale') || 'all'
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get('location') || 'all'
  );
  const [bedrooms, setBedrooms] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useScrollReveal({ direction: 'up', stagger: 0.08 });

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedLocation(searchParams.get('location') || 'all');
    setPropertyType((searchParams.get('type') as 'rent' | 'sale') || 'all');
  }, [searchParams]);

  const { properties, fetchProperties, loading } = usePropertyStore();
  
  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const allLocations = useMemo(() => {
    const locs = [...new Set(properties.map(p => p.areaName))];
    return locs.sort();
  }, [properties]);

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesSearch = !searchTerm ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = propertyType === 'all' || property.type === propertyType;
      const matchesLocation = selectedLocation === 'all' || 
        (property.areaName && property.areaName.toLowerCase() === selectedLocation.toLowerCase()) ||
        (property.location && property.location.toLowerCase().includes(selectedLocation.toLowerCase()));
      const matchesBedrooms = bedrooms === 'all' || property.bedrooms >= Number(bedrooms);
      return matchesSearch && matchesType && matchesLocation && matchesBedrooms;
    });

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'area-desc': result.sort((a, b) => b.area - a.area); break;
    }
    return result;
  }, [searchTerm, propertyType, selectedLocation, bedrooms, sortBy]);

  const activeFilterCount = [
    propertyType !== 'all',
    selectedLocation !== 'all',
    bedrooms !== 'all'
  ].filter(Boolean).length;

  const clearFilters = () => {
    setPropertyType('all');
    setSelectedLocation('all');
    setBedrooms('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <SEO
        title="Properties for Rent & Sale - Prishna Properties Bangalore"
        description="Browse all verified properties in Bangalore. Filter by location, price, bedrooms, and type. Find your perfect home with Prishna Properties."
        keywords="properties for rent Bangalore, houses for sale Bangalore, Bangalore real estate listings, residential properties, commercial properties, apartments Bangalore"
        type="website"
        location="Bangalore, Karnataka, India"
        geoRegion="IN-KA"
        geoPosition="12.9716;77.5946"
      />
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-neutral-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Search + filter toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by title, location or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 bg-neutral-50/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm transition-all placeholder-neutral-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                showFilters || activeFilterCount > 0
                  ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/25'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className={`w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold ${
                  showFilters || activeFilterCount > 0 ? 'bg-white text-brand-600' : 'bg-brand-500 text-white'
                }`}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Type pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-1">
            {(['all', 'rent', 'sale'] as const).map(type => (
              <button
                key={type}
                onClick={() => setPropertyType(type)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex-shrink-0 ${
                  propertyType === type
                    ? 'bg-navy-950 text-brand-400 border border-brand-500/20 shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-transparent'
                }`}
              >
                {type === 'all' ? 'All' : type === 'rent' ? 'For Rent' : 'For Sale'}
              </button>
            ))}

            {/* Sort dropdown */}
            <div className="ml-auto relative flex-shrink-0">
              <div className="flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-transparent text-sm text-neutral-600 pr-6 cursor-pointer outline-none"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="area-desc">Area: Largest First</option>
                </select>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400 -ml-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-100 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Location</label>
                  <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500">
                    <option value="all">All Locations</option>
                    {allLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Bedrooms</label>
                  <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500">
                    <option value="all">Any</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={clearFilters} className="text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors">
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
              {selectedLocation !== 'all' && (
                <span className="flex items-center gap-1 px-3 py-1 bg-brand-50 text-brand-600 text-xs font-medium rounded-full">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('all')}><X className="h-3 w-3" /></button>
                </span>
              )}
              {bedrooms !== 'all' && (
                <span className="flex items-center gap-1 px-3 py-1 bg-brand-50 text-brand-600 text-xs font-medium rounded-full">
                  {bedrooms}+ Beds
                  <button onClick={() => setBedrooms('all')}><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading ? (
          <div className="text-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500 mx-auto mb-4"></div>
            <p className="text-sm text-neutral-500">Loading properties...</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-neutral-500 mb-4 sm:mb-6">
              Showing <span className="font-semibold text-navy-900">{filteredProperties.length}</span> properties
              {selectedLocation !== 'all' ? ` in ${selectedLocation}` : ' in Bangalore'}
            </p>

            {filteredProperties.length > 0 ? (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🏠</div>
                <h3 className="text-base sm:text-lg font-semibold text-navy-800 mb-1.5 sm:mb-2">No properties found</h3>
                <p className="text-neutral-500 text-sm mb-4 sm:mb-6">Try adjusting your filters</p>
                <button onClick={clearFilters}
                  className="text-brand-500 hover:text-brand-600 font-medium text-sm transition-colors">
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
