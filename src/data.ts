import { 
  MenuItem, 
  ServiceDetail, 
  ManufacturingCategory, 
  PricingItem, 
  BlogPost,
  FormulaProduct
} from "./types";

export const MENU_ITEMS: MenuItem[] = [
  { name: "TRANG CHỦ", id: "home" },
  { 
    name: "GIỚI THIỆU", 
    id: "about",
    subItems: [
      { name: "Về cosbuilt", id: "about-us" },
      { name: "Nhà máy & năng lực sản xuất", id: "factory-capacity" },
      { name: "Chứng nhận tiêu chuẩn", id: "certifications" },
      { name: "Đội ngũ R&D", id: "rd-team" },
      { name: "Đối tác & khách hàng", id: "partners" }
    ]
  },
  { 
    name: "DỊCH VỤ", 
    id: "services",
    subItems: [
      { name: "Gia công OEM/ODM", id: "oem-odm" },
      { name: "Phát triển công thức (R&D)", id: "formula-development" },
      { name: "Bao bì & in ấn", id: "packaging-print" },
      { name: "Pháp lý & công bố mỹ phẩm", id: "legal-service" },
      { name: "Vận chuyển - thông quan", id: "logistics" },
      { name: "Quy trình hợp tác", id: "cooperation-process" },
      { name: "Lợi ích hợp tác", id: "cooperation-benefits" }
    ]
  },
  { 
    name: "DANH MỤC GIA CÔNG", 
    id: "categories",
    subItems: [
      { name: "Chăm sóc da mặt", id: "facial-care" },
      { name: "Chăm sóc body", id: "body-care" },
      { name: "Chăm sóc tóc", id: "hair-care" },
      { name: "Trang điểm", id: "makeup" },
      { name: "Chăm sóc cá nhân", id: "personal-care" },
      { name: "Công nghệ mới", id: "new-tech" }
    ]
  },
  { name: "BẢNG GIÁ GIA CÔNG", id: "pricing" },
  { 
    name: "TIN TỨC", 
    id: "news",
    subItems: [
      { name: "Cẩm nang gia công", id: "manufacturing-guide" },
      { name: "Xu hướng nguyên liệu", id: "ingredient-trends" }
    ]
  },
  { name: "LIÊN HỆ", id: "contact" }
];

export const ABOUT_SECTIONS = {
  intro: {
    title: "VỀ COSBUILT",
    subtitle: "Thương hiệu gia công mỹ phẩm đạt chuẩn quốc tế",
    content: "Cosbuilt tự hào là một trong những đơn vị gia công mỹ phẩm OEM/ODM hàng đầu khu vực. Chúng tôi mang sứ mệnh đồng hành cùng các chủ thương hiệu xây dựng dòng sản phẩm mỹ phẩm độc quyền, chất lượng cao, an toàn tuyệt đối và đón đầu xu hướng làm đẹp thế giới. Với hệ thống nhà xưởng hiện đại, nguồn nguyên liệu nhập khẩu cao cấp và đội ngũ chuyên gia nghiên cứu hóa mỹ phẩm hàng đầu, Cosbuilt tự tin hiện thực hóa mọi ý tưởng làm đẹp của bạn.",
    stats: [
      { label: "Năm kinh nghiệm", value: "12+" },
      { label: "Công thức độc quyền", value: "3,500+" },
      { label: "Nhà máy đạt chuẩn CGMP", value: "2" },
      { label: "Đối tác thương hiệu", value: "250+" }
    ]
  },
  factory: {
    title: "NHÀ MÁY & NĂNG LỰC SẢN XUẤT",
    subtitle: "Dây chuyền tự động hóa khép kín chuẩn CGMP ASEAN",
    description: "Nhà máy Cosbuilt có diện tích hơn 10,000m² được đầu tư đồng bộ với hệ thống phòng sạch chuẩn Class 100,000. Toàn bộ dây chuyền sản xuất từ khâu nạp nguyên liệu, đồng hóa, nhũ hóa đến chiết rót, đóng gói đều sử dụng công nghệ tiên tiến nhập khẩu từ Đức, Mỹ và Hàn Quốc, công suất đạt 50 triệu sản phẩm/năm.",
    strengths: [
      "Hệ thống phòng thí nghiệm R&D vô trùng chuẩn GLP.",
      "Máy nhũ hóa hút chân không đồng hóa hạt siêu mịn thế hệ mới.",
      "Dây chuyền chiết rót tự động đa năng (phù hợp mọi dạng chai lọ, hũ, tuýp).",
      "Hệ thống lọc nước tinh khiết chuẩn EDI dùng trong dược mỹ phẩm."
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
  },
  certifications: {
    title: "CHỨNG NHẬN TIÊU CHUẨN",
    subtitle: "Cam kết chất lượng tuyệt đối",
    list: [
      {
        name: "CGMP ASEAN",
        issuer: "Cục Quản Lý Dược - Bộ Y Tế",
        description: "Thực hành tốt sản xuất mỹ phẩm theo tiêu chuẩn của Hiệp hội các quốc gia Đông Nam Á.",
        icon: "ShieldCheck"
      },
      {
        name: "ISO 9001:2015",
        issuer: "SGS Thụy Sĩ",
        description: "Hệ thống quản lý chất lượng tiêu chuẩn quốc tế áp dụng cho nghiên cứu & sản xuất mỹ phẩm.",
        icon: "CheckCircle"
      },
      {
        name: "ISO 22716",
        issuer: "Intertek",
        description: "Tiêu chuẩn quốc tế hướng dẫn thực hành tốt sản xuất mỹ phẩm dành riêng cho thị trường châu Âu.",
        icon: "Award"
      },
      {
        name: "FDA Registered",
        issuer: "Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ",
        description: "Chứng nhận đăng ký cơ sở sản xuất đủ điều kiện xuất khẩu sang thị trường Mỹ.",
        icon: "FileCheck"
      }
    ]
  },
  rdTeam: {
    title: "ĐỘI NGŨ CHUYÊN GIA R&D",
    subtitle: "Nơi khởi nguồn những công thức triệu đô",
    description: "Phòng R&D của Cosbuilt tập hợp những tiến sĩ, thạc sĩ, kỹ sư hóa sinh tốt nghiệp tại Pháp, Hàn Quốc và Nhật Bản. Chúng tôi không ngừng cập nhật các nghiên cứu khoa học mới nhất và đi đầu trong việc ứng dụng công nghệ sinh học đột phá vào mỹ phẩm.",
    focusAreas: [
      "Công nghệ bọc hoạt chất liposome tăng khả năng thẩm thấu.",
      "Công thức mỹ phẩm thuần chay (Vegan), dược mỹ phẩm (Cosmeceuticals).",
      "Tối ưu hóa độ ổn định của các hoạt chất khó tính như Vitamin C, Retinol."
    ],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800"
  },
  partners: {
    title: "ĐỐI TÁC & KHÁCH HÀNG",
    subtitle: "Hợp tác phát triển bền vững",
    logos: [
      { name: "Luxury Spa Group", type: "Thương hiệu Spa" },
      { name: "PureBio Clinic", type: "Dược mỹ phẩm phòng khám" },
      { name: "Naturals Co.", type: "Mỹ phẩm thiên nhiên" },
      { name: "V-Beauty", type: "Chuỗi phân phối mỹ phẩm" },
      { name: "DermaLab", type: "Thương hiệu trị liệu da liễu" },
      { name: "Glow & Co.", type: "Mỹ phẩm trang điểm trẻ tuổi" }
    ]
  }
};

export const SERVICES: ServiceDetail[] = [
  {
    title: "Gia công OEM/ODM trọn gói",
    description: "Giải pháp từ A-Z dành cho các cá nhân và doanh nghiệp muốn sở hữu thương hiệu mỹ phẩm riêng mà không cần đầu tư nhà xưởng.",
    icon: "Boxes",
    details: [
      "Hỗ trợ định vị thương hiệu và xây dựng ý tưởng sản phẩm.",
      "Tùy chỉnh công thức theo yêu cầu riêng biệt hoặc chọn từ thư viện 3500+ công thức sẵn có.",
      "Sản xuất hàng loạt bằng dây chuyền tự động CGMP.",
      "Kiểm soát chất lượng nghiêm ngặt (QC) từng lô hàng."
    ]
  },
  {
    title: "Nghiên cứu & Phát triển công thức độc quyền",
    description: "Đội ngũ chuyên gia hóa sinh sáng tạo công thức mới, cải tiến công thức cũ đảm bảo tính độc quyền, an toàn và hiệu quả vượt trội.",
    icon: "FlaskConical",
    details: [
      "Kiểm nghiệm tính ổn định vật lý và hóa học của mẫu thử dưới môi trường khắc nghiệt.",
      "Thử nghiệm lâm sàng độ kích ứng da trên nhóm tình nguyện viên.",
      "Cập nhật các hoạt chất xu hướng thế giới (Peptides, Exosome, Bakuchiol)."
    ]
  },
  {
    title: "Cung cấp, thiết kế bao bì & in ấn",
    description: "Thiết kế bao bì độc đáo, sang trọng giúp sản phẩm nổi bật trên quầy kệ và thu hút người tiêu dùng.",
    icon: "Palette",
    details: [
      "Hỗ trợ tìm kiếm, nhập khẩu mẫu chai lọ, hũ đựng theo phong cách tối giản, vintage hoặc cao cấp.",
      "Thiết kế đồ họa nhãn mác, vỏ hộp miễn phí theo đúng nhận diện thương hiệu.",
      "Công nghệ in trực tiếp trên chai lọ: In lụa độ nét cao, dập kim nhũ vàng/bạc, phủ UV định hình."
    ]
  },
  {
    title: "Tư vấn pháp lý & công bố mỹ phẩm",
    description: "Thay mặt doanh nghiệp xử lý mọi thủ tục hành chính phức tạp giúp sản phẩm hợp pháp lưu hành nhanh chóng.",
    icon: "FileText",
    details: [
      "Kiểm nghiệm các chỉ tiêu vi sinh, kim loại nặng tại trung tâm kiểm định độc lập được cấp phép.",
      "Soạn thảo hồ sơ công bố mỹ phẩm chuẩn xác gửi Bộ Y Tế.",
      "Hỗ trợ đăng ký mã vạch, tem chống hàng giả, bảo hộ sở hữu trí tuệ thương hiệu."
    ]
  },
  {
    title: "Vận chuyển & thông quan quốc tế",
    description: "Kết nối dịch vụ logistics uy tín, đảm bảo vận chuyển an toàn, nhanh chóng cho cả đơn hàng nội địa và xuất khẩu.",
    icon: "Truck",
    details: [
      "Hỗ trợ hồ sơ chứng nhận lưu hành tự do (CFS) phục vụ xuất khẩu.",
      "Vận chuyển nguyên liệu thô nhập khẩu chính ngạch từ các đối tác toàn cầu.",
      "Giao hàng nhanh chóng tới tận kho của quý khách trên toàn quốc."
    ]
  },
  {
    title: "Quy trình hợp tác 6 bước chuyên nghiệp",
    description: "Hợp tác minh bạch, rõ ràng giúp quý khách hoàn toàn an tâm quản lý tiến độ.",
    icon: "GitMerge",
    details: [
      "Bước 1: Tiếp nhận yêu cầu & Tư vấn định hướng dòng sản phẩm.",
      "Bước 2: R&D lên mẫu thử (Test sample) gửi khách hàng duyệt hương thơm, thể kem, màu sắc.",
      "Bước 3: Thống nhất công thức, lựa chọn bao bì & Gửi báo giá chi tiết.",
      "Bước 4: Ký kết hợp đồng gia công & Thực hiện thủ tục pháp lý công bố.",
      "Bước 5: Tiến hành sản xuất hàng loạt, đóng gói hoàn thiện chuẩn CGMP.",
      "Bước 6: Kiểm tra chất lượng cuối cùng, bàn giao sản phẩm và hỗ trợ sau bán hàng."
    ]
  },
  {
    title: "Lợi ích khi hợp tác cùng Cosbuilt",
    description: "Chúng tôi coi thành công của thương hiệu của bạn chính là thành công của chúng tôi.",
    icon: "Gem",
    details: [
      "Nhà máy trực tiếp sản xuất không qua trung gian giúp tối ưu hóa chi phí sản xuất tốt nhất.",
      "Chính sách số lượng tối thiểu (MOQ) cực kỳ linh hoạt, hỗ trợ tối đa cho các start-up khởi nghiệp.",
      "Bảo mật tuyệt đối thông tin khách hàng và công thức gia công độc quyền.",
      "Hỗ trợ tư vấn chiến lược marketing, cung cấp tư liệu hình ảnh/video sản xuất tại nhà máy."
    ]
  }
];

export const MANUFACTURING_CATEGORIES: ManufacturingCategory[] = [
  {
    id: "facial-care",
    title: "Gia công Chăm sóc da mặt (Facial Care)",
    description: "Dòng sản phẩm cốt lõi mang lại doanh thu cao nhất cho mọi thương hiệu mỹ phẩm.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    subCategories: [
      "Serum chống lão hóa, phục hồi da (B5, HA, Peptide, Exosome)",
      "Kem dưỡng trắng da mờ thâm nám (Niacinamide, Arbutin)",
      "Kem chống nắng vật lý & hóa học màng lọc thế hệ mới",
      "Sữa rửa mặt dạng gel, bọt tạo sẵn dịu nhẹ",
      "Nước tẩy trang Micellar Water sạch sâu, toner cân bằng độ ẩm"
    ],
    features: ["Công nghệ liposome bảo toàn dưỡng chất", "Không chứa cồn khô, paraben hay chất tẩy rửa mạnh", "Đạt độ ổn định lý hóa tối đa trong khí hậu nhiệt đới"]
  },
  {
    id: "body-care",
    title: "Gia công Chăm sóc cơ thể (Body Care)",
    description: "Giải pháp nuôi dưỡng làn da toàn thân mịn màng, rạng rỡ đầy cuốn hút.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    subCategories: [
      "Sữa tắm dưỡng ẩm hương nước hoa lưu hương lâu",
      "Lotion/Kem dưỡng thể nâng tone da an toàn",
      "Tẩy tế bào chết cơ thể (Muối hồng Himalaya, hạt cà phê Arabica)",
      "Kem dưỡng da tay & da chân chuyên sâu",
      "Xịt thơm toàn thân (Body mist) dịu nhẹ"
    ],
    features: ["Hương liệu nhập khẩu cao cấp từ Pháp", "Thấm nhanh, không bết rít", "Hạt scrub thiên nhiên không gây xước da"]
  },
  {
    id: "hair-care",
    title: "Gia công Chăm sóc tóc (Hair Care)",
    description: "Giải quyết tận gốc các vấn đề về tóc và da đầu bằng các hoạt chất organic tự nhiên.",
    image: "https://images.unsplash.com/photo-1527799822341-478a783b83d0?q=80&w=600",
    subCategories: [
      "Dầu gội thảo dược ngăn rụng tóc (Bưởi, bồ kết, hà thủ ô)",
      "Kem xả, kem ủ tóc phục hồi hư tổn Keratin & Argan oil",
      "Serum/Xịt dưỡng tóc tinh dầu bưởi kích thích mọc tóc",
      "Dầu dưỡng bóng tóc, chống chẻ ngọn",
      "Tẩy tế bào chết da đầu mát lạnh"
    ],
    features: ["Không chứa Sulfate gây khô xơ tóc", "Độ pH lý tưởng 5.5 an toàn cho da đầu nhạy cảm", "Hoạt chất nuôi dưỡng từ nang tóc"]
  },
  {
    id: "makeup",
    title: "Gia công Trang điểm (Makeup Artistry)",
    description: "Kiến tạo vẻ đẹp thời thượng rực rỡ với bảng màu phong phú và chất son thời thượng.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
    subCategories: [
      "Son kem lì mỏng nhẹ, son dưỡng có màu tự nhiên",
      "Cushion/Kem nền độ che phủ cao tích hợp chống nắng",
      "Phấn nước nhẹ tênh, phấn má hồng ngọc trai",
      "Mascara chống trôi, kẻ mắt nước eyeliner sắc nét",
      "Xịt khóa nền giữ lớp trang điểm lâu trôi 16h"
    ],
    features: ["Màu khoáng đạt tiêu chuẩn FDA Mỹ & Châu Âu", "Tích hợp hoạt chất dưỡng da chống lão hóa", "Độ bền màu cao nhưng dễ dàng tẩy trang"]
  },
  {
    id: "personal-care",
    title: "Gia công Chăm sóc cá nhân (Personal Care)",
    description: "Các dòng sản phẩm thiết yếu chăm sóc vệ sinh cá nhân hàng ngày cho cả gia đình.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600",
    subCategories: [
      "Nước rửa tay diệt khuẩn, nước súc miệng thảo mộc",
      "Dung dịch vệ sinh phụ nữ & nam giới dịu nhẹ trầu không",
      "Lăn/Xịt khử mùi cơ thể kiềm mồ hôi hiệu quả",
      "Kem đánh răng trắng răng hữu cơ không fluoride",
      "Xịt thơm miệng kháng khuẩn, gel rửa tay khô dưỡng ẩm"
    ],
    features: ["Nguyên liệu thiên nhiên lành tính", "Khử mùi và diệt khuẩn bằng hoạt chất sinh học tự nhiên", "Tuyệt đối an toàn cho trẻ nhỏ và mẹ bầu"]
  },
  {
    id: "new-tech",
    title: "Sản phẩm gia công theo công nghệ mới",
    description: "Ứng dụng các công nghệ điều chế mỹ phẩm tiên tiến bậc nhất hiện nay (Exosome, Liposome bọc hoạt chất, công nghệ vi kim sinh học) giúp tăng khả năng hấp thụ gấp nhiều lần.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    subCategories: [
      "Serum Exosome rau má phục hồi da tầng sâu cấp tốc",
      "Kem dưỡng trẻ hóa Retinol bọc Liposome giải phóng chậm",
      "Vi kim sinh học tảo biển trẻ hóa da căng bóng",
      "Sản phẩm bọc hạt peptide kích hoạt collagen sinh học",
      "Kem chống nắng vật lý màng lọc phân tử thế hệ mới"
    ],
    features: ["Bảo toàn tối đa hoạt chất khỏi oxy hóa", "Tăng khả năng thẩm thấu sâu gấp 10 lần thông thường", "Sản xuất trong phòng thí nghiệm vô trùng Class 100"]
  }
];

export const PRICING_LIST: PricingItem[] = [
  {
    productType: "Serum / Ampoule (Dưỡng da chuyên sâu)",
    minOrder: "1,000 chai",
    priceRange: "15,000 - 35,000 VND",
    unit: "Chai (dropper 10-30ml)",
    timeframe: "15 - 20 ngày"
  },
  {
    productType: "Kem dưỡng da mặt (Whitening / Anti-aging Cream)",
    minOrder: "1,000 hũ",
    priceRange: "18,000 - 45,000 VND",
    unit: "Hũ (acrylic/thủy tinh 30-50g)",
    timeframe: "18 - 25 ngày"
  },
  {
    productType: "Kem chống nắng (Sunscreen SPF 50+ PA++++)",
    minOrder: "2,000 tuýp",
    priceRange: "22,000 - 40,000 VND",
    unit: "Tuýp nhựa dẻo (50ml)",
    timeframe: "20 - 25 ngày"
  },
  {
    productType: "Sữa rửa mặt / Gel rửa mặt (Cleanser)",
    minOrder: "2,000 chai/tuýp",
    priceRange: "12,000 - 28,000 VND",
    unit: "Chai vòi nhấn / Tuýp (100-150ml)",
    timeframe: "15 - 18 ngày"
  },
  {
    productType: "Nước tẩy trang / Toner / Xịt khoáng",
    minOrder: "2,000 chai",
    priceRange: "10,000 - 24,000 VND",
    unit: "Chai nắp bật / vòi xịt (150-250ml)",
    timeframe: "15 - 18 ngày"
  },
  {
    productType: "Sữa tắm / Dầu gội / Dầu xả",
    minOrder: "1,000 chai",
    priceRange: "16,000 - 38,000 VND",
    unit: "Chai vòi nhấn lớn (250-500ml)",
    timeframe: "15 - 20 ngày"
  },
  {
    productType: "Tẩy tế bào chết (Body Scrub)",
    minOrder: "1,000 hũ",
    priceRange: "18,000 - 32,000 VND",
    unit: "Hũ nhựa PET rộng miệng (200-250g)",
    timeframe: "15 - 18 ngày"
  },
  {
    productType: "Son kem lì / Son thỏi trang điểm",
    minOrder: "2,000 thỏi",
    priceRange: "14,000 - 28,000 VND",
    unit: "Thỏi son thiết kế riêng (3.5g-5g)",
    timeframe: "20 - 25 ngày"
  },
  {
    productType: "Dung dịch vệ sinh (Intimate Wash)",
    minOrder: "2,000 chai",
    priceRange: "9,000 - 18,000 VND",
    unit: "Chai vòi nhấn tạo bọt (100-150ml)",
    timeframe: "15 - 18 ngày"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Cẩm nang quy trình đăng ký giấy phép và công bố mỹ phẩm mới nhất 2026",
    category: "cẩm nang",
    summary: "Hướng dẫn chi tiết từ A-Z các hồ sơ pháp lý, thủ tục kiểm nghiệm lâm sàng và các bước nộp hồ sơ công bố mỹ phẩm thành công lên Bộ Y Tế.",
    content: "Để một sản phẩm mỹ phẩm được phép lưu thông hợp pháp trên thị trường Việt Nam, doanh nghiệp cần thực hiện đầy đủ các bước kiểm nghiệm chất lượng và công bố sản phẩm tại Cục Quản lý Dược hoặc Sở Y Tế. Các hồ sơ thiết yếu bao gồm: phiếu kiểm nghiệm chất lượng sản phẩm từ phòng Lab được cấp phép, bản phân tích thành phần phần trăm nguyên liệu (INCI name), giấy chứng nhận đăng ký kinh doanh có ngành nghề phù hợp, và hồ sơ thông tin sản phẩm (PIF). Tại Cosbuilt, chúng tôi hỗ trợ khách hàng toàn bộ hồ sơ này một cách nhanh chóng và an tâm nhất.",
    date: "12 Tháng 6, 2026",
    author: "ThS. Luật sư Nguyễn Khánh Ly",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600"
  },
  {
    title: "Xu hướng hoạt chất mỹ phẩm lên ngôi nửa cuối năm 2026: Exosome & Bakuchiol",
    category: "xu hướng",
    summary: "Khám phá sự trỗi dậy mạnh mẽ của công nghệ sinh học Exosome và hoạt chất thay thế retinol dịu nhẹ Bakuchiol trong các sản phẩm chăm sóc da cao cấp.",
    content: "Năm 2026 chứng kiến bước chuyển mình mạnh mẽ từ các hoạt chất hóa học truyền thống sang công nghệ sinh học tế bào. Điển hình là Exosome - chất truyền tin tế bào siêu nhỏ có khả năng kích hoạt tái tạo collagen tự thân gấp 300% so với tế bào gốc thông thường. Đồng thời, Bakuchiol tiếp tục khẳng định vị thế là ngôi sao sáng cho làn da nhạy cảm nhờ hiệu quả chống lão hóa tương đương Retinol nhưng không gây bong tróc, mẩn đỏ. Việc ứng dụng sớm các hoạt chất này giúp thương hiệu tạo ra USP mạnh mẽ.",
    date: "05 Tháng 7, 2026",
    author: "TS. Lê Hoài Nam (Trưởng phòng R&D Cosbuilt)",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600"
  },
  {
    title: "Kinh nghiệm tối ưu hóa chi phí sản xuất ban đầu cho startup mỹ phẩm",
    category: "cẩm nang",
    summary: "Làm thế nào để khởi nghiệp mỹ phẩm với số vốn tối thiểu nhưng vẫn đảm bảo chất lượng mẫu mã bắt mắt và sản phẩm đạt chuẩn CGMP?",
    content: "Nhiều chủ thương hiệu mới bắt đầu thường mắc sai lầm khi đặt hàng số lượng quá lớn (MOQ cao) gây đọng vốn, hoặc chọn chai lọ quá đắt tiền. Lời khuyên từ chuyên gia của Cosbuilt là: 1. Hãy bắt đầu với danh mục tối giản 1-2 SKU cốt lõi. 2. Ưu tiên lựa chọn hũ/chai tiêu chuẩn có sẵn và tạo điểm nhấn bằng thiết kế nhãn dán, vỏ hộp ép kim tinh tế. 3. Tận dụng tối đa chính sách hỗ trợ MOQ thấp từ nhà máy trực tiếp như Cosbuilt để thử nghiệm phản ứng thị trường trước khi sản xuất quy mô lớn.",
    date: "28 Tháng 5, 2026",
    author: "Bà Trần Minh Tâm (Giám đốc Dự án Cosbuilt)",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=600"
  },
  {
    title: "Thảo mộc Việt lên ngôi: Tiềm năng khổng lồ từ mỹ phẩm hữu cơ thuần chay",
    category: "xu hướng",
    summary: "Người tiêu dùng ngày càng thông thái và ưu ái các sản phẩm chứa nguồn nguyên liệu bản địa như hoa bưởi, trà xanh, tía tô, rau má.",
    content: "Mỹ phẩm thiên nhiên không còn là khái niệm xa lạ, nhưng sự nâng cấp lên chuẩn Thuần chay (Vegan) và sử dụng thảo dược bản địa Việt Nam đang tạo nên cơn sốt. Khách hàng cực kỳ ưa chuộng các câu chuyện thương hiệu gắn liền với bảo tồn thiên nhiên và nông nghiệp bền vững. Rau má làm dịu, tía tô trị thâm nám, vỏ bưởi mọc tóc đang là những đề tài R&D cực kỳ hot tại phòng Lab của Cosbuilt. Chúng tôi giúp trích ly hoạt chất nồng độ cao giữ trọn đặc tính dược lý tốt nhất của nguyên liệu nội địa.",
    date: "19 Tháng 6, 2026",
    author: "KS. Nguyễn Thị Mai (Phó Phòng R&D)",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600"
  }
];

export const FORMULA_PRODUCTS: FormulaProduct[] = [
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
  },
  {
    id: "cream-niacinamide",
    title: "Kem Dưỡng Trắng Da Mờ Thâm Niacinamide (Mẫu thử gia công)",
    category: "facial-care",
    lab: "Cosbuilt LAB",
    skinTypes: ["Dành cho da khô", "Mọi loại da"],
    rating: 5,
    ratingValue: 4.8,
    reviewsCount: 185,
    originalPrice: 48000,
    price: 38000,
    discountPercent: 20,
    badge: "DƯỠNG TRẮNG SÂU",
    testedCount: 92,
    hotPercent: 62,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600",
    description: "Kem dưỡng ẩm trắng da tích hợp màng bọc khóa ẩm thông minh. Chứa Niacinamide tinh khiết giúp dưỡng trắng sáng da chuyên sâu, ức chế melanin di chuyển lên bề mặt da, mang lại làn da trắng hồng rạng rỡ sau 21 ngày.",
    ingredients: "Niacinamide 5%, Alpha-Arbutin 1%, Squalane tự nhiên, Chiết xuất rễ cam thảo, Hyaluronic Acid.",
    guidelines: "Lấy một lượng kem vừa đủ thoa đều lên vùng mặt và cổ vào buổi sáng và tối. Massage nhẹ nhàng theo chuyển động tròn hướng lên để da săn chắc."
  },
  {
    id: "shower-gel",
    title: "Sữa Tắm Truyền Trắng Body Hương Nước Hoa (Mẫu thử gia công)",
    category: "body-care",
    lab: "Organic Formula",
    skinTypes: ["Mọi loại da", "Dành cho da khô"],
    rating: 5,
    ratingValue: 4.6,
    reviewsCount: 205,
    originalPrice: 35000,
    price: 28000,
    discountPercent: 20,
    badge: "HƯƠNG NƯỚC HOA SANG TRỌNG",
    testedCount: 110,
    hotPercent: 75,
    image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?q=80&w=600",
    description: "Sữa tắm dạng gel chứa hàng triệu hạt vitamin E tự tan, nhẹ nhàng làm sạch bụi bẩn và tế bào chết xỉn màu. Hương thơm nước hoa Pháp quý phái lưu hương suốt 8 tiếng, kết hợp các dưỡng chất làm trắng da bật tông tự nhiên.",
    ingredients: "Glutathione, Chiết xuất dâu tằm trắng, Vitamin E, Tinh dầu nước hoa Pháp cao cấp, Cocamidopropyl Betaine.",
    guidelines: "Lấy lượng sữa tắm vừa đủ ra bông tắm, tạo bọt mịn và xoa đều toàn thân. Massage nhẹ nhàng 3-5 phút để hạt vitamin tan ra và thấm thấu vào da, sau đó xả sạch."
  },
  {
    id: "body-scrub",
    title: "Tẩy Tế Bào Chết Hạt Cà Phê Đăk Lăk Mịn Da (Mẫu thử gia công)",
    category: "body-care",
    lab: "Premium Eco",
    skinTypes: ["Dành cho da khô", "Mọi loại da"],
    rating: 5,
    ratingValue: 4.7,
    reviewsCount: 150,
    originalPrice: 30000,
    price: 24000,
    discountPercent: 20,
    badge: "MỊN DA TỨC THÌ",
    testedCount: 64,
    hotPercent: 48,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    description: "Sự kết hợp hoàn hảo giữa những hạt cà phê Đăk Lăk xay nhuyễn sàng lọc kích thước siêu nhỏ, không gây xước da, và bơ hạt mỡ hữu cơ. Giúp cuốn trôi lớp tế bào chết sần sùi, giải quyết tình trạng viêm nang lông và nuôi dưỡng làn da body mịn màng như em bé.",
    ingredients: "Hạt cà phê nguyên chất Đăk Lăk, Bơ hạt mỡ (Shea Butter) hữu cơ, Dầu dừa tinh khiết, Tocopheryl Acetate (Vitamin E).",
    guidelines: "Làm ướt cơ thể. Thoa một lượng vừa đủ scrub lên da và massage nhẹ nhàng từ 5-10 phút, đặc biệt chú ý vùng khuỷu tay, đầu gối. Rửa sạch lại bằng nước."
  },
  {
    id: "shampoo-grapefruit",
    title: "Dầu Gội Bưởi Đậm Đặc Giảm Rụng & Kích Mọc Tóc (Mẫu thử gia công)",
    category: "hair-care",
    lab: "Organic Formula",
    skinTypes: ["Mọi loại da", "Dành cho da nhạy cảm"],
    rating: 5,
    ratingValue: 4.8,
    reviewsCount: 290,
    originalPrice: 40000,
    price: 32000,
    discountPercent: 20,
    badge: "GIẢM RỤNG 95%",
    testedCount: 180,
    hotPercent: 90,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600",
    description: "Dầu gội thảo dược không chứa sulfate, silicon hay paraben gây hại da đầu. Được điều chế từ tinh dầu vỏ bưởi da xanh nguyên chất kết hợp cùng chiết xuất cỏ mần trầu, hà thủ ô. Giúp làm sạch tóc dịu nhẹ, ngăn rụng tóc rõ rệt sau 2 tuần và kích thích nang tóc mới mọc nhanh chóng.",
    ingredients: "Tinh dầu vỏ bưởi da xanh, Chiết xuất cỏ mần trầu, Chiết xuất hà thủ ô, Biotin, Panthenol.",
    guidelines: "Làm ướt tóc hoàn toàn, lấy một lượng gội vừa đủ xoa đều lòng bàn tay để tạo bọt rồi massage nhẹ nhàng lên da đầu trong 3-5 phút. Xả sạch với nước ấm."
  },
  {
    id: "conditioner-grapefruit",
    title: "Kem Xả Tóc Tinh Dầu Bưởi Phục Hồi Tóc Hư Tổn (Mẫu thử gia công)",
    category: "hair-care",
    lab: "Organic Formula",
    skinTypes: ["Mọi loại da"],
    rating: 5,
    ratingValue: 4.6,
    reviewsCount: 115,
    originalPrice: 32050,
    price: 26000,
    discountPercent: 18,
    badge: "MỀM MƯỢT TỰ NHIÊN",
    testedCount: 45,
    hotPercent: 35,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
    description: "Kem xả giàu dưỡng chất chiết xuất từ tinh dầu vỏ bưởi da xanh kết hợp protein tơ tằm. Cung cấp độ ẩm dồi dào cho sợi tóc, phục hồi lớp biểu bì tóc bị hư tổn do hóa chất uốn nhuộm, giúp tóc suôn mượt, giảm chẻ ngọn và bóng khỏe tự nhiên.",
    ingredients: "Tinh dầu vỏ bưởi, Thủy phân Protein tơ tằm, Dầu Argan hữu cơ, Lactic Acid, Vitamin B5.",
    guidelines: "Sau khi gội sạch, vắt bớt nước trên tóc. Thoa kem xả từ thân đến ngọn tóc (tránh thoa trực tiếp lên da đầu). Để yên 2-3 phút cho dưỡng chất ngấm sâu rồi xả sạch."
  },
  {
    id: "intimate-wash",
    title: "Dung Dịch Vệ Sinh Trầu Không Dịu Nhẹ Kháng Khuẩn (Mẫu thử gia công)",
    category: "personal-care",
    lab: "Cosbuilt LAB",
    skinTypes: ["Dành cho da nhạy cảm", "Mọi loại da"],
    rating: 5,
    ratingValue: 4.7,
    reviewsCount: 175,
    originalPrice: 22500,
    price: 18000,
    discountPercent: 20,
    badge: "DỊU NHẸ LÀNH TÍNH",
    testedCount: 85,
    hotPercent: 55,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600",
    description: "Dịch chiết xuất từ lá trầu không bản địa kết hợp cùng trà xanh, hoa cúc La Mã và Acid Lactic cân bằng độ pH hoàn hảo. Giúp làm sạch vùng kín dịu nhẹ, kháng khuẩn bảo vệ, khử mùi hiệu quả và dưỡng da mềm mại.",
    ingredients: "Dịch chiết lá trầu không, Chiết xuất trà xanh, Chiết xuất cúc La Mã, Lactic Acid (pH 4.5), Nano Bạc kháng khuẩn.",
    guidelines: "Làm ướt vùng kín, lấy một lượng nhỏ gel tạo bọt nhẹ nhàng trong lòng bàn tay và xoa rửa ngoài da trong 1 phút, sau đó rửa lại thật sạch bằng nước."
  },
  {
    id: "exosome-serum",
    title: "Serum Tế Bào Gốc Exosome Phục Hồi Tái Tạo Da Tầng Sâu (Mẫu thử công nghệ mới)",
    category: "new-tech",
    lab: "Advanced Clinical",
    skinTypes: ["Dành cho da nhạy cảm", "Dành cho da khô", "Mọi loại da"],
    rating: 5,
    ratingValue: 4.95,
    reviewsCount: 380,
    originalPrice: 85000,
    price: 68000,
    discountPercent: 20,
    badge: "CÔNG NGHỆ TẾ BÀO",
    testedCount: 198,
    hotPercent: 95,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    description: "Ứng dụng đột phá công nghệ Exosome - chất truyền tin tế bào siêu nhỏ có kích thước nano chỉ bằng 1/1000 tế bào thông thường. Mang lại khả năng tái tạo các tế bào da hư tổn cấp tốc gấp 20 lần hoạt chất thông thường, củng cố màng bảo vệ da mỏng yếu.",
    ingredients: "Exosome chiết xuất từ rau má hữu cơ, EGF/FGF peptide tinh khiết, Panthenol 10%, Hyaluronic Acid đa trọng lượng phân tử.",
    guidelines: "Thoa 3-4 giọt lên da mặt sạch sau bước cân bằng ẩm. Vỗ nhẹ nhàng để hạt exosome siêu nhỏ len lỏi sâu vào tế bào da. Cực kỳ thích hợp dưỡng phục hồi sau liệu trình thẩm mỹ xâm lấn."
  },
  {
    id: "retinol-liposome",
    title: "Kem Trẻ Hóa Da Retinol Bọc Liposome Giải Phóng Chậm (Mẫu thử công nghệ mới)",
    category: "new-tech",
    lab: "Advanced Clinical",
    skinTypes: ["Mọi loại da", "Dành cho da khô"],
    rating: 5,
    ratingValue: 4.88,
    reviewsCount: 245,
    originalPrice: 92000,
    price: 75000,
    discountPercent: 18,
    badge: "RETINOL BỌC LIPOSOME",
    testedCount: 132,
    hotPercent: 88,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    description: "Retinol tinh khiết được bao bọc trong cấu trúc màng Liposome sinh học hai lớp siêu bền vững. Công nghệ này giúp hoạt chất không bị oxy hóa phân hủy bởi ánh sáng và nhiệt độ, đồng thời giải phóng chậm Retinol trên bề mặt da suốt 8h để triệt tiêu hoàn toàn kích ứng, mẩn đỏ đặc trưng của retinol truyền thống.",
    ingredients: "Retinol 1% tinh khiết bọc Liposome, Ceramide NP 1%, Squalane thực vật, chiết xuất sâm đỏ Thụy Sĩ.",
    guidelines: "Sử dụng vào buổi tối sau bước serum dưỡng ẩm. Lấy lượng kem nhỏ bằng hạt đậu thoa mỏng và mát xa đều vùng mặt. Khuyến nghị bắt đầu sử dụng 2-3 lần/tuần để da thích nghi."
  }
];

