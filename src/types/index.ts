export interface ProductItem {
  productCode: string;
  unit: string;
  name: string;
  production?: { [key: string]: number };
}

export interface Country {
  countryCode: string;
  name: string;
  products: ProductItem[];
}

export type CountryBase = Pick<Country, "countryCode" | "name">;

export interface Product {
  productCode: string;
  name: string;
  unit: string;
  countries: CountryBase[];
}
