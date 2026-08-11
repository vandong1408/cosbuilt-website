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
      { name: "Về Cosbuilt", id: "about-us" },
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
    title: "VỀ Cosbuilt",
    subtitle: "Doanh nghiệp Nghiên cứu & Sản xuất Mỹ phẩm Chuyên nghiệp (OEM/ODM)",
    content: "Cosbuilt là tổ hợp nhà máy nghiên cứu và sản xuất mỹ phẩm OEM/ODM hàng đầu Hàn Quốc. Với triết lý '연구원들이 만드는 화장품' (Mỹ phẩm chế tạo bởi đội ngũ nhà nghiên cứu), chúng tôi mang đến giải pháp toàn diện từ nghiên cứu công thức độc quyền, phát triển sản phẩm đến sản xuất hàng loạt đạt tiêu chuẩn ISO 22716 GMP. Chúng tôi sở hữu 2 hệ thống nhà máy hiện đại tại Incheon và Gimpo, xuất khẩu rộng khắp thị trường Mỹ, Châu Âu, Đông Nam Á (cung cấp dòng PB cho Watsons), Nhật Bản và Việt Nam.",
    stats: [
      { label: "Năm kinh nghiệm R&D", value: "12+" },
      { label: "Công thức độc quyền", value: "3,500+" },
      { label: "Nhà máy ISO 22716 / GMP", value: "2" },
      { label: "Công suất mặt nạ / năm", value: "24M+" }
    ]
  },
  factory: {
    title: "HỆ THỐNG NHÀ MÁY & NĂNG LỰC SẢN XUẤT",
    subtitle: "Nhà máy 1 (Cosbuilt Gimpo) & Nhà máy 2 (Cosbuilt Incheon) chuẩn ISO 22716 / GMP",
    description: "Cosbuilt vận hành 2 cơ sở sản xuất quy mô tại Incheon (Trụ sở chính: 35, Aenggogae-ro 449beon-gil, Namdong-gu, Incheon) và Gimpo. Hệ thống bồn khuấy Agi Mixer (20 tấn/ngày, 400 tấn/tháng), Agi Homo Mixer (12 tấn/ngày, 240 tấn/tháng) và Nước siêu tinh khiết Ultrapure Water (10 tấn/ngày) cùng dây chuyền chiết rót tự động khép kín đáp ứng công suất 24 triệu mặt nạ giấy/năm, 7.2 triệu sản phẩm Skin Care/năm và 5 triệu sản phẩm dạng tuýp/năm.",
    strengths: [
      "Đạt chứng nhận ISO 22716:2007 (KU0025-GMP) & Giấy chứng nhận Đơn vị Nghiên cứu R&D chính thức (Số 2025150295 do Bộ Khoa học & ICT Hàn Quốc cấp).",
      "Đã đăng ký cơ sở sản xuất US MoCRA FDA Mỹ (Nhà máy 1) & Chứng nhận Vẫn cơ (Venture Business).",
      "Bồn khuấy đồng hóa Agi Mixer & Agi Homo Mixer thế hệ mới công suất 400 tấn/tháng.",
      "Hệ thống tự động chiết rót & hàn tuýp (Auto Tube Filling & Sealing 14,000 - 20,000 ea/ngày).",
      "Sản xuất & cung cấp dòng sản phẩm PB cho tập đoàn Watsons tại Đông Nam Á & Hong Kong."
    ],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  },
  certifications: {
    title: "CHỨNG NHẬN TIÊU CHUẨN & BẰNG SÁNG CHẾ",
    subtitle: "Hệ thống quản lý chất lượng & nghiên cứu khoa học được công nhận quốc tế",
    list: [
      {
        name: "ISO 22716:2007 (GMP)",
        issuer: "UNI-CERT (Mã: KU0025-GMP)",
        description: "Chứng nhận Thực hành tốt sản xuất mỹ phẩm theo tiêu chuẩn quốc tế ISO 22716 cấp cho Cosbuilt.",
        icon: "ShieldCheck"
      },
      {
        name: "Đơn vị Nghiên cứu R&D (연구개발전담부서)",
        issuer: "Bộ Khoa học & ICT / KOITA (Số 2025150295)",
        description: "Giấy chứng nhận Phòng nghiên cứu phát triển sản phẩm chuyên trách được chính phủ Hàn Quốc cấp phép.",
        icon: "CheckCircle"
      },
      {
        name: "US MoCRA FDA Registered",
        issuer: "Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ",
        description: "Đăng ký cơ sở sản xuất đạt tiêu chuẩn đạo luật MoCRA đủ điều kiện xuất khẩu chính ngạch sang Mỹ.",
        icon: "Award"
      },
      {
        name: "Bằng Sáng Chế & Doanh Nghiệp Khoa Học",
        issuer: "Cục Sở Hữu Trí Tuệ / KOTRA",
        description: "Bằng sáng chế Cleansing Balm (kết hợp 수용성 Cleansing Water & 유용성 Cleansing Oil) và Chứng nhận Doanh nghiệp Vẫn cơ.",
        icon: "FileCheck"
      }
    ]
  },
  rdTeam: {
    title: "ĐỘI NGŨ CHUYÊN GIA R&D & BAN LÃNH ĐẠO",
    subtitle: "Đứng sau thành công của nhiều dòng sản phẩm triệu đô",
    description: "Đội ngũ sáng lập và nghiên cứu gồm CEO Kim Kyung-choon (Đại diện pháp luật Cosbuilt), CEO Bum-Chul Hur (Founder & CEO Cosbuilt - nguyên Giám đốc R&D C&C International, Cosnine, FORCOS, SKIN FOOD; Giải Nhất Cosmopack Asia Awards) và CEO Kim Dong-hyun. Chúng tôi không ngừng đi đầu trong ứng dụng công nghệ Nano, Liposome và chiết xuất sinh học.",
    focusAreas: [
      "Công nghệ bọc hạt Nano (Nanoparticle), Liposome & Liquid Crystal giúp tăng tối đa khả năng thẩm thấu.",
      "Bằng sáng chế Cleansing Balm hòa tan độc quyền & Công nghệ sấy chân không nhiệt độ cao cho Foam Cleanser.",
      "Nghiên cứu nguyên liệu hữu cơ thuần chay (Vegan) & Hoạt chất hỗ trợ cải thiện da dị ứng (Atopic) cho trẻ nhỏ."
    ],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600"
  },
  partners: {
    title: "ĐỐI TÁC & THƯƠNG HIỆU GIA CÔNG",
    subtitle: "Sản xuất & Cung ứng cho Watsons PB Line và các nhãn hàng quốc tế",
    logos: [
      { name: "PINK by Pure Beauty (Watsons PB)", type: "Gia công dòng PB Đông Nam Á & Hong Kong" },
      { name: "Philnature", type: "Dòng Chăm sóc da, Tóc & Mặt nạ" },
      { name: "The Skin Class", type: "Dòng Kem Massage Làm Sạch Hybrid" },
      { name: "Herb Aroma", type: "Dòng Kem Dưỡng Nước Thảo Mộc" },
      { name: "MaxBio Sports", type: "Dòng Gel Thể Thao & Phục Hồi" },
      { name: "Derma-PIK Diamond", type: "Dòng Tẩy Tế Bào Chết Kim Cương" }
    ]
  }
};

export const DEFAULT_GALLERY_IMAGES = [
  {
    title: "Dây chuyền chiết rót mỹ phẩm tự động",
    category: "nhà máy",
    description: "Hệ thống chiết rót công nghệ tự động hóa khép kín nhập khẩu từ Đức và Hàn Quốc, chuẩn CGMP ASEAN.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
  },
  {
    title: "Phòng thí nghiệm nghiên cứu R&D vô trùng",
    category: "R&D",
    description: "Nơi đội ngũ tiến sĩ, thạc sĩ sinh hóa nghiên cứu, phát triển và thử nghiệm các công thức mỹ phẩm đột phá.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
  },
  {
    title: "Hệ thống bồn nhũ hóa hút chân không đồng hóa",
    category: "nhà máy",
    description: "Bồn khuấy trộn nhũ hóa siêu mịn giúp chất kem đạt độ đồng đều tối đa và giữ trạng thái ổn định lâu dài.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600"
  },
  {
    title: "Thử nghiệm lâm sàng và kiểm tra kích ứng da",
    category: "R&D",
    description: "Các công thức mẫu thử được kiểm nghiệm lâm sàng nghiêm ngặt nhằm đảm bảo an toàn tuyệt đối trước khi công bố.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
  },
  {
    title: "Kho nguyên liệu thô nhập khẩu đạt chuẩn",
    category: "nhà máy",
    description: "Nguồn nguyên liệu thô nhập khẩu chính ngạch trực tiếp từ Nhật Bản, Thụy Sĩ, Pháp, lưu giữ trong điều kiện tối ưu.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600"
  },
  {
    title: "Quy trình đóng gói màng co vô trùng hoàn thiện",
    category: "đóng gói",
    description: "Sản phẩm được làm sạch bụi lọ, đóng màng co vô trùng và in hạn sử dụng tự động trước khi xuất xưởng.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  }
];

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
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  },
  {
    title: "Xu hướng hoạt chất mỹ phẩm lên ngôi nửa cuối năm 2026: Exosome & Bakuchiol",
    category: "xu hướng",
    summary: "Khám phá sự trỗi dậy mạnh mẽ của công nghệ sinh học Exosome và hoạt chất thay thế retinol dịu nhẹ Bakuchiol trong các sản phẩm chăm sóc da cao cấp.",
    content: "Năm 2026 chứng kiến bước chuyển mình mạnh mẽ từ các hoạt chất hóa học truyền thống sang công nghệ sinh học tế bào. Điển hình là Exosome - chất truyền tin tế bào siêu nhỏ có khả năng kích hoạt tái tạo collagen tự thân gấp 300% so với tế bào gốc thông thường. Đồng thời, Bakuchiol tiếp tục khẳng định vị thế là ngôi sao sáng cho làn da nhạy cảm nhờ hiệu quả chống lão hóa tương đương Retinol nhưng không gây bong tróc, mẩn đỏ. Việc ứng dụng sớm các hoạt chất này giúp thương hiệu tạo ra USP mạnh mẽ.",
    date: "05 Tháng 7, 2026",
    author: "Bum-Chul Hur (Viện trưởng R&D Cosbuilt)",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600"
  },
  {
    title: "Kinh nghiệm tối ưu hóa chi phí sản xuất ban đầu cho startup mỹ phẩm",
    category: "cẩm nang",
    summary: "Làm thế nào để khởi nghiệp mỹ phẩm với số vốn tối thiểu nhưng vẫn đảm bảo chất lượng mẫu mã bắt mắt và sản phẩm đạt chuẩn ISO 22716 CGMP?",
    content: "Nhiều chủ thương hiệu mới bắt đầu thường mắc sai lầm khi đặt hàng số lượng quá lớn (MOQ cao) gây đọng vốn, hoặc chọn chai lọ quá đắt tiền. Lời khuyên từ chuyên gia của Cosbuilt là: 1. Hãy bắt đầu với danh mục tối giản 1-2 SKU cốt lõi. 2. Ưu tiên lựa chọn hũ/chai tiêu chuẩn có sẵn và tạo điểm nhấn bằng thiết kế nhãn dán, vỏ hộp ép kim tinh tế. 3. Tận dụng tối đa chính sách hỗ trợ MOQ linh hoạt từ nhà máy trực tiếp như Cosbuilt để thử nghiệm phản ứng thị trường trước khi sản xuất quy mô lớn.",
    date: "28 Tháng 5, 2026",
    author: "Kim Kyung-choon (CEO Cosbuilt)",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
  },
  {
    title: "Thảo mộc & Hoạt chất sinh học: Tiềm năng khổng lồ từ mỹ phẩm hữu cơ thuần chay",
    category: "xu hướng",
    summary: "Người tiêu dùng ngày càng thông thái và ưu ái các sản phẩm chứa nguồn nguyên liệu bản địa và chiết xuất hữu cơ lành tính.",
    content: "Mỹ phẩm thiên nhiên không còn là khái niệm xa lạ, nhưng sự nâng cấp lên chuẩn Thuần chay (Vegan) và sử dụng thảo dược kết hợp sinh học hiện đại đang tạo nên cơn sốt. Khách hàng cực kỳ ưa chuộng các câu chuyện thương hiệu gắn liền với bảo tồn thiên nhiên và hiệu quả trị liệu thực sự. Các chiết xuất thảo mộc lành tính đang là những đề tài R&D cực kỳ hot tại phòng Lab của Cosbuilt. Chúng tôi giúp trích ly hoạt chất nồng độ cao giữ trọn đặc tính dược lý tốt nhất.",
    date: "19 Tháng 6, 2026",
    author: "Kim Dong-hyun (Đại diện Cosbuilt)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
  },
  {
    title: "Tiêu chuẩn CGMP ASEAN trong sản xuất mỹ phẩm và những điều doanh nghiệp cần biết",
    category: "cẩm nang",
    summary: "Tìm hiểu các tiêu chí khắt khe về phòng sạch, kiểm soát vi sinh vật và truy xuất nguồn gốc nguyên liệu đạt chuẩn chất lượng quốc tế.",
    content: "Tiêu chuẩn Thực hành tốt sản xuất mỹ phẩm CGMP là thước đo bắt buộc để đánh giá năng lực của một nhà máy gia công mỹ phẩm. CGMP yêu cầu sự kiểm soát nghiêm ngặt từ thiết kế phòng lab sạch, hệ thống xử lý nước RO đạt độ tinh khiết cao, cho đến huấn luyện nhân sự và vệ sinh thiết bị định kỳ. Việc sản xuất tại nhà máy chuẩn CGMP giúp sản phẩm của bạn tránh hoàn toàn nguy cơ nhiễm khuẩn chéo, bảo toàn hoạt chất và dễ dàng thông quan, xuất khẩu sang các nước trong khu vực Đông Nam Á.",
    date: "15 Tháng 7, 2026",
    author: "KS. Hoàng Văn Thắng (Giám đốc Vận hành Nhà máy)",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600"
  },
  {
    title: "Bí quyết thiết kế bao bì mỹ phẩm thu hút khách hàng từ cái nhìn đầu tiên",
    category: "cẩm nang",
    summary: "Xu hướng thiết kế chai lọ tối giản, ứng dụng công nghệ in ép kim cao cấp và giải pháp bao bì phân hủy sinh học thân thiện môi trường.",
    content: "Một thiết kế bao bì ấn tượng quyết định tới 70% hành vi mua thử lần đầu của khách hàng. Năm 2026 chứng kiến sự thống trị của xu hướng Quiet Luxury - sang trọng thầm lặng với màu sắc pastel dịu mát, font chữ không chân tinh tế và bề mặt chai lọ nhám mờ. Đồng thời, việc chuyển đổi sang vỏ chai nhựa tái chế PCR hay thủy tinh siêu mỏng nhẹ cũng là điểm cộng rất lớn giúp thương hiệu ghi dấu ấn sống xanh trong mắt người dùng hiện đại.",
    date: "08 Tháng 7, 2026",
    author: "Bà Vũ Thùy Linh (Trưởng bộ phận Thiết kế Bao bì)",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
  },
  {
    title: "Ứng dụng công nghệ bọc Liposome trong bào chế serum dưỡng da chuyên sâu",
    category: "xu hướng",
    summary: "Khám phá giải pháp vận chuyển hoạt chất thông minh giúp tăng khả năng thẩm thấu sâu qua lớp biểu bì gấp 10 lần phương pháp thông thường.",
    content: "Hạn chế lớn nhất của các hoạt chất dưỡng da mạnh mẽ như Vitamin C hay Hyaluronic Acid là dễ bị oxy hóa ngoài không khí hoặc chỉ bám lại trên bề mặt da. Công nghệ bao bọc Liposome với lớp màng phospholipid kép tương thích sinh học cao sẽ 'đóng gói' hoạt chất an toàn và giải phóng chúng ở đúng lớp tế bào đích dưới da. Điều này giúp tối ưu hiệu quả trị liệu mụn, thâm, nám và trẻ hóa da một cách ngoạn mục mà không gây kích ứng ngoài ý muốn.",
    date: "02 Tháng 7, 2026",
    author: "ThS. Dược sĩ Phạm Minh Khoa",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600"
  },
  {
    title: "Quy trình kiểm nghiệm kích ứng da (Dermatologically Tested) cho mỹ phẩm mới",
    category: "cẩm nang",
    summary: "Các phương pháp thử nghiệm lâm sàng và đánh giá độ an toàn trên mẫu thử trước khi chính thức đưa vào sản xuất hàng loạt.",
    content: "Trước khi một công thức mỹ phẩm được đưa vào dây chuyền sản xuất số lượng lớn, việc kiểm tra độ an toàn trên da người tình nguyện là bước cực kỳ quan trọng. Quy trình Dermatologically Tested tiêu chuẩn bao gồm thử nghiệm áp áp da (Patch Test) trong vòng 24 - 48 giờ để theo dõi các phản ứng mẩn đỏ, ngứa ngáy hay bong tróc. Đảm bảo công thức đạt chỉ số kích ứng bằng 0 chính là cam kết vững chắc nhất cho chất lượng thương hiệu của bạn.",
    date: "25 Tháng 6, 2026",
    author: "Bác sĩ Da liễu Đỗ Minh Tuấn",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  },
  {
    title: "Clean Beauty & Waterless Beauty: Tương lai xanh bền vững của mỹ phẩm",
    category: "xu hướng",
    summary: "Xu hướng cắt giảm tối đa nguồn nước trong công thức để thay thế bằng các chiết xuất thực vật cô đặc dạng sáp hoặc dạng bột khô sáng tạo.",
    content: "Waterless Beauty (Mỹ phẩm không nước) đang là cuộc cách mạng bảo vệ môi trường toàn cầu. Bằng cách loại bỏ nước khoáng thông thường và thay thế bằng hydrolat hoa hồng, nước lô hội hữu cơ, hoặc sản xuất dưới dạng thanh sáp/bột khô, sản phẩm không cần sử dụng nhiều chất bảo quản hóa học. Điều này không chỉ giảm thiểu tối đa kích ứng da mà còn giúp tiết kiệm tài nguyên nước quý giá và giảm đáng kể lượng khí thải carbon khi vận chuyển.",
    date: "18 Tháng 6, 2026",
    author: "Bà Hoàng Thu Trang (Chuyên gia Xu hướng Tiêu dùng)",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600"
  },
  {
    title: "Chiến lược xây dựng phễu sản phẩm mỹ phẩm đột phá cho các thương hiệu mới",
    category: "cẩm nang",
    summary: "Cách kết hợp thông minh giữa sản phẩm phễu giá tốt hút tương tác và sản phẩm chủ lực biên lợi nhuận cao giúp tối đa hóa doanh thu.",
    content: "Một thương hiệu mới không nên tung ra quá nhiều sản phẩm cùng lúc mà hãy tập trung thiết kế một phễu sản phẩm logic. Sản phẩm phễu (Sữa rửa mặt tạo bọt, Nước tẩy trang) nên có giá thành dễ tiếp cận, hiệu quả tức thì để lấy lòng tin khách hàng. Sau đó, dẫn dắt khách hàng nâng cấp lên sản phẩm chủ lực (Serum trị nám Exosome, Kem dưỡng trẻ hóa Bakuchiol) có giá trị cao để tăng biên độ lợi nhuận và khẳng định đẳng cấp thương hiệu." ,
    date: "10 Tháng 6, 2026",
    author: "Ông Nguyễn Lâm Sơn (Chuyên gia MKT Mỹ phẩm)",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
  },
  {
    title: "Công nghệ nhũ hóa nguội (Cold Emulsification): Bước đột phá tiết kiệm năng lượng trong sản xuất mỹ phẩm",
    category: "xu hướng",
    summary: "Khám phá quy trình nhũ hóa không cần gia nhiệt giúp bảo toàn tuyệt đối hoạt chất nhạy cảm với nhiệt độ và giảm 50% lượng khí thải carbon.",
    content: "Thông thường, quá trình tạo kem dưỡng (nhũ hóa) đòi hỏi phải đun nóng pha dầu và pha nước lên 70 - 80 độ C. Tuy nhiên, công nghệ nhũ hóa nguội thế hệ mới sử dụng các chất hoạt động bề mặt chuyên biệt, cho phép liên kết dầu và nước ở nhiệt độ phòng. Phương pháp này không chỉ giữ nguyên đặc tính sinh học của các chiết xuất thực vật nhạy cảm với nhiệt (như Vitamin C, peptide, retinol) mà còn giúp nhà máy tiết kiệm năng lượng đáng kể, thúc đẩy xu hướng mỹ phẩm bền vững.",
    date: "20 Tháng 7, 2026",
    author: "ThS. Nguyễn Minh Hoàng (Chuyên gia Bào chế tại Cosbuilt)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
  },
  {
    title: "Hạn chế chất bảo quản hóa học bằng giải pháp Hệ bảo quản tự nhiên (Natural Preservative Systems)",
    category: "cẩm nang",
    summary: "Làm thế nào để kéo dài tuổi thọ mỹ phẩm hữu cơ lên đến 2 năm mà không cần sử dụng Parabens hay Phenoxyethanol?",
    content: "Xu hướng mỹ phẩm sạch đòi hỏi loại bỏ các chất bảo quan truyền thống bị nghi ngờ có hại cho sức khỏe. Tại phòng thí nghiệm Cosbuilt, chúng tôi ứng dụng các hệ tự bảo quản thông minh (self-preserving systems) kết hợp từ chiết xuất vỏ cây liễu, rễ cây hẹ, lên men tỏi và các acid hữu cơ nhẹ. Sự kết hợp hiệp đồng này vừa ức chế tối đa vi khuẩn, nấm mốc vừa nuôi dưỡng làn da nhẹ nhàng, nâng cao giá trị xanh cho thương hiệu.",
    date: "18 Tháng 7, 2026",
    author: "TS. Phạm Hải Yến (Bộ phận Nghiên cứu Vi sinh Cosbuilt)",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600"
  },
  {
    title: "Quy trình thiết kế nhãn mỹ phẩm hợp chuẩn nghị định quản lý mỹ phẩm ASEAN",
    category: "cẩm nang",
    summary: "Tránh lỗi phạt hành chính nghiêm trọng bằng việc ghi đúng danh pháp INCI, thứ tự thành phần và các lưu ý bắt buộc khi in ấn bao bì.",
    content: "Thiết kế nhãn mỹ phẩm không chỉ cần bắt mắt mà phải tuân thủ nghiêm ngặt Hiệp định mỹ phẩm ASEAN. Tên thành phần bắt buộc phải ghi bằng danh pháp quốc tế INCI, sắp xếp theo tỷ lệ giảm dần về nồng độ. Các lỗi thường gặp như tự ý công bố tính năng điều trị y học (như trị mụn hoàn toàn, xóa sẹo vĩnh viễn) hay thiếu số lô sản xuất, hạn sử dụng sẽ khiến doanh nghiệp bị phạt nặng hoặc thu hồi sản phẩm. Đội ngũ pháp lý của Cosbuilt luôn hỗ trợ duyệt nhãn miễn phí trước khi in ấn cho khách hàng gia công.",
    date: "14 Tháng 7, 2026",
    author: "Bà Lê Thu Thủy (Giám đốc Pháp lý Thương hiệu)",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
  },
  {
    title: "Ứng dụng lợi khuẩn Probiotics và Prebiotics trong mỹ phẩm cân bằng hệ vi sinh da",
    category: "xu hướng",
    summary: "Xu hướng dưỡng da khoa học tập trung củng cố hàng rào bảo vệ tự nhiên thông qua việc bổ sung các lợi khuẩn lên men cao cấp.",
    content: "Hệ vi sinh vật trên da đóng vai trò quyết định đến sức đề kháng và độ mịn màng của làn da. Việc lạm dụng chất tẩy rửa mạnh làm mất cân bằng màng acid bảo vệ. Mỹ phẩm chứa dịch lọc lên men từ vi khuẩn có lợi như Bifida Ferment Lysate hay Lactobacillus giúp tăng cường sức đề kháng, giảm viêm nhiễm cục bộ và khôi phục hàng rào da tổn thương nhanh chóng. Đây đang là dòng sản phẩm có tỷ lệ quay lại mua hàng cao nhất năm nay.",
    date: "10 Tháng 7, 2026",
    author: "ThS. BS. Nguyễn Thị Lan Anh",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600"
  },
  {
    title: "Cách xây dựng bảng phân tích đối thủ cạnh tranh trước khi đặt công thức gia công",
    category: "cẩm nang",
    summary: "Xác định rõ định vị phân khúc, điểm độc nhất (USP) và khoảng trống thị trường để sản phẩm của bạn không bị hòa lẫn vào đám đông.",
    content: "Trước khi bắt đầu gia công mỹ phẩm, chủ thương hiệu cần làm khảo sát chi tiết về các sản phẩm đối thủ có cùng phân khúc giá và tệp khách hàng. Hãy lập danh sách về: kết cấu (texture), mùi hương, hoạt chất cốt lõi và phong cách truyền thông của họ. Từ đó, phòng Lab Cosbuilt sẽ giúp bạn tối ưu hóa công thức độc quyền bằng cách bổ sung một hoạt chất hiếm, thay đổi màu sắc thiên nhiên độc đáo hoặc nâng cấp kết cấu mỏng nhẹ hơn đối thủ, giúp sản phẩm dễ dàng nổi bật.",
    date: "06 Tháng 7, 2026",
    author: "Ông Vũ Tiến Đạt (Chuyên gia Hoạch định Chiến lược Sản phẩm)",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  },
  {
    title: "Nhu cầu gia công mỹ phẩm nam giới (Men's Grooming) bùng nổ mạnh mẽ năm 2026",
    category: "xu hướng",
    summary: "Tệp khách hàng nam giới không còn xa lạ với việc chăm sóc cá nhân. Khám phá các công thức tối giản đa năng dành riêng cho phái mạnh.",
    content: "Thị trường mỹ phẩm nam giới đang chứng kiến tốc độ tăng trưởng hai chữ số hằng năm. Khác với phái đẹp, nam giới ưu tiên tính tiện lợi, bao bì tối giản đậm tính nam tính và kết cấu sản phẩm thẩm thấu siêu nhanh, không bóng nhờn. Các dòng sản phẩm đa năng 3-trong-1 (sữa rửa mặt kiêm cạo râu, dưỡng ẩm kiêm chống nắng dạng nước gel mỏng nhẹ) đang là những mảnh đất màu mỡ cho các startup khai phá hiệu quả.",
    date: "01 Tháng 7, 2026",
    author: "Ông Nguyễn Đăng Khoa (Giám đốc Phát triển Thị trường Cosbuilt)",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600"
  },
  {
    title: "Tối ưu hóa quy trình chiết rót tự động và kiểm soát dung sai thể tích mỹ phẩm",
    category: "cẩm nang",
    summary: "Làm thế nào để nhà máy kiểm soát chính xác 100% dung sai định lượng, tránh hiện tượng hao hụt hay tràn sản phẩm khi đóng gói tự động?",
    content: "Dây chuyền chiết rót tự động đa năng tại Cosbuilt được lập trình PLC hiện đại giúp kiểm soát dung sai thể tích cực kỳ nhỏ (dưới 0.5%). Quy trình này đòi hỏi sự đồng bộ giữa hệ thống piston nâng hạ, van hồi lưu chống nhỏ giọt và cảm biến laser kiểm tra mức dung dịch trong chai lọ. Việc tối ưu hóa tốc độ phun và lực hút chân không giúp sản phẩm dạng gel đặc hay lỏng nhẹ đều được đóng gói đều đặn, sạch sẽ, bảo đảm tính minh bạch về dung lượng cho thương hiệu.",
    date: "22 Tháng 7, 2026",
    author: "KS. Đặng Minh Hải (Kỹ sư trưởng chiết rót Cosbuilt)",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
  },
  {
    title: "Xu hướng sử dụng Peptide đồng (Copper Peptide) trong các liệu trình phục hồi da xâm lấn",
    category: "xu hướng",
    summary: "Khám phá sức mạnh kháng viêm, mờ sẹo và đẩy nhanh tốc độ liền da tổn thương sau lăn kim, phi kim của hoạt chất Copper Peptide.",
    content: "Copper Peptide (GHK-Cu) đang trở thành xu hướng tìm kiếm hàng đầu trong phân khúc mỹ phẩm phục hồi da y khoa. Nhờ khả năng mô phỏng cơ chế tự phục hồi tự nhiên của cơ thể, peptide đồng thúc đẩy quá trình tăng sinh nguyên bào sợi và kích hoạt tái cấu trúc ma trận ngoại bào. Việc kết hợp Copper Peptide trong các dòng kem dưỡng, serum giúp giảm thiểu tối đa thời gian sưng đỏ, tái tạo biểu bì khỏe mạnh mà không để lại sẹo lồi lõm dứt điểm.",
    date: "21 Tháng 7, 2026",
    author: "TS. Nguyễn Hoài Thương (Viện nghiên cứu Da liễu)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
  },
  {
    title: "Kỹ thuật xây dựng câu chuyện thương hiệu (Brand Storytelling) truyền cảm hứng cho mỹ phẩm Việt",
    category: "cẩm nang",
    summary: "Hướng dẫn cách kết nối cảm xúc với khách hàng mục tiêu bằng cách khai thác giá trị văn hóa bản địa và triết lý sống tử tế.",
    content: "Một thương hiệu thành công không chỉ bán tính năng của sản phẩm mà bán câu chuyện đằng sau nó. Brand Storytelling chính là sợi dây liên kết vô hình gắn kết trái tim người dùng với nhãn hàng. Các startup nên khai thác những chất liệu chân thực như: nguồn gốc nguyên liệu nông sản sạch hợp tác cùng nông dân, nỗ lực nghiên cứu không ngừng nghỉ của đội ngũ R&D, hay thông điệp bảo vệ môi trường, tôn vinh nét đẹp mộc mạc bản xứ để tạo niềm tự hào lớn.",
    date: "18 Tháng 7, 2026",
    author: "Bà Nguyễn Lê Thảo Nguyên (Giám đốc Sáng tạo Thương hiệu)",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600"
  },
  {
    title: "Mỹ phẩm thông minh tích hợp màng bọc chống ánh sáng xanh (Blue Light Protection)",
    category: "xu hướng",
    summary: "Vì sao dân văn phòng tiếp xúc nhiều với máy tính, điện thoại cần các dòng kem dưỡng bảo vệ chuyên biệt chống lại lão hóa kỹ thuật số?",
    content: "Ánh sáng xanh (HEV) từ màn hình thiết bị điện tử có khả năng xâm nhập sâu vào da hơn cả tia cực tím, phá hủy collagen và tạo ra vô số gốc tự do có hại. Mỹ phẩm tích hợp cơ chế bảo vệ chống ánh sáng xanh nhờ màng lọc phân tử hữu cơ và chiết xuất vi tảo đỏ, lutein tự nhiên sẽ tạo ra lớp chắn hấp thụ và phản xạ toàn bộ luồng ánh sáng này. Đây hứa hẹn là dòng sản phẩm chăm sóc da bắt buộc phải có cho tệp khách hàng công sở năng động.",
    date: "16 Tháng 7, 2026",
    author: "ThS. Dược sĩ Hoàng Lan Phương",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
  },
  {
    title: "Cách lựa chọn chất diện hoạt (Surfactants) dịu nhẹ cho dòng sữa rửa mặt da nhạy cảm",
    category: "cẩm nang",
    summary: "Tránh kích ứng hàng rào bảo vệ da bằng việc thay thế SLS/SLES bằng các chất tạo bọt dịu nhẹ chiết xuất từ dừa và axit amin hữu cơ.",
    content: "Xu hướng làm sạch da hiện nay cực kỳ khắt khe với các thành phần tạo bọt rửa mặt. Thay vì các gốc tẩy mạnh truyền thống như SLS/SLES dễ gây khô ráp và mất nước biểu bì, các công thức của Cosbuilt ưu tiên sử dụng chất diện hoạt gốc Acid Amin (như Sodium Cocoyl Glycinate) hoặc gốc đường tự nhiên (Decyl Glucoside). Những hoạt chất này tạo bọt bông mịn dày, làm sạch dầu thừa hiệu quả nhưng giữ nguyên lớp màng lipid ẩm tự nhiên của da sau khi rửa.",
    date: "12 Tháng 7, 2026",
    author: "ThS. Đỗ Tuấn Anh (Chuyên gia nghiên cứu công thức Cosbuilt)",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600"
  },
  {
    title: "Xu hướng bao bì tái chế PCR và vật liệu xanh trong ngành công nghiệp mỹ phẩm",
    category: "xu hướng",
    summary: "Doanh nghiệp mỹ phẩm chuyển dịch sang sử dụng nhựa PCR tái chế sau tiêu dùng và hộp giấy bã mía tự hủy sinh học để phát triển bền vững.",
    content: "Sử dụng bao bì sinh thái không còn là sự lựa chọn mà đã trở thành trách nhiệm xã hội và tiêu chuẩn cạnh tranh khắt khe. Nhựa PCR (Post-Consumer Recycled) giúp tái chế rác thải nhựa cũ thành chai lọ mỹ phẩm cao cấp sang trọng, giảm 80% lượng rác thải ra đại dương. Song song, hộp đựng làm từ giấy bã mía ép thủy lực tự hủy sinh học trong 90 ngày cũng đang chiếm trọn cảm tình của người dùng thế hệ Gen Z, thúc đẩy chuyển đổi xanh mạnh mẽ toàn cầu.",
    date: "10 Tháng 7, 2026",
    author: "Bà Đặng Phương Thảo (Chuyên gia Môi trường & Phát triển Bền vững)",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  }
];

export const FORMULA_PRODUCTS: FormulaProduct[] = [

  {
    "id": "serum-b5",
    "title": "Serum B5 & Exosome phục hồi da chuyên sâu (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Dành cho da nhạy cảm",
      "Dành cho da khô",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.9,
    "reviewsCount": 310,
    "originalPrice": 150000,
    "price": 125000,
    "discountPercent": 16,
    "badge": "PHỤC HỒI CẤP TỐC",
    "testedCount": 154,
    "hotPercent": 85,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Công thức phục hồi tế bào thế hệ mới kết hợp Panthenol (Vitamin B5) nồng độ cao và hoạt chất Exosome siêu nhỏ chiết xuất từ rau má. Giúp làm dịu mẩn đỏ tức thì, kích thích tăng sinh collagen tự thân và củng cố hàng rào bảo vệ da mạnh mẽ.",
    "ingredients": "Panthenol 10%, Exosome chiết xuất rau má, Centella Asiatica Extract, Hyaluronic Acid đa tầng, Ceramide NP.",
    "guidelines": "Thoa 3-4 giọt lên da mặt sạch sau bước toner. Vỗ nhẹ để dưỡng chất thẩm thấu sâu. Phù hợp sử dụng sau các liệu trình laser, peel da hoặc treatment nặng."
  },
  {
    "id": "cream-niacinamide",
    "title": "Kem Dưỡng Trắng Da Mờ Thâm Niacinamide (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Dành cho da khô",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 185,
    "originalPrice": 180000,
    "price": 145000,
    "discountPercent": 19,
    "badge": "DƯỠNG TRẮNG SÂU",
    "testedCount": 92,
    "hotPercent": 62,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Kem dưỡng ẩm trắng da tích hợp màng bọc khóa ẩm thông minh. Chứa Niacinamide tinh khiết giúp dưỡng trắng sáng da chuyên sâu, ức chế melanin di chuyển lên bề mặt da, mang lại làn da trắng hồng rạng rỡ sau 21 ngày.",
    "ingredients": "Niacinamide 5%, Alpha-Arbutin 1%, Squalane tự nhiên, Chiết xuất rễ cam thảo, Hyaluronic Acid.",
    "guidelines": "Lấy một lượng kem vừa đủ thoa đều lên vùng mặt và cổ vào buổi sáng và tối. Massage nhẹ nhàng theo chuyển động tròn hướng lên để da săn chắc."
  },
  {
    "id": "cleanser-centella",
    "title": "Sữa Rửa Mặt Tạo Bọt Rau Má Dịu Nhẹ (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Dành cho da dầu mụn",
      "Dành cho da nhạy cảm",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 128,
    "originalPrice": 110000,
    "price": 85000,
    "discountPercent": 22,
    "badge": "SẠCH SÂU DỊU NHẸ",
    "testedCount": 45,
    "hotPercent": 40,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Sữa rửa mặt tạo bọt mịn tự nhiên giúp lấy đi bụi bẩn, bã nhờn sâu trong lỗ chân lông mà không làm khô căng da nhờ chiết xuất rau má dồi dào và độ pH chuẩn 5.5 lý tưởng cho da.",
    "ingredients": "Chiết xuất rau má bản địa, Decyl Glucoside, Glycerin, Panthenol, Tinh dầu tràm trà kiểm soát mụn.",
    "guidelines": "Lấy một lượng bọt vừa đủ, thoa đều lên da ẩm và massage nhẹ nhàng từ 30s đến 1 phút, sau đó rửa sạch lại với nước ấm."
  },
  {
    "id": "mask-coconut",
    "title": "Mặt Nạ Giấy Sinh Học Dừa Lên Men Cấp Ẩm (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da khô"
    ],
    "rating": 5,
    "ratingValue": 4.9,
    "reviewsCount": 340,
    "originalPrice": 15000,
    "price": 12000,
    "discountPercent": 20,
    "badge": "CẤP ẨM CHUYÊN SÂU",
    "testedCount": 210,
    "hotPercent": 92,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Mặt nạ giấy sinh học được dệt từ nước dừa tươi lên men tự nhiên, ôm khít khuôn mặt như làn da thứ hai. Truyền dẫn lượng ẩm dồi dào gấp 10 lần mặt nạ giấy thông thường, đem lại làn da căng mọng tức thì.",
    "ingredients": "Nước dừa tươi lên men sinh học, Hyaluronic Acid đa tầng, Niacinamide 2%, chiết xuất nha đam.",
    "guidelines": "Đắp mặt nạ lên da sạch trong vòng 15-20 phút. Gỡ mặt nạ ra và vỗ nhẹ để tinh chất thẩm thấu hết. Không cần rửa lại với nước."
  },
  {
    "id": "mask-tea-tree",
    "title": "Mặt Nạ Tràm Trà Làm Dịu & Ngăn Ngừa Mụn (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Dành cho da dầu mụn",
      "Dành cho da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.85,
    "reviewsCount": 195,
    "originalPrice": 10000,
    "price": 8000,
    "discountPercent": 20,
    "badge": "GIẢM MỤN SƯNG ĐỎ",
    "testedCount": 140,
    "hotPercent": 78,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Mặt nạ sợi cotton tự nhiên tẩm tinh chất tràm trà Úc và rau má giúp kháng khuẩn, kháng viêm cực mạnh. Làm xẹp các nốt mụn sưng đỏ nhanh chóng và điều tiết lượng dầu thừa hiệu quả trên da mặt.",
    "ingredients": "Tinh dầu tràm trà Melaleuca Alternifolia, salicylic acid (BHA) 0.5%, chiết xuất trà xanh kháng oxy hóa.",
    "guidelines": "Sau khi rửa mặt sạch, đắp mặt nạ đều lên khuôn mặt. Giữ nguyên từ 10-15 phút rồi tháo bỏ. Vỗ nhẹ cho tinh chất khô thoáng tự nhiên."
  },
  {
    "id": "mask-collagen",
    "title": "Mặt Nạ Tế Bào Gốc Collagen Nâng Cơ Trẻ Hóa (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da lão hóa"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 167,
    "originalPrice": 18000,
    "price": 15000,
    "discountPercent": 16,
    "badge": "TRẺ HÓA CĂNG BÓNG",
    "testedCount": 88,
    "hotPercent": 65,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Dòng mặt nạ cao cấp chứa collagen thủy phân kích thước nano và phức hợp tế bào gốc thực vật giúp kích thích tái tạo collagen tự nhiên dưới da, tăng cường độ đàn hồi và làm mờ nếp nhăn li ti rõ rệt.",
    "ingredients": "Collagen thủy phân từ cá biển sâu, tế bào gốc nho đỏ hữu cơ, Adenosine ngăn lão hóa da, Beta-glucan làm dịu.",
    "guidelines": "Sử dụng 2-3 lần một tuần. Đắp mặt nạ từ 15-20 phút, sau đó mát-xa mặt nhẹ nhàng theo chiều nâng cơ từ dưới lên trên."
  },
  {
    "id": "sunscreen-centella",
    "title": "Kem Chống Nắng Rau Má Kiểm Soát Dầu SPF50 (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Dành cho da dầu mụn",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.75,
    "reviewsCount": 115,
    "originalPrice": 165000,
    "price": 135000,
    "discountPercent": 18,
    "badge": "KIỀM DẦU CHỐNG NẮNG",
    "testedCount": 65,
    "hotPercent": 72,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    "description": "Kem chống nắng thuần vật lý với chiết xuất rau má làm dịu da tức thì, bảo vệ da toàn diện dưới ánh nắng mặt trời đồng thời kiểm soát dầu thừa hiệu quả suốt 8 tiếng không gây bết rít.",
    "ingredients": "Chiết xuất rau má, Zinc Oxide, Titanium Dioxide, Niacinamide, Adenosine.",
    "guidelines": "Thoa lượng vừa đủ lên da trước khi ra nắng 20 phút. Thoa lại sau mỗi 4 tiếng nếu hoạt động ngoài trời liên tục."
  },
  {
    "id": "toner-calendula",
    "title": "Toner Hoa Cúc Cân Bằng Cấp Ẩm Sâu (Mẫu thử gia công)",
    "category": "facial-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 142,
    "originalPrice": 120000,
    "price": 95000,
    "discountPercent": 20,
    "badge": "CẤP ẨM LÀM DỊU",
    "testedCount": 52,
    "hotPercent": 55,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Nước hoa hồng cân bằng ẩm chiết xuất từ những cánh hoa cúc vạn thọ tươi nguyên chất, nhẹ nhàng làm sạch sâu, se khít lỗ chân lông và phục hồi độ ẩm mịn tự nhiên của làn da.",
    "ingredients": "Chiết xuất hoa cúc Calendula, Allantoin, Hyaluronic Acid, chiết xuất rau má dịu da.",
    "guidelines": "Thấm đều toner lên bông tẩy trang rồi nhẹ nhàng lau khắp khuôn mặt, hoặc vỗ trực tiếp bằng tay sạch sau bước rửa mặt."
  },
  {
    "id": "shower-gel",
    "title": "Sữa Tắm Truyền Trắng Body Hương Nước Hoa (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da khô"
    ],
    "rating": 5,
    "ratingValue": 4.6,
    "reviewsCount": 205,
    "originalPrice": 120000,
    "price": 95000,
    "discountPercent": 20,
    "badge": "HƯƠNG NƯỚC HOA SANG TRỌNG",
    "testedCount": 110,
    "hotPercent": 75,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Sữa tắm dạng gel chứa hàng triệu hạt vitamin E tự tan, nhẹ nhàng làm sạch bụi bẩn và tế bào chết xỉn màu. Hương thơm nước hoa Pháp quý phái lưu hương suốt 8 tiếng, kết hợp các dưỡng chất làm trắng da bật tông tự nhiên.",
    "ingredients": "Glutathione, Chiết xuất dâu tằm trắng, Vitamin E, Tinh dầu nước hoa Pháp cao cấp, Cocamidopropyl Betaine.",
    "guidelines": "Lấy lượng sữa tắm vừa đủ ra bông tắm, tạo bọt mịn và xoa đều toàn thân. Massage nhẹ nhàng 3-5 phút để hạt vitamin tan ra và thấm thấu vào da, sau đó xả sạch."
  },
  {
    "id": "body-scrub",
    "title": "Tẩy Tế Bào Chết Hạt Cà Phê Đăk Lăk Mịn Da (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Dành cho da khô",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 150,
    "originalPrice": 95000,
    "price": 75000,
    "discountPercent": 21,
    "badge": "MỊN DA TỨC THÌ",
    "testedCount": 64,
    "hotPercent": 48,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Sự kết hợp hoàn hảo giữa những hạt cà phê Đăk Lăk xay nhuyễn sàng lọc kích thước siêu nhỏ, không gây xước da, và bơ hạt mỡ hữu cơ. Giúp cuốn trôi lớp tế bào chết sần sùi, giải quyết tình trạng viêm nang lông và nuôi dưỡng làn da body mịn màng như em bé.",
    "ingredients": "Hạt cà phê nguyên chất Đăk Lăk, Bơ hạt mỡ (Shea Butter) hữu cơ, Dầu dừa tinh khiết, Tocopheryl Acetate (Vitamin E).",
    "guidelines": "Làm ướt cơ thể. Thoa một lượng vừa đủ scrub lên da và massage nhẹ nhàng từ 5-10 phút, đặc biệt chú ý vùng khuỷu tay, đầu gối. Rửa sạch lại bằng nước."
  },
  {
    "id": "body-lotion",
    "title": "Sữa Dưỡng Thể Trắng Da Chống Nắng Glutathione (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da xỉn màu"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 174,
    "originalPrice": 165000,
    "price": 135000,
    "discountPercent": 18,
    "badge": "BẬT TÔNG AN TOÀN",
    "testedCount": 96,
    "hotPercent": 70,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Sữa dưỡng thể cao cấp kết hợp Glutathione tinh khiết giúp ức chế sắc tố melanin và màng chống nắng UV kép vật lý bảo vệ làn da khỏi tác hại ánh mặt trời, giúp nâng tone da trắng mịn màng và đều màu chỉ sau 2-3 tuần.",
    "ingredients": "Glutathione nồng độ cao, Alpha Arbutin, Titanium Dioxide, Vitamin C ổn định, Chiết xuất dâu tây rừng.",
    "guidelines": "Thoa đều toàn thân vào mỗi sáng và tối sau khi tắm sạch. Massage nhẹ nhàng để dưỡng chất thấm hoàn toàn."
  },
  {
    "id": "body-mist",
    "title": "Xịt Thơm Toàn Thân Hương Hoa Anh Đào (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.65,
    "reviewsCount": 112,
    "originalPrice": 140000,
    "price": 115000,
    "discountPercent": 17,
    "badge": "HƯƠNG THƠM LÔI CUỐN",
    "testedCount": 55,
    "hotPercent": 50,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Sự hòa quyện tuyệt vời của tinh dầu hoa đào Nhật Bản ngọt ngào, lê mọng nước và gỗ hổ phách ấm áp đem lại hương thơm dịu nhẹ, lôi cuốn tự nhiên cùng khả năng bổ sung ẩm tức thì cho da body mượt mà.",
    "ingredients": "Alcohol hữu cơ cất từ lúa mì, Tinh dầu hoa anh đào tự nhiên, Glycerin cấp ẩm, lô hội làm dịu da.",
    "guidelines": "Xịt trực tiếp lên da cơ thể ở khoảng cách 15-20cm, tập trung vào các điểm nhạy cảm hương như cổ tay, vùng sau gáy để giữ hương bền vững."
  },
  {
    "id": "hand-cream",
    "title": "Kem Dưỡng Da Tay Sữa Dừa Mềm Mịn (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Da tay khô ráp",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.75,
    "reviewsCount": 88,
    "originalPrice": 80000,
    "price": 65000,
    "discountPercent": 18,
    "badge": "MỀM DA TỨC THÌ",
    "testedCount": 38,
    "hotPercent": 30,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Hỗn hợp dưỡng ẩm siêu đậm đặc từ dầu dừa nguyên chất ép lạnh và bơ hạt mỡ. Giúp phục hồi nhanh chóng làn da tay bị khô ráp, bong tróc do tiếp xúc hóa chất tẩy rửa hoặc ngồi máy lạnh thường xuyên.",
    "ingredients": "Dầu dừa hữu cơ ép lạnh, Shea Butter hữu cơ, Vitamin B5, chiết xuất rễ cam thảo làm mờ vết thâm.",
    "guidelines": "Lấy một lượng kem nhỏ thoa đều và mát-xa hai bàn tay bất cứ khi nào cảm thấy da bị khô xơ hoặc sau khi rửa tay sạch."
  },
  {
    "id": "body-wrap",
    "title": "Kem Ủ Trắng Body Tảo Biển Pháp (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Da xỉn màu",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.82,
    "reviewsCount": 145,
    "originalPrice": 155000,
    "price": 125000,
    "discountPercent": 19,
    "badge": "BẬT TÔNG SPA",
    "testedCount": 72,
    "hotPercent": 60,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    "description": "Giải pháp ủ trắng body chuẩn spa tại nhà nhờ chiết xuất tảo biển Pháp dồi dào khoáng chất và bùn khoáng thiên nhiên. Đào thải độc tố, bã nhờn sâu trong lỗ chân lông và nuôi dưỡng làn da body trắng hồng mướt mịn rõ rệt.",
    "ingredients": "Bột tảo biển Brittany Pháp, Bùn khoáng Bentonite tinh lọc, Niacinamide 3%, dịch chiết nhân sâm trắng.",
    "guidelines": "Thoa một lớp kem ủ mỏng lên toàn bộ da body sau khi tẩy tế bào chết. Ủ trong 15-20 phút, sau đó tắm sạch lại với nước ấm."
  },
  {
    "id": "body-peel",
    "title": "Gel Tẩy Tế Bào Chết Body AHA & Tinh Chất Cam (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Mọi loại da",
      "Da sần sùi dạn dày"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 94,
    "originalPrice": 110000,
    "price": 85000,
    "discountPercent": 22,
    "badge": "KÌ SẠCH TẾ BÀO CHẾT",
    "testedCount": 38,
    "hotPercent": 42,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Gel tẩy tế bào chết hóa học kết hợp vật lý nhờ AHA cam tươi dịu nhẹ, cuốn trôi bã nhờn, thông thoáng nang chân lông và dưỡng ẩm sâu cho làn da sần sùi bật tông láng mịn nhanh chóng.",
    "ingredients": "AHA chiết xuất cam sành tươi, Cellulose tự nhiên, Glycerin, Panthenol.",
    "guidelines": "Thoa một lượng gel vừa đủ lên da body khô ráo, massage xoay tròn nhẹ nhàng cho đến khi lớp tế bào sừng kết tủa rơi ra, sau đó tắm lại sạch."
  },
  {
    "id": "body-oil",
    "title": "Dầu Dưỡng Thể Hoa Oải Hương Thư Giãn (Mẫu thử gia công)",
    "category": "body-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Da rất khô",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.85,
    "reviewsCount": 125,
    "originalPrice": 185000,
    "price": 145000,
    "discountPercent": 21,
    "badge": "THƯ GIÃN BAN ĐÊM",
    "testedCount": 48,
    "hotPercent": 68,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Dầu massage dưỡng thể kết hợp các loại dầu hạt ép lạnh hữu cơ cùng tinh dầu oải hương chuẩn Pháp, giải tỏa mệt mỏi cơ bắp và đem lại giấc ngủ ngon mượt mà.",
    "ingredients": "Tinh dầu Lavender Pháp, Dầu hạnh nhân ngọt, Dầu Jojoba ép lạnh, Vitamin E.",
    "guidelines": "Sau khi tắm xong và da còn ẩm, thoa vài giọt dầu lên cơ thể rồi massage nhẹ nhàng đến khi thấm hết để khóa ẩm sâu."
  },
  {
    "id": "shampoo-grapefruit",
    "title": "Dầu Gội Bưởi Đậm Đặc Giảm Rụng & Kích Mọc Tóc (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 290,
    "originalPrice": 140000,
    "price": 110000,
    "discountPercent": 21,
    "badge": "GIẢM RỤNG 95%",
    "testedCount": 180,
    "hotPercent": 90,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Dầu gội thảo dược không chứa sulfate, silicon hay paraben gây hại da đầu. Được điều chế từ tinh dầu vỏ bưởi da xanh nguyên chất kết hợp cùng chiết xuất cỏ mần trầu, hà thủ ô. Giúp làm sạch tóc dịu nhẹ, ngăn rụng tóc rõ rệt sau 2 tuần và kích thích nang tóc mới mọc nhanh chóng.",
    "ingredients": "Tinh dầu vỏ bưởi da xanh, Chiết xuất cỏ mần trầu, Chiết xuất hà thủ ô, Biotin, Panthenol.",
    "guidelines": "Làm ướt tóc hoàn toàn, lấy một lượng gội vừa đủ xoa đều lòng bàn tay để tạo bọt rồi massage nhẹ nhàng lên da đầu trong 3-5 phút. Xả sạch với nước ấm."
  },
  {
    "id": "conditioner-grapefruit",
    "title": "Kem Xả Tóc Tinh Dầu Bưởi Phục Hồi Tóc Hư Tổn (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.6,
    "reviewsCount": 115,
    "originalPrice": 120000,
    "price": 95000,
    "discountPercent": 20,
    "badge": "MỀM MƯỢT TỰ NHIÊN",
    "testedCount": 45,
    "hotPercent": 35,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Kem xả giàu dưỡng chất chiết xuất từ tinh dầu vỏ bưởi da xanh kết hợp protein tơ tằm. Cung cấp độ ẩm dồi dào cho sợi tóc, phục hồi lớp biểu bì tóc bị hư tổn do hóa chất uốn nhuộm, giúp tóc suôn mượt, giảm chẻ ngọn và bóng khỏe tự nhiên.",
    "ingredients": "Tinh dầu vỏ bưởi, Thủy phân Protein tơ tằm, Dầu Argan hữu cơ, Lactic Acid, Vitamin B5.",
    "guidelines": "Sau khi gội sạch, vắt bớt nước trên tóc. Thoa kem xả từ thân đến ngọn tóc (tránh thoa trực tiếp lên da đầu). Để yên 2-3 phút cho dưỡng chất ngấm sâu rồi xả sạch."
  },
  {
    "id": "hair-serum",
    "title": "Tinh Dầu Dưỡng Tóc Argan Phục Hồi Bóng Mượt (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Tóc hư tổn",
      "Mọi loại tóc"
    ],
    "rating": 5,
    "ratingValue": 4.88,
    "reviewsCount": 164,
    "originalPrice": 160000,
    "price": 130000,
    "discountPercent": 18,
    "badge": "PHUK HỒI CHUYÊN SÂU",
    "testedCount": 78,
    "hotPercent": 72,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Serum dưỡng tóc chứa dầu Argan hữu cơ từ Maroc kết hợp với Vitamin E đậm đặc. Thấm tức thì vào lõi tóc, lấp đầy các hư tổn biểu bì và tạo màng chắn bảo vệ tóc khỏi nhiệt độ cao của máy sấy, máy uốn.",
    "ingredients": "Dầu Argan hữu cơ ép lạnh, tinh dầu dừa phân đoạn, vitamin E, chiết xuất hạt lanh thiên nhiên.",
    "guidelines": "Lấy 2-3 giọt serum xoa đều giữa hai lòng bàn tay rồi vuốt nhẹ lên thân và đuôi tóc ẩm hoặc khô. Không xả lại với nước."
  },
  {
    "id": "hair-mist",
    "title": "Xịt Dưỡng Tóc Vỏ Bưởi & Biotin (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Tóc thưa yếu, dễ rụng"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 142,
    "originalPrice": 95000,
    "price": 75000,
    "discountPercent": 21,
    "badge": "KÍCH MỌC TÓC",
    "testedCount": 95,
    "hotPercent": 68,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Xịt dưỡng tóc hai lớp kết hợp tinh dầu vỏ bưởi nguyên chất và Biotin đậm đặc. Thẩm thấu sâu trực tiếp vào các gốc nang tóc giúp kích thích mọc tóc con mạnh mẽ, cho mái tóc dày mượt bồng bềnh tự nhiên.",
    "ingredients": "Tinh dầu vỏ bưởi da xanh chưng cất hơi nước, Biotin (Vitamin B7), Panthenol, chiết xuất nhân sâm.",
    "guidelines": "Lắc đều chai trước khi dùng để hai pha hòa quyện. Xịt trực tiếp lên da đầu khô hoặc sau khi gội và lau ráo tóc, mát-xa nhẹ nhàng bằng các đầu ngón tay."
  },
  {
    "id": "scalp-scrub",
    "title": "Tẩy Tế Bào Chết Da Đầu Muối Biển & Bạc Hà (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Da đầu dầu gàu",
      "Mọi loại da đầu"
    ],
    "rating": 5,
    "ratingValue": 4.82,
    "reviewsCount": 98,
    "originalPrice": 150000,
    "price": 120000,
    "discountPercent": 20,
    "badge": "LÀM SẠCH GÀU NGỨA",
    "testedCount": 42,
    "hotPercent": 45,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    "description": "Cơ chế tẩy sạch sâu tế bào chết bằng các hạt tinh thể muối biển Đại Dương kết hợp cùng tinh dầu bạc hà mát lạnh. Giúp giải phóng nang tóc khỏi gàu ngứa, dầu thừa bít tắc và ngăn gàu quay trở lại rõ rệt.",
    "ingredients": "Hạt muối biển hồng và trắng mịn, tinh dầu bạc hà (menthol), salicylic acid tự nhiên, chiết xuất gừng làm ấm kích thích tuần hoàn.",
    "guidelines": "Làm ướt tóc, thoa một lượng scrub vừa đủ trực tiếp lên các đường rẽ ngôi da đầu. Massage nhẹ nhàng 3-5 phút tạo bọt dịu nhẹ rồi xả sạch bằng nước ấm."
  },
  {
    "id": "hair-mask-salon",
    "title": "Kem Ủ Tóc Collagen Thủy Phân Chuẩn Salon (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Tóc khô xơ, hư tổn nặng"
    ],
    "rating": 5,
    "ratingValue": 4.78,
    "reviewsCount": 110,
    "originalPrice": 175000,
    "price": 140000,
    "discountPercent": 20,
    "badge": "MÁI TÓC SUÔN MƯỢT",
    "testedCount": 52,
    "hotPercent": 55,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Mặt nạ phục hồi tóc chuyên sâu ứng dụng công nghệ collagen thủy phân cấu trúc phân tử siêu mịn. Giúp thấm sâu vào từng thớ tóc, tái kết cấu các liên kết keratin bị gãy rách do nhiệt và hóa chất uốn nhuộm.",
    "ingredients": "Hydrolyzed Collagen, Keratin thủy phân, Bơ hạt mỡ, dồi dào axit amin thiết yếu.",
    "guidelines": "Sau khi gội đầu, thoa lượng kem vừa đủ lên toàn bộ thân tóc (tránh da đầu). Ủ lạnh 15-20 phút hoặc hấp nóng, sau đó xả sạch hoàn toàn với nước lạnh."
  },
  {
    "id": "shampoo-locust",
    "title": "Dầu Gội Bồ Kết Cô Đặc Ngăn Gàu Nấm Tóc (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Da đầu nhiều gàu",
      "Mọi loại tóc"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 142,
    "originalPrice": 135000,
    "price": 105000,
    "discountPercent": 22,
    "badge": "TRUYỀN THỐNG CỔ TRUYỀN",
    "testedCount": 54,
    "hotPercent": 62,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Sự hồi sinh hoàn hảo của công thức bồ kết, hương nhu chưng cất dân gian kết hợp cùng bưởi bồng. Cân bằng bã nhờn, gội sạch tận gốc gàu nấm ngứa cứng đầu và nuôi dưỡng mái tóc đen bóng tự nhiên bồng bềnh quyến rũ.",
    "ingredients": "Dịch chiết quả bồ kết nướng, Tinh dầu cỏ hương nhu, cỏ mần trầu, tinh chất gừng ấm.",
    "guidelines": "Làm ướt tóc và da đầu. Lấy một lượng vừa đủ massage nhẹ nhàng để bọt tự nhiên len lỏi vào chân tóc, sau đó gội rửa thật sạch."
  },
  {
    "id": "hair-heat-protect",
    "title": "Xịt Dưỡng Tóc Bảo Vệ Nhiệt Keratin (Mẫu thử gia công)",
    "category": "hair-care",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Tóc hay uốn nhuộm",
      "Tóc khô xơ"
    ],
    "rating": 5,
    "ratingValue": 4.72,
    "reviewsCount": 78,
    "originalPrice": 105000,
    "price": 85000,
    "discountPercent": 19,
    "badge": "BẢO VỆ NHIỆT 230°C",
    "testedCount": 30,
    "hotPercent": 35,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Màng chắn nhiệt tối ưu cho sợi tóc mỏng manh trước tác động của máy sấy, máy uốn, duỗi nhiệt cao. Cung cấp màng bọc keratin phục hồi liên kết đứt gãy tức thì.",
    "ingredients": "Keratin thủy phân, chiết xuất tơ tằm, dầu Argan, màng bọc silicone chịu nhiệt.",
    "guidelines": "Xịt đều lên tóc ẩm trước khi sấy khô hoặc xịt lên tóc khô trước khi sử dụng các thiết bị tạo kiểu bằng nhiệt."
  },
  {
    "id": "lip-tint",
    "title": "Son Kem Lì Velvet Lip Tint Siêu Mịn Môi (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Premium Eco",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da khô",
      "Dành cho da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 220,
    "originalPrice": 95000,
    "price": 75000,
    "discountPercent": 21,
    "badge": "LÊN MÀU CHUẨN",
    "testedCount": 28,
    "hotPercent": 28,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Công thức son kem bùn bọc nước độc đáo mang kết cấu xốp mịn như nhung. Màu lên chuẩn sắc chỉ sau một lần quẹt, nhẹ tênh không gây khô môi hay lộ rãnh môi nhờ chứa dầu bơ và Vitamin E giữ ẩm sâu. Độ bám màu lên đến 8 tiếng.",
    "ingredients": "Dầu bơ ép lạnh hữu cơ, Vitamin E tự nhiên, Màu khoáng tiêu chuẩn FDA Mỹ, Sáp ong trắng tinh khiết.",
    "guidelines": "Thoa một lớp mỏng lên môi, bặm nhẹ và đợi 30 giây để lớp son tự set màu. Cảm nhận độ xốp, mướt mịn và khả năng giữ màu sau khi ăn uống nhẹ."
  },
  {
    "id": "cushion",
    "title": "Phấn Nước Cushion Che Phủ Hoàn Hảo & Kiềm Dầu SPF50 (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Premium Eco",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da dầu mụn",
      "Dành cho da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 140,
    "originalPrice": 190000,
    "price": 155000,
    "discountPercent": 18,
    "badge": "CHE PHỦ 100%",
    "testedCount": 73,
    "hotPercent": 73,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Cushion thế hệ mới tích hợp màng lọc chống nắng vật lý phổ rộng và hạt phấn nano siêu mịn. Mang lại lớp nền mỏng nhẹ tự nhiên nhưng che phủ hoàn hảo các khuyết điểm, mụn thâm, lỗ chân lông to và kiểm soát dầu thừa suốt 12 tiếng.",
    "ingredients": "Chiết xuất tràm trà, Niacinamide 2%, Zinc Oxide, Titanium Dioxide, Vitamin B5 phục hồi.",
    "guidelines": "Dùng bông mút dặm nhẹ phấn lên da mặt từ trong ra ngoài. Cảm nhận độ che phủ, tính kiềm dầu và độ mỏng nhẹ không bí bách của lớp nền."
  },
  {
    "id": "lipstick",
    "title": "Son Thỏi Lì Satin Mịn Môi Cao Cấp (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Mọi loại môi"
    ],
    "rating": 5,
    "ratingValue": 4.85,
    "reviewsCount": 162,
    "originalPrice": 110000,
    "price": 85000,
    "discountPercent": 22,
    "badge": "MÀU LÊN CỰC ĐẸP",
    "testedCount": 42,
    "hotPercent": 50,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Son thỏi lì với lớp finish satin bóng nhẹ tự nhiên mang lại vẻ sang quý đầy mê hoặc. Kết cấu sáp mềm dồi dào hyaluronic acid nuôi dưỡng môi căng mướt suốt cả ngày, bền màu tới 6h không gây bong tróc da môi.",
    "ingredients": "Hyaluronic Acid bọc hạt, Sáp Candelilla tự nhiên, dầu Jojoba hữu cơ, màu khoáng tinh khiết FDA.",
    "guidelines": "Thoa trực tiếp lên môi từ lòng môi ra ngoài mép. Có thể thoa 2 lớp để màu son lên đậm đà sắc nét hơn."
  },
  {
    "id": "foundation",
    "title": "Kem Nền Liquid Foundation Che Phủ Mỏng Nhẹ (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da khô"
    ],
    "rating": 5,
    "ratingValue": 4.72,
    "reviewsCount": 104,
    "originalPrice": 180000,
    "price": 145000,
    "discountPercent": 19,
    "badge": "NỀN MỎNG MƯỢT",
    "testedCount": 61,
    "hotPercent": 55,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    "description": "Kem nền dạng lỏng (Liquid) có kết cấu siêu mỏng nhẹ, dễ dàng dàn đều trên da, tiệp màu hoàn hảo và che phủ 90% khuyết điểm thâm mụn, mạch máu nổi giúp làn da sáng mịn tự nhiên không tì vết.",
    "ingredients": "Glycerin ngậm nước, màng silicon thông minh thông thoáng lỗ chân lông, chiết xuất ngọc trai dưỡng sáng.",
    "guidelines": "Lấy một vài giọt chấm lên các điểm trên khuôn mặt, dùng cọ nền hoặc mút ẩm tán đều từ trong ra ngoài."
  },
  {
    "id": "eyeliner",
    "title": "Bút Kẻ Mắt Nước Eyeliner Chống Trôi Siêu Sắc Nét (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Mọi loại mắt"
    ],
    "rating": 5,
    "ratingValue": 4.78,
    "reviewsCount": 135,
    "originalPrice": 85000,
    "price": 65000,
    "discountPercent": 23,
    "badge": "CHỐNG THẤM NƯỚC",
    "testedCount": 33,
    "hotPercent": 35,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Bút kẻ mắt nước đầu cọ lông mảnh chỉ 0.01mm giúp dễ dàng tạo các đường liner mảnh khảnh, sắc nét. Công nghệ màng phim thông minh chống trôi, chống lem hoàn toàn khi đổ mồ hôi hay gặp nước mưa.",
    "ingredients": "Acrylates Copolymer tạo màng phim giữ màu, carbon đen tinh khiết, nước siêu tinh khiết EDI.",
    "guidelines": "Đặt bút nằm sát đường mi mắt, vẽ một nét liền từ đầu mắt hướng ra đuôi mắt, có thể kẻ xếch nhẹ ở đuôi để tạo hiệu ứng mắt mèo."
  },
  {
    "id": "makeup-remover",
    "title": "Nước Tẩy Trang Micellar Nước Hoa Hồng (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 154,
    "originalPrice": 100000,
    "price": 80000,
    "discountPercent": 20,
    "badge": "SẠCH SÂU THÔNG THOÁNG",
    "testedCount": 88,
    "hotPercent": 65,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Ứng dụng các phân tử micellar thông minh như thỏi nam châm hút sạch bụi mịn, kem chống nắng và các lớp trang điểm cứng đầu, hòa quyện dịch cất nước hoa hồng hữu cơ nuôi dưỡng làn da mát lành tức thì.",
    "ingredients": "Dịch cất nước hoa hồng Damask hữu cơ, Glycerin, Poloxamer 184 dịu nhẹ, chiết xuất cúc La Mã.",
    "guidelines": "Thấm đều nước tẩy trang lên bông cotton, nhẹ nhàng lau khắp da mặt và cổ theo chiều cấu tạo da. Không cần rửa lại với nước."
  },
  {
    "id": "lip-oil",
    "title": "Son Bóng Dưỡng Môi Collagen Glow Lip Oil (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Premium Eco",
    "skinTypes": [
      "Da môi thô ráp",
      "Mọi loại môi"
    ],
    "rating": 5,
    "ratingValue": 4.76,
    "reviewsCount": 82,
    "originalPrice": 98000,
    "price": 78000,
    "discountPercent": 20,
    "badge": "CĂNG MỌNG GLOW",
    "testedCount": 34,
    "hotPercent": 48,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Dầu bóng dưỡng môi dồi dào màng bảo vệ từ collagen thủy phân và dầu hạt quý hiếm. Mang lại hiệu ứng môi gương pha lê căng bóng, lấp lánh và dưỡng ẩm mịn sâu tức thì.",
    "ingredients": "Collagen thủy phân từ biển sâu, Dầu hạt tầm xuân hữu cơ, Vitamin E, Tinh dầu bạc hà tự nhiên.",
    "guidelines": "Thoa trực tiếp lên môi để dưỡng ẩm sâu hoặc phủ đè lên một lớp son màu để tạo độ bóng mượt pha lê quyến rũ."
  },
  {
    "id": "setting-powder",
    "title": "Phấn Phủ Bột Khoáng Kiềm Dầu Mờ Lỗ Chân Lông (Mẫu thử gia công)",
    "category": "makeup",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Da dầu mụn",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 114,
    "originalPrice": 120000,
    "price": 95000,
    "discountPercent": 20,
    "badge": "KIỀM DẦU BLUR 10H",
    "testedCount": 42,
    "hotPercent": 55,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Phấn phủ dạng bột khoáng siêu tinh khiết kiềm dầu mạnh mẽ tới 10 tiếng, làm mịn kết cấu lỗ chân lông, tạo hiệu ứng mờ nhẹ tự nhiên không gây mốc trắng.",
    "ingredients": "Silica tự nhiên, Bột bắp hữu cơ, Silica bọc Hyaluronic Acid, Chiết xuất trà xanh kháng khuẩn.",
    "guidelines": "Dùng bông phấn hoặc cọ phủ đều một lớp mỏng lên vùng da chữ T nhiều dầu hoặc toàn mặt sau khi đánh nền."
  },
  {
    "id": "intimate-wash",
    "title": "Dung Dịch Vệ Sinh Trầu Không Dịu Nhẹ Kháng Khuẩn (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Dành cho da nhạy cảm",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 175,
    "originalPrice": 90000,
    "price": 70000,
    "discountPercent": 22,
    "badge": "DỊU NHẸ LÀNH TÍNH",
    "testedCount": 85,
    "hotPercent": 55,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Dịch chiết xuất từ lá trầu không bản địa kết hợp cùng trà xanh, hoa cúc La Mã và Acid Lactic cân bằng độ pH hoàn hảo. Giúp làm sạch vùng kín dịu nhẹ, kháng khuẩn bảo vệ, khử mùi hiệu quả và dưỡng da mềm mại.",
    "ingredients": "Dịch chiết lá trầu không, Chiết xuất trà xanh, Chiết xuất cúc La Mã, Lactic Acid (pH 4.5), Nano Bạc kháng khuẩn.",
    "guidelines": "Làm ướt vùng kín, lấy một lượng nhỏ gel tạo bọt nhẹ nhàng trong lòng bàn tay và xoa rửa ngoài da trong 1 phút, sau đó rửa lại thật sạch bằng nước."
  },
  {
    "id": "mouthwash",
    "title": "Nước Súc Miệng Thảo Mộc Khử Mùi & Thơm Miệng (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi đối tượng"
    ],
    "rating": 5,
    "ratingValue": 4.68,
    "reviewsCount": 92,
    "originalPrice": 85000,
    "price": 65000,
    "discountPercent": 23,
    "badge": "HƠI THỞ THƠM MÁT",
    "testedCount": 38,
    "hotPercent": 40,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Nước súc miệng thảo mộc chiết xuất từ lá trà xanh bản địa, bạc hà và muối biển tinh khiết giúp tiêu diệt 99.9% vi khuẩn gây mùi trong khoang miệng, ngăn ngừa mảng bám gội sạch hơi thở thơm mát dễ chịu.",
    "ingredients": "Chiết xuất trà xanh kháng khuẩn, Tinh dầu bạc hà, tinh dầu húng quế, tinh thể muối đại dương, Xylitol bảo vệ men răng.",
    "guidelines": "Sau khi chải răng sạch, súc miệng với 15-20ml dung dịch thảo mộc trong 30 giây rồi nhổ ra. Không cần súc lại với nước sinh hoạt."
  },
  {
    "id": "deodorant",
    "title": "Lăn Khử Mùi Sinh Học Tràm Trà & Bạc Hà (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Mọi loại da",
      "Da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.74,
    "reviewsCount": 114,
    "originalPrice": 110000,
    "price": 85000,
    "discountPercent": 22,
    "badge": "KHÔ THOÁNG 24H",
    "testedCount": 56,
    "hotPercent": 48,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    "description": "Công thức khử mùi sinh học dạng lăn không chứa cồn hay muối nhôm gây thâm nách. Sử dụng phức hợp enzyme men và tinh dầu tràm trà để ức chế hoàn toàn vi khuẩn gây mùi cơ thể dưới cánh tay, duy trì sự khô thoáng thơm mát suốt 24 tiếng.",
    "ingredients": "Phức hợp Enzyme saccharomyces lên men, Tinh dầu tràm trà Úc, bột bắp hữu cơ hút ẩm, chiết xuất rễ cam thảo sáng da.",
    "guidelines": "Lăn đều 2-3 lượt lên vùng da dưới cánh tay đã được tắm sạch và lau khô hoàn toàn vào mỗi sáng."
  },
  {
    "id": "toothpaste",
    "title": "Kem Đánh Răng Than Hoạt Tính Làm Trắng Răng (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Premium Eco",
    "skinTypes": [
      "Răng nhạy cảm",
      "Răng ố vàng"
    ],
    "rating": 5,
    "ratingValue": 4.8,
    "reviewsCount": 154,
    "originalPrice": 95000,
    "price": 75000,
    "discountPercent": 21,
    "badge": "TRẮNG RĂNG TỰ NHIÊN",
    "testedCount": 78,
    "hotPercent": 65,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Kem đánh răng thảo mộc tích hợp bột than tre hoạt tính gội sạch các mảng bám ố vàng do trà và cà phê gây ra trên men răng, đồng thời củng cố độ bền chắc nướu lợi bằng chiết xuất cúc la mã.",
    "ingredients": "Bột than hoạt tính tre hữu cơ, chiết xuất cúc La Mã, Calcium Carbonate, keo ong tự nhiên bảo vệ răng.",
    "guidelines": "Sử dụng một lượng kem vừa đủ chải răng đều đặn ít nhất 2 lần mỗi ngày (sáng và tối) để bảo vệ nụ cười sáng khỏe."
  },
  {
    "id": "hand-wash",
    "title": "Sữa Rửa Tay Tạo Bọt Trà Xanh Kháng Khuẩn (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi loại da tay"
    ],
    "rating": 5,
    "ratingValue": 4.65,
    "reviewsCount": 74,
    "originalPrice": 75000,
    "price": 60000,
    "discountPercent": 20,
    "badge": "KHÁNG KHUẨN DỊU NHẸ",
    "testedCount": 30,
    "hotPercent": 25,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Sữa rửa tay thế hệ mới tự tạo lớp bọt bông xốp siêu dịu nhẹ. Chứa 99% chiết xuất từ trà xanh và lô hội hữu cơ giúp loại bỏ nhanh chóng mùi thức ăn tanh hôi và vi khuẩn có hại bám dính mà vẫn giữ đôi bàn tay mềm mượt.",
    "ingredients": "Dịch chiết trà xanh hữu cơ, gel lô hội tươi, dầu tràm, chất tạo bọt dịu nhẹ gốc dừa.",
    "guidelines": "Ấn vòi lấy một lượng bọt xốp vừa đủ xoa đều mát-xa hai bàn tay trong ít nhất 20-30 giây rồi rửa sạch hoàn toàn dưới vòi nước chảy."
  },
  {
    "id": "breath-spray",
    "title": "Xịt Thơm Miệng Thảo Mộc Bạc Hà (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi đối tượng"
    ],
    "rating": 5,
    "ratingValue": 4.75,
    "reviewsCount": 85,
    "originalPrice": 75000,
    "price": 60000,
    "discountPercent": 20,
    "badge": "HƠI THỞ THƠM MÁT TỨC THÌ",
    "testedCount": 44,
    "hotPercent": 40,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Xịt thơm miệng nhỏ gọn tiện lợi mang theo người. Chiết xuất từ tinh dầu bạc hà núi cao mang lại cảm giác sảng khoái và hơi thở thơm mát tức thì chỉ sau một lần xịt, tự tin trong mọi cuộc giao tiếp.",
    "ingredients": "Tinh dầu bạc hà tự nhiên, chiết xuất cam thảo ngọt mát, keo ong bảo vệ vòm họng.",
    "guidelines": "Xịt trực tiếp vào khoang miệng từ 1-2 lần mỗi khi cảm thấy hơi thở có mùi hoặc sau khi dùng bữa ăn nặng mùi."
  },
  {
    "id": "men-wash",
    "title": "Dung Dịch Vệ Sinh Nam Giới Bạc Hà & Trầu Không (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Cosbuilt LAB",
    "skinTypes": [
      "Mọi loại da",
      "Da nhạy cảm"
    ],
    "rating": 5,
    "ratingValue": 4.7,
    "reviewsCount": 65,
    "originalPrice": 95000,
    "price": 75000,
    "discountPercent": 21,
    "badge": "MÁT LẠNH PHONG ĐỘ",
    "testedCount": 24,
    "hotPercent": 35,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Dung dạo bọt mát lạnh tột đỉnh từ bạc hà và trầu không, khử mùi hôi nam giới, đem lại sự sạch sâu khô thoáng tự tin tuyệt đối.",
    "ingredients": "Dịch chiết trầu không, Tinh thể bạc hà, Lactic Acid, Vitamin E.",
    "guidelines": "Xoa tạo bọt nhẹ nhàng vùng kín ngoài da trong 1 phút sau đó xả sạch kỹ với nước."
  },
  {
    "id": "massage-oil",
    "title": "Dầu Massage Sả Chanh Bừng Tỉnh Năng Lượng (Mẫu thử gia công)",
    "category": "personal-care",
    "lab": "Organic Formula",
    "skinTypes": [
      "Mọi đối tượng"
    ],
    "rating": 5,
    "ratingValue": 4.82,
    "reviewsCount": 80,
    "originalPrice": 145000,
    "price": 115000,
    "discountPercent": 20,
    "badge": "BỪNG TỈNH NĂNG LƯỢNG",
    "testedCount": 36,
    "hotPercent": 50,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Dầu massage dưỡng da cơ thể chiết xuất sả chanh nguyên chất, giúp làm ấm, đào thải độc tố và xoa dịu stress mệt mỏi.",
    "ingredients": "Tinh dầu sả chanh, Dầu cám gạo ép lạnh, Dầu hướng dương, chiết xuất gừng ấm.",
    "guidelines": "Thoa một lượng dầu vừa đủ lên cơ thể và tiến hành mát-xa xoa bóp huyệt đạo thư giãn sâu."
  },
  {
    "id": "exosome-serum",
    "title": "Serum Tế Bào Gốc Exosome Phục Hồi Tái Tạo Da Tầng Sâu (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Dành cho da nhạy cảm",
      "Dành cho da khô",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.95,
    "reviewsCount": 380,
    "originalPrice": 200000,
    "price": 160000,
    "discountPercent": 20,
    "badge": "CÔNG NGHỆ TẾ BÀO",
    "testedCount": 198,
    "hotPercent": 95,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Ứng dụng đột phá công nghệ Exosome - chất truyền tin tế bào siêu nhỏ có kích thước nano chỉ bằng 1/1000 tế bào thông thường. Mang lại khả năng tái tạo các tế bào da hư tổn cấp tốc gấp 20 lần hoạt chất thông thường, củng cố màng bảo vệ da mỏng yếu.",
    "ingredients": "Exosome chiết xuất từ rau má hữu cơ, EGF/FGF peptide tinh khiết, Panthenol 10%, Hyaluronic Acid đa trọng lượng phân tử.",
    "guidelines": "Thoa 3-4 giọt lên da mặt sạch sau bước cân bằng ẩm. Vỗ nhẹ nhàng để hạt exosome siêu nhỏ len lỏi sâu vào tế bào da. Cực kỳ thích hợp dưỡng phục hồi sau liệu trình thẩm mỹ xâm lấn."
  },
  {
    "id": "retinol-liposome",
    "title": "Kem Trẻ Hóa Da Retinol Bọc Liposome Giải Phóng Chậm (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da khô"
    ],
    "rating": 5,
    "ratingValue": 4.88,
    "reviewsCount": 245,
    "originalPrice": 185000,
    "price": 150000,
    "discountPercent": 18,
    "badge": "RETINOL BỌC LIPOSOME",
    "testedCount": 132,
    "hotPercent": 88,
    "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600",
    "description": "Retinol tinh khiết được bao bọc trong cấu trúc màng Liposome sinh học hai lớp siêu bền vững. Công nghệ này giúp hoạt chất không bị oxy hóa phân hủy bởi ánh sáng và nhiệt độ, đồng thời giải phóng chậm Retinol trên bề mặt da suốt 8h để triệt tiêu hoàn toàn kích ứng, mẩn đỏ đặc trưng của retinol truyền thống.",
    "ingredients": "Retinol 1% tinh khiết bọc Liposome, Ceramide NP 1%, Squalane thực vật, chiết xuất sâm đỏ Thụy Sĩ.",
    "guidelines": "Sử dụng vào buổi tối sau bước serum dưỡng ẩm. Lấy lượng kem nhỏ bằng hạt đậu thoa mỏng và mát xa đều vùng mặt. Khuyến nghị bắt đầu sử dụng 2-3 lần/tuần để da thích nghi."
  },
  {
    "id": "microneedle-cream",
    "title": "Kem Vi Kim Sinh Học Tảo Biển Căng Bóng Da (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Da sẹo thâm, lỗ chân lông to"
    ],
    "rating": 5,
    "ratingValue": 4.82,
    "reviewsCount": 112,
    "originalPrice": 195000,
    "price": 155000,
    "discountPercent": 20,
    "badge": "VI KIM SINH HỌC TẢO BIỂN",
    "testedCount": 54,
    "hotPercent": 60,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Ứng dụng các gai vi kim sinh học silic tự nhiên siêu nhỏ chiết xuất từ tảo biển Brittany. Khơi gợi cơ chế tự sửa chữa vết thương tổn tế bào da, làm thông thoáng phễu lỗ chân lông và đẩy nhanh chu kỳ sừng hóa da giúp căng bóng mịn màng.",
    "ingredients": "Spicules tảo biển tinh khiết 100%, chiết xuất tế bào gốc nhân sâm, peptide sinh học dồi dào, vitamin B5 làm dịu.",
    "guidelines": "Dùng lượng nhỏ thoa lên vùng da sẹo thâm hoặc toàn mặt vào buổi tối. Nhấn nhẹ tay vào da để cảm nhận cảm giác kim châm li ti (hiện tượng sinh học bình thường). Sử dụng 1-2 lần một tuần."
  },
  {
    "id": "peptide-ampoule",
    "title": "Ampoule Peptide Sinh Học Kích Hoạt Collagen (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Da chùng nhão, nếp nhăn"
    ],
    "rating": 5,
    "ratingValue": 4.9,
    "reviewsCount": 136,
    "originalPrice": 180000,
    "price": 145000,
    "discountPercent": 19,
    "badge": "KÍCH HOẠT COLLAGEN",
    "testedCount": 68,
    "hotPercent": 70,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
    "description": "Tinh chất Ampoule cô đặc đậm đặc chứa phức hợp 5 loại peptide sinh học thế hệ mới. Kích hoạt trực tiếp chuỗi sản sinh collagen và elastin nằm sâu trong biểu bì, làm đầy các rãnh cười và nâng đỡ cơ mặt săn chắc.",
    "ingredients": "Complex 5-Peptide sinh học nồng độ cao, Adenosine chiết xuất lên men, Axit amin thiết yếu tinh khiết.",
    "guidelines": "Thoa nửa ống Ampoule đều lên toàn bộ khuôn mặt vào ban đêm sau khi rửa mặt sạch. Thoa đều hướng lên để nâng cơ."
  },
  {
    "id": "exosome-mask",
    "title": "Mặt Nạ Tế Bào Gốc Exosome Căng Bóng Cấp Tốc (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Da xỉn màu mệt mỏi"
    ],
    "rating": 5,
    "ratingValue": 4.96,
    "reviewsCount": 220,
    "originalPrice": 20000,
    "price": 16000,
    "discountPercent": 20,
    "badge": "CĂNG BÓNG CẤP TỐC",
    "testedCount": 110,
    "hotPercent": 88,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Mặt nạ sinh học ứng dụng công nghệ truyền dẫn tế bào Exosome đỉnh cao. Cấp cứu tức thì cho làn da xỉn màu mệt mỏi, thiếu sức sống sau những ngày làm việc căng thẳng, mang lại độ ẩm vượt trội và căng mọng như ngậm nước.",
    "ingredients": "Exosome chiết xuất thực vật, Niacinamide 3%, dịch nhầy ốc sên đen lên men, peptide đồng kháng viêm.",
    "guidelines": "Đắp mặt nạ ôm khít lên khuôn mặt trong 15-20 phút. Gỡ bỏ mặt nạ và massage vỗ nhẹ tinh chất còn dư cho thẩm thấu sâu."
  },
  {
    "id": "sunscreen-fluid",
    "title": "Sữa Chống Nắng Vật Lý Màng Lọc Phân Tử Thế Hệ Mới (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Mọi loại da",
      "Dành cho da điều trị"
    ],
    "rating": 5,
    "ratingValue": 4.85,
    "reviewsCount": 184,
    "originalPrice": 170000,
    "price": 135000,
    "discountPercent": 20,
    "badge": "CHỐNG NẮNG PHỔ RỘNG",
    "testedCount": 90,
    "hotPercent": 80,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
    "description": "Sữa chống nắng vật lý ứng dụng màng lọc bảo vệ dạng phân tử nano siêu ổn định SPF50+ PA++++. Chống tia UVA, UVB cực đỉnh đồng thời bảo vệ da toàn vẹn khỏi ánh sáng xanh thiết bị điện tử, kết cấu lỏng nhẹ thấm tức thì không nâng tone lố.",
    "ingredients": "Nano Zinc Oxide, Titanium Dioxide, màng bọc phân tử thế hệ mới, chiết xuất vi tảo đỏ bảo vệ da.",
    "guidelines": "Lắc đều chai trước khi dùng. Thoa đều một lượng kem vừa đủ lên da mặt và cổ trước khi tiếp xúc ánh nắng 20 phút."
  },
  {
    "id": "gold-peptide",
    "title": "Tinh Chất Vàng 24k Peptide Nâng Cơ Đa Tầng (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Advanced Clinical",
    "skinTypes": [
      "Da chảy xệ",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.9,
    "reviewsCount": 105,
    "originalPrice": 195000,
    "price": 155000,
    "discountPercent": 20,
    "badge": "NÂNG CƠ VÀNG 24K",
    "testedCount": 55,
    "hotPercent": 70,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    "description": "Công thức trẻ hóa vượt trội chứa tinh thể vàng 24k siêu phân tán kết hợp cùng chuỗi peptide sinh học trẻ hóa, cải thiện tức thì các nếp nhăn đuôi mắt và nâng đỡ màng liên kết collagen chảy xệ.",
    "ingredients": "Hạt vàng 24k tinh khiết, Phức hợp Oligopeptide, chiết xuất rễ nhân sâm Hoàng gia.",
    "guidelines": "Thoa đều vài giọt vàng 24k lên các vùng nếp nhăn đuôi mắt, khóe cười mỗi tối và massage nâng cơ hướng lên."
  },
  {
    "id": "peel-mask",
    "title": "Mặt Nạ Lột Mụn Than Hoạt Tính Bọc Liposome (Mẫu thử công nghệ mới)",
    "category": "new-tech",
    "lab": "Premium Eco",
    "skinTypes": [
      "Da nhiều mụn đầu đen",
      "Mọi loại da"
    ],
    "rating": 5,
    "ratingValue": 4.82,
    "reviewsCount": 148,
    "originalPrice": 15000,
    "price": 12000,
    "discountPercent": 20,
    "badge": "SẠCH MỤN ĐẦU ĐEN",
    "testedCount": 78,
    "hotPercent": 65,
    "image": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    "description": "Mặt nạ dạng lột chứa than tre hoạt tính hoạt hóa Liposome, thẩm thấu nhanh hút sạch bã nhờn cứng đầu sâu phễu nang lông, mụn cám, mụn đầu đen vùng mũi hiệu quả tức thì.",
    "ingredients": "Than tre hoạt tính bọc Liposome, Tinh chất trà xanh, chiết xuất tràm trà làm dịu lỗ chân lông.",
    "guidelines": "Thoa lớp mặt nạ vừa đủ lên vùng da mũi hoặc toàn mặt, giữ nguyên 15 phút cho khô hoàn toàn rồi lột nhẹ từ dưới lên."
  }
];
