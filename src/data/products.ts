import g1 from "@/assets/g1.png";
import f1 from "@/assets/f1.png";
import r1 from "@/assets/r1.png";

export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: "men" | "women" | "kids" | "computer" | "sunglasses";
  frameType: "full-rim" | "half-rim" | "rimless";
  shape: "rectangular" | "round" | "oval" | "cat-eye" | "aviator" | "geometric" | "square" | "clubmaster";
  color: string;
  description: string;
  colors: string[];
}

export const products: Product[] = [
  {
    id: "1", 
    name: "Burberry Aviator-Inspired", 
    price: 2500, 
    image: g1,
    rating: 5.0, 
    reviews: 1, 
    category: "men", 
    frameType: "full-rim", 
    shape: "aviator",
    color: "Gold/Black", 
    description: "Luxurious Burberry aviator-inspired frames from the 88144 collection. Featuring a sophisticated gold and black design for a premium look.",
    colors: ["Gold/Black"],
  },
  {
    id: "2", 
    name: "Fastrack Cold Glaze", 
    price: 2000, 
    image: f1,
    rating: 4.9, 
    reviews: 0, 
    category: "men", 
    frameType: "full-rim", 
    shape: "rectangular",
    color: "Navy Blue", 
    description: "Bold Design 2024 Collection from Fastrack. 'Cold Glaze' series featuring a modern rectangular silhouette in navy blue for a sharp, professional appearance.",
    colors: ["Navy Blue"],
  },
  {
    id: "3", 
    name: "Ray-Ban Classic Optical", 
    price: 1700, 
    image: r1,
    rating: 4.8, 
    reviews: 0, 
    category: "men", 
    frameType: "full-rim", 
    shape: "rectangular",
    color: "Matte Blue", 
    description: "Ray-Ban RB6002 Classic Optical. Timeless rectangular silhouette in matte blue with gold accents, combining iconic style with modern optical clarity.",
    colors: ["Matte Blue"],
  },
];
