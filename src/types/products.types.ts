export type Product = {
  id: number;
  title: string;
  price: string;
  category: "electronics" | "men's clothing" | "jewelery" | "women's clothing";
  description: string;
  images: string[];
};

export type Products = Product[];

export enum ClothingSizes {
  XXL = "XXL",
  XL = "XL",
  L = "L",
  M = "M",
  S = "S",
  XS = "XS",
  XXS = "XXS",
}
