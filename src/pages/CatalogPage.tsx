import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useStore } from '../contexts/StoreContext';

export function CatalogPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, catalogLoaded, usingDemoCatalog } = useStore();
  const {
    t,
    localizeCategoryName,
    localizeCategoryDesc,
    localizeSareeType,
    localizeColor,
    localizeProductTitle,
    localizeProductDescription,
  } = useLanguage();

  const priceRanges = [
    { id: 'all', label: t.catalog.allPrices },
    { id: 'under-2000', label: t.catalog.under2000 },
    { id: '2000-4000', label: t.catalog.range2000to4000 },
    { id: 'above-4000', label: t.catalog.above4000 },
  ];

  const initialQuery = searchParams.get('q') || '';
  const initialFilter = searchParams.get('filter') || '';

  const matchedCategory = useMemo(
    () => categories.find((c) => c.slug === slug),
    [categories, slug]
  );

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(matchedCategory?.name || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'price-asc' | 'price-desc'>(
    initialFilter === 'new' ? 'newest' : 'popularity'
  );
  const [onlyNew, setOnlyNew] = useState(initialFilter === 'new');
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(matchedCategory?.name || 'All');
  }, [matchedCategory]);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    const f = searchParams.get('filter') || '';
    setOnlyNew(f === 'new');
    if (f === 'new') setSortBy('newest');
  }, [searchParams]);

  useEffect(() => {
    const title = matchedCategory
      ? `${localizeCategoryName(matchedCategory.name)} | SIRIMAGGA`
      : `${t.catalog.allSareesTitle} | SIRIMAGGA`;
    document.title = title;
  }, [matchedCategory, localizeCategoryName, t.catalog.allSareesTitle]);

  const allTypes = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.sareeType)))],
    [products]
  );

  const allColors = useMemo(
    () => ['All', ...Array.from(new Set(products.flatMap((p) => p.colorOptions)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products
      .filter((p) => {
        if (onlyNew && !p.isNewArrival) return false;
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedType !== 'All' && p.sareeType !== selectedType) return false;
        if (selectedColor !== 'All' && !p.colorOptions.includes(selectedColor)) return false;

        if (priceRange === 'under-2000' && p.sellingPrice >= 2000) return false;
        if (
          priceRange === '2000-4000' &&
          (p.sellingPrice < 2000 || p.sellingPrice > 4000)
        )
          return false;
        if (priceRange === 'above-4000' && p.sellingPrice <= 4000) return false;

        if (q) {
          const locTitle = localizeProductTitle(p.productCode, p.title);
          const locDesc = localizeProductDescription(p.productCode, p.description);
          const locCat = localizeCategoryName(p.category);
          const hay = `${p.title} ${locTitle} ${p.productCode} ${p.category} ${locCat} ${p.sareeType} ${p.colorOptions.join(' ')} ${p.description} ${locDesc}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
        if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
        if (sortBy === 'newest') return Number(b.isNewArrival) - Number(a.isNewArrival);
        return b.popularityScore - a.popularityScore;
      });
  }, [
    products,
    onlyNew,
    selectedCategory,
    selectedType,
    selectedColor,
    priceRange,
    searchTerm,
    sortBy,
    localizeProductTitle,
    localizeProductDescription,
    localizeCategoryName,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedColor('All');
    setPriceRange('all');
    setOnlyNew(false);
    setSearchParams({});
  };

  const displayed = filteredProducts.slice(0, visibleCount);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="border-b border-[#B18A4A]/30 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#651D2D]">
            {t.catalog.collectionKicker}
          </p>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#332821] mt-1">
            {matchedCategory
              ? localizeCategoryName(matchedCategory.name)
              : onlyNew
              ? t.catalog.newArrivalsTitle
              : t.catalog.allSareesTitle}
          </h1>
          <p className="text-sm text-[#6A5A4E] mt-1.5 max-w-2xl">
            {matchedCategory
              ? localizeCategoryDesc(matchedCategory.slug, matchedCategory.description)
              : t.catalog.defaultSub}
            {usingDemoCatalog ? t.catalog.demoSuffix : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-[#FAF6EE] border border-[#B18A4A]/40 rounded-md text-sm font-medium text-[#332821]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t.catalog.filtersBtn}</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort sarees"
            className="px-3.5 py-2 bg-white border border-[#B18A4A]/40 rounded-md text-sm text-[#332821] focus:outline-none focus:border-[#651D2D]"
          >
            <option value="popularity">{t.catalog.sortPopularity}</option>
            <option value="newest">{t.catalog.sortNewest}</option>
            <option value="price-asc">{t.catalog.sortPriceAsc}</option>
            <option value="price-desc">{t.catalog.sortPriceDesc}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filter Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
                {t.catalog.refineTitle}
              </h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-[#651D2D] hover:underline"
              >
                {t.catalog.reset}
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="block text-xs font-medium text-[#332821] mb-1.5">
                {t.catalog.searchLabel}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#6A5A4E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.catalog.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#B18A4A]/35 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-semibold text-[#332821] mb-2">
                {t.catalog.categoryLabel}
              </p>
              <div className="space-y-1.5">
                {['All', ...categories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#651D2D] text-[#F5EFE4] font-medium'
                        : 'text-[#332821] hover:bg-[#EFE7D6]'
                    }`}
                  >
                    {cat === 'All' ? t.catalog.allOption : localizeCategoryName(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-xs font-semibold text-[#332821] mb-2">
                {t.catalog.priceRangeLabel}
              </p>
              <div className="space-y-1.5">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setPriceRange(range.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
                      priceRange === range.id
                        ? 'bg-[#651D2D] text-[#F5EFE4] font-medium'
                        : 'text-[#332821] hover:bg-[#EFE7D6]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Saree Type */}
            <div>
              <label className="block text-xs font-semibold text-[#332821] mb-1.5">
                {t.catalog.sareeTypeLabel}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/35 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
              >
                {allTypes.map((type) => (
                  <option key={type} value={type}>
                    {localizeSareeType(type)}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-semibold text-[#332821] mb-1.5">
                {t.catalog.colourPaletteLabel}
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#B18A4A]/35 rounded-md text-sm focus:outline-none focus:border-[#651D2D]"
              >
                {allColors.map((col) => (
                  <option key={col} value={col}>
                    {localizeColor(col)}
                  </option>
                ))}
              </select>
            </div>

            {/* New Arrival Toggle */}
            <label className="flex items-center gap-2 text-sm text-[#332821] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
                className="accent-[#651D2D] w-4 h-4"
              />
              <span>{t.catalog.newArrivalsOnly}</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4 text-xs text-[#6A5A4E]">
            <span>
              {t.catalog.showingPrefix}{' '}
              <strong className="text-[#332821] tabular-nums">{displayed.length}</strong>{' '}
              {t.catalog.ofLabel}{' '}
              <strong className="text-[#332821] tabular-nums">{filteredProducts.length}</strong>{' '}
              {t.catalog.sareesUnit}
            </span>
            {(selectedCategory !== 'All' ||
              selectedType !== 'All' ||
              selectedColor !== 'All' ||
              priceRange !== 'all' ||
              searchTerm ||
              onlyNew) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[#651D2D] hover:underline"
              >
                <X className="w-3.5 h-3.5" /> {t.catalog.clearFilters}
              </button>
            )}
          </div>

          {!catalogLoaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-80 bg-[#FAF6EE] border border-[#B18A4A]/20 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <div className="bg-[#FAF6EE] border border-[#B18A4A]/30 rounded-lg p-12 text-center space-y-3">
              <p className="font-serif-display text-xl text-[#332821]">
                {t.catalog.emptyTitle}
              </p>
              <p className="text-sm text-[#6A5A4E]">{t.catalog.emptySub}</p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2 bg-[#651D2D] text-[#F5EFE4] text-sm font-medium rounded-md hover:bg-[#4F1522]"
              >
                {t.catalog.showAllBtn}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length > visibleCount && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-6 py-2.5 border border-[#651D2D] text-[#651D2D] text-sm font-medium rounded-md hover:bg-[#651D2D] hover:text-[#F5EFE4] transition-colors"
                  >
                    {t.catalog.loadMoreBtn}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
