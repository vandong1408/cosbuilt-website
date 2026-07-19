export interface SubMenuItem {
  name: string;
  id: string;
}

export interface MenuItem {
  name: string;
  id: string;
  subItems?: SubMenuItem[];
}

export interface FormulaIngredient {
  name: string;
  percentage: string;
  role: string;
  origin: string;
}

export interface PackagingDesign {
  bottleType: string;
  volumeMl: string;
  printingMethod: string;
}

export interface PricingEstimation {
  rawMaterialCostPerUnit: string;
  packagingCostPerUnit: string;
  manufacturingCostPerUnit: string;
  totalCostPerUnit: string;
  totalBatchCost: string;
  registrationFee: string;
  deliveryLeadTimeDays: string;
}

export interface AIFormulaResult {
  suggestedName: string;
  conceptDescription: string;
  ingredients: FormulaIngredient[];
  processingSteps: string[];
  packagingDesign: PackagingDesign;
  pricingEstimation: PricingEstimation;
  regulatoryAdvice: string;
  rdRecommendation: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface ManufacturingCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  subCategories: string[];
  features: string[];
}

export interface BlogPost {
  title: string;
  category: "cẩm nang" | "xu hướng";
  summary: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface PricingItem {
  productType: string;
  minOrder: string;
  priceRange: string;
  unit: string;
  timeframe: string;
}

export interface FormulaProduct {
  id: string;
  title: string;
  category: string; // facial-care, body-care, hair-care, makeup, personal-care
  lab: "Cosbuilt LAB" | "Organic Formula" | "Premium Eco" | "Advanced Clinical";
  skinTypes: string[]; // ["Tất cả loại da", "Dành cho da khô", "Dành cho da dầu mụn", "Dành cho da nhạy cảm", "Mọi loại da"]
  rating: number;
  ratingValue: number;
  reviewsCount: number;
  originalPrice: number;
  price: number;
  discountPercent: number;
  badge: string;
  testedCount: number;
  hotPercent: number;
  image: string;
  description: string;
  ingredients: string;
  guidelines: string;
}

