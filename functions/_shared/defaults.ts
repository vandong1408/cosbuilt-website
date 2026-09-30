export const DEFAULT_PRODUCTS = [
  {
    id: "lip-tint",
    title: "Son Kem Lì Velvet Lip Tint Siêu Mịn Môi (Mẫu thử gia công)",
    category: "makeup",
    lab: "Premium Eco",
    skinTypes: ["Mọi loại da", "Dành cho da khô", "Dành cho da nhạy cảm"],
    rating: 5,
    ratingValue: 4.8,
    reviewsCount: 220,
    originalPrice: 20000,
    price: 16000,
    discountPercent: 20,
    badge: "LÊN MÀU CHUẨN",
    testedCount: 28,
    hotPercent: 28,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
    description: "Công thức son kem bùn bọc nước độc đáo mang kết cấu xốp mịn như nhung. Màu lên chuẩn sắc chỉ sau một lần quẹt, nhẹ tênh không gây khô môi hay lộ rãnh môi nhờ chứa dầu bơ và Vitamin E giữ ẩm sâu. Độ bám màu lên đến 8 tiếng.",
    ingredients: "Dầu bơ ép lạnh hữu cơ, Vitamin E tự nhiên, Màu khoáng tiêu chuẩn FDA Mỹ, Sáp ong trắng tinh khiết.",
    guidelines: "Thoa một lớp mỏng lên môi, bặm nhẹ và đợi 30 giây để lớp son tự set màu. Cảm nhận độ xốp, mướt mịn và khả năng giữ màu sau khi ăn uống nhẹ."
  },
  {
    id: "cushion",
    title: "Phấn Nước Cushion Che Phủ Hoàn Hảo & Kiềm Dầu SPF50 (Mẫu thử gia công)",
    category: "makeup",
    lab: "Premium Eco",
    skinTypes: ["Mọi loại da", "Dành cho da dầu mụn", "Dành cho da nhạy cảm"],
    rating: 5,
    ratingValue: 4.7,
    reviewsCount: 140,
    originalPrice: 42000,
    price: 35000,
    discountPercent: 16,
    badge: "CHE PHỦ 100%",
    testedCount: 73,
    hotPercent: 73,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    description: "Cushion thế hệ mới tích hợp màng lọc chống nắng vật lý phổ rộng và hạt phấn nano siêu mịn. Mang lại lớp nền mỏng nhẹ tự nhiên nhưng che phủ hoàn hảo các khuyết điểm, mụn thâm, lỗ chân lông to và kiểm soát dầu thừa suốt 12 tiếng.",
    ingredients: "Chiết xuất tràm trà, Niacinamide 2%, Zinc Oxide, Titanium Dioxide, Vitamin B5 phục hồi.",
    guidelines: "Dùng bông mút dặm nhẹ phấn lên da mặt từ trong ra ngoài. Cảm nhận độ che phủ, tính kiềm dầu và độ mỏng nhẹ không bí bách của lớp nền."
  },
  {
    id: "serum-b5",
    title: "Serum B5 & Exosome phục hồi da chuyên sâu (Mẫu thử gia công)",
    category: "facial-care",
    lab: "Advanced Clinical",
    skinTypes: ["Dành cho da nhạy cảm", "Dành cho da khô", "Mọi loại da"],
    rating: 5,
    ratingValue: 4.9,
    reviewsCount: 310,
    originalPrice: 55000,
    price: 45000,
    discountPercent: 18,
    badge: "PHỤC HỒI CẤP TỐC",
    testedCount: 154,
    hotPercent: 85,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    description: "Công thức phục hồi tế bào thế hệ mới kết hợp Panthenol (Vitamin B5) nồng độ cao và hoạt chất Exosome siêu nhỏ chiết xuất từ rau má. Giúp làm dịu mẩn đỏ tức thì, kích thích tăng sinh collagen tự thân và củng cố hàng rào bảo vệ da mạnh mẽ.",
    ingredients: "Panthenol 10%, Exosome chiết xuất rau má, Centella Asiatica Extract, Hyaluronic Acid đa tầng, Ceramide NP.",
    guidelines: "Thoa 3-4 giọt lên da mặt sạch sau bước toner. Vỗ nhẹ để dưỡng chất thẩm thấu sâu. Phù hợp sử dụng sau các liệu trình laser, peel da hoặc treatment nặng."
  }
];

// Ảnh thư viện mặc định (đã xem trước, khớp tiêu đề). Admin quản lý trong "Thư viện ảnh".
export const DEFAULT_IMAGES = [
  {
    title: "Phòng thí nghiệm R&D",
    category: "R&D",
    description: "Đội ngũ nghiên cứu phát triển và tối ưu công thức độc quyền cho từng thương hiệu.",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=900"
  },
  {
    title: "Nghiên cứu & thử nghiệm mẫu",
    category: "R&D",
    description: "Mẫu thử được pha chế, đo lường chính xác trước khi gửi khách hàng duyệt.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900"
  },
  {
    title: "Khu kiểm nghiệm chất lượng",
    category: "nhà máy",
    description: "Kiểm tra độ ổn định lý hóa, vi sinh cho từng lô trước khi xuất xưởng.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=900"
  },
  {
    title: "Phân tích & đánh giá công thức",
    category: "R&D",
    description: "Theo dõi độ ổn định trong nhiều điều kiện môi trường khắc nghiệt.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=900"
  },
  {
    title: "Phát triển kết cấu & hoạt chất",
    category: "R&D",
    description: "Ứng dụng Liposome, Nano, Exosome và chiết xuất thiên nhiên.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=900"
  },
  {
    title: "Hoàn thiện bao bì & đóng gói",
    category: "đóng gói",
    description: "Chiết rót, dán nhãn, đóng gói hoàn thiện theo nhận diện thương hiệu.",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=900"
  }
];
