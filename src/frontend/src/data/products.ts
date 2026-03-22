export interface ProductData {
  id: bigint;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

export const PRODUCTS: ProductData[] = [
  {
    id: 1n,
    name: "Botanical Postcards",
    description:
      "Nature-inspired postcards printed on heavyweight matte cardstock. Perfect for sending a little piece of the world.",
    price: 149,
    category: "Postcards",
    image: "/assets/generated/product-postcards.dim_400x320.jpg",
    tag: "Bestseller",
  },
  {
    id: 2n,
    name: "Handwritten Letter",
    description:
      "A personal, hand-penned letter crafted with care — a heartfelt message written just for you.",
    price: 299,
    category: "Letters",
    image: "/assets/generated/product-letters.dim_400x320.jpg",
    tag: "Fan Favourite",
  },
  {
    id: 3n,
    name: "Sticker Collection",
    description:
      "Premium stickers with turtles, botanical motifs, and cozy mail scenes. Great for journals and letters.",
    price: 99,
    category: "Stickers",
    image: "/assets/generated/product-stickers.dim_400x320.jpg",
  },
  {
    id: 4n,
    name: "Paper Bookmarks",
    description:
      "Handcrafted thick paper bookmarks with beautiful botanical illustrations. A lovely little companion for your books.",
    price: 149,
    category: "Bookmarks",
    image: "/assets/generated/product-bookmarks.dim_400x320.jpg",
  },
  {
    id: 5n,
    name: "Seasonal Mail Kit",
    description:
      "A curated box with postcards, stickers, a handwritten note, paper bookmarks, and a surprise wax seal.",
    price: 899,
    category: "Mail Kits",
    image: "/assets/generated/featured-mail-kit.dim_600x480.jpg",
    tag: "New",
  },
];
