export type LanguageType = "vi" | "en" | "ko";

export interface TranslationDictionary {
  [key: string]: {
    vi: string;
    en: string;
    ko: string;
  };
}

export const translations: TranslationDictionary = {
  // Navigation & General UI
  "hotline": {
    vi: "Hotline",
    en: "Hotline",
    ko: "핫라인"
  },
  "accept_small_orders": {
    vi: "🎁 Nhận gia công đơn hàng nhỏ & vừa · Thiết kế & Test mẫu miễn phí",
    en: "🎁 Accept Small & Medium Orders · Free Formulation & Testing",
    ko: "🎁 소량 및 중량 주문 생산 가능 · 무료 처방 디자인 및 샘플 테스트"
  },
  "free_delivery": {
    vi: "Miễn phí chuyển phát mẫu thử toàn quốc",
    en: "Free nationwide sample shipping",
    ko: "전국 샘플 무료 배송 서비스"
  },
  "crm_admin": {
    vi: "QUẢN TRỊ CRM",
    en: "CRM DASHBOARD",
    ko: "CRM 관리자"
  },
  "search_placeholder": {
    vi: "Tìm kiếm công thức...",
    en: "Search formulas and products...",
    ko: "포뮬러 및 제품 검색..."
  },
  "view_pricing": {
    vi: "Xem bảng giá gia công",
    en: "View Price List",
    ko: "제조 단가표 보기"
  },
  "ai_design": {
    vi: "Thiết kế Công thức bằng AI",
    en: "Design Formula with AI",
    ko: "AI 포뮬러 설계"
  },
  "exclusive_formula": {
    vi: "100% Độc quyền công thức",
    en: "100% Exclusive Formulation",
    ko: "100% 독점 포뮬러 보장"
  },
  "cgmp_factory": {
    vi: "CGMP Nhà máy Bộ Y Tế",
    en: "CGMP MOH Approved Factory",
    ko: "보건부 인증 CGMP 공장"
  },
  "free_physical_samples": {
    vi: "1,000+ Mẫu thử vật lý miễn phí",
    en: "1,000+ Free Physical Samples",
    ko: "1,000개 이상의 무료 실물 샘플"
  },
  "creating_brands": {
    vi: "Kiến Tạo Thương Hiệu Triệu Đô",
    en: "Creating Million-Dollar Brands",
    ko: "백만 달러 브랜드 창조"
  },
  "hero_desc": {
    vi: "Tổ hợp nhà máy gia công mỹ phẩm OEM/ODM Cosbuilt đạt chuẩn quốc tế ISO 22716 / CGMP tại Hàn Quốc. Từ ý tưởng khoa học trong phòng Lab đến dây chuyền sản xuất hàng loạt tự động. '연구원들이 만드는 화장품' - biến giấc mơ thương hiệu của bạn thành hiện thực.",
    en: "Cosbuilt is an international ISO 22716 / CGMP standard full-service cosmetics manufacturer in Korea. From scientific R&D formulation to automated mass production. 'Cosmetics made by researchers' - turning your brand dreams into reality.",
    ko: "코스빌트은 ISO 22716 / CGMP 국제 표준을 준수하는 전문 화장품 OEM/ODM 제조사입니다. R&D 연구소의 처방부터 자동화 생산까지 '연구원들이 만드는 화장품'으로 귀사의 브랜드를 성공으로 이끕니다."
  },
  "trend_2026": {
    vi: "Xu hướng thành phần 2026",
    en: "2026 Ingredient Trends",
    ko: "2026 성분 트렌드"
  },
  "hot_rd": {
    vi: "Hot R&D: Exosomes tế bào gốc thực vật",
    en: "Hot R&D: Plant Stem Cell Exosomes",
    ko: "핫 R&D: 식물 줄기세포 엑소좀"
  },
  "hot_rd_desc": {
    vi: "Trẻ hóa tầng sâu, tái cấu trúc sợi Collagen vượt trội.",
    en: "Deep cellular rejuvenation and superior collagen restructuring.",
    ko: "피부 깊숙이 세포 재생을 촉진하고 우수한 콜라겐 구조 복원."
  },
  "vegan_eco": {
    vi: "Eco-friendly: Mỹ phẩm thuần chay (Vegan)",
    en: "Eco-friendly: Certified Vegan Cosmetics",
    ko: "친환경: 비건 인증 화장품"
  },
  "vegan_eco_desc": {
    vi: "Chiết xuất bưởi, tía tô, rau má hữu cơ đạt chứng nhận Ecocert.",
    en: "Organic extracts of grapefruit, perilla, and centella with Ecocert certification.",
    ko: "에코서트(Ecocert) 인증 유기농 자몽, 자소엽, 병풀 추출물."
  },
  "learn_trends": {
    vi: "Tìm hiểu xu hướng làm đẹp",
    en: "Explore Beauty Trends",
    ko: "뷰티 트렌드 알아보기"
  },

  // Menus
  "menu_home": {
    vi: "Trang Chủ",
    en: "Home",
    ko: "홈"
  },
  "menu_about": {
    vi: "Giới Thiệu",
    en: "About Us",
    ko: "회사 소개"
  },
  "menu_services": {
    vi: "Dịch Vụ",
    en: "Services",
    ko: "서비스"
  },
  "menu_categories": {
    vi: "Danh Mục Gia Công",
    en: "Manufacturing Categories",
    ko: "제조 카테고리"
  },
  "menu_pricing": {
    vi: "Bảng Giá Gia Công",
    en: "Pricing List",
    ko: "제조 단가표"
  },
  "menu_news": {
    vi: "Tin Tức",
    en: "News",
    ko: "뉴스 & 트렌드"
  },
  "menu_contact": {
    vi: "Liên Hệ",
    en: "Contact",
    ko: "문의하기"
  },
  "menu_directory": {
    vi: "DANH MỤC SẢN PHẨM",
    en: "PRODUCT DIRECTORY",
    ko: "제품 디렉토리"
  },
  "menu_new": {
    vi: "Mới",
    en: "NEW",
    ko: "신규"
  },

  // Sub menus About Us
  "about_cosbuilt": {
    vi: "Về Cosbuilt",
    en: "About Cosbuilt",
    ko: "코스빌트 소개"
  },
  "about_capacity": {
    vi: "Nhà máy & Năng lực sản xuất",
    en: "Factory & Capacity",
    ko: "공장 및 생산 능력"
  },
  "about_certifications": {
    vi: "Chứng nhận",
    en: "Certifications",
    ko: "인증서"
  },
  "about_rd": {
    vi: "Đội ngũ R&D",
    en: "R&D Team",
    ko: "R&D 연구진"
  },
  "about_partners": {
    vi: "Đối tác & khách hàng",
    en: "Partners & Clients",
    ko: "파트너 및 고객사"
  },

  // Sub menus Services
  "service_oem_odm": {
    vi: "Gia công OEM/ODM",
    en: "OEM/ODM Manufacturing",
    ko: "OEM/ODM 토탈 제조"
  },
  "service_rd": {
    vi: "Phát triển công thức (R&D)",
    en: "Formula Development",
    ko: "독점 처방 개발"
  },
  "service_packaging": {
    vi: "Bao bì & in ấn",
    en: "Packaging & Printing",
    ko: "용기 부자재 및 인쇄"
  },
  "service_legal": {
    vi: "Pháp lý & công bố mỹ phẩm",
    en: "Legal & Regulatory Affairs",
    ko: "법률 및 인허가 신고 대행"
  },
  "service_logistics": {
    vi: "Vận chuyển – thông quan quốc tế",
    en: "Logistics & Global Customs",
    ko: "물류 및 글로벌 통관"
  },
  "service_process": {
    vi: "Quy trình hợp tác",
    en: "Cooperation Process",
    ko: "협력 프로세스 안내"
  },
  "service_benefits": {
    vi: "Lợi ích hợp tác",
    en: "Partnership Benefits",
    ko: "파트너십 혜택"
  },

  // Categories
  "cat_facial": {
    vi: "Chăm sóc da mặt",
    en: "Facial Care",
    ko: "페이스 케어"
  },
  "cat_body": {
    vi: "Chăm sóc body",
    en: "Body Care",
    ko: "바디 케어"
  },
  "cat_hair": {
    vi: "Chăm sóc tóc",
    en: "Hair Care",
    ko: "헤어 케어"
  },
  "cat_makeup": {
    vi: "Trang điểm",
    en: "Makeup",
    ko: "메이크업"
  },
  "cat_personal": {
    vi: "Chăm sóc cá nhân",
    en: "Personal Care",
    ko: "퍼스널 케어"
  },
  "cat_new_tech": {
    vi: "Sản phẩm công nghệ mới ✨",
    en: "New Tech Products ✨",
    ko: "신기술 혁신 제품 ✨"
  },

  // About stats
  "stat_factory": {
    vi: "Nhà máy chuẩn CGMP",
    en: "CGMP Factories",
    ko: "CGMP 공장 보유"
  },
  "stat_experience": {
    vi: "Năm kinh nghiệm",
    en: "Years Experience",
    ko: "년 전통 제조 노하우"
  },
  "stat_formulas": {
    vi: "Công thức sẵn có",
    en: "Formulas Available",
    ko: "보유 포뮬러"
  },
  "stat_experts": {
    vi: "Chuyên gia R&D",
    en: "R&D Scientists",
    ko: "R&D 수석 연구원"
  },

  // Content headers
  "about_title": {
    vi: "GIỚI THIỆU NĂNG LỰC",
    en: "OUR CAPABILITY",
    ko: "핵심 역량 소개"
  },
  "about_headline": {
    vi: "Nền Tảng Vững Chắc Kiến Tạo Thương Hiệu Mỹ Phẩm Triệu Đô",
    en: "Solid Foundation for Creating Million-Dollar Cosmetic Brands",
    ko: "백만 달러 가치의 화장품 브랜드를 만드는 견고한 기초"
  },
  "strength_title": {
    vi: "Thế mạnh vượt trội",
    en: "Core Strengths",
    ko: "핵심 강점"
  },
  "strength_headline": {
    vi: "Danh Mục Gia Công Mũi Nhọn",
    en: "Key Manufacturing Categories",
    ko: "핵심 생산 카테고리"
  },
  "strength_desc": {
    vi: "Cosbuilt nghiên cứu và sản xuất trọn gói mọi phân khúc mỹ phẩm chăm sóc toàn thân chất lượng hàng đầu thế giới.",
    en: "Cosbuilt researches and manufactures full-service cosmetic segments for high-quality body, face, and personal care.",
    ko: "코스빌트는 고품질 바디, 페이스 및 퍼스널 케어를 위해 완벽한 화장품 세그먼트를 연구하고 제조합니다."
  },
  "process_title": {
    vi: "Minh bạch & chuẩn mực",
    en: "Transparent & Standardized",
    ko: "투명하고 규격화된 제조"
  },
  "process_headline": {
    vi: "Quy Trình Hợp Tác 6 Bước Chuyên Nghiệp",
    en: "Professional 6-Step Collaboration Process",
    ko: "전문적인 6단계 협업 프로세스"
  },
  "process_desc": {
    vi: "Từ lúc bắt đầu tiếp nhận ý tưởng đến khi lô thành phẩm CGMP được giao tận tay, mọi quy trình đều khép kín, minh bạch.",
    en: "From initial concept ideation to the delivery of CGMP certified finished products, our processes are enclosed and transparent.",
    ko: "초기 컨셉 구상부터 CGMP 인증 완제품 인도까지, 모든 프로세스는 철저히 투명하고 안전하게 진행됩니다."
  },
  "ready_brand": {
    vi: "Sẵn Sàng Xây Dựng Thương Hiệu Của Riêng Bạn?",
    en: "Ready to Build Your Own Brand?",
    ko: "나만의 독자적인 브랜드를 시작할 준비가 되셨나요?"
  },
  "ready_brand_desc": {
    vi: "Đừng ngần ngại liên hệ với chuyên viên phát triển dự án của Cosbuilt. Chúng tôi luôn sẵn sàng hỗ trợ tư vấn và gửi tặng mẫu test thử nghiệm vật lý miễn phí.",
    en: "Do not hesitate to reach out to our project development experts. We are always ready to advise and send you free physical trial samples.",
    ko: "주저하지 말고 프로젝트 개발 전문가에게 문의하세요. 언제든 상담해 드리고 무료 실물 테스트 샘플을 배송해 드립니다."
  },
  "contact_expert": {
    vi: "Liên hệ Gửi thông tin Yêu cầu",
    en: "Contact Us & Submit Requirements",
    ko: "상담 신청 및 요구사항 제출"
  },
  "call_us": {
    vi: "Gọi điện",
    en: "Call Us",
    ko: "전화 상담"
  },

  // Contact Form Inputs & Titles
  "contact_main_title": {
    vi: "Đăng ký nhận báo giá & Mẫu thử vật lý",
    en: "Request Quote & Physical Samples",
    ko: "견적 신청 및 실물 샘플 신청"
  },
  "contact_main_desc": {
    vi: "Hãy gửi thông tin dự án của bạn cho bộ phận tư vấn sản phẩm. Chuyên viên của Cosbuilt sẽ gọi lại tư vấn và gửi mẫu test trong vòng 2 giờ làm việc.",
    en: "Send your project details to our product consulting team. A Cosbuilt expert will call you back with advice and prepare test samples within 2 business hours.",
    ko: "프로젝트 상세 정보를 저희 상담팀에 전달해 주세요. 영업일 기준 2시간 이내에 전문가가 연락하여 상담을 돕고 테스트 샘플을 준비하겠습니다."
  },
  "contact_form_name": {
    vi: "Họ và tên của bạn *",
    en: "Your Full Name *",
    ko: "성함 *"
  },
  "contact_form_phone": {
    vi: "Số điện thoại liên hệ *",
    en: "Contact Phone Number *",
    ko: "연락처 *"
  },
  "contact_form_email": {
    vi: "Email liên hệ",
    en: "Contact Email",
    ko: "이메일 주소"
  },
  "contact_form_brand": {
    vi: "Tên thương hiệu tương lai (nếu có)",
    en: "Future Brand Name (if any)",
    ko: "예정 브랜드명 (선택)"
  },
  "contact_form_category": {
    vi: "Danh mục bạn quan tâm *",
    en: "Interested Category *",
    ko: "관심 카테고리 *"
  },
  "contact_form_qty": {
    vi: "Số lượng dự kiến gia công (MOQ) *",
    en: "Estimated Production Volume (MOQ) *",
    ko: "예정 생산 수량 (MOQ) *"
  },
  "contact_form_msg": {
    vi: "Lời nhắn / Yêu cầu công thức chi tiết *",
    en: "Message / Detailed Formulation Requirements *",
    ko: "상세 요청 사항 및 처방 조건 *"
  },
  "contact_form_submit": {
    vi: "Gửi Yêu Cầu Nhận Báo Giá & Mẫu Thử Vật Lý 🚀",
    en: "Submit Request for Quotes & Samples 🚀",
    ko: "견적서 및 샘플 신청 완료 🚀"
  },
  "contact_form_success": {
    vi: "Gửi Yêu Cầu Thành Công!",
    en: "Submitted Successfully!",
    ko: "성공적으로 제출되었습니다!"
  },
  "contact_form_success_desc": {
    vi: "Cảm ơn quý khách đã tin tưởng thương hiệu Cosbuilt. Bộ phận phát triển dự án đã ghi nhận yêu cầu của quý khách và sẽ liên hệ trực tiếp qua số điện thoại để gửi tặng mẫu vật lý trong vòng 2 giờ.",
    en: "Thank you for trusting the Cosbuilt brand. Our project development department has recorded your request and will contact you directly via phone to send free physical samples within 2 hours.",
    ko: "코스빌트 브랜드를 신뢰해 주셔서 대단히 감사합니다. 당사 프로젝트 팀에서 요청을 접수하였으며, 2시간 이내에 개별 연락 후 무료 실물 샘플을 발송해 드리겠습니다."
  },
  "contact_profile_code": {
    vi: "Mã số hồ sơ của bạn",
    en: "Your Record Code",
    ko: "접수 번호"
  },

  // Interactive Estimator (App.tsx / AIFormulaAdvisor)
  "estimator_title": {
    vi: "Bộ Công Cụ Dự Toán Chi Phí Đầu Tư",
    en: "Investment & Cost Estimation Tool",
    ko: "제조 투자 및 예상 비용 시뮬레이터"
  },
  "estimator_desc": {
    vi: "Chọn cấu hình mong muốn để AI ước tính nhanh chi phí sản xuất lô đầu tiên cho thương hiệu của bạn.",
    en: "Choose your desired configuration to let AI estimate the initial production cost for your brand.",
    ko: "원하는 구성을 선택하시면 AI가 귀하의 브랜드를 위한 첫 롯트 생산 비용을 빠르게 계산해 드립니다."
  },
  "est_select_group": {
    vi: "1. Chọn Nhóm Sản Phẩm",
    en: "1. Select Product Group",
    ko: "1. 제품 카테고리 선택"
  },
  "est_select_line": {
    vi: "2. Chọn Dòng Sản Phẩm Cụ Thể",
    en: "2. Select Specific Product Line",
    ko: "2. 세부 생산 품목 선택"
  },
  "est_formula_grade": {
    vi: "3. Phân Khúc Công Thức R&D",
    en: "3. Formulation Segment",
    ko: "3. R&D 처방 세그먼트"
  },
  "est_packaging_type": {
    vi: "4. Giải Pháp Chai Lọ Bao Bì",
    en: "4. Packaging Solution",
    ko: "4. 용기 및 부자재 솔루션"
  },
  "est_production_qty": {
    vi: "5. Số Lượng Sản Xuất Dự Kiến",
    en: "5. Target Production Quantity",
    ko: "5. 목표 생산 수량"
  },
  "est_legal_service": {
    vi: "6. Dịch Vụ Hồ Sơ Pháp Lý",
    en: "6. Legal & Regulatory Service",
    ko: "6. 법률 및 인허가 패키지"
  },
  "est_results_title": {
    vi: "KẾT QUẢ DỰ TOÁN ĐẦU TƯ BAN ĐẦU",
    en: "INITIAL INVESTMENT ESTIMATION RESULTS",
    ko: "초기 제조 투자 비용 예상 결과"
  },
  "est_unit_cost": {
    vi: "Đơn giá thành phẩm ước tính",
    en: "Est. Finished Unit Price",
    ko: "완제품 예상 개당 단가"
  },
  "est_total_cost": {
    vi: "Tổng ngân sách đầu tư sản xuất lô",
    en: "Total Budget for This Batch Production",
    ko: "해당 롯트 총 예상 생산 비용"
  },
  "est_breakdown": {
    vi: "BẢNG PHÂN TÍCH CHI TIẾT CHI PHÍ",
    en: "DETAILED COST BREAKDOWN ANALYSIS",
    ko: "상세 예상 비용 명세 분석"
  },
  "est_liquid_cost": {
    vi: "Chi phí bán thành phẩm dịch",
    en: "Formulation and bulk liquid cost",
    ko: "벌크 원액 조제 비용"
  },
  "est_pack_cost": {
    vi: "Chi phí chai lọ, in ấn, nhãn decal",
    en: "Packaging, printing, decal label cost",
    ko: "용기, 포장재, 인쇄 및 라벨 비용"
  },
  "est_legal_cost": {
    vi: "Chi phí pháp lý công bố Bộ Y Tế",
    en: "MOH product notification and registration",
    ko: "보건부 제품 허가 및 신고 비용"
  },
  "est_apply_contact": {
    vi: "Áp Dụng Dự Toán & Đăng Ký Nhận Mẫu 🎁",
    en: "Apply Estimate & Register for Samples 🎁",
    ko: "견적 적용 및 실물 샘플 신청 🎁"
  },
  "est_print_doc": {
    vi: "In Bảng Dự Toán",
    en: "Print Estimation Report",
    ko: "예상 명세서 인쇄"
  },
  "est_disclaimer": {
    vi: "⚠ Báo giá mang tính chất tham khảo dự thảo đầu tư. Đơn giá chính thức sẽ được Cosbuilt phê duyệt sau khi khách hàng test chất kem mẫu thử ưng ý và xác định quy cách đóng hộp tem chống giả.",
    en: "⚠ Quotes are for planning and investment reference only. Official pricing is approved by Cosbuilt after physical sample approval, final packaging and anti-counterfeiting specs are locked.",
    ko: "⚠ 본 견적은 투자 계획 수립을 위한 참고용입니다. 공식 단가는 실물 샘플 최종 승인 및 용기 규격, 위조방지 홀로그램 사양이 확정된 후 승인됩니다."
  },

  // Footer Titles & Notes
  "footer_intro_desc": {
    vi: "Cosbuilt là tổ hợp nhà máy gia công mỹ phẩm OEM/ODM chuẩn quốc tế ISO 22716 / CGMP tại Hàn Quốc. Với triết lý 'Mỹ phẩm chế tạo bởi đội ngũ nhà nghiên cứu', chúng tôi kiến tạo các dòng sản phẩm chất lượng cao, độc quyền cho các thương hiệu trên toàn thế giới.",
    en: "Cosbuilt is an international ISO 22716 / CGMP cosmetic OEM/ODM manufacturing group in South Korea. With 'Cosmetics created by researchers', we develop high quality exclusive products for global brands.",
    ko: "코스빌트은 ISO 22716 / CGMP 국제 표준을 준수하는 화장품 OEM/ODM 전문 개발 및 제조 기업입니다. '연구원들이 만드는 화장품'을 슬로건으로 최고 품질의 화장품을 선사합니다."
  },
  "footer_service_title": {
    vi: "Dịch vụ gia công",
    en: "OEM/ODM Services",
    ko: "제조 서비스"
  },
  "footer_cat_title": {
    vi: "Danh mục gia công",
    en: "Product Categories",
    ko: "생산 카테고리"
  },
  "footer_office_title": {
    vi: "Văn phòng & Nhà máy",
    en: "Office & Factory",
    ko: "사무실 및 공장"
  },
  "footer_office_label": {
    vi: "Địa chỉ Văn phòng",
    en: "Office Address",
    ko: "사무실 주소"
  },
  "footer_office_address": {
    vi: "Văn phòng số 2.40 khu văn phòng, tòa nhà The Prince Residence, số 19-21 Nguyễn Văn Trỗi, Phường Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam.",
    en: "Office Suite 2.40, The Prince Residence Building, 19-21 Nguyen Van Troi Str, Phu Nhuan Dist, Ho Chi Minh City, Vietnam.",
    ko: "베트남 호치민시 푸뉴언군 응웬반쪼이 19-21, 더 프린스 레지던스 빌딩 2.40호 사무실."
  },
  "footer_factory_label": {
    vi: "Địa chỉ Nhà máy",
    en: "Factory Address",
    ko: "공장 주소"
  },
  "footer_factory_address": {
    vi: "Nhà máy 2 (Incheon): 35, Aenggogae-ro 449beon-gil, Namdong-gu, Incheon, Hàn Quốc | Nhà máy 1 (Gimpo): Gimpo-si, Gyeonggi-do, Hàn Quốc.",
    en: "Factory 2 (Incheon): 35, Aenggogae-ro 449beon-gil, Namdong-gu, Incheon, Korea | Factory 1 (Gimpo): Gimpo-si, Gyeonggi-do, Korea.",
    ko: "제2인천공장: 인천광역시 남동구 앵고개로449번길 35, 1층 | 제1김포공장: 경기도 김포시."
  },
  "footer_working_hours": {
    vi: "Giờ làm việc: 09:00 - 18:00 (Thứ 2 - Thứ 6)",
    en: "Working Hours: 09:00 - 18:00 (Monday - Friday)",
    ko: "근무 시간: 09:00 - 18:00 (월요일 - 금요일)"
  },
  "footer_rights": {
    vi: "© 2026 Cosbuilt. All rights reserved. Tiêu chuẩn ISO 22716:2007 / CGMP.",
    en: "© 2026 Cosbuilt. All rights reserved. ISO 22716:2007 / CGMP Certified.",
    ko: "© 2026 코스빌트. All rights reserved. ISO 22716:2007 / CGMP 인증."
  },
  "footer_policy": {
    vi: "Chính sách bảo mật công thức",
    en: "Formula Confidentiality Policy",
    ko: "처방 보안 및 기밀 유지 정책"
  },
  "footer_terms": {
    vi: "Điều khoản hợp tác",
    en: "Partnership Terms",
    ko: "협력 계약 약관"
  },
  "footer_sitemap": {
    vi: "Sơ đồ nhà máy",
    en: "Factory Blueprint Map",
    ko: "공장 레이아웃 도면"
  },
  "footer_double_click_admin": {
    vi: "Double click to toggle admin mode",
    en: "Double click to toggle admin mode",
    ko: "더블 클릭하여 관리자 모드 전환"
  },
  "ai_lab_tag": {
    vi: "Trợ Lý Lab Nghiên Cứu R&D Trực Tuyến",
    en: "Online R&D Lab Research Assistant",
    ko: "온라인 R&D 연구실 연구 지원 어시스턴트"
  },
  "ai_lab_title": {
    vi: "Thiết Kế Công Thức & Báo Giá Bằng AI",
    en: "AI Formulation & Cost Estimation",
    ko: "AI 기반 포뮬러 설계 및 제조 원가 계산"
  },
  "ai_lab_desc": {
    vi: "Nhập ý tưởng sản phẩm của bạn, thuật toán AI huấn luyện từ hàng ngàn công thức CGMP quốc tế của Cosbuilt sẽ tính toán tỷ lệ, đề xuất bao bì và lập dự toán chi phí trong 10 giây.",
    en: "Enter your product idea. Our AI algorithm trained on thousands of international CGMP formulas from Cosbuilt will calculate ingredient ratios, suggest packaging, and estimate costs in 10 seconds.",
    ko: "제품 개발 아이디어를 입력하세요. 코스빌트의 수천 가지 글로벌 CGMP 포뮬러 데이터를 기반으로 훈련된 AI 알고리즘이 10초 만에 성분 비율 계산, 맞춤형 부자재 추천 및 상세 제조 원가를 계산해 드립니다."
  },
  "ai_lab_cat": {
    vi: "1. Danh mục gia công chính",
    en: "1. Main Manufacturing Category",
    ko: "1. 주 생산 카테고리"
  },
  "ai_lab_idea": {
    vi: "2. Ý tưởng / Công dụng mong muốn",
    en: "2. Desired Benefits / Concept Idea",
    ko: "2. 제품 컨셉 / 희망 효능 효과"
  },
  "ai_lab_idea_placeholder": {
    vi: "Ví dụ: Serum HA cấp ẩm sâu căng bóng da, Kem mờ nám thâm sạm",
    en: "e.g., Deep hydrating Hyaluronic Acid serum, anti-melasma cream",
    ko: "예: 피부 속건조 해결용 고농축 HA 세럼, 기미 잡티 완화 크림"
  },
  "ai_lab_budget": {
    vi: "3. Định vị phân khúc & ngân sách",
    en: "3. Pricing Segment & Budget Tier",
    ko: "3. 타겟 시장 포지셔닝 및 단가"
  },
  "ai_lab_moq": {
    vi: "4. Số lượng lô (MOQ)",
    en: "4. Target Batch Quantity (MOQ)",
    ko: "4. 예정 생산 수량 (MOQ)"
  },
  "ai_lab_unit": {
    vi: "Đơn vị tính",
    en: "Unit",
    ko: "단위"
  },
  "ai_lab_unit_val": {
    vi: "Sản phẩm",
    en: "Products / Pcs",
    ko: "개 (수량)"
  },
  "ai_lab_audience": {
    vi: "5. Khách hàng & Da mục tiêu",
    en: "5. Target Skin Type & Audience",
    ko: "5. 타겟 피부 타입 및 주 고객층"
  },
  "ai_lab_audience_placeholder": {
    vi: "Ví dụ: Da dầu mụn nhạy cảm, mẹ bầu",
    en: "e.g., Sensitive acne-prone skin, pregnant mothers",
    ko: "예: 민감성 여드름 피부, 임산부 사용 가능 저자극"
  },
  "ai_lab_extra": {
    vi: "6. Yêu cầu thêm (Tùy chọn)",
    en: "6. Special Demands (Optional)",
    ko: "6. 기타 추가 요구사항 (선택)"
  },
  "ai_lab_extra_placeholder": {
    vi: "Ví dụ: Không paraben, màu hồng nhạt tự nhiên, hương thơm hoa lài dịu nhẹ...",
    en: "e.g., Paraben-free, natural pink color, delicate jasmine scent...",
    ko: "예: 파라벤 무첨가, 천연 연홍빛 텍스처, 은은한 자스민 향 원함..."
  },
  "ai_lab_btn_loading": {
    vi: "Đang phân tích & lập công thức...",
    en: "Analyzing & formulating...",
    ko: "포뮬러 성분 및 비용 분석 중..."
  },
  "ai_lab_btn": {
    vi: "Khởi Tạo Công Thức & Dự Toán Ngay",
    en: "Generate Formula & Estimate Now",
    ko: "AI 처방 및 예상 견적서 즉시 발행"
  },
  "ai_lab_loading_title": {
    vi: "Hệ thống AI R&D đang phân tích...",
    en: "AI R&D System is analyzing...",
    ko: "AI R&D 처방 시스템 분석 중..."
  },
  "ai_lab_loading_desc": {
    vi: "Kết nối cơ sở dữ liệu hoạt chất tiêu chuẩn quốc tế, tính toán mức an toàn độc tính lâm sàng và tự động áp định mức chi phí chuẩn CGMP ASEAN của Cosbuilt.",
    en: "Connecting to international active ingredient databases, calculating clinical toxicological margins, and auto-applying standard CGMP ASEAN pricing benchmarks.",
    ko: "국제 원료 규격 데이터베이스 연동, 피부 임상 안전성 검토 및 코스빌트의 축적된 아세안 CGMP 제조 표준 공정 단가를 반영하고 있습니다."
  },
  "ai_lab_empty_title": {
    vi: "Chưa có công thức nào được thiết kế",
    en: "No formula designed yet",
    ko: "설계된 포뮬러가 없습니다"
  },
  "ai_lab_empty_desc": {
    vi: "Điền đầy đủ thông tin yêu cầu của bạn ở form bên cạnh và nhấp vào nút \"Khởi Tạo Công Thức\" để nhận bảng phân tích hoạt chất và báo giá chi tiết độc quyền từ AI.",
    en: "Fill out your requirements and click the button to receive an exclusive ingredient analysis and detailed quote from our AI.",
    ko: "우측 양식에 화장품 사양을 입력하신 후 견적 버튼을 누르시면, 인공지능이 설계한 맞춤형 성분 처방전과 제조 견적서를 보여드립니다."
  },
  "ai_lab_raw_cost": {
    vi: "Bán thành phẩm thô / sp",
    en: "Raw Formulation Bulk / Unit",
    ko: "원액 조제 가공비 / 개당"
  },
  "ai_lab_pack_cost": {
    vi: "Chai lọ + Bao bì hộp giấy / sp",
    en: "Bottle & Box Packaging / Unit",
    ko: "용기 및 단상자 패키지 / 개당"
  },
  "ai_lab_mfg_cost": {
    vi: "Đóng gói + Vận hành CGMP / sp",
    en: "CGMP Filling & Operation / Unit",
    ko: "충진 포장 및 CGMP 마감 / 개당"
  },
  "ai_lab_total_unit": {
    vi: "Đơn giá thành phẩm / sản phẩm",
    en: "Total Estimated Finished Cost / Unit",
    ko: "완제품 예상 공급 단가 / 개당"
  },
  "ai_lab_total_batch": {
    vi: "Tổng chi phí lô",
    en: "Total Batch Production Budget",
    ko: "롯트 총 제조비 (부자재 포함)"
  },
  "ai_lab_reg_fee": {
    vi: "Phí kiểm nghiệm & công bố lý lịch",
    en: "Testing & MOH Notification Fee",
    ko: "피부 안전성 임상 및 보건부 품목 보고비"
  },
  "ai_lab_lead_time": {
    vi: "Thời gian hoàn thiện dự kiến",
    en: "Estimated Lead Time",
    ko: "예상 납기 소요 기간"
  },
  "ai_lab_days": {
    vi: "ngày",
    en: "days",
    ko: "일"
  },
  "ai_lab_usp": {
    vi: "Nhận xét nâng cấp công thức (USP)",
    en: "Unique Selling Proposition & Upgrades (USP)",
    ko: "처방 강점 및 마케팅 셀링 포인트 (USP)"
  },
  "ai_lab_process": {
    vi: "Quy trình gia công đạt chuẩn CGMP",
    en: "CGMP-Compliant Manufacturing Process",
    ko: "CGMP 표준 제조 공정"
  },
  "ai_lab_reg_advice": {
    vi: "Hồ sơ pháp lý & Công bố mỹ phẩm",
    en: "Regulatory Compliance & Registration",
    ko: "인허가 지원 및 제품 신고 행정 자문"
  },
  "ai_lab_satisfied": {
    vi: "Bạn hài lòng với công thức do AI thiết kế?",
    en: "Satisfied with this AI-designed formulation?",
    ko: "AI 처방 설계 결과가 마음에 드시나요?"
  },
  "ai_lab_satisfied_desc": {
    vi: "Liên hệ với chuyên viên Cosbuilt để nhận mẫu thử vật lý miễn phí tại văn phòng của chúng tôi.",
    en: "Contact Cosbuilt experts to request a free physical trial sample sent directly to your office.",
    ko: "코스빌트 전문가에게 연락하셔서 본 처방대로 조제된 실물 테스트용 샘플을 무료로 신청해 보세요."
  },
  "ai_lab_request_sample": {
    vi: "Yêu Cầu Mẫu Thử Vật Lý",
    en: "Request Physical Samples",
    ko: "실물 테스트 샘플 신청"
  },
  "ai_lab_proposal": {
    vi: "Đề xuất sản xuất",
    en: "Production Proposal",
    ko: "생산 처방 안"
  },
  "ai_lab_inci": {
    vi: "Thành phần hoạt chất (INCI)",
    en: "Active Ingredients (INCI Nomenclature)",
    ko: "화장품 전성분 표시 규격 (INCI)"
  },
  "ai_lab_role": {
    vi: "Vai trò",
    en: "Role",
    ko: "역할"
  },
  "ai_lab_origin": {
    vi: "Nguồn",
    en: "Origin",
    ko: "원산지"
  }
};
