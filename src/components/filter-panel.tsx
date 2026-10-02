import type { CountryBase, ProductItem } from "@/types";
import { Button } from "@/components/ui/button";
import FilterSelect from "@/components/filter-select";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

interface Props {
  availableCountries: CountryBase[];
  availableProducts: ProductItem[];
  setCountry: (v: string | null) => void;
  setProduct: (v: string | null) => void;
  selectedCountryCode: string | null;
  selectedProductCode: string | null;
}

function FiltersPanel({
  availableCountries,
  availableProducts,
  setCountry,
  setProduct,
  selectedCountryCode,
  selectedProductCode,
}: Props) {
  const countryItems = useMemo(
    () => [
      ...availableCountries.map((c) => ({
        value: c.countryCode,
        label: c.name,
      })),
    ],
    [availableCountries],
  );
  const productItems = useMemo(
    () => [
      ...availableProducts.map((p) => ({
        value: p.productCode,
        label: p.name,
      })),
    ],
    [availableProducts],
  );

  return (
    <div className="grid gap-4">
      <FilterSelect
        id="country"
        label="Country"
        value={selectedCountryCode}
        items={countryItems}
        onChange={setCountry}
      />
      <FilterSelect
        id="product"
        label="Metal"
        value={selectedProductCode}
        items={productItems}
        onChange={setProduct}
      />
      <Button
        variant="outline"
        onClick={() => {
          setCountry(null);
          setProduct(null);
        }}
        className="cursor-pointer"
        size="lg"
      >
        Reset filters
      </Button>
      <Separator />
      <p className="text-sm text-gray-500 text-center">
        Select a country and product to view the data
      </p>
    </div>
  );
}

export default FiltersPanel;
