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
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600",
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
    content: "Để một sản phẩm mỹ phẩm được phép lưu thông hợp pháp trên thị trường Việt Nam, doanh nghiệp bắt buộc phải hoàn tất thủ tục Công bố sản phẩm mỹ phẩm và được cơ quan quản lý (Cục Quản lý Dược - Bộ Y Tế đối với hàng nhập khẩu, hoặc Sở Y Tế địa phương đối với hàng sản xuất trong nước) cấp Số tiếp nhận phiếu công bố. Đây là điều kiện tiên quyết, thiếu bước này mọi hoạt động kinh doanh đều bị coi là hàng không rõ nguồn gốc và có thể bị xử phạt, thu hồi.\n\n1. CHUẨN BỊ HỒ SƠ PHÁP LÝ\nBộ hồ sơ công bố tiêu chuẩn bao gồm: Phiếu công bố sản phẩm mỹ phẩm theo mẫu; Giấy chứng nhận đăng ký kinh doanh có ngành nghề phù hợp; Giấy ủy quyền của nhà sản xuất/chủ sở hữu nhãn hàng cho tổ chức chịu trách nhiệm đưa sản phẩm ra thị trường; Giấy chứng nhận lưu hành tự do (CFS) đối với sản phẩm nhập khẩu; và bảng thành phần đầy đủ theo danh pháp quốc tế INCI kèm tỷ lệ phần trăm các hoạt chất có giới hạn.\n\n2. KIỂM NGHIỆM & HỒ SƠ THÔNG TIN SẢN PHẨM (PIF)\nSản phẩm cần được kiểm nghiệm các chỉ tiêu vi sinh, kim loại nặng (thủy ngân, chì, arsen) tại phòng Lab được công nhận ISO 17025. Song song đó, doanh nghiệp phải lưu giữ Hồ sơ thông tin sản phẩm (Product Information File) gồm dữ liệu an toàn, đánh giá độ ổn định (stability test), challenge test và bằng chứng công dụng để sẵn sàng khi cơ quan chức năng hậu kiểm.\n\n3. NHỮNG SAI LẦM THƯỜNG GẶP\nRất nhiều thương hiệu bị trả hồ sơ do ghi công dụng 'quá đà' (như trị bệnh, đặc trị, thay thế thuốc), đặt tên sản phẩm gây hiểu nhầm về tính năng, hoặc khai sai nồng độ hoạt chất bị kiểm soát. Thời gian xử lý hồ sơ hợp lệ thường từ 3-5 ngày làm việc, nhưng nếu sai sót có thể kéo dài hàng tháng.\n\nTại Cosbuilt, đội ngũ pháp chế đồng hành trọn gói cùng khách hàng từ khâu rà soát công thức, chuẩn hóa tên gọi - công dụng, thực hiện kiểm nghiệm cho tới khi nhận được số công bố, giúp thương hiệu của bạn ra mắt thị trường nhanh chóng, hợp pháp và an tâm tuyệt đối.",
    date: "12 Tháng 6, 2026",
    author: "ThS. Luật sư Nguyễn Khánh Ly",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600"
  },
  {
    title: "Xu hướng hoạt chất mỹ phẩm lên ngôi nửa cuối năm 2026: Exosome & Bakuchiol",
    category: "xu hướng",
    summary: "Khám phá sự trỗi dậy mạnh mẽ của công nghệ sinh học Exosome và hoạt chất thay thế retinol dịu nhẹ Bakuchiol trong các sản phẩm chăm sóc da cao cấp.",
    content: "Năm 2026 chứng kiến bước chuyển mình mạnh mẽ của ngành mỹ phẩm cao cấp: từ các hoạt chất hóa học truyền thống sang kỷ nguyên công nghệ sinh học tế bào. Hai cái tên đang dẫn dắt xu hướng và định hình lại phân khúc chống lão hóa chính là Exosome và Bakuchiol.\n\nEXOSOME - CHẤT TRUYỀN TIN TÁI SINH TẾ BÀO\nExosome là những túi vận chuyển ngoại bào siêu nhỏ (kích thước 30-150 nanomet) mang theo protein, peptide tín hiệu, mRNA và các yếu tố tăng trưởng. Khi thẩm thấu vào da, Exosome 'ra lệnh' cho các nguyên bào sợi tăng cường tổng hợp collagen và elastin tự thân - theo nhiều nghiên cứu có thể nhanh gấp nhiều lần so với dịch chiết tế bào gốc thông thường. Kết quả là làn da phục hồi hàng rào bảo vệ, mờ nếp nhăn, se khít lỗ chân lông và cải thiện sẹo rỗ một cách rõ rệt. Exosome nguồn gốc thực vật (từ tế bào gốc hoa hồng, rau má, nhân sâm) đang được ưa chuộng vì tính an toàn cao và phù hợp xu hướng thuần chay.\n\nBAKUCHIOL - 'RETINOL THỰC VẬT' CHO DA NHẠY CẢM\nChiết xuất từ hạt cây Babchi, Bakuchiol mang lại hiệu quả chống lão hóa và điều tiết tái tạo tế bào tương đương Retinol, nhưng lại cực kỳ dịu nhẹ: không gây bong tróc, châm chích hay nhạy cảm ánh nắng. Đây là lời giải hoàn hảo cho nhóm khách hàng da nhạy cảm, phụ nữ mang thai và người mới bắt đầu chu trình chống lão hóa - một tệp khách hàng khổng lồ mà Retinol truyền thống khó chinh phục.\n\nCƠ HỘI CHO THƯƠNG HIỆU VIỆT\nViệc ứng dụng sớm Exosome và Bakuchiol giúp thương hiệu tạo ra lợi điểm bán hàng độc nhất (USP) và định vị ở phân khúc cao cấp. Phòng R&D của Cosbuilt đã làm chủ công nghệ bào chế, ổn định và bao bọc hai hoạt chất này trong nền serum, kem dưỡng và mặt nạ, sẵn sàng đồng hành để bạn ra mắt dòng sản phẩm đón đầu xu hướng 2026.",
    date: "05 Tháng 7, 2026",
    author: "Bum-Chul Hur (Viện trưởng R&D Cosbuilt)",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=600"
  },
  {
    title: "Kinh nghiệm tối ưu hóa chi phí sản xuất ban đầu cho startup mỹ phẩm",
    category: "cẩm nang",
    summary: "Làm thế nào để khởi nghiệp mỹ phẩm với số vốn tối thiểu nhưng vẫn đảm bảo chất lượng mẫu mã bắt mắt và sản phẩm đạt chuẩn ISO 22716 CGMP?",
    content: "Khởi nghiệp mỹ phẩm là hành trình hấp dẫn nhưng đầy cạm bẫy về dòng tiền. Rất nhiều thương hiệu 'chết yểu' không phải vì sản phẩm kém, mà vì tối ưu chi phí ban đầu sai cách dẫn đến đọng vốn. Dưới đây là những kinh nghiệm thực chiến từ hàng trăm dự án Cosbuilt đã đồng hành.\n\n1. BẮT ĐẦU TINH GỌN VỚI 1-2 SKU CỐT LÕI\nĐừng ra mắt cả bộ 5-7 sản phẩm ngay từ đầu. Hãy chọn 1-2 sản phẩm mũi nhọn (hero product) giải quyết đúng một vấn đề cụ thể của khách hàng mục tiêu. Việc này giúp bạn dồn lực marketing, kiểm soát tồn kho và nhanh chóng kiểm chứng nhu cầu thị trường thật trước khi mở rộng.\n\n2. THÔNG MINH VỚI BAO BÌ\nBao bì có thể chiếm 30-50% giá thành. Thay vì đặt khuôn chai riêng (chi phí khuôn rất lớn, MOQ cao), hãy chọn mẫu chai/hũ tiêu chuẩn có sẵn chất lượng cao và tạo dấu ấn thương hiệu bằng thiết kế nhãn dán, decal ép kim, vỏ hộp cứng tinh tế. Khác biệt nằm ở câu chuyện và thẩm mỹ, không nhất thiết ở khuôn đắt tiền.\n\n3. TẬN DỤNG MOQ LINH HOẠT\nMột trong những rào cản lớn nhất với startup là số lượng đặt tối thiểu (MOQ). Cosbuilt hỗ trợ MOQ linh hoạt ngay từ những lô nhỏ, cùng dịch vụ mẫu thử vật lý miễn phí, giúp bạn thử nghiệm thể chất - hương - màu và phản ứng thị trường mà không phải 'ôm' hàng nghìn sản phẩm.\n\n4. ĐỪNG BỎ QUÊN CHI PHÍ PHÁP LÝ & VẬN HÀNH\nHãy dự trù ngân sách cho công bố sản phẩm, kiểm nghiệm, mã vạch, thiết kế và cả chi phí marketing thử nghiệm. Một kế hoạch tài chính rõ ràng ngay từ đầu sẽ giúp bạn đi đường dài. Cosbuilt cung cấp giải pháp trọn gói OEM/ODM - từ công thức, sản xuất tới pháp lý - để bạn tối ưu vốn và tập trung nguồn lực cho việc quan trọng nhất: xây dựng thương hiệu và bán hàng.",
    date: "28 Tháng 5, 2026",
    author: "Kim Kyung-choon (CEO Cosbuilt)",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600"
  },
  {
    title: "Thảo mộc & Hoạt chất sinh học: Tiềm năng khổng lồ từ mỹ phẩm hữu cơ thuần chay",
    category: "xu hướng",
    summary: "Người tiêu dùng ngày càng thông thái và ưu ái các sản phẩm chứa nguồn nguyên liệu bản địa và chiết xuất hữu cơ lành tính.",
    content: "Mỹ phẩm thiên nhiên không còn là khái niệm xa lạ, nhưng sự nâng cấp lên chuẩn Thuần chay (Vegan), Clean Beauty và ứng dụng công nghệ sinh học hiện đại đang tạo nên một làn sóng tiêu dùng mạnh mẽ. Người dùng ngày càng thông thái: họ đọc kỹ bảng thành phần, ưu tiên nguồn gốc minh bạch và sẵn sàng trả giá cao hơn cho những sản phẩm an toàn, có trách nhiệm với môi trường.\n\nSỨC MẠNH CỦA NGUYÊN LIỆU BẢN ĐỊA\nViệt Nam sở hữu kho tàng dược liệu quý: rau má giúp làm dịu và phục hồi, tía tô kháng viêm giảm mụn, tinh dầu bưởi kích thích mọc tóc, nghệ và rau diếp cá làm sáng da, trà xanh chống oxy hóa. Việc khai thác các hoạt chất bản địa này không chỉ tạo nên câu chuyện thương hiệu giàu bản sắc mà còn ủng hộ nền nông nghiệp trong nước - một giá trị cộng hưởng được khách hàng hiện đại đánh giá rất cao.\n\nTHUẦN CHAY KHÔNG ĐỒNG NGHĨA VỚI KÉM HIỆU QUẢ\nQuan niệm 'thiên nhiên thì hiền lành nhưng yếu' đã lỗi thời. Với công nghệ trích ly hiện đại (chiết xuất siêu tới hạn CO2, công nghệ lên men bio-ferment, bao bọc liposome), Cosbuilt có thể cô đặc hoạt chất tự nhiên ở nồng độ cao, giữ trọn đặc tính dược lý và cho hiệu quả trị liệu rõ rệt, có thể kiểm chứng qua các bài test lâm sàng.\n\nCHỨNG NHẬN LÀ 'GIẤY THÔNG HÀNH'\nĐể chinh phục phân khúc này, các chứng nhận như Vegan, Cruelty-Free, Ecocert hay COSMOS Organic là lợi thế cạnh tranh lớn. Phòng R&D của Cosbuilt liên tục nghiên cứu các công thức hữu cơ thuần chay đạt chuẩn quốc tế, sẵn sàng giúp thương hiệu của bạn đón đầu xu hướng sống xanh và phát triển bền vững.",
    date: "19 Tháng 6, 2026",
    author: "Kim Dong-hyun (Đại diện Cosbuilt)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
  },
  {
    title: "Tiêu chuẩn CGMP ASEAN trong sản xuất mỹ phẩm và những điều doanh nghiệp cần biết",
    category: "cẩm nang",
    summary: "Tìm hiểu các tiêu chí khắt khe về phòng sạch, kiểm soát vi sinh vật và truy xuất nguồn gốc nguyên liệu đạt chuẩn chất lượng quốc tế.",
    content: "Tiêu chuẩn Thực hành tốt sản xuất mỹ phẩm (CGMP - Cosmetic Good Manufacturing Practice) theo hướng dẫn của ASEAN là thước đo bắt buộc để đánh giá năng lực và độ tin cậy của một nhà máy gia công mỹ phẩm. Đây không chỉ là tấm 'giấy thông hành' để xuất khẩu, mà còn là cam kết về sự an toàn và ổn định chất lượng cho từng lô sản phẩm đến tay người tiêu dùng.\n\nKIỂM SOÁT PHÒNG SẠCH & MÔI TRƯỜNG\nCGMP yêu cầu khu vực sản xuất phải là phòng sạch đạt cấp độ kiểm soát tiểu phân bụi và vi sinh trong không khí, với hệ thống lọc khí HEPA, kiểm soát chênh áp giữa các phòng, nhiệt độ và độ ẩm ổn định. Điều này ngăn ngừa triệt để nguy cơ nhiễm khuẩn chéo - nguyên nhân hàng đầu khiến mỹ phẩm bị hư hỏng, biến chất.\n\nNGUỒN NƯỚC & NGUYÊN LIỆU ĐẦU VÀO\nNước tinh khiết (đạt chuẩn qua hệ thống RO, khử ion, diệt khuẩn UV) là 'xương sống' của mọi công thức mỹ phẩm. CGMP đòi hỏi kiểm soát chặt chẽ chất lượng nước, đồng thời mọi nguyên liệu đầu vào đều phải có chứng nhận nguồn gốc (CoA), được kiểm định và biệt trữ trước khi đưa vào sản xuất.\n\nTRUY XUẤT NGUỒN GỐC & HỒ SƠ LÔ\nMỗi lô sản xuất đều có hồ sơ lô (batch record) ghi lại toàn bộ quá trình - từ nguyên liệu, thông số pha chế, kết quả kiểm nghiệm tới đóng gói. Nhờ đó, khi cần, có thể truy xuất ngược hoàn toàn nguồn gốc của bất kỳ sản phẩm nào trên thị trường.\n\nLỢI ÍCH CHO THƯƠNG HIỆU\nSản xuất tại nhà máy chuẩn CGMP giúp sản phẩm của bạn bảo toàn hoạt chất, ổn định qua thời gian, an toàn tuyệt đối cho người dùng và dễ dàng thông quan, xuất khẩu sang thị trường Đông Nam Á, Mỹ, EU, Nhật Bản. Cả hai nhà máy của Cosbuilt tại Incheon và Gimpo đều vận hành theo tiêu chuẩn ISO 22716 / CGMP, đảm bảo chất lượng đồng nhất cho mọi đơn hàng.",
    date: "15 Tháng 7, 2026",
    author: "KS. Hoàng Văn Thắng (Giám đốc Vận hành Nhà máy)",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600"
  },
  {
    title: "Bí quyết thiết kế bao bì mỹ phẩm thu hút khách hàng từ cái nhìn đầu tiên",
    category: "cẩm nang",
    summary: "Xu hướng thiết kế chai lọ tối giản, ứng dụng công nghệ in ép kim cao cấp và giải pháp bao bì phân hủy sinh học thân thiện môi trường.",
    content: "Trong ngành mỹ phẩm, 'yêu bằng mắt' là có thật. Một thiết kế bao bì ấn tượng có thể quyết định tới 70% hành vi mua thử lần đầu, trước cả khi khách hàng kịp trải nghiệm chất lượng bên trong. Bao bì chính là 'người bán hàng thầm lặng' trên kệ và trong khung hình quảng cáo.\n\nXU HƯỚNG QUIET LUXURY - SANG TRỌNG THẦM LẶNG\nNăm 2026 chứng kiến sự lên ngôi của phong cách tối giản cao cấp: bảng màu pastel dịu mát hoặc trung tính (be, trắng ngà, xanh rêu), font chữ không chân (sans-serif) thanh lịch, và bề mặt chai lọ nhám mờ (matte) mang lại cảm giác chạm sang trọng. Ít chi tiết nhưng tinh tế - đó là ngôn ngữ của các thương hiệu đẳng cấp.\n\nCÔNG NGHỆ HOÀN THIỆN TẠO ĐIỂM NHẤN\nNhững kỹ thuật in ấn cao cấp giúp bao bì 'nâng tầm' rõ rệt: ép kim (hot stamping) vàng/bạc, in nổi - in chìm (emboss/deboss) tạo hiệu ứng chạm, phủ UV định vị bóng trên nền mờ, hay decal trong suốt 'no-label look'. Đây là cách tạo khác biệt mà không cần đầu tư khuôn chai đắt đỏ.\n\nBAO BÌ BỀN VỮNG - GIÁ TRỊ CỦA TƯƠNG LAI\nNgười tiêu dùng hiện đại đánh giá cao trách nhiệm môi trường. Việc chuyển sang nhựa tái chế PCR, thủy tinh siêu nhẹ, chi tiết refill (đổ đầy lại) hay mực in gốc đậu nành không chỉ giảm dấu chân carbon mà còn ghi điểm mạnh mẽ về hình ảnh thương hiệu 'sống xanh'.\n\nTẠI COSBUILT\nChúng tôi cung cấp giải pháp bao bì trọn gói: tư vấn thể chất phù hợp chai lọ, thiết kế nhãn - vỏ hộp theo nhận diện thương hiệu, và kết nối chuỗi cung ứng vật liệu đa dạng để bạn có bộ sản phẩm hoàn thiện, bắt mắt ngay từ cái nhìn đầu tiên.",
    date: "08 Tháng 7, 2026",
    author: "Bà Vũ Thùy Linh (Trưởng bộ phận Thiết kế Bao bì)",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600"
  },
  {
    title: "Ứng dụng công nghệ bọc Liposome trong bào chế serum dưỡng da chuyên sâu",
    category: "xu hướng",
    summary: "Khám phá giải pháp vận chuyển hoạt chất thông minh giúp tăng khả năng thẩm thấu sâu qua lớp biểu bì gấp 10 lần phương pháp thông thường.",
    content: "Bạn đã bao giờ dùng một lọ serum Vitamin C đắt tiền nhưng không thấy hiệu quả? Vấn đề thường không nằm ở hoạt chất, mà ở khả năng vận chuyển hoạt chất đó vào đúng nơi cần đến. Đây chính là lúc công nghệ bào chế Liposome thể hiện sức mạnh vượt trội.\n\nVẤN ĐỀ CỦA HOẠT CHẤT 'TRẦN'\nCác hoạt chất mạnh như Vitamin C, Retinol, Hyaluronic Acid hay Niacinamide khi ở dạng tự do rất dễ bị oxy hóa khi tiếp xúc không khí và ánh sáng, hoặc phân tử quá lớn nên chỉ nằm lại trên bề mặt da mà không thẩm thấu sâu. Kết quả: hiệu quả thấp, lãng phí và đôi khi gây kích ứng.\n\nLIPOSOME HOẠT ĐỘNG NHƯ THẾ NÀO?\nLiposome là những túi hình cầu siêu nhỏ có cấu trúc màng phospholipid kép - tương tự cấu trúc màng tế bào da người. Nhờ đó, chúng 'đóng gói' và bảo vệ hoạt chất khỏi bị phân hủy, đồng thời dễ dàng hòa nhập với màng tế bào để giải phóng hoạt chất ở đúng lớp tế bào đích dưới da. Khả năng thẩm thấu có thể tăng gấp nhiều lần so với công thức thông thường.\n\nLỢI ÍCH KÉP: HIỆU QUẢ & DỊU NHẸ\nViệc giải phóng hoạt chất có kiểm soát (controlled release) không chỉ tối ưu hiệu quả trị mụn, mờ thâm nám và trẻ hóa da, mà còn giảm đáng kể nguy cơ kích ứng - vì hoạt chất được 'nhả' từ từ thay vì tấn công ồ ạt lên da.\n\nỨNG DỤNG TẠI COSBUILT\nPhòng R&D của Cosbuilt đã làm chủ công nghệ bao bọc Liposome và các hệ vận chuyển thông minh khác (niosome, nanoemulsion), ứng dụng vào các dòng serum và tinh chất đặc trị cao cấp - giúp thương hiệu của bạn sở hữu sản phẩm 'nói được bằng kết quả'.",
    date: "02 Tháng 7, 2026",
    author: "ThS. Dược sĩ Phạm Minh Khoa",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600"
  },
  {
    title: "Quy trình kiểm nghiệm kích ứng da (Dermatologically Tested) cho mỹ phẩm mới",
    category: "cẩm nang",
    summary: "Các phương pháp thử nghiệm lâm sàng và đánh giá độ an toàn trên mẫu thử trước khi chính thức đưa vào sản xuất hàng loạt.",
    content: "Trước khi một công thức mỹ phẩm được đưa vào dây chuyền sản xuất số lượng lớn, việc kiểm tra độ an toàn trên da người tình nguyện là bước cực kỳ quan trọng. Quy trình Dermatologically Tested tiêu chuẩn bao gồm thử nghiệm áp da (Patch Test) trong vòng 24 - 48 giờ để theo dõi các phản ứng mẩn đỏ, ngứa ngáy hay bong tróc. Đảm bảo công thức đạt chỉ số kích ứng thấp nhất chính là cam kết vững chắc nhất cho chất lượng thương hiệu của bạn.\n\nCÁC BÀI TEST AN TOÀN PHỔ BIẾN\nNgoài Patch Test, một bộ hồ sơ an toàn đầy đủ có thể bao gồm: HRIPT (thử nghiệm kích ứng lặp lại trên diện rộng), thử nghiệm không gây bít tắc lỗ chân lông (Non-comedogenic), thử nghiệm nhãn khoa (Ophthalmologist Tested) cho sản phẩm vùng mắt, và các bài test công dụng (cấp ẩm, làm sáng, chống lão hóa) có đo lường bằng thiết bị khoa học.\n\nGIÁ TRỊ TRUYỀN THÔNG CỦA CHỨNG NHẬN\nNhững nhãn dán 'Đã kiểm nghiệm da liễu', 'Non-comedogenic' hay 'Hypoallergenic' không chỉ là bằng chứng an toàn mà còn là công cụ marketing mạnh mẽ, tạo niềm tin tức thì với khách hàng khó tính. Cosbuilt hỗ trợ khách hàng kết nối với các đơn vị kiểm nghiệm uy tín và hoàn thiện hồ sơ chứng nhận trước khi sản phẩm ra mắt thị trường.",
    date: "25 Tháng 6, 2026",
    author: "Bác sĩ Da liễu Đỗ Minh Tuấn",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600"
  },
  {
    title: "Clean Beauty & Waterless Beauty: Tương lai xanh bền vững của mỹ phẩm",
    category: "xu hướng",
    summary: "Xu hướng cắt giảm tối đa nguồn nước trong công thức để thay thế bằng các chiết xuất thực vật cô đặc dạng sáp hoặc dạng bột khô sáng tạo.",
    content: "Waterless Beauty (Mỹ phẩm không nước) đang là cuộc cách mạng bảo vệ môi trường toàn cầu. Bằng cách loại bỏ nước khoáng thông thường và thay thế bằng hydrolat hoa hồng, nước lô hội hữu cơ, hoặc sản xuất dưới dạng thanh sáp/bột khô, sản phẩm không cần sử dụng nhiều chất bảo quản hóa học. Điều này không chỉ giảm thiểu tối đa kích ứng da mà còn giúp tiết kiệm tài nguyên nước quý giá và giảm đáng kể lượng khí thải carbon khi vận chuyển.\n\nCÔNG THỨC CÔ ĐẶC - HIỆU QUẢ HƠN\nKhi loại bỏ nước (thường chiếm 60-80% công thức thông thường), tỷ lệ hoạt chất trong sản phẩm được cô đặc cao hơn, mang lại hiệu quả trị liệu rõ rệt trên mỗi lần dùng. Các dạng bào chế mới như dầu gội thanh (shampoo bar), viên serum khô, bột rửa mặt enzyme hay mặt nạ bột hòa tan cũng giúp bao bì nhỏ gọn, nhẹ và bền hơn.\n\nCLEAN BEAUTY - MINH BẠCH LÀ VÀNG\nĐi cùng Waterless là triết lý Clean Beauty: công thức minh bạch, loại bỏ các thành phần gây tranh cãi (paraben, sulfate mạnh, hương liệu tổng hợp nồng độ cao) và ưu tiên nguồn gốc bền vững. Đây là tiêu chuẩn mà thế hệ khách hàng Gen Z đặc biệt coi trọng. Phòng R&D Cosbuilt sẵn sàng đồng hành phát triển các dòng sản phẩm không nước, thuần chay đón đầu xu hướng xanh toàn cầu.",
    date: "18 Tháng 6, 2026",
    author: "Bà Hoàng Thu Trang (Chuyên gia Xu hướng Tiêu dùng)",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600"
  },
  {
    title: "Chiến lược xây dựng phễu sản phẩm mỹ phẩm đột phá cho các thương hiệu mới",
    category: "cẩm nang",
    summary: "Cách kết hợp thông minh giữa sản phẩm phễu giá tốt hút tương tác và sản phẩm chủ lực biên lợi nhuận cao giúp tối đa hóa doanh thu.",
    content: "Một thương hiệu mới không nên tung ra quá nhiều sản phẩm cùng lúc mà hãy tập trung thiết kế một phễu sản phẩm logic. Sản phẩm phễu (Sữa rửa mặt tạo bọt, Nước tẩy trang) nên có giá thành dễ tiếp cận, hiệu quả tức thì để lấy lòng tin khách hàng. Sau đó, dẫn dắt khách hàng nâng cấp lên sản phẩm chủ lực (Serum trị nám Exosome, Kem dưỡng trẻ hóa Bakuchiol) có giá trị cao để tăng biên độ lợi nhuận và khẳng định đẳng cấp thương hiệu.\n\nBA TẦNG CỦA PHỄU SẢN PHẨM\n1. Sản phẩm mồi (Entry): giá thấp, giải quyết nhu cầu cơ bản, dễ mua thử - dùng để thu hút khách hàng mới. 2. Sản phẩm chủ lực (Hero): biên lợi nhuận cao, chứa hoạt chất độc quyền, là 'ngôi sao' định vị thương hiệu. 3. Sản phẩm combo/cao cấp (Premium): bộ liệu trình hoàn chỉnh, quà tặng, phiên bản giới hạn - tối đa hóa giá trị đơn hàng.\n\nTĂNG GIÁ TRỊ VÒNG ĐỜI KHÁCH HÀNG\nMục tiêu của phễu là tăng Customer Lifetime Value: biến người mua thử thành khách hàng trung thành mua trọn bộ. Việc thiết kế các sản phẩm 'ăn khớp' nhau về công dụng (làm sạch → đặc trị → khóa ẩm) giúp khách hàng tự nhiên mua thêm. Cosbuilt tư vấn xây dựng danh mục sản phẩm chiến lược ngay từ khâu lên công thức, giúp bạn tối ưu lợi nhuận dài hạn." ,
    date: "10 Tháng 6, 2026",
    author: "Ông Nguyễn Lâm Sơn (Chuyên gia MKT Mỹ phẩm)",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600"
  },
  {
    title: "Công nghệ nhũ hóa nguội (Cold Emulsification): Bước đột phá tiết kiệm năng lượng trong sản xuất mỹ phẩm",
    category: "xu hướng",
    summary: "Khám phá quy trình nhũ hóa không cần gia nhiệt giúp bảo toàn tuyệt đối hoạt chất nhạy cảm với nhiệt độ và giảm 50% lượng khí thải carbon.",
    content: "Thông thường, quá trình tạo kem dưỡng (nhũ hóa) đòi hỏi phải đun nóng pha dầu và pha nước lên 70 - 80 độ C. Tuy nhiên, công nghệ nhũ hóa nguội thế hệ mới sử dụng các chất hoạt động bề mặt chuyên biệt, cho phép liên kết dầu và nước ở nhiệt độ phòng. Phương pháp này không chỉ giữ nguyên đặc tính sinh học của các chiết xuất thực vật nhạy cảm với nhiệt (như Vitamin C, peptide, retinol) mà còn giúp nhà máy tiết kiệm năng lượng đáng kể, thúc đẩy xu hướng mỹ phẩm bền vững.\n\nVÌ SAO HOẠT CHẤT 'SỢ NHIỆT'?\nNhiều hoạt chất vàng trong ngành làm đẹp rất mong manh: Vitamin C dễ oxy hóa, Retinol mất hoạt tính, các enzyme và probiotics bị bất hoạt, hương liệu tự nhiên bay hơi khi gặp nhiệt độ cao. Nhũ hóa nguội bảo toàn tối đa 'sinh lực' của những thành phần này, cho ra sản phẩm hiệu quả và tươi mới hơn.\n\nLỢI ÍCH BỀN VỮNG\nSản xuất ở nhiệt độ phòng giúp cắt giảm điện năng đun nóng và làm nguội, rút ngắn thời gian sản xuất và giảm phát thải carbon. Đây là minh chứng cho cam kết sản xuất xanh của Cosbuilt - nơi công nghệ hiện đại và trách nhiệm môi trường song hành để tạo ra những công thức đẳng cấp cho thương hiệu của bạn.",
    date: "20 Tháng 7, 2026",
    author: "ThS. Nguyễn Minh Hoàng (Chuyên gia Bào chế tại Cosbuilt)",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600"
  },
  {
    title: "Hạn chế chất bảo quản hóa học bằng giải pháp Hệ bảo quản tự nhiên (Natural Preservative Systems)",
    category: "cẩm nang",
    summary: "Làm thế nào để kéo dài tuổi thọ mỹ phẩm hữu cơ lên đến 2 năm mà không cần sử dụng Parabens hay Phenoxyethanol?",
    content: "Xu hướng mỹ phẩm sạch đòi hỏi loại bỏ các chất bảo quản truyền thống bị nghi ngờ có hại cho sức khỏe. Tại phòng thí nghiệm Cosbuilt, chúng tôi ứng dụng các hệ tự bảo quản thông minh (self-preserving systems) kết hợp từ chiết xuất vỏ cây liễu, rễ cây hẹ, lên men tỏi và các acid hữu cơ nhẹ. Sự kết hợp hiệp đồng này vừa ức chế tối đa vi khuẩn, nấm mốc vừa nuôi dưỡng làn da nhẹ nhàng, nâng cao giá trị xanh cho thương hiệu.\n\nVAI TRÒ SỐNG CÒN CỦA HỆ BẢO QUẢN\nCần hiểu rằng chất bảo quản là bắt buộc để mỹ phẩm chứa nước an toàn - nếu không, vi khuẩn và nấm mốc sẽ phát triển gây hại nghiêm trọng cho da. Vấn đề không phải là 'không bảo quản', mà là chọn hệ bảo quản an toàn, hiệu quả và được người tiêu dùng chấp nhận.\n\nCÔNG NGHỆ CHALLENGE TEST\nMọi công thức tại Cosbuilt đều trải qua Challenge Test (thử nghiệm thách thức vi sinh) - chủ động cấy vi sinh vật vào sản phẩm để kiểm chứng hệ bảo quản đủ mạnh trong suốt vòng đời sử dụng. Sự kết hợp giữa hệ bảo quản tự nhiên và bao bì airless (chân không) giúp thương hiệu vừa 'sạch' vừa an toàn tuyệt đối.",
    date: "18 Tháng 7, 2026",
    author: "TS. Phạm Hải Yến (Bộ phận Nghiên cứu Vi sinh Cosbuilt)",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600"
  },
  {
    title: "Quy trình thiết kế nhãn mỹ phẩm hợp chuẩn nghị định quản lý mỹ phẩm ASEAN",
    category: "cẩm nang",
    summary: "Tránh lỗi phạt hành chính nghiêm trọng bằng việc ghi đúng danh pháp INCI, thứ tự thành phần và các lưu ý bắt buộc khi in ấn bao bì.",
    content: "Thiết kế nhãn mỹ phẩm không chỉ cần bắt mắt mà phải tuân thủ nghiêm ngặt Hiệp định mỹ phẩm ASEAN. Tên thành phần bắt buộc phải ghi bằng danh pháp quốc tế INCI, sắp xếp theo tỷ lệ giảm dần về nồng độ. Các lỗi thường gặp như tự ý công bố tính năng điều trị y học (như trị mụn hoàn toàn, xóa sẹo vĩnh viễn) hay thiếu số lô sản xuất, hạn sử dụng sẽ khiến doanh nghiệp bị phạt nặng hoặc thu hồi sản phẩm. Đội ngũ pháp lý của Cosbuilt luôn hỗ trợ duyệt nhãn miễn phí trước khi in ấn cho khách hàng gia công.\n\nNHỮNG THÔNG TIN BẮT BUỘC TRÊN NHÃN\nMột nhãn hợp chuẩn phải có đầy đủ: tên sản phẩm và chức năng; thành phần (Ingredients/INCI); định lượng (khối lượng/thể tích); số lô sản xuất; ngày sản xuất và hạn sử dụng (hoặc ký hiệu PAO - thời hạn dùng sau khi mở nắp); tên và địa chỉ tổ chức chịu trách nhiệm; xuất xứ; và các lưu ý an toàn khi sử dụng.\n\nRANH GIỚI GIỮA 'MỸ PHẨM' VÀ 'THUỐC'\nSai lầm pháp lý nghiêm trọng nhất là dùng từ ngữ mang tính điều trị y khoa. Mỹ phẩm chỉ được phép công bố công dụng làm sạch, làm thơm, làm đẹp, bảo vệ - không được tuyên bố 'chữa', 'trị dứt điểm', 'đặc trị'. Cosbuilt giúp khách hàng chuẩn hóa toàn bộ câu chữ trên nhãn và bao bì để vừa hấp dẫn, vừa an toàn tuyệt đối về pháp lý.",
    date: "14 Tháng 7, 2026",
    author: "Bà Lê Thu Thủy (Giám đốc Pháp lý Thương hiệu)",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600"
  },
  {
    title: "Ứng dụng lợi khuẩn Probiotics và Prebiotics trong mỹ phẩm cân bằng hệ vi sinh da",
    category: "xu hướng",
    summary: "Xu hướng dưỡng da khoa học tập trung củng cố hàng rào bảo vệ tự nhiên thông qua việc bổ sung các lợi khuẩn lên men cao cấp.",
    content: "Hệ vi sinh vật trên da (skin microbiome) đóng vai trò quyết định đến sức đề kháng và độ mịn màng của làn da. Việc lạm dụng chất tẩy rửa mạnh làm mất cân bằng màng acid bảo vệ. Mỹ phẩm chứa dịch lọc lên men từ vi khuẩn có lợi như Bifida Ferment Lysate hay Lactobacillus giúp tăng cường sức đề kháng, giảm viêm nhiễm cục bộ và khôi phục hàng rào da tổn thương nhanh chóng. Đây đang là dòng sản phẩm có tỷ lệ quay lại mua hàng cao nhất năm nay.\n\nPROBIOTICS - PREBIOTICS - POSTBIOTICS\nHiểu đơn giản: Prebiotics là 'thức ăn' nuôi dưỡng lợi khuẩn; Probiotics là bản thân các lợi khuẩn (thường ở dạng bất hoạt/dịch lọc trong mỹ phẩm); Postbiotics là các sản phẩm chuyển hóa có lợi từ quá trình lên men. Bộ ba này phối hợp giúp cân bằng hệ vi sinh, củng cố 'bức tường thành' bảo vệ tự nhiên của da.\n\nPHÙ HỢP VỚI DA NHẠY CẢM & KÍCH ỨNG\nDòng mỹ phẩm cân bằng hệ vi sinh đặc biệt hiệu quả với da nhạy cảm, da dễ ửng đỏ, da sau liệu trình xâm lấn. Phòng R&D Cosbuilt làm chủ công nghệ lên men bio-ferment, giúp thương hiệu phát triển các dòng phục hồi 'làm dịu từ gốc' - một phân khúc đang tăng trưởng mạnh và có độ trung thành cao.",
    date: "10 Tháng 7, 2026",
    author: "ThS. BS. Nguyễn Thị Lan Anh",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600"
  },
  {
    title: "Cách xây dựng bảng phân tích đối thủ cạnh tranh trước khi đặt công thức gia công",
    category: "cẩm nang",
    summary: "Xác định rõ định vị phân khúc, điểm độc nhất (USP) và khoảng trống thị trường để sản phẩm của bạn không bị hòa lẫn vào đám đông.",
    content: "Trước khi bắt đầu gia công mỹ phẩm, chủ thương hiệu cần làm khảo sát chi tiết về các sản phẩm đối thủ có cùng phân khúc giá và tệp khách hàng. Hãy lập danh sách về: kết cấu (texture), mùi hương, hoạt chất cốt lõi và phong cách truyền thông của họ. Từ đó, phòng Lab Cosbuilt sẽ giúp bạn tối ưu hóa công thức độc quyền bằng cách bổ sung một hoạt chất hiếm, thay đổi màu sắc thiên nhiên độc đáo hoặc nâng cấp kết cấu mỏng nhẹ hơn đối thủ, giúp sản phẩm dễ dàng nổi bật.\n\nPHÂN TÍCH THEO KHUNG 4P\nMột bảng phân tích đối thủ hiệu quả nên soi chiếu qua 4 yếu tố: Product (thành phần, kết cấu, công dụng, bao bì), Price (giá bán lẻ, chính sách chiết khấu), Place (kênh phân phối: sàn TMĐT, spa, nhà thuốc) và Promotion (thông điệp, KOL/KOC, chương trình khuyến mãi). Đọc kỹ review 1-3 sao của đối thủ để tìm ra 'nỗi đau' chưa được giải quyết.\n\nTÌM KHOẢNG TRỐNG THỊ TRƯỜNG\nMục tiêu cuối cùng không phải sao chép mà là tìm ra khoảng trống (market gap) để tạo khác biệt: một hoạt chất đối thủ chưa có, một kết cấu dễ chịu hơn, một câu chuyện chân thực hơn. Với dữ liệu từ hàng nghìn công thức, đội ngũ R&D Cosbuilt giúp bạn định vị sản phẩm thông minh và xây dựng lợi thế cạnh tranh bền vững.",
    date: "06 Tháng 7, 2026",
    author: "Ông Vũ Tiến Đạt (Chuyên gia Hoạch định Chiến lược Sản phẩm)",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600"
  },
  {
    title: "Nhu cầu gia công mỹ phẩm nam giới (Men's Grooming) bùng nổ mạnh mẽ năm 2026",
    category: "xu hướng",
    summary: "Tệp khách hàng nam giới không còn xa lạ với việc chăm sóc cá nhân. Khám phá các công thức tối giản đa năng dành riêng cho phái mạnh.",
    content: "Thị trường mỹ phẩm nam giới (Men's Grooming) đang chứng kiến tốc độ tăng trưởng hai chữ số hằng năm. Khác với phái đẹp, nam giới ưu tiên tính tiện lợi, bao bì tối giản đậm tính nam tính và kết cấu sản phẩm thẩm thấu siêu nhanh, không bóng nhờn. Các dòng sản phẩm đa năng 3-trong-1 (sữa rửa mặt kiêm cạo râu, dưỡng ẩm kiêm chống nắng dạng nước gel mỏng nhẹ) đang là những mảnh đất màu mỡ cho các startup khai phá hiệu quả.\n\nTÂM LÝ MUA HÀNG CỦA NAM GIỚI\nNam giới thường trung thành với sản phẩm hơn, ít 'nhảy' nhãn hàng, nhưng lại ngại quy trình phức tạp nhiều bước. Vì vậy công thức thắng thế là 'tối giản mà hiệu quả': ít bước, đa công dụng, kết quả nhìn thấy nhanh. Hương thơm cũng cần được tính toán kỹ - nam tính, sạch sẽ, không quá nồng.\n\nCÁC DÒNG SẢN PHẨM TIỀM NĂNG\nBên cạnh chăm sóc da mặt, các mảng đang bùng nổ gồm: chăm sóc râu (dầu dưỡng râu, sáp), sản phẩm khử mùi cao cấp, chăm sóc tóc chống rụng, và dưỡng thể nam. Cosbuilt sở hữu kho công thức chuyên biệt cho da dầu, lỗ chân lông to đặc trưng của nam giới, sẵn sàng giúp bạn chinh phục thị trường đầy tiềm năng này.",
    date: "01 Tháng 7, 2026",
    author: "Ông Nguyễn Đăng Khoa (Giám đốc Phát triển Thị trường Cosbuilt)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
  },
  {
    title: "Tối ưu hóa quy trình chiết rót tự động và kiểm soát dung sai thể tích mỹ phẩm",
    category: "cẩm nang",
    summary: "Làm thế nào để nhà máy kiểm soát chính xác 100% dung sai định lượng, tránh hiện tượng hao hụt hay tràn sản phẩm khi đóng gói tự động?",
    content: "Dây chuyền chiết rót tự động đa năng tại Cosbuilt được lập trình PLC hiện đại giúp kiểm soát dung sai thể tích cực kỳ nhỏ (dưới 0.5%). Quy trình này đòi hỏi sự đồng bộ giữa hệ thống piston nâng hạ, van hồi lưu chống nhỏ giọt và cảm biến laser kiểm tra mức dung dịch trong chai lọ. Việc tối ưu hóa tốc độ phun và lực hút chân không giúp sản phẩm dạng gel đặc hay lỏng nhẹ đều được đóng gói đều đặn, sạch sẽ, bảo đảm tính minh bạch về dung lượng cho thương hiệu.\n\nTẠI SAO DUNG SAI QUAN TRỌNG?\nChiết rót thiếu định lượng gây thiệt hại uy tín và có thể vi phạm quy định ghi nhãn; chiết rót thừa lại gây thất thoát chi phí nguyên liệu qua hàng nghìn sản phẩm. Kiểm soát dung sai chặt chẽ vừa bảo vệ quyền lợi người tiêu dùng, vừa tối ưu giá thành cho chủ thương hiệu.\n\nĐỒNG BỘ TOÀN DÂY CHUYỀN\nMột dây chuyền hiệu quả không chỉ có chiết rót mà còn tích hợp: cấp chai tự động, đóng nắp - siết ren đúng lực, dán nhãn định vị chính xác, in date và đóng hộp. Toàn bộ vận hành trong môi trường phòng sạch, giảm thiểu tiếp xúc tay người, đảm bảo mỗi sản phẩm đến tay khách hàng đều đạt chất lượng đồng nhất và vệ sinh tuyệt đối.",
    date: "22 Tháng 7, 2026",
    author: "KS. Đặng Minh Hải (Kỹ sư trưởng chiết rót Cosbuilt)",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600"
  },
  {
    title: "Xu hướng sử dụng Peptide đồng (Copper Peptide) trong các liệu trình phục hồi da xâm lấn",
    category: "xu hướng",
    summary: "Khám phá sức mạnh kháng viêm, mờ sẹo và đẩy nhanh tốc độ liền da tổn thương sau lăn kim, phi kim của hoạt chất Copper Peptide.",
    content: "Copper Peptide (GHK-Cu) đang trở thành xu hướng tìm kiếm hàng đầu trong phân khúc mỹ phẩm phục hồi da y khoa. Nhờ khả năng mô phỏng cơ chế tự phục hồi tự nhiên của cơ thể, peptide đồng thúc đẩy quá trình tăng sinh nguyên bào sợi và kích hoạt tái cấu trúc ma trận ngoại bào. Việc kết hợp Copper Peptide trong các dòng kem dưỡng, serum giúp giảm thiểu tối đa thời gian sưng đỏ, tái tạo biểu bì khỏe mạnh và cải thiện rõ rệt bề mặt da sau tổn thương.\n\nBỘ ĐÔI CÔNG DỤNG: PHỤC HỒI & CHỐNG LÃO HÓA\nCopper Peptide không chỉ đẩy nhanh phục hồi da sau các liệu trình xâm lấn (lăn kim, laser, peel da) mà còn là 'chiến binh' chống lão hóa: kích thích collagen - elastin, làm dày da, mờ nếp nhăn và tăng độ đàn hồi. Đây là lý do dòng sản phẩm phục hồi tích hợp peptide đồng luôn nằm trong nhóm bán chạy tại các phòng khám da liễu, spa cao cấp.\n\nLƯU Ý KHI PHỐI HỢP CÔNG THỨC\nCopper Peptide cần được bào chế cẩn thận vì có thể tương kỵ với một số hoạt chất như Vitamin C nồng độ cao hay các acid mạnh nếu dùng chung một lúc. Phòng R&D Cosbuilt am hiểu sâu về tương thích hoạt chất, giúp thiết kế công thức và chu trình sử dụng tối ưu, phát huy trọn vẹn hiệu quả của peptide đồng.",
    date: "21 Tháng 7, 2026",
    author: "TS. Nguyễn Hoài Thương (Viện nghiên cứu Da liễu)",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600"
  },
  {
    title: "Kỹ thuật xây dựng câu chuyện thương hiệu (Brand Storytelling) truyền cảm hứng cho mỹ phẩm Việt",
    category: "cẩm nang",
    summary: "Hướng dẫn cách kết nối cảm xúc với khách hàng mục tiêu bằng cách khai thác giá trị văn hóa bản địa và triết lý sống tử tế.",
    content: "Một thương hiệu thành công không chỉ bán tính năng của sản phẩm mà bán câu chuyện đằng sau nó. Brand Storytelling chính là sợi dây liên kết vô hình gắn kết trái tim người dùng với nhãn hàng. Các startup nên khai thác những chất liệu chân thực như: nguồn gốc nguyên liệu nông sản sạch hợp tác cùng nông dân, nỗ lực nghiên cứu không ngừng nghỉ của đội ngũ R&D, hay thông điệp bảo vệ môi trường, tôn vinh nét đẹp mộc mạc bản xứ để tạo niềm tự hào lớn.\n\nCÔNG THỨC CỦA MỘT CÂU CHUYỆN HAY\nMọi câu chuyện thương hiệu mạnh đều có: một 'lý do tồn tại' (Why) rõ ràng; một nhân vật khách hàng cụ thể với nỗi trăn trở thật; một hành trình vượt khó để tạo ra giải pháp; và một giá trị cốt lõi kiên định. Sự chân thực là chìa khóa - khách hàng hiện đại rất nhạy với những câu chuyện 'diễn'.\n\nNHẤT QUÁN TRÊN MỌI ĐIỂM CHẠM\nCâu chuyện phải được kể nhất quán từ tên gọi, bao bì, nội dung mạng xã hội cho tới trải nghiệm mở hộp (unboxing). Cosbuilt không chỉ gia công sản phẩm mà còn đồng hành tư vấn định vị và concept, giúp thương hiệu Việt kể được câu chuyện của riêng mình một cách chuyên nghiệp và chạm cảm xúc.",
    date: "18 Tháng 7, 2026",
    author: "Bà Nguyễn Lê Thảo Nguyên (Giám đốc Sáng tạo Thương hiệu)",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600"
  },
  {
    title: "Mỹ phẩm thông minh tích hợp màng bọc chống ánh sáng xanh (Blue Light Protection)",
    category: "xu hướng",
    summary: "Vì sao dân văn phòng tiếp xúc nhiều với máy tính, điện thoại cần các dòng kem dưỡng bảo vệ chuyên biệt chống lại lão hóa kỹ thuật số?",
    content: "Ánh sáng xanh (HEV) từ màn hình thiết bị điện tử có khả năng xâm nhập sâu vào da hơn cả tia UVA, phá hủy collagen và tạo ra vô số gốc tự do có hại. Mỹ phẩm tích hợp cơ chế bảo vệ chống ánh sáng xanh nhờ màng lọc phân tử hữu cơ và chiết xuất vi tảo đỏ, lutein tự nhiên sẽ tạo ra lớp chắn hấp thụ và giảm thiểu tác động của luồng ánh sáng này. Đây hứa hẹn là dòng sản phẩm chăm sóc da bắt buộc phải có cho tệp khách hàng công sở năng động.\n\nBỐI CẢNH: LÀN DA THỜI ĐẠI SỐ\nTrung bình một người dành 7-9 giờ mỗi ngày trước màn hình. Tác hại tích lũy của ánh sáng xanh - thường gọi là 'digital aging' - gây xỉn màu, tăng sắc tố và lão hóa sớm. Nhu cầu bảo vệ da khỏi tác nhân này đang tăng nhanh, mở ra cơ hội lớn cho các sản phẩm 'anti-pollution' và 'blue light defense'.\n\nHOẠT CHẤT CHỦ LỰC\nCác thành phần được ưa chuộng gồm: chiết xuất vi tảo (Astaxanthin), Lutein, chiết xuất hạt lựu, Vitamin E và các phức hợp chống oxy hóa mạnh. Cosbuilt giúp thương hiệu kết hợp bộ chống ánh sáng xanh vào kem dưỡng ngày, kem lót hoặc xịt khoáng - tạo dòng sản phẩm 'must-have' cho lối sống hiện đại.",
    date: "16 Tháng 7, 2026",
    author: "ThS. Dược sĩ Hoàng Lan Phương",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600"
  },
  {
    title: "Cách lựa chọn chất diện hoạt (Surfactants) dịu nhẹ cho dòng sữa rửa mặt da nhạy cảm",
    category: "cẩm nang",
    summary: "Tránh kích ứng hàng rào bảo vệ da bằng việc thay thế SLS/SLES bằng các chất tạo bọt dịu nhẹ chiết xuất từ dừa và axit amin hữu cơ.",
    content: "Xu hướng làm sạch da hiện nay cực kỳ khắt khe với các thành phần tạo bọt rửa mặt. Thay vì các gốc tẩy mạnh truyền thống như SLS/SLES dễ gây khô ráp và mất nước biểu bì, các công thức của Cosbuilt ưu tiên sử dụng chất diện hoạt gốc Acid Amin (như Sodium Cocoyl Glycinate) hoặc gốc đường tự nhiên (Decyl Glucoside). Những hoạt chất này tạo bọt bông mịn dày, làm sạch dầu thừa hiệu quả nhưng giữ nguyên lớp màng lipid ẩm tự nhiên của da sau khi rửa.\n\nDẤU HIỆU CỦA CHẤT TẨY RỬA QUÁ MẠNH\nCảm giác 'da căng rít, khô ráp' sau khi rửa mặt - vốn từng bị hiểu nhầm là 'sạch' - thực chất là dấu hiệu hàng rào bảo vệ da đã bị bào mòn. Việc này kích thích da tiết dầu bù trừ nhiều hơn, gây ra vòng luẩn quẩn dầu - mụn. Chất diện hoạt dịu nhẹ giải quyết tận gốc vấn đề này.\n\nCHỌN CHẤT DIỆN HOẠT THEO LOẠI DA\nDa dầu mụn hợp với hệ amino acid kiểm soát bã nhờn nhẹ nhàng; da khô - nhạy cảm hợp với gốc đường (glucoside) siêu dịu; da thường có thể dùng công thức kết hợp cân bằng. Với sự am hiểu sâu về hóa mỹ phẩm, Cosbuilt giúp thương hiệu tạo ra sữa rửa mặt 'sạch mà không khô' - tiêu chí vàng của người tiêu dùng hiện đại.",
    date: "12 Tháng 7, 2026",
    author: "ThS. Đỗ Tuấn Anh (Chuyên gia nghiên cứu công thức Cosbuilt)",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600"
  },
  {
    title: "Xu hướng bao bì tái chế PCR và vật liệu xanh trong ngành công nghiệp mỹ phẩm",
    category: "xu hướng",
    summary: "Doanh nghiệp mỹ phẩm chuyển dịch sang sử dụng nhựa PCR tái chế sau tiêu dùng và hộp giấy bã mía tự hủy sinh học để phát triển bền vững.",
    content: "Sử dụng bao bì sinh thái không còn là sự lựa chọn mà đã trở thành trách nhiệm xã hội và tiêu chuẩn cạnh tranh khắt khe. Nhựa PCR (Post-Consumer Recycled) giúp tái chế rác thải nhựa cũ thành chai lọ mỹ phẩm cao cấp sang trọng, giảm mạnh lượng nhựa nguyên sinh và rác thải ra môi trường. Song song, hộp đựng làm từ giấy bã mía, giấy tái chế FSC hay vật liệu tự hủy sinh học cũng đang chiếm trọn cảm tình của người dùng thế hệ Gen Z, thúc đẩy chuyển đổi xanh mạnh mẽ toàn cầu.\n\nCÁC GIẢI PHÁP VẬT LIỆU XANH\nBên cạnh nhựa PCR, thị trường đang ưa chuộng: nhựa sinh học (bio-PE từ mía), thủy tinh (tái chế vô hạn), nhôm nhẹ, thiết kế refill giảm rác thải, và mực in gốc thực vật. Mỗi lựa chọn có ưu - nhược riêng về chi phí, tính thẩm mỹ và khả năng tương thích với công thức, cần cân nhắc kỹ theo định vị sản phẩm.\n\nXANH THẬT - ĐỪNG 'GREENWASHING'\nNgười tiêu dùng ngày càng tinh ý và tẩy chay các thương hiệu 'tẩy xanh' (greenwashing) - tuyên bố bền vững nhưng không thực chất. Sự minh bạch về tỷ lệ tái chế, chứng nhận vật liệu là điều bắt buộc. Cosbuilt đồng hành tư vấn chuỗi cung ứng bao bì xanh phù hợp, giúp thương hiệu vừa đẹp, vừa bền vững một cách chân thực và đáng tin.",
    date: "10 Tháng 7, 2026",
    author: "Bà Đặng Phương Thảo (Chuyên gia Môi trường & Phát triển Bền vững)",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600"
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
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    "description": "Công thức phục hồi tế bào thế hệ mới kết hợp Panthenol (Vitamin B5) nồng độ cao và hoạt chất Exosome siêu nhỏ chiết xuất từ rau má. Serum thẩm thấu tức thì, làm dịu nhanh các vùng da mẩn đỏ, kích ứng, đồng thời gửi tín hiệu kích thích nguyên bào sợi tăng sinh collagen tự thân. Kết cấu lỏng nhẹ, không nhờn rít, phù hợp cả da nhạy cảm và da sau liệu trình xâm lấn, giúp củng cố hàng rào bảo vệ da khỏe mạnh từ bên trong.",
    "ingredients": "Panthenol (Vitamin B5) 10% - phục hồi, làm dịu\nExosome chiết xuất rau má - kích hoạt tái tạo tế bào\nCentella Asiatica Extract - kháng viêm, giảm đỏ\nHyaluronic Acid đa tầng - cấp ẩm sâu\nCeramide NP - tái tạo màng lipid bảo vệ da",
    "guidelines": "Bước 1: Rửa mặt sạch và cân bằng da bằng toner.\nBước 2: Nhỏ 3-4 giọt serum ra tay, vỗ nhẹ đều khắp mặt.\nBước 3: Đợi thẩm thấu 1-2 phút rồi khóa ẩm bằng kem dưỡng.\nDùng sáng và tối. Rất phù hợp sau laser, peel hoặc treatment nặng."
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
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600",
    "description": "Kem dưỡng ẩm - dưỡng sáng tích hợp màng bọc khóa ẩm thông minh, mang lại làn da trắng hồng rạng rỡ mà không gây bí da. Niacinamide tinh khiết kết hợp Alpha-Arbutin ức chế quá trình melanin di chuyển lên bề mặt, làm mờ thâm nám và đều màu da rõ rệt sau khoảng 21 ngày sử dụng đều đặn. Squalane tự nhiên khóa ẩm mềm mượt, phù hợp dùng hằng ngày cho hầu hết các loại da.",
    "ingredients": "Niacinamide 5% - dưỡng sáng, mờ thâm\nAlpha-Arbutin 1% - ức chế melanin\nSqualane tự nhiên - khóa ẩm, làm mềm\nChiết xuất rễ cam thảo - làm dịu, chống oxy hóa\nHyaluronic Acid - cấp ẩm căng mọng",
    "guidelines": "Bước 1: Sau serum, lấy một lượng kem vừa đủ (bằng hạt đậu).\nBước 2: Chấm 5 điểm lên mặt và massage đều theo chuyển động tròn hướng lên.\nBước 3: Thoa nhẹ xuống vùng cổ.\nDùng sáng và tối; buổi sáng nhớ dùng kèm kem chống nắng."
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
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
    "description": "Sữa rửa mặt tạo bọt bông mịn tự nhiên, làm sạch sâu bụi bẩn và bã nhờn trong lỗ chân lông mà không gây khô căng nhờ hệ chất diện hoạt dịu nhẹ gốc đường. Độ pH chuẩn 5.5 lý tưởng giúp bảo toàn màng ẩm tự nhiên của da. Chiết xuất rau má bản địa dồi dào kết hợp tinh dầu tràm trà làm dịu, hỗ trợ kiểm soát mụn, trả lại làn da sạch thoáng và mềm mịn sau mỗi lần rửa.",
    "ingredients": "Chiết xuất rau má bản địa - làm dịu, phục hồi\nDecyl Glucoside - chất tạo bọt dịu nhẹ gốc đường\nGlycerin - giữ ẩm\nPanthenol (B5) - làm mềm da\nTinh dầu tràm trà - kháng khuẩn, kiểm soát mụn",
    "guidelines": "Bước 1: Làm ướt mặt bằng nước ấm.\nBước 2: Lấy một lượng vừa đủ, tạo bọt trong lòng bàn tay.\nBước 3: Massage nhẹ nhàng 30-60 giây, tập trung vùng chữ T.\nBước 4: Rửa sạch lại với nước. Dùng 1-2 lần/ngày."
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
    "image": "https://images.unsplash.com/photo-1748385367968-6fd2af37aafb?q=80&w=600",
    "description": "Mặt nạ giấy sinh học dệt từ nước dừa tươi lên men tự nhiên (bio-cellulose), ôm khít từng đường nét khuôn mặt như làn da thứ hai để truyền dẫn tối đa dưỡng chất. Khả năng giữ và cấp ẩm vượt trội giúp làn da căng mọng, mềm mại tức thì chỉ sau một lần đắp. Bảng thành phần lành tính, dịu nhẹ, thích hợp phục hồi da khô, thiếu nước và làm dịu da sau khi đi nắng.",
    "ingredients": "Nước dừa tươi lên men sinh học - cấp ẩm, nuôi dưỡng\nHyaluronic Acid đa tầng - giữ nước căng mọng\nNiacinamide 2% - dưỡng sáng nhẹ\nChiết xuất nha đam - làm dịu, phục hồi",
    "guidelines": "Bước 1: Rửa mặt sạch, thấm khô nhẹ.\nBước 2: Trải mặt nạ ôm khít khuôn mặt, để yên 15-20 phút.\nBước 3: Gỡ mặt nạ, vỗ nhẹ cho tinh chất còn lại thẩm thấu hết.\nKhông cần rửa lại. Dùng 2-3 lần/tuần."
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
    "image": "https://images.unsplash.com/photo-1743933282038-e9c576d97076?q=80&w=600",
    "description": "Mặt nạ sợi cotton tự nhiên thấm đẫm tinh chất tràm trà Úc và rau má, mang lại khả năng kháng khuẩn - kháng viêm mạnh mẽ cho làn da đang gặp vấn đề mụn. Sản phẩm giúp làm xẹp nhanh các nốt mụn sưng đỏ, đồng thời điều tiết lượng dầu thừa và se khít lỗ chân lông. Kết cấu tinh chất mát dịu, phù hợp dùng định kỳ để duy trì làn da sạch thoáng, giảm mụn tái phát.",
    "ingredients": "Tinh dầu tràm trà (Melaleuca Alternifolia) - kháng khuẩn\nSalicylic Acid (BHA) 0.5% - làm sạch lỗ chân lông\nChiết xuất trà xanh - chống oxy hóa, làm dịu\nChiết xuất rau má - phục hồi da",
    "guidelines": "Bước 1: Rửa mặt sạch, thấm khô.\nBước 2: Đắp mặt nạ đều khắp khuôn mặt, giữ 10-15 phút.\nBước 3: Gỡ ra, vỗ nhẹ cho tinh chất thấm.\nDùng 2-3 lần/tuần. Có thể đắp điểm lên nốt mụn sưng."
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
    "image": "https://images.unsplash.com/photo-1743928217924-77ec5f39c4fb?q=80&w=600",
    "description": "Dòng mặt nạ cao cấp chứa collagen thủy phân kích thước nano và phức hợp tế bào gốc thực vật, giúp kích thích tái tạo collagen tự nhiên dưới da, tăng cường độ đàn hồi và làm mờ nếp nhăn li ti rõ rệt. Adenosine hỗ trợ chống lão hóa trong khi Beta-glucan làm dịu và cấp ẩm sâu. Thích hợp cho làn da cần nâng cơ, săn chắc và phục hồi dấu hiệu lão hóa sớm.",
    "ingredients": "Collagen thủy phân từ cá biển sâu - nâng cơ, săn chắc\nTế bào gốc nho đỏ hữu cơ - tái tạo, chống oxy hóa\nAdenosine - làm mờ nếp nhăn\nBeta-glucan - làm dịu, cấp ẩm",
    "guidelines": "Bước 1: Rửa mặt sạch, dùng toner.\nBước 2: Đắp mặt nạ 15-20 phút.\nBước 3: Gỡ ra và massage nhẹ theo chiều nâng cơ từ dưới lên.\nDùng 2-3 lần/tuần để cảm nhận hiệu quả săn chắc."
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
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    "description": "Kem chống nắng chiết xuất rau má với kết cấu mỏng nhẹ, thấm nhanh, không để lại vệt trắng bệt hay cảm giác bí nhờn. Màng lọc quang phổ rộng SPF50 bảo vệ da tối ưu trước tia UVA/UVB, đồng thời hệ kiềm dầu thông minh giữ da khô thoáng suốt nhiều giờ. Bổ sung rau má và chiết xuất làm dịu giúp bảo vệ da nhạy cảm, da dầu mụn khỏi tác nhân môi trường mà vẫn dưỡng da khỏe mạnh.",
    "ingredients": "Màng lọc UVA/UVB SPF50 PA++++ - bảo vệ quang phổ rộng\nChiết xuất rau má - làm dịu, chống oxy hóa\nNiacinamide - dưỡng sáng, kiềm dầu\nSilica - hút dầu, giữ da khô thoáng",
    "guidelines": "Bước 1: Là bước cuối cùng trong chu trình dưỡng buổi sáng.\nBước 2: Thoa một lượng đủ (khoảng 2 đốt ngón tay) đều khắp mặt và cổ.\nBước 3: Đợi 15 phút trước khi ra nắng.\nThoa lại sau mỗi 2-3 giờ nếu hoạt động ngoài trời."
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
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600",
    "description": "Toner hoa cúc dịu nhẹ không cồn, giúp cân bằng độ pH và cấp ẩm tức thì sau bước làm sạch, đưa da về trạng thái sẵn sàng hấp thu dưỡng chất tốt nhất. Chiết xuất hoa cúc Calendula làm dịu vùng da nhạy cảm, ửng đỏ, trong khi Hyaluronic Acid và Panthenol khóa ẩm mềm mượt. Kết cấu nước trong mát, thẩm thấu nhanh, phù hợp dùng hằng ngày cho mọi loại da.",
    "ingredients": "Chiết xuất hoa cúc Calendula - làm dịu, chống viêm\nHyaluronic Acid - cấp ẩm sâu\nPanthenol (B5) - phục hồi hàng rào da\nGlycerin - giữ ẩm mềm mượt",
    "guidelines": "Bước 1: Sau khi rửa mặt, cho toner ra bông tẩy trang hoặc lòng bàn tay.\nBước 2: Lau/vỗ nhẹ đều khắp mặt, tránh vùng mắt.\nBước 3: Tiếp tục các bước serum và kem dưỡng.\nDùng sáng và tối."
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
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
    "description": "Sữa tắm dưỡng trắng với hương nước hoa lưu hương lâu, mang lại trải nghiệm tắm sang trọng như spa tại nhà. Bọt kem mềm mịn làm sạch dịu nhẹ, không gây khô da nhờ bổ sung Glycerin và các dưỡng chất giữ ẩm. Hoạt chất làm sáng giúp cải thiện tông da toàn thân đều màu, mềm mượt sau thời gian sử dụng, đồng thời lưu lại làn hương quyến rũ suốt nhiều giờ.",
    "ingredients": "Niacinamide - dưỡng sáng đều màu body\nGlycerin - giữ ẩm, chống khô\nChất diện hoạt dịu nhẹ - làm sạch không rít\nHương nước hoa cao cấp - lưu hương lâu",
    "guidelines": "Bước 1: Làm ướt cơ thể, lấy lượng sữa tắm vừa đủ ra bông tắm.\nBước 2: Tạo bọt và massage nhẹ khắp cơ thể.\nBước 3: Xả sạch lại với nước.\nDùng hằng ngày để duy trì làn da sáng mịn và thơm mát."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Tẩy tế bào chết body từ hạt cà phê Đắk Lắk nguyên chất, nhẹ nhàng loại bỏ lớp da xỉn màu, sần sùi để lộ làn da mới mịn màng, tươi sáng. Hạt cà phê giàu chất chống oxy hóa kết hợp dầu dưỡng tự nhiên vừa massage vừa nuôi dưỡng, kích thích tuần hoàn máu và làm da mềm mượt. Hương cà phê ấm áp thư giãn, phù hợp dùng định kỳ để da luôn láng mịn.",
    "ingredients": "Hạt cà phê Đắk Lắk - tẩy tế bào chết, chống oxy hóa\nĐường mía tự nhiên - làm sạch dịu nhẹ\nDầu dừa/dầu hạnh nhân - dưỡng ẩm, làm mềm\nVitamin E - nuôi dưỡng da",
    "guidelines": "Bước 1: Làm ướt da khi tắm.\nBước 2: Lấy một lượng vừa đủ, massage tròn nhẹ khắp cơ thể, tập trung vùng khuỷu tay, đầu gối, gót chân.\nBước 3: Xả sạch với nước.\nDùng 2-3 lần/tuần."
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
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Sữa dưỡng thể dưỡng trắng tích hợp Glutathione và màng chống nắng nhẹ, vừa nuôi dưỡng làn da sáng mịn vừa bảo vệ khỏi tác động của môi trường ban ngày. Kết cấu lotion mỏng nhẹ thấm nhanh, không nhờn dính, khóa ẩm suốt cả ngày dài. Sử dụng đều đặn giúp cải thiện tông da toàn thân đều màu, mềm mại và rạng rỡ tự nhiên.",
    "ingredients": "Glutathione - dưỡng trắng, chống oxy hóa\nNiacinamide - làm đều màu da\nMàng lọc chống nắng nhẹ - bảo vệ ban ngày\nShea Butter - dưỡng ẩm, làm mềm",
    "guidelines": "Bước 1: Sau khi tắm và lau khô da.\nBước 2: Thoa đều lotion khắp cơ thể, massage nhẹ đến khi thấm.\nBước 3: Ưu tiên dùng buổi sáng để tận dụng lớp bảo vệ chống nắng.\nDùng hằng ngày."
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
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600",
    "description": "Xịt thơm toàn thân hương hoa anh đào tươi mát, mang lại cảm giác thư thái và quyến rũ tức thì. Công thức dạng sương mịn phủ đều, lưu hương vừa phải, thanh lịch, phù hợp làm mới cơ thể suốt ngày dài mà không gây nồng gắt. Bổ sung dưỡng chất giữ ẩm nhẹ giúp da mềm mượt, thoang thoảng hương thơm tinh tế.",
    "ingredients": "Hương hoa anh đào (Sakura) - thanh lịch, tươi mát\nPanthenol - giữ ẩm nhẹ\nCồn dược phẩm bay nhanh - định hương\nNước tinh khiết - dịu nhẹ trên da",
    "guidelines": "Bước 1: Lắc nhẹ chai trước khi dùng.\nBước 2: Xịt cách cơ thể 15-20cm vào các vùng như cổ, cổ tay, sau tai.\nBước 3: Xịt lại khi cần làm mới hương thơm.\nTránh xịt trực tiếp lên mặt và vùng da tổn thương."
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
    "image": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600",
    "description": "Kem dưỡng da tay chiết xuất sữa dừa, thấm nhanh không để lại cảm giác nhờn dính, phục hồi làn da tay khô ráp, nứt nẻ trở nên mềm mại tức thì. Công thức giàu dưỡng chất khóa ẩm lâu dài, bảo vệ da tay khỏi tác động của nước rửa và thời tiết. Tuýp nhỏ gọn tiện mang theo, hương thơm dịu nhẹ dễ chịu.",
    "ingredients": "Chiết xuất sữa dừa - dưỡng ẩm, làm mềm\nShea Butter - phục hồi da khô nứt\nGlycerin - giữ nước\nVitamin E - nuôi dưỡng, chống lão hóa da tay",
    "guidelines": "Bước 1: Lấy một lượng nhỏ kem ra lòng bàn tay.\nBước 2: Xoa đều hai tay, massage kỹ các kẽ ngón và móng.\nBước 3: Dùng lại sau mỗi lần rửa tay hoặc khi da khô.\nDùng nhiều lần trong ngày."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Kem ủ trắng body chiết xuất tảo biển Pháp, mang lại hiệu quả dưỡng sáng và cấp ẩm chuyên sâu như liệu trình spa. Khoáng chất từ tảo biển nuôi dưỡng da mềm mịn, trong khi các hoạt chất làm sáng cải thiện tông da xỉn màu, không đều màu. Kết cấu kem đặc mịn, dễ tán, thẩm thấu tốt, thích hợp ủ định kỳ để da toàn thân sáng khỏe rạng rỡ.",
    "ingredients": "Chiết xuất tảo biển Pháp - khoáng hóa, nuôi dưỡng\nGlutathione & Niacinamide - dưỡng trắng\nCollagen - tăng đàn hồi\nBơ hạt mỡ - dưỡng ẩm sâu",
    "guidelines": "Bước 1: Tắm sạch, lau khô da.\nBước 2: Thoa lớp kem ủ dày lên vùng da cần dưỡng.\nBước 3: Ủ 15-20 phút cho dưỡng chất thấm rồi rửa lại (hoặc massage đến khi thấm).\nDùng 2-3 lần/tuần."
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
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600",
    "description": "Gel tẩy tế bào chết body chứa AHA và tinh chất cam, nhẹ nhàng làm bong lớp da chết mà không cần chà xát mạnh gây tổn thương da. AHA hòa tan liên kết tế bào sừng già cỗi, trả lại làn da mới láng mịn và tươi sáng, đồng thời tinh chất cam giàu Vitamin C giúp da rạng rỡ, đều màu hơn. Phù hợp cho các vùng da sần sùi, thâm sạm.",
    "ingredients": "AHA (Glycolic/Lactic Acid) - tẩy tế bào chết hóa học\nTinh chất cam (Vitamin C) - làm sáng, đều màu\nChiết xuất lô hội - làm dịu\nGlycerin - cấp ẩm",
    "guidelines": "Bước 1: Làm ẩm da, thoa gel lên vùng cần tẩy.\nBước 2: Massage nhẹ, gel sẽ vón lại kéo theo tế bào chết.\nBước 3: Xả sạch với nước.\nDùng 1-2 lần/tuần; sau đó dưỡng ẩm và chống nắng kỹ."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Dầu dưỡng thể hoa oải hương với hương thơm thư giãn, nuôi dưỡng làn da khô ráp trở nên mềm mượt, căng bóng và tràn đầy sức sống. Hỗn hợp dầu thực vật quý thẩm thấu nhanh, không gây bết dính, khóa ẩm sâu và tạo lớp màng bảo vệ mềm mại. Hương oải hương dịu nhẹ giúp giải tỏa căng thẳng, lý tưởng dùng buổi tối trước khi ngủ.",
    "ingredients": "Tinh dầu oải hương - thư giãn, kháng khuẩn nhẹ\nDầu Jojoba - dưỡng ẩm tương thích da\nDầu hạnh nhân ngọt - làm mềm, mượt da\nVitamin E - chống oxy hóa",
    "guidelines": "Bước 1: Lấy vài giọt dầu ra lòng bàn tay, xoa ấm.\nBước 2: Massage đều lên da còn hơi ẩm sau khi tắm để khóa ẩm tốt nhất.\nBước 3: Massage kỹ vùng da khô như khuỷu, gối.\nDùng hằng ngày, đặc biệt buổi tối."
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
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600",
    "description": "Dầu gội bưởi đậm đặc chuyên biệt cho tóc gãy rụng, kết hợp tinh dầu vỏ bưởi và các dưỡng chất kích thích nang tóc, giúp giảm rụng và thúc đẩy mọc tóc con. Công thức làm sạch dịu nhẹ, không chứa sulfate mạnh, giữ da đầu cân bằng và sạch thoáng. Sử dụng đều đặn giúp mái tóc chắc khỏe từ gốc, dày dặn và bồng bềnh hơn.",
    "ingredients": "Tinh dầu vỏ bưởi - kích thích mọc tóc, giảm rụng\nBiotin (Vitamin B7) - chắc khỏe nang tóc\nChiết xuất hà thủ ô, bồ kết - dưỡng tóc chắc gốc\nChất tẩy rửa dịu nhẹ không sulfate",
    "guidelines": "Bước 1: Làm ướt tóc, lấy lượng dầu gội vừa đủ.\nBước 2: Tạo bọt và massage da đầu 2-3 phút để dưỡng chất thẩm thấu.\nBước 3: Xả sạch với nước.\nDùng 3-4 lần/tuần; kết hợp kem xả cùng dòng để tối ưu hiệu quả."
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
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
    "description": "Kem xả tóc tinh dầu bưởi phục hồi hư tổn, cung cấp dưỡng chất sâu vào từng sợi tóc khô xơ, chẻ ngọn, trả lại mái tóc mềm mượt, óng ả và dễ vào nếp. Công thức bổ sung Keratin và dầu Argan tái cấu trúc thân tóc, làm mượt lớp biểu bì và giảm rối. Hương bưởi tươi mát lưu lại nhẹ nhàng trên tóc.",
    "ingredients": "Tinh dầu vỏ bưởi - dưỡng tóc, kích thích nang\nKeratin thủy phân - phục hồi hư tổn\nDầu Argan - làm mượt, giảm xơ rối\nBơ hạt mỡ - dưỡng ẩm thân tóc",
    "guidelines": "Bước 1: Sau khi gội, vắt bớt nước trên tóc.\nBước 2: Thoa kem xả từ giữa thân đến ngọn tóc, tránh da đầu.\nBước 3: Ủ 2-3 phút rồi xả sạch.\nDùng sau mỗi lần gội."
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
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600",
    "description": "Tinh dầu dưỡng tóc Argan phục hồi bóng mượt, tạo lớp màng bảo vệ giúp tóc chống lại hư tổn từ nhiệt và môi trường. Dầu Argan quý giàu Vitamin E và axit béo thẩm thấu nhanh, làm mượt tóc khô xơ, giảm chẻ ngọn và xù rối tức thì mà không gây bết. Vài giọt nhỏ cho mái tóc óng ả, vào nếp và thơm nhẹ suốt ngày dài.",
    "ingredients": "Dầu Argan nguyên chất - phục hồi, tạo bóng\nDầu hạt Macadamia - làm mượt, chống xơ rối\nVitamin E - chống oxy hóa, bảo vệ tóc\nSilicone nhẹ - tạo màng bóng không bết",
    "guidelines": "Bước 1: Lấy 2-3 giọt serum ra lòng bàn tay, xoa đều.\nBước 2: Vuốt nhẹ lên phần thân và ngọn tóc (tóc khô hoặc ẩm), tránh chân tóc.\nBước 3: Tạo kiểu như bình thường.\nDùng hằng ngày khi cần."
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
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600",
    "description": "Xịt dưỡng tóc vỏ bưởi và Biotin dạng sương mịn, bổ sung dưỡng chất tức thì cho mái tóc mỏng yếu, dễ gãy rụng. Công thức thẩm thấu nhanh vào da đầu và thân tóc, nuôi dưỡng nang tóc chắc khỏe, kích thích mọc tóc con và mang lại cảm giác tóc dày, bồng bềnh hơn. Hương bưởi tươi mát dễ chịu, tiện dùng nhiều lần trong ngày.",
    "ingredients": "Tinh dầu vỏ bưởi - kích thích mọc tóc\nBiotin - nuôi dưỡng nang tóc chắc khỏe\nChiết xuất nhân sâm - tăng cường sức sống tóc\nPanthenol - dưỡng ẩm thân tóc",
    "guidelines": "Bước 1: Lắc đều chai trước khi dùng.\nBước 2: Xịt trực tiếp lên da đầu và thân tóc (tóc khô hoặc ẩm).\nBước 3: Massage nhẹ da đầu để thẩm thấu, không cần xả lại.\nDùng 1-2 lần/ngày."
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
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600",
    "description": "Tẩy tế bào chết da đầu với muối biển và bạc hà, làm sạch sâu bã nhờn, gàu và bụi bẩn tích tụ ở chân tóc - nguyên nhân khiến tóc bết và yếu. Hạt muối biển massage nhẹ nhàng kích thích tuần hoàn da đầu, trong khi bạc hà mang lại cảm giác the mát sảng khoái. Da đầu sạch thoáng giúp nang tóc khỏe mạnh và tóc mọc tốt hơn.",
    "ingredients": "Muối biển khoáng - tẩy tế bào chết, làm sạch sâu\nTinh dầu bạc hà - the mát, kháng khuẩn\nChiết xuất tràm trà - giảm gàu, ngứa\nDầu dừa - dưỡng ẩm da đầu",
    "guidelines": "Bước 1: Làm ướt tóc và da đầu.\nBước 2: Lấy lượng vừa đủ, massage tròn nhẹ nhàng lên da đầu 2-3 phút.\nBước 3: Xả sạch rồi gội đầu như bình thường.\nDùng 1-2 lần/tuần."
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
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
    "description": "Kem ủ tóc collagen thủy phân chuẩn salon, phục hồi chuyên sâu cho mái tóc hư tổn nặng do uốn, nhuộm, tẩy. Collagen và Keratin thẩm thấu sâu tái cấu trúc sợi tóc từ bên trong, trả lại độ chắc khỏe, đàn hồi và bóng mượt như vừa bước ra từ tiệm. Kết cấu kem giàu dưỡng chất, thẩm thấu tốt, giảm gãy rụng và xơ rối rõ rệt.",
    "ingredients": "Collagen thủy phân - phục hồi, tăng đàn hồi\nKeratin - tái cấu trúc sợi tóc\nDầu Argan & bơ hạt mỡ - dưỡng ẩm sâu\nCeramide - làm mượt lớp biểu bì tóc",
    "guidelines": "Bước 1: Sau khi gội, vắt ráo nước.\nBước 2: Thoa đều kem ủ từ thân đến ngọn tóc, tránh da đầu.\nBước 3: Ủ 10-15 phút (có thể dùng mũ ủ nhiệt) rồi xả sạch.\nDùng 2 lần/tuần cho tóc hư tổn."
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
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600",
    "description": "Dầu gội bồ kết cô đặc theo bí quyết dân gian kết hợp công nghệ hiện đại, làm sạch sâu và ngăn ngừa gàu, nấm da đầu hiệu quả. Chiết xuất bồ kết giàu saponin tự nhiên tạo bọt dịu nhẹ, nuôi dưỡng tóc đen mượt, chắc khỏe từ gốc. Da đầu sạch thoáng, hết ngứa, giảm gàu, phù hợp cho người có da đầu nhạy cảm, dễ gàu ngứa.",
    "ingredients": "Chiết xuất bồ kết - làm sạch, dưỡng tóc đen mượt\nChiết xuất vỏ bưởi - kích thích nang tóc\nTinh dầu tràm trà - kháng nấm, giảm gàu\nMenthol - the mát, giảm ngứa",
    "guidelines": "Bước 1: Làm ướt tóc, lấy lượng vừa đủ.\nBước 2: Tạo bọt và massage da đầu 2-3 phút.\nBước 3: Xả sạch với nước; nếu gàu nhiều có thể gội lại lần hai.\nDùng 3-4 lần/tuần."
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
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600",
    "description": "Xịt dưỡng tóc bảo vệ nhiệt chứa Keratin, tạo lớp màng chắn giúp tóc chống lại tổn thương khi sấy, duỗi, uốn ở nhiệt độ cao. Công thức dạng sương mịn phủ đều, thẩm thấu nhanh, vừa bảo vệ vừa dưỡng ẩm giúp tóc mềm mượt và bóng khỏe sau tạo kiểu. Giảm xơ rối và chẻ ngọn do nhiệt, cho mái tóc luôn vào nếp và khỏe đẹp.",
    "ingredients": "Keratin thủy phân - tạo màng bảo vệ nhiệt\nDầu Argan - dưỡng ẩm, làm mượt\nPanthenol - phục hồi thân tóc\nProtein lúa mì - tăng độ bền sợi tóc",
    "guidelines": "Bước 1: Xịt đều lên tóc khô hoặc ẩm trước khi dùng máy tạo kiểu.\nBước 2: Chải đều để phủ khắp thân tóc.\nBước 3: Sấy/duỗi/uốn như bình thường.\nDùng mỗi khi tạo kiểu nhiệt."
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
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
    "description": "Son kem lì velvet siêu mịn môi, lên màu chuẩn chỉ với một lớp và bám lâu suốt nhiều giờ mà không gây khô nứt. Kết cấu mousse nhẹ như không, tán đều mượt mà cho lớp finish lì mịn hiện đại, tôn da. Bổ sung dưỡng chất giữ ẩm giúp môi mềm mại, thoải mái cả ngày dài, không bị bết hay lộ vân môi.",
    "ingredients": "Hệ màu bột mịn cao cấp - lên màu chuẩn, bám lâu\nVitamin E - dưỡng ẩm, chống oxy hóa\nDầu Jojoba - làm mềm môi\nSáp thực vật - tạo finish lì mịn",
    "guidelines": "Bước 1: Tẩy tế bào chết và dưỡng ẩm môi trước khi dùng.\nBước 2: Thoa từ giữa môi tán ra hai bên.\nBước 3: Có thể chồng lớp để tăng độ đậm.\nDùng tẩy trang chuyên dụng để làm sạch cuối ngày."
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
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Phấn nước cushion che phủ hoàn hảo, cho lớp nền mịn màng tự nhiên và khả năng kiềm dầu vượt trội suốt ngày dài. Tích hợp màng lọc chống nắng SPF50 bảo vệ da khỏi tia UV, đồng thời bổ sung dưỡng chất chăm sóc da ngay trong lúc trang điểm. Đầu bông mút mềm mại giúp tán đều, che khuyết điểm mà vẫn mỏng nhẹ, không bết mảng.",
    "ingredients": "Màng lọc chống nắng SPF50 PA+++ - bảo vệ UV\nHạt phấn siêu mịn - che phủ tự nhiên\nNiacinamide - dưỡng sáng da\nSilica - kiềm dầu, giữ lớp nền lâu trôi",
    "guidelines": "Bước 1: Dưỡng ẩm và dùng kem lót trước.\nBước 2: Ấn nhẹ mút vào lõi phấn, chấm đều lên mặt.\nBước 3: Dặm nhẹ để tán đều, che khuyết điểm.\nDặm lại trong ngày khi cần."
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
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
    "description": "Son thỏi lì satin cao cấp cho đôi môi căng mịn quyến rũ, lên màu sang trọng và bám màu bền bỉ. Kết cấu satin mềm mượt lướt nhẹ trên môi, che phủ đều màu mà không làm khô hay lộ vân môi. Bảng màu tôn da, dưỡng chất trong son giúp môi mềm mại, đầy đặn suốt thời gian sử dụng.",
    "ingredients": "Hệ sắc tố cao cấp - lên màu chuẩn, sang trọng\nBơ hạt mỡ & dầu thầu dầu - dưỡng ẩm môi\nVitamin E - chống oxy hóa\nSáp ong/sáp thực vật - kết cấu satin mượt",
    "guidelines": "Bước 1: Dưỡng môi và tẩy tế bào chết trước khi thoa.\nBước 2: Thoa son từ giữa môi tán ra, có thể dùng chì kẻ viền để sắc nét.\nBước 3: Thấm nhẹ và chồng lớp hai để tăng độ bền màu."
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
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Kem nền liquid foundation che phủ mỏng nhẹ, cho lớp nền tự nhiên như da thật (skin-like finish) mà vẫn che được khuyết điểm. Kết cấu lỏng mịn dễ tán, thấm nhanh, không gây cảm giác nặng mặt hay bí da. Bổ sung dưỡng chất giữ ẩm giúp lớp nền mượt mà, bền màu và không bị mốc, xuống tông trong ngày dài.",
    "ingredients": "Hạt phấn siêu mịn - che phủ tự nhiên\nHyaluronic Acid - giữ ẩm, mượt nền\nNiacinamide - dưỡng sáng\nHệ polymer bám dính - giữ lớp nền lâu trôi",
    "guidelines": "Bước 1: Dưỡng ẩm và dùng kem lót.\nBước 2: Lấy vài giọt kem nền, tán đều từ trung tâm mặt ra ngoài bằng cọ/mút.\nBước 3: Phủ phấn bột để cố định lớp nền.\nTẩy trang kỹ cuối ngày."
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
    "description": "Bút kẻ mắt nước đầu cọ mảnh siêu sắc nét, cho đường kẻ chuẩn xác, đều màu chỉ trong một lần lướt. Mực đen tuyền, khô nhanh và chống trôi, chống lem suốt cả ngày dù trong điều kiện nóng ẩm. Đầu cọ linh hoạt dễ dàng tạo dáng mắt từ thanh mảnh đến sắc sảo, phù hợp cả người mới tập kẻ mắt.",
    "ingredients": "Mực gốc nước lâu trôi - chống lem, chống nước\nHệ polymer bám màu - giữ đường kẻ cả ngày\nĐầu cọ sợi mảnh - kẻ chuẩn xác, sắc nét",
    "guidelines": "Bước 1: Lắc nhẹ bút trước khi dùng.\nBước 2: Kẻ sát chân mi từ đầu mắt ra đuôi mắt.\nBước 3: Tạo dáng đuôi mắt tùy ý, đợi khô hẳn.\nTẩy trang bằng nước tẩy chuyên dụng vùng mắt."
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
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
    "description": "Nước tẩy trang Micellar nước hoa hồng làm sạch dịu nhẹ lớp trang điểm, bụi bẩn và bã nhờn mà không cần rửa lại, không gây khô căng da. Các phân tử micelle thông minh 'hút' sạch cặn trang điểm kể cả lớp lì lâu trôi, trong khi chiết xuất hoa hồng làm dịu và cấp ẩm. Phù hợp cho mọi loại da, kể cả da nhạy cảm và vùng mắt.",
    "ingredients": "Micelle làm sạch thông minh - lấy sạch makeup\nChiết xuất nước hoa hồng - làm dịu, cấp ẩm\nGlycerin - giữ ẩm, chống khô\nKhông cồn, không hương liệu gây kích ứng",
    "guidelines": "Bước 1: Thấm nước tẩy trang ra bông tẩy trang.\nBước 2: Đặt bông lên da vài giây rồi lau nhẹ nhàng lớp trang điểm.\nBước 3: Lặp lại đến khi bông sạch.\nSau đó rửa mặt lại bằng sữa rửa mặt (double cleansing)."
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
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
    "description": "Son bóng dưỡng môi collagen glow cho đôi môi căng mọng, bóng khỏe và ngậm nước tức thì. Kết cấu dầu dưỡng nhẹ, không dính bết, vừa tạo hiệu ứng bóng gương quyến rũ vừa nuôi dưỡng môi mềm mại, giảm khô nứt. Ánh màu trong nhẹ tôn sắc môi tự nhiên, thích hợp dùng riêng hoặc phủ lên son lì để cấp ẩm.",
    "ingredients": "Collagen - làm căng mọng môi\nDầu Jojoba & dầu hạnh nhân - dưỡng ẩm sâu\nVitamin E - chống oxy hóa, làm mềm\nAnh màu trong nhẹ - tạo hiệu ứng bóng khỏe",
    "guidelines": "Bước 1: Thoa trực tiếp lên môi bằng đầu cọ.\nBước 2: Dùng riêng để cấp ẩm hoặc phủ lên son lì tạo hiệu ứng bóng.\nBước 3: Thoa lại khi cần trong ngày.\nCó thể dùng như son dưỡng ban đêm."
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
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    "description": "Phấn phủ bột khoáng kiềm dầu giúp cố định lớp nền, kiểm soát bóng dầu và làm mờ lỗ chân lông cho lớp trang điểm mịn lì suốt ngày dài. Hạt bột khoáng siêu mịn tệp vào da tự nhiên, không gây bột mảng hay khô mốc. Bổ sung thành phần lành tính giúp da thông thoáng, phù hợp cả da dầu mụn nhạy cảm.",
    "ingredients": "Bột khoáng siêu mịn - kiềm dầu, làm mờ lỗ chân lông\nSilica - hút dầu, giữ nền lâu trôi\nKẽm Oxide - làm dịu, kháng khuẩn nhẹ\nKhông talc, không hương liệu",
    "guidelines": "Bước 1: Sau khi hoàn tất lớp nền.\nBước 2: Lấy một lượng nhỏ phấn lên bông/cọ, dặm nhẹ vùng chữ T và toàn mặt.\nBước 3: Dặm lại trong ngày để kiềm dầu.\nDùng lượng vừa đủ tránh bột mảng."
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
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600",
    "description": "Dung dịch vệ sinh phụ nữ chiết xuất trầu không dịu nhẹ, làm sạch và kháng khuẩn tự nhiên, giúp vùng kín luôn khô thoáng, sạch sẽ và tự tin. Công thức cân bằng độ pH sinh lý, không gây khô rát hay mất cân bằng hệ vi sinh tự nhiên. Hương thảo mộc thanh khiết mang lại cảm giác dễ chịu, phù hợp dùng hằng ngày cho da nhạy cảm.",
    "ingredients": "Chiết xuất trầu không - kháng khuẩn, khử mùi tự nhiên\nAcid Lactic - cân bằng pH sinh lý\nChiết xuất trà xanh - làm dịu, chống viêm\nBisabolol - làm dịu vùng nhạy cảm",
    "guidelines": "Bước 1: Làm ướt vùng vệ sinh với nước.\nBước 2: Lấy một lượng nhỏ, tạo bọt và rửa nhẹ nhàng bên ngoài.\nBước 3: Rửa sạch lại với nước.\nDùng 1-2 lần/ngày; không thụt rửa sâu."
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
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
    "description": "Nước súc miệng thảo mộc khử mùi và mang lại hơi thở thơm mát suốt nhiều giờ, đồng thời hỗ trợ kháng khuẩn, bảo vệ nướu và răng miệng khỏe mạnh. Công thức dịu nhẹ không cồn gắt, không gây rát miệng, phù hợp dùng hằng ngày. Chiết xuất thảo mộc tự nhiên giúp làm sạch khoang miệng và ngăn ngừa vi khuẩn gây mùi.",
    "ingredients": "Chiết xuất bạc hà - thơm mát, khử mùi\nTinh dầu tràm trà - kháng khuẩn\nChiết xuất lá trầu không - bảo vệ nướu\nXylitol - chống sâu răng, vị dịu ngọt",
    "guidelines": "Bước 1: Sau khi đánh răng, lấy khoảng 15-20ml dung dịch.\nBước 2: Súc miệng kỹ trong 30 giây, đảo đều khắp khoang miệng.\nBước 3: Nhổ ra, không cần súc lại với nước.\nDùng 2 lần/ngày sáng và tối."
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
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    "description": "Lăn khử mùi sinh học tràm trà và bạc hà, kiểm soát mùi cơ thể hiệu quả suốt ngày dài nhờ cơ chế kháng khuẩn tự nhiên thay vì bịt kín tuyến mồ hôi. Kết cấu lăn khô thoáng, thấm nhanh, không để lại vệt trắng trên áo. Bổ sung dưỡng chất làm dịu vùng da dưới cánh tay nhạy cảm, an toàn cho làn da và sức khỏe.",
    "ingredients": "Tinh dầu tràm trà - kháng khuẩn khử mùi\nMenthol (bạc hà) - the mát, sảng khoái\nPhèn chua tự nhiên (Alum) - se khít, kiểm soát mồ hôi\nKhông chứa muối nhôm tổng hợp, không paraben",
    "guidelines": "Bước 1: Vệ sinh và lau khô vùng da dưới cánh tay.\nBước 2: Lăn đều 2-3 đường lên mỗi bên.\nBước 3: Đợi khô thoáng trước khi mặc áo.\nDùng buổi sáng và sau khi tắm."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Kem đánh răng than hoạt tính làm trắng răng tự nhiên, nhẹ nhàng loại bỏ mảng bám và vết ố xỉn màu từ trà, cà phê, thuốc lá mà không gây mài mòn men răng. Than hoạt tính hấp phụ vi khuẩn và độc tố, kết hợp thảo mộc bảo vệ nướu, mang lại hàm răng trắng sáng và hơi thở thơm mát. Vị bạc hà dịu nhẹ dễ chịu.",
    "ingredients": "Than hoạt tính (Activated Charcoal) - làm trắng, hút bám\nFluoride/Hydroxyapatite - chống sâu răng, chắc men\nChiết xuất bạc hà - thơm mát\nChiết xuất trà xanh - bảo vệ nướu",
    "guidelines": "Bước 1: Lấy một lượng kem bằng hạt đậu lên bàn chải.\nBước 2: Chải kỹ mọi mặt răng trong 2 phút.\nBước 3: Súc miệng sạch với nước.\nDùng 2 lần/ngày sáng và tối."
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
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
    "description": "Sữa rửa tay tạo bọt trà xanh kháng khuẩn, làm sạch nhẹ nhàng bụi bẩn và vi khuẩn mà vẫn giữ ẩm cho da tay không bị khô rát. Dạng bọt bông mịn tiện lợi, tiết kiệm, lan đều nhanh chóng. Chiết xuất trà xanh chống oxy hóa kết hợp dưỡng chất giữ ẩm giúp đôi tay sạch thơm, mềm mại sau mỗi lần rửa.",
    "ingredients": "Chiết xuất trà xanh - kháng khuẩn, chống oxy hóa\nChất diện hoạt dịu nhẹ - làm sạch không khô\nGlycerin - giữ ẩm da tay\nPanthenol - làm mềm, phục hồi",
    "guidelines": "Bước 1: Làm ướt tay, nhấn vòi lấy bọt.\nBước 2: Xoa đều bọt khắp bàn tay, kẽ ngón trong 20-30 giây.\nBước 3: Rửa sạch lại với nước.\nDùng nhiều lần trong ngày."
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
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600",
    "description": "Xịt thơm miệng thảo mộc bạc hà dạng bỏ túi tiện lợi, mang lại hơi thở thơm mát tức thì chỉ trong vài giây. Công thức cô đặc, kháng khuẩn nhẹ giúp trung hòa mùi hôi miệng và tạo cảm giác sảng khoái, tự tin khi giao tiếp. Thiết kế nhỏ gọn dễ mang theo, dùng mọi lúc sau bữa ăn hoặc khi cần làm mới hơi thở.",
    "ingredients": "Tinh dầu bạc hà cô đặc - thơm mát tức thì\nChiết xuất thảo mộc - kháng khuẩn khử mùi\nXylitol - vị dịu, chống sâu răng\nMenthol - sảng khoái, mát lạnh",
    "guidelines": "Bước 1: Mở nắp, hướng vòi xịt vào khoang miệng.\nBước 2: Xịt 1-2 lần lên lưỡi và trong miệng.\nBước 3: Ngậm nhẹ để hương lan tỏa.\nDùng khi cần làm mới hơi thở, sau bữa ăn."
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
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600",
    "description": "Dung dịch vệ sinh nam giới bạc hà và trầu không, làm sạch và khử mùi vùng nhạy cảm, mang lại cảm giác khô thoáng, sạch sẽ và the mát sảng khoái suốt ngày dài. Công thức cân bằng pH phù hợp sinh lý nam giới, kháng khuẩn tự nhiên, không gây khô rát. Hương thảo mộc nam tính, dùng hằng ngày để luôn tự tin.",
    "ingredients": "Chiết xuất trầu không - kháng khuẩn, khử mùi\nMenthol (bạc hà) - the mát, sảng khoái\nAcid Lactic - cân bằng pH\nChiết xuất trà xanh - làm dịu, chống viêm",
    "guidelines": "Bước 1: Làm ướt vùng vệ sinh.\nBước 2: Lấy một lượng vừa đủ, tạo bọt và rửa nhẹ bên ngoài.\nBước 3: Rửa sạch lại với nước.\nDùng 1-2 lần/ngày."
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
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600",
    "description": "Dầu massage sả chanh bừng tỉnh năng lượng, mang lại trải nghiệm thư giãn và trẻ hóa cho cơ thể mệt mỏi. Hỗn hợp dầu nền thực vật cùng tinh dầu sả chanh thẩm thấu êm ái, giúp lưu thông khí huyết, giảm căng cơ và làm mềm mịn da. Hương sả chanh tươi mát sảng khoái, lý tưởng cho các liệu trình massage thư giãn tại spa hoặc tại nhà.",
    "ingredients": "Tinh dầu sả chanh - bừng tỉnh, thư giãn, đuổi côn trùng\nDầu nền Jojoba/hạnh nhân - trơn mượt, dưỡng da\nVitamin E - chống oxy hóa\nTinh dầu bạc hà - the mát nhẹ",
    "guidelines": "Bước 1: Làm ấm một lượng dầu vừa đủ trong lòng bàn tay.\nBước 2: Thoa và massage nhẹ nhàng theo chuyển động tròn lên vùng cơ cần thư giãn.\nBước 3: Massage 10-15 phút, lau sạch hoặc để dầu thấm.\nDùng khi cần thư giãn."
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
    "image": "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=600",
    "description": "Serum tế bào gốc Exosome thế hệ mới - đỉnh cao công nghệ sinh học phục hồi và tái tạo da tầng sâu. Các túi Exosome siêu nhỏ mang tín hiệu tái sinh 'ra lệnh' cho tế bào da tăng sinh collagen và elastin tự thân, làm mờ nếp nhăn, se khít lỗ chân lông và cải thiện sẹo rỗ rõ rệt. Kết cấu tinh chất mỏng nhẹ, thẩm thấu tức thì, phù hợp mọi loại da cần trẻ hóa chuyên sâu.",
    "ingredients": "Exosome tế bào gốc thực vật - tái sinh tế bào tầng sâu\nPeptide đồng (Copper Peptide) - kích hoạt collagen\nHyaluronic Acid đa tầng - cấp ẩm căng mọng\nEGF/FGF - yếu tố tăng trưởng phục hồi da",
    "guidelines": "Bước 1: Sau khi làm sạch và toner, lấy 3-4 giọt serum.\nBước 2: Vỗ nhẹ đều khắp mặt và cổ.\nBước 3: Khóa ẩm bằng kem dưỡng.\nDùng tối (và sáng nếu cần); lý tưởng sau liệu trình lăn kim, laser."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Kem trẻ hóa da Retinol bọc Liposome giải phóng chậm - giải pháp chống lão hóa mạnh mẽ nhưng dịu nhẹ vượt trội. Công nghệ bao bọc Liposome bảo vệ Retinol khỏi oxy hóa và giải phóng từ từ vào tầng sâu, tối ưu hiệu quả làm mờ nếp nhăn, tái tạo bề mặt da mà giảm tối đa kích ứng, bong tróc thường gặp. Da mịn màng, săn chắc và tươi trẻ hơn theo thời gian.",
    "ingredients": "Retinol bọc Liposome - chống lão hóa, giải phóng chậm\nNiacinamide - làm dịu, dưỡng sáng\nCeramide & Squalane - phục hồi hàng rào da\nBisabolol - giảm kích ứng",
    "guidelines": "Bước 1: Dùng vào buổi tối, sau bước serum.\nBước 2: Lấy một lượng nhỏ, thoa đều toàn mặt (tránh vùng mắt, khóe miệng).\nBước 3: Người mới nên dùng 2-3 tối/tuần rồi tăng dần.\nBuổi sáng bắt buộc dùng kem chống nắng."
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
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    "description": "Kem vi kim sinh học tảo biển - công nghệ đột phá với hàng triệu vi kim tự tiêu từ tảo biển (spicule) giúp mở kênh dẫn truyền, đưa dưỡng chất thẩm thấu sâu gấp nhiều lần. Kích thích tái tạo tế bào, làm da căng bóng, mờ thâm sẹo và se khít lỗ chân lông ngay tại nhà mà không cần xâm lấn. Da mịn màng, tươi sáng và tràn đầy sức sống.",
    "ingredients": "Vi kim tảo biển (Spicule) - dẫn truyền, kích thích tái tạo\nPeptide - tăng sinh collagen\nHyaluronic Acid - cấp ẩm phục hồi\nChiết xuất rau má - làm dịu sau vi kim",
    "guidelines": "Bước 1: Dùng 1-2 lần/tuần vào buổi tối, trên da sạch khô.\nBước 2: Thoa một lớp vừa đủ, massage nhẹ 1-2 phút (có thể cảm thấy châm nhẹ).\nBước 3: Để 20 phút rồi dưỡng ẩm phục hồi.\nNgày hôm sau chống nắng kỹ."
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
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    "description": "Ampoule Peptide sinh học kích hoạt collagen - tinh chất cô đặc dành cho làn da cần trẻ hóa và làm săn chắc chuyên sâu. Phức hợp đa Peptide gửi tín hiệu thúc đẩy da tự sản sinh collagen và elastin, làm đầy nếp nhăn, tăng độ đàn hồi và nâng cơ rõ rệt. Kết cấu ampoule đậm đặc nhưng thẩm thấu nhanh, mang lại làn da căng mượt, tươi trẻ.",
    "ingredients": "Phức hợp đa Peptide - kích hoạt collagen, nâng cơ\nAdenosine - làm mờ nếp nhăn\nHyaluronic Acid - cấp ẩm căng mọng\nNiacinamide - dưỡng sáng, đều màu",
    "guidelines": "Bước 1: Sau toner, nhỏ 2-3 giọt ampoule.\nBước 2: Vỗ nhẹ khắp mặt, tập trung vùng nếp nhăn và chảy xệ.\nBước 3: Khóa ẩm bằng kem dưỡng.\nDùng sáng và tối để đạt hiệu quả trẻ hóa tối ưu."
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
    "image": "https://images.unsplash.com/photo-1743929812282-3e9a2c149982?q=80&w=600",
    "description": "Mặt nạ tế bào gốc Exosome căng bóng cấp tốc - giải pháp phục hồi và trẻ hóa da tức thì cho những dịp cần làn da rạng rỡ. Exosome cùng phức hợp dưỡng chất thẩm thấu nhanh, làm dịu, cấp ẩm sâu và kích hoạt tái tạo, trả lại làn da căng mọng, mịn màng và tươi sáng chỉ sau một lần đắp. Lý tưởng dùng phục hồi sau liệu trình hoặc trước sự kiện quan trọng.",
    "ingredients": "Exosome tế bào gốc - tái tạo, phục hồi\nHyaluronic Acid đa tầng - cấp ẩm căng bóng\nPanthenol & Beta-glucan - làm dịu\nNiacinamide - dưỡng sáng tức thì",
    "guidelines": "Bước 1: Rửa mặt sạch, dùng toner.\nBước 2: Đắp mặt nạ ôm khít khuôn mặt 15-20 phút.\nBước 3: Gỡ ra, vỗ nhẹ cho tinh chất thấm hết, không cần rửa lại.\nDùng 2-3 lần/tuần hoặc khi cần phục hồi cấp tốc."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Sữa chống nắng vật lý với màng lọc phân tử thế hệ mới, bảo vệ da phổ rộng trước UVA/UVB và cả ánh sáng xanh mà vẫn mỏng nhẹ, không vệt trắng bệt. Kết cấu fluid dạng sữa lỏng thấm nhanh, phù hợp cả da nhạy cảm, da mụn và trẻ em. Bổ sung chất chống oxy hóa và dưỡng chất làm dịu, vừa bảo vệ vừa chăm sóc da khỏe mạnh mỗi ngày.",
    "ingredients": "Màng lọc vật lý (Zinc Oxide, Titanium Dioxide) thế hệ mới - phổ rộng\nChống ánh sáng xanh (Blue Light) - bảo vệ da thời đại số\nVitamin E - chống oxy hóa\nChiết xuất rau má - làm dịu",
    "guidelines": "Bước 1: Là bước cuối chu trình dưỡng buổi sáng.\nBước 2: Lắc đều, thoa lượng đủ (2 đốt ngón tay) khắp mặt và cổ.\nBước 3: Đợi 15 phút trước khi ra nắng.\nThoa lại sau mỗi 2-3 giờ khi hoạt động ngoài trời."
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
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600",
    "description": "Tinh chất vàng 24k Peptide nâng cơ đa tầng - dòng sản phẩm xa xỉ kết hợp vi hạt vàng 24k và phức hợp Peptide cao cấp cho hiệu quả trẻ hóa vượt trội. Vàng 24k kích thích tuần hoàn, làm sáng và săn chắc da, trong khi Peptide thúc đẩy tái tạo collagen đa tầng, nâng cơ và làm đầy nếp nhăn. Kết cấu tinh chất sang trọng, thẩm thấu nhanh, mang lại làn da căng bóng rạng rỡ như liệu trình spa cao cấp.",
    "ingredients": "Vi hạt vàng 24k - làm sáng, săn chắc, kích thích tuần hoàn\nPhức hợp đa Peptide - nâng cơ, tái tạo collagen\nExosome - trẻ hóa tầng sâu\nHyaluronic Acid - cấp ẩm căng mọng",
    "guidelines": "Bước 1: Sau toner, nhỏ 3-4 giọt tinh chất.\nBước 2: Vỗ và massage nhẹ theo chiều nâng cơ từ dưới lên.\nBước 3: Khóa ẩm bằng kem dưỡng.\nDùng sáng và tối cho hiệu quả nâng cơ, trẻ hóa tối ưu."
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
    "image": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
    "description": "Mặt nạ lột mụn than hoạt tính bọc Liposome, làm sạch sâu bã nhờn, mụn đầu đen và bụi bẩn tích tụ trong lỗ chân lông chỉ với một lần lột. Than hoạt tính hút bám mạnh mẽ kết hợp công nghệ Liposome đưa dưỡng chất làm dịu vào sâu, giúp se khít lỗ chân lông mà không gây khô căng. Da sạch thoáng, mịn màng và giảm mụn đầu đen rõ rệt.",
    "ingredients": "Than hoạt tính - hút bám, làm sạch sâu\nCông nghệ Liposome - dẫn truyền dưỡng chất\nChiết xuất tràm trà - kháng khuẩn, ngừa mụn\nNiacinamide - se khít lỗ chân lông",
    "guidelines": "Bước 1: Rửa mặt sạch, xông hơi nhẹ để lỗ chân lông giãn nở.\nBước 2: Thoa lớp mặt nạ dày vùng mũi, cằm (tránh chân tóc, lông mày).\nBước 3: Đợi khô hoàn toàn 20-25 phút rồi lột nhẹ từ dưới lên.\nDùng 1 lần/tuần; sau đó se khít bằng toner."
  }
];
