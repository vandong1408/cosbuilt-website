import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Calculator, 
  FlaskConical, 
  Box, 
  Scale, 
  ChevronRight, 
  Loader2, 
  TrendingUp, 
  DollarSign, 
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { AIFormulaResult } from "../types";

export default function AIFormulaAdvisor() {
  const [productType, setProductType] = useState("Chăm sóc da mặt");
  const [targetEffect, setTargetEffect] = useState("Dưỡng trắng, mờ thâm nám sạm");
  const [budgetTier, setBudgetTier] = useState("Trung cấp (Chất lượng spa/clinic)");
  const [volume, setVolume] = useState(5000);
  const [targetAudience, setTargetAudience] = useState("Da nhạy cảm, người thích mỹ phẩm thuần chay");
  const [extraDemands, setExtraDemands] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIFormulaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/formula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType,
          targetEffect,
          budgetTier,
          volume,
          targetAudience,
          extraDemands
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể kết nối đến máy chủ AI.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-formula-advisor-container" className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-green/20 text-satin-gold border border-emerald-green/30 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Trợ Lý Lab Nghiên Cứu R&D Trực Tuyến
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-100">
              Thiết Kế Công Thức & Báo Giá Bằng AI
            </h3>
            <p className="text-stone-300 text-sm mt-2 max-w-2xl">
              Nhập ý tưởng sản phẩm của bạn, thuật toán AI huấn luyện từ hàng ngàn công thức CGMP quốc tế của <span className="text-satin-gold font-semibold">cosbuilt</span> sẽ tính toán tỷ lệ, đề xuất bao bì và lập dự toán chi phí trong 10 giây.
            </p>
          </div>
          <FlaskConical className="w-16 h-16 text-satin-gold opacity-80 shrink-0 self-end md:self-center" />
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form inputs */}
          <form id="ai-formula-form" onSubmit={handleGenerate} className="lg:col-span-5 space-y-5 bg-stone-50/50 p-6 rounded-2xl border border-stone-100">
            <div>
              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                1. Danh mục gia công chính
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all cursor-pointer"
              >
                <option value="Chăm sóc da mặt">Chăm sóc da mặt (Facial Care)</option>
                <option value="Chăm sóc body">Chăm sóc cơ thể (Body Care)</option>
                <option value="Chăm sóc tóc">Chăm sóc tóc (Hair Care)</option>
                <option value="Trang điểm">Trang điểm (Makeup)</option>
                <option value="Chăm sóc cá nhân">Chăm sóc vệ sinh cá nhân</option>
                <option value="Sản phẩm gia công theo công nghệ mới">Gia công công nghệ mới (Exosome, Liposome...)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                2. Ý tưởng / Công dụng mong muốn
              </label>
              <input
                type="text"
                required
                value={targetEffect}
                onChange={(e) => setTargetEffect(e.target.value)}
                placeholder="Ví dụ: Serum HA cấp ẩm sâu căng bóng da, Kem mờ nám thâm sạm"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                3. Định vị phân khúc & ngân sách
              </label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all cursor-pointer"
              >
                <option value="Bình dân (Tối ưu giá thành tốt nhất, bán đại chúng)">Bình dân (Bán phân khúc bình dân)</option>
                <option value="Trung cấp (Chất lượng spa/clinic, hoạt chất phổ biến)">Trung cấp (Chất lượng Spa/Clinic)</option>
                <option value="Cao cấp (Organic hữu cơ, hoạt chất độc quyền, đắt đỏ)">Cao cấp (Hiệu quả đột phá, Organic)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                  4. Số lượng lô (MOQ)
                </label>
                <input
                  type="number"
                  min="500"
                  max="100000"
                  step="500"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                  Đơn vị tính
                </label>
                <input
                  type="text"
                  disabled
                  value="Sản phẩm"
                  className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                5. Khách hàng & Da mục tiêu
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ví dụ: Da dầu mụn nhạy cảm, mẹ bầu"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">
                6. Yêu cầu thêm (Tùy chọn)
              </label>
              <textarea
                value={extraDemands}
                onChange={(e) => setExtraDemands(e.target.value)}
                placeholder="Ví dụ: Không paraben, màu hồng nhạt tự nhiên, hương thơm hoa lài dịu nhẹ..."
                rows={2}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all resize-none"
              />
            </div>

            <button
              id="ai-generate-btn"
              type="submit"
              disabled={isLoading}
              className="w-full bg-stone-900 hover:bg-stone-850 text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-stone-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang phân tích & lập công thức...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  Khởi Tạo Công Thức & Dự Toán Ngay
                </>
              )}
            </button>
          </form>

          {/* AI Output results display */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center h-full border border-dashed border-stone-200 rounded-2xl bg-stone-50/20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-stone-100 border-t-emerald-green animate-spin"></div>
                    <FlaskConical className="w-6 h-6 text-emerald-green absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h4 className="font-semibold text-stone-800 text-lg mt-6">Hệ thống AI R&D đang phân tích...</h4>
                  <p className="text-stone-500 text-sm max-w-sm mt-2 px-6">
                    Kết nối cơ sở dữ liệu hoạt chất tiêu chuẩn quốc tế, tính toán mức an toàn độc tính lâm sàng và tự động áp định mức chi phí chuẩn CGMP ASEAN của cosbuilt.
                  </p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-red-50 rounded-2xl border border-red-100 text-red-700 text-sm h-full flex flex-col items-center justify-center text-center"
                >
                  <p className="font-semibold mb-2">Đã xảy ra lỗi khi tạo công thức.</p>
                  <p className="text-red-500 text-xs max-w-md">{error}</p>
                  <p className="text-stone-500 text-xs mt-4">
                    Vui lòng liên hệ với ban kỹ thuật qua mục Liên hệ, hoặc kiểm tra xem API Key đã được điền đủ chưa.
                  </p>
                </motion.div>
              )}

              {!isLoading && !result && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center h-full border-2 border-dashed border-stone-200 rounded-2xl p-8"
                >
                  <div className="w-16 h-16 bg-stone-50 text-stone-400 rounded-full flex items-center justify-center mb-4">
                    <FlaskConical className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-stone-800 text-base">Chưa có công thức nào được thiết kế</h4>
                  <p className="text-stone-500 text-sm max-w-sm mt-2">
                    Điền đầy đủ thông tin yêu cầu của bạn ở form bên cạnh và nhấp vào nút "Khởi Tạo Công Thức" để nhận bảng phân tích hoạt chất và báo giá chi tiết độc quyền từ AI.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <span className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-full cursor-pointer transition-all" onClick={() => {setProductType("Chăm sóc da mặt"); setTargetEffect("Serum B5 tái tạo phục hồi da nhiễm corticoid");}}>Serum B5 phục hồi</span>
                    <span className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-full cursor-pointer transition-all" onClick={() => {setProductType("Chăm sóc body"); setTargetEffect("Kem tắm trắng nâng tông tế bào gốc thực vật");}}>Kem tắm trắng tế bào gốc</span>
                    <span className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-full cursor-pointer transition-all" onClick={() => {setProductType("Chăm sóc tóc"); setTargetEffect("Xịt dưỡng bưởi dừa kích mọc tóc x3 hiệu quả");}}>Xịt dưỡng mọc tóc bưởi dừa</span>
                  </div>
                </motion.div>
              )}

              {result && !isLoading && !error && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Title & Concept */}
                  <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-emerald-green text-white rounded-bl-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-satin-gold" /> CGMP Approved
                    </div>
                    <div className="text-stone-400 text-xs font-bold uppercase tracking-widest">Đề xuất sản xuất</div>
                    <h4 className="text-xl font-serif font-bold mt-1 text-emerald-green">{result.suggestedName}</h4>
                    <p className="text-stone-300 text-xs mt-2 italic">"{result.conceptDescription}"</p>
                  </div>

                  {/* Two columns: Ingredients and Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ingredients table */}
                    <div className="border border-stone-150 rounded-2xl p-4 bg-white shadow-xs">
                      <div className="flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                        <FlaskConical className="w-4 h-4 text-emerald-green" />
                        <h5 className="font-bold text-xs text-stone-800 uppercase tracking-wider">Thành phần hoạt chất (INCI)</h5>
                      </div>
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                        {result.ingredients?.map((ing, idx) => (
                          <div key={idx} className="flex flex-col bg-stone-50/60 p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 transition-all">
                            <div className="flex justify-between items-start">
                              <span className="font-bold text-xs text-stone-900">{ing.name}</span>
                              <span className="bg-emerald-green/10 text-emerald-green text-[10px] font-bold px-2 py-0.5 rounded-full">{ing.percentage}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1.5 text-[11px] text-stone-500">
                              <span>Vai trò: {ing.role}</span>
                              <span className="text-stone-400">Nguồn: {ing.origin}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packaging & Pricing info */}
                    <div className="space-y-4">
                      {/* Pricing block */}
                      <div className="border border-stone-150 rounded-2xl p-4 bg-stone-50/50 shadow-xs">
                        <div className="flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                          <Calculator className="w-4 h-4 text-amber-600" />
                          <h5 className="font-bold text-xs text-stone-800 uppercase tracking-wider">Dự toán giá thành (Gia công trọn gói)</h5>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1">
                            <span className="text-stone-600">Bán thành phẩm thô / sp:</span>
                            <span className="font-mono font-medium text-stone-800">
                              {Number(result.pricingEstimation?.rawMaterialCostPerUnit || 0).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-stone-600">Chai lọ + Bao bì hộp giấy / sp:</span>
                            <span className="font-mono font-medium text-stone-800">
                              {Number(result.pricingEstimation?.packagingCostPerUnit || 0).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-stone-600">Đóng gói + Vận hành CGMP / sp:</span>
                            <span className="font-mono font-medium text-stone-800">
                              {Number(result.pricingEstimation?.manufacturingCostPerUnit || 0).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-t border-dashed border-stone-200 pt-1.5 font-bold">
                            <span className="text-stone-900">Đơn giá thành phẩm / sản phẩm:</span>
                            <span className="font-mono text-emerald-green">
                              {Number(result.pricingEstimation?.totalCostPerUnit || 0).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-t border-stone-200 pt-1.5">
                            <span className="text-stone-600 font-bold">Tổng chi phí lô ({volume} sp):</span>
                            <span className="font-mono font-bold text-stone-950">
                              {Number(result.pricingEstimation?.totalBatchCost || 0).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex justify-between py-1 text-[11px] text-stone-500">
                            <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Phí kiểm nghiệm & công bố lý lịch:</span>
                            <span className="font-mono">
                              {Number(result.pricingEstimation?.registrationFee || 0).toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                          <div className="flex justify-between py-1 text-[11px] text-stone-500">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Thời gian hoàn thiện dự kiến:</span>
                            <span>{result.pricingEstimation?.deliveryLeadTimeDays} ngày</span>
                          </div>
                        </div>
                      </div>

                      {/* Packaging specification */}
                      <div className="border border-stone-150 rounded-2xl p-4 bg-white shadow-xs">
                        <div className="flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                          <Box className="w-4 h-4 text-stone-600" />
                          <h5 className="font-bold text-xs text-stone-800 uppercase tracking-wider">Bao bì đề xuất từ chuyên gia</h5>
                        </div>
                        <div className="text-xs space-y-2">
                          <div className="flex justify-between"><span className="text-stone-500">Vỏ hũ/chai đựng:</span> <span className="font-medium text-stone-800">{result.packagingDesign?.bottleType}</span></div>
                          <div className="flex justify-between"><span className="text-stone-500">Dung tích quy chuẩn:</span> <span className="font-medium text-stone-800">{result.packagingDesign?.volumeMl}</span></div>
                          <div className="flex justify-between"><span className="text-stone-500">Kỹ thuật in vỏ hộp:</span> <span className="font-medium text-stone-800">{result.packagingDesign?.printingMethod}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Processing and Regulatory guidance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-stone-150 rounded-2xl p-5 bg-white shadow-xs text-xs space-y-3">
                      <h5 className="font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-100">
                        <TrendingUp className="w-4 h-4 text-indigo-600" /> Nhận xét nâng cấp công thức (USP)
                      </h5>
                      <p className="text-stone-600 leading-relaxed italic">
                        {result.rdRecommendation}
                      </p>
                    </div>

                    <div className="border border-stone-150 rounded-2xl p-5 bg-white shadow-xs text-xs space-y-3">
                      <h5 className="font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-100">
                        <Scale className="w-4 h-4 text-emerald-600" /> Hồ sơ pháp lý & Công bố mỹ phẩm
                      </h5>
                      <p className="text-stone-600 leading-relaxed">
                        {result.regulatoryAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Processing steps list */}
                  <div className="border border-stone-150 rounded-2xl p-5 bg-stone-50/30 shadow-xs">
                    <h5 className="font-bold text-xs text-stone-800 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Quy trình gia công đạt chuẩn CGMP ASEAN của cosbuilt
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.processingSteps?.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start bg-white p-2.5 rounded-xl border border-stone-100 text-xs">
                          <span className="bg-emerald-green/10 text-emerald-green font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-stone-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final call to action */}
                  <div className="bg-gradient-to-r from-stone-50 to-emerald-green/5 border border-emerald-green/10 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h6 className="font-bold text-sm text-stone-900">Bạn hài lòng với công thức do AI thiết kế?</h6>
                      <p className="text-xs text-stone-500 mt-1">Liên hệ với chuyên viên Cosbuilt để nhận mẫu thử vật lý miễn phí tại văn phòng của chúng tôi.</p>
                    </div>
                    <a
                      href="#contact"
                      className="bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      Yêu Cầu Mẫu Thử Vật Lý
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
