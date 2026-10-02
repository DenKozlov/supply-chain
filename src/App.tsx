import FiltersPanel from "@/components/filter-panel";
import CustomCard from "@/components/custom-card";
import useFilters from "@/hooks/use-filters";
import ProductionChart from "@/components/production-chart";
import EmptyState from "@/components/empty-state";
import MetricTotal from "@/components/metric-total";

export default function App() {
  const {
    selectedCountryCode,
    selectedProductCode,
    availableCountries = [],
    availableProducts = [],
    currentCountryData,
    currentProductData,
    setCountry,
    setProduct,
    metrics,
  } = useFilters();

  const { unit, name: productName } = currentProductData || {};
  const headerTitle =
    selectedCountryCode && currentCountryData && selectedProductCode
      ? `Production over time · ${currentCountryData.name} · ${productName} (${unit})`
      : "Production over time";

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">Metals Supply Chain</h1>
          <span className="text-sm text-muted-foreground">
            Production 2010–2026 · mock data
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 p-4 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <CustomCard title="Filters">
            <FiltersPanel
              availableCountries={availableCountries}
              availableProducts={availableProducts}
              setCountry={setCountry}
              setProduct={setProduct}
              selectedCountryCode={selectedCountryCode}
              selectedProductCode={selectedProductCode}
            />
          </CustomCard>
        </aside>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <CustomCard title="Total for period" className="h-23">
              {metrics.totalForPeriod ? (
                <MetricTotal>
                  {metrics.totalForPeriod} {unit}
                </MetricTotal>
              ) : (
                <EmptyState size="md" />
              )}
            </CustomCard>
            <CustomCard title="Share of world" className="h-23">
              {metrics.shareOfWorld ? (
                <MetricTotal>{metrics.shareOfWorld}%</MetricTotal>
              ) : (
                <EmptyState size="md" />
              )}
            </CustomCard>
            <CustomCard title="Avarage per year" className="h-23">
              {metrics.averagePerYear ? (
                <MetricTotal>
                  {metrics.averagePerYear} {unit}
                </MetricTotal>
              ) : (
                <EmptyState size="md" />
              )}
            </CustomCard>
          </div>
          <CustomCard title={headerTitle} className="h-135">
            {currentProductData ? (
              <ProductionChart productData={currentProductData} />
            ) : (
              <EmptyState size="xl" />
            )}
          </CustomCard>
        </div>
      </main>
    </div>
  );
}
