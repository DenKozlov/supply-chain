import { useState, useMemo } from "react";
import data from "@/data/production-statistic.json";

function useFilters() {
  const [selectedCountryCode, setSelectedCountry] = useState<string | null>(
    null,
  );
  const [selectedProductCode, setSelectedProduct] = useState<string | null>(
    null,
  );
  const [master, setMaster] = useState<"country" | "product" | null>(null);

  const availableCountries = useMemo(() => {
    if (master === "product" && selectedProductCode) {
      const productObj = data.products.find(
        (p) => p.productCode === selectedProductCode,
      );
      return productObj?.countries || data.countries;
    }
    return data.countries;
  }, [master, selectedProductCode]);

  const availableProducts = useMemo(() => {
    if (master === "country" && selectedCountryCode) {
      const countryObj = data.countries.find(
        (c) => c.countryCode === selectedCountryCode,
      );
      return countryObj?.products || data.products;
    }
    return data.products;
  }, [master, selectedCountryCode]);

  const currentProductData = useMemo(() => {
    if (!selectedCountryCode || !selectedProductCode) return null;
    const countryObj = data.countries.find(
      (c) => c.countryCode === selectedCountryCode,
    );
    return (
      countryObj?.products.find((p) => p.productCode === selectedProductCode) ||
      null
    );
  }, [selectedCountryCode, selectedProductCode]);

  const currentCountryData = useMemo(() => {
    if (!selectedCountryCode) return null;
    return (
      data.countries.find((c) => c.countryCode === selectedCountryCode) || null
    );
  }, [selectedCountryCode]);

  const handleCountryChange = (countryCode: string | null) => {
    if (!master && countryCode) {
      setMaster("country");
    }

    if (!countryCode) {
      setSelectedCountry(null);
      if (master === "country") {
        setSelectedProduct(null);
        setMaster(null);
      }
      return;
    }

    if (master === "country") {
      setSelectedCountry(countryCode);
      setSelectedProduct(null);
      return;
    }

    setSelectedCountry(countryCode);
  };

  const handleProductChange = (productCode: string | null) => {
    if (!master && productCode) {
      setMaster("product");
    }

    if (!productCode) {
      setSelectedProduct(null);
      if (master === "product") {
        setSelectedCountry(null);
        setMaster(null);
      }
      return;
    }

    if (master === "product") {
      setSelectedProduct(productCode);
      setSelectedCountry(null);
      return;
    }

    setSelectedProduct(productCode);
  };

  const handleReset = () => {
    setSelectedCountry(null);
    setSelectedProduct(null);
    setMaster(null);
  };

  const metrics = useMemo(() => {
    if (!selectedCountryCode || !selectedProductCode || !currentProductData) {
      return {
        totalForPeriod: null,
        shareOfWorld: null,
        averagePerYear: null,
      };
    }

    const productionValues = Object.values(
      currentProductData.production,
    ) as number[];
    const totalForPeriod =
      currentProductData.total ??
      productionValues.reduce((acc, val) => acc + val, 0);

    const yearsCount = productionValues.length;
    const rawAverage = yearsCount > 0 ? totalForPeriod / yearsCount : 0;
    const averagePerYear = Math.round(rawAverage);

    let totalGlobalProduction = 0;
    data.countries.forEach((country) => {
      const prod = country.products.find(
        (p) => p.productCode === selectedProductCode,
      );
      if (prod) {
        const prodValues = Object.values(prod.production) as number[];
        const countryProdTotal =
          prod.total ?? prodValues.reduce((acc, val) => acc + val, 0);
        totalGlobalProduction += countryProdTotal;
      }
    });

    const rawShare =
      totalGlobalProduction > 0
        ? (totalForPeriod / totalGlobalProduction) * 100
        : 0;
    const shareOfWorld = Number(rawShare.toFixed());

    return {
      totalForPeriod,
      shareOfWorld,
      averagePerYear,
    };
  }, [selectedCountryCode, selectedProductCode, currentProductData]);

  return {
    selectedCountryCode,
    selectedProductCode,
    currentCountryData,
    currentProductData,
    availableCountries,
    availableProducts,
    metrics,
    setCountry: handleCountryChange,
    setProduct: handleProductChange,
    resetFilters: handleReset,
  };
}

export default useFilters;
