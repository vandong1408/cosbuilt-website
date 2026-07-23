import { GoogleGenAI } from "@google/genai";
import type { Env } from "../../_shared/types";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { productType, targetEffect, budgetTier, volume, targetAudience, extraDemands } = await request.json<any>();

    if (!env.GEMINI_API_KEY) {
      return Response.json({
        error: "Dịch vụ AI chưa được cấu hình. Vui lòng thêm GEMINI_API_KEY trong cấu hình Secrets."
      }, { status: 503 });
    }

    const ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });

    const prompt = `
      Bạn là Trưởng phòng R&D kiêm Chuyên gia định giá cao cấp tại "cosbuilt" (Nhà máy gia công mỹ phẩm đạt chuẩn CGMP ASEAN hàng đầu).
      Hãy thiết kế một công thức mỹ phẩm chuyên nghiệp và báo giá chi tiết dựa trên yêu cầu sau:
      - Phân loại danh mục gia công: ${productType || "Chăm sóc da mặt"}
      - Công dụng mục tiêu: ${targetEffect || "Dưỡng ẩm, làm sáng da"}
      - Phân khúc ngân sách: ${budgetTier || "Trung cấp"}
      - Quy mô lô sản xuất (số lượng chai/hũ): ${volume || 5000} sản phẩm
      - Khách hàng mục tiêu: ${targetAudience || "Mọi loại da, kể cả da nhạy cảm"}
      - Yêu cầu bổ sung đặc biệt: ${extraDemands || "Không có"}

      Hãy phản hồi bằng một cấu trúc JSON chính xác theo Schema sau:
      {
        "suggestedName": "Tên thương mại gợi ý cho sản phẩm (phải sang trọng, hiện đại, bắt tai)",
        "conceptDescription": "Mô tả ý tưởng sản phẩm ngắn gọn, định vị thị trường",
        "ingredients": [
          {
            "name": "Tên nguyên liệu/hoạt chất (tiếng Anh chuẩn INCI)",
            "percentage": "Tỷ lệ % (phải khoa học, tổng công thức xấp xỉ 100%)",
            "role": "Vai trò của thành phần (ví dụ: Hoạt chất chính sáng da, dung môi, chất nhũ hóa, bảo quản)",
            "origin": "Xuất xứ nguyên liệu (Pháp, Hàn Quốc, Nhật Bản, Mỹ, v.v. để tăng uy tín)"
          }
        ],
        "processingSteps": [
          "Các bước quy trình gia công đạt chuẩn CGMP tại nhà máy cosbuilt"
        ],
        "packagingDesign": {
          "bottleType": "Loại chai/lọ đề xuất (ví dụ: Chai thủy tinh mờ có dropper, Hũ acrylic 2 lớp)",
          "volumeMl": "Dung tích khuyến nghị (ml hoặc g)",
          "printingMethod": "Phương pháp in ấn bao bì đề xuất (In lụa trực tiếp, dán decal cán mờ, ép kim)"
        },
        "pricingEstimation": {
          "rawMaterialCostPerUnit": "Chi phí nguyên liệu/bán thành phẩm cho 1 sản phẩm (VND, ví dụ: 12000)",
          "packagingCostPerUnit": "Chi phí chai lọ, bao bì, hộp giấy cho 1 sản phẩm (VND, ví dụ: 8000)",
          "manufacturingCostPerUnit": "Chi phí nhân công, vận hành máy móc, đóng gói cho 1 sản phẩm (VND, ví dụ: 3000)",
          "totalCostPerUnit": "Tổng giá thành sản xuất cho 1 sản phẩm (VND, ví dụ: 23000)",
          "totalBatchCost": "Tổng chi phí cho cả lô hàng (VND)",
          "registrationFee": "Phí kiểm nghiệm lâm sàng và công bố pháp lý trọn gói (VND)",
          "deliveryLeadTimeDays": "Thời gian hoàn thành dự kiến (ngày, ví dụ: 25)"
        },
        "regulatoryAdvice": "Lời khuyên pháp lý, hồ sơ công bố mỹ phẩm của Bộ Y Tế và thủ tục giấy tờ",
        "rdRecommendation": "Nhận xét và đề xuất nâng cấp công thức từ chuyên gia R&D của cosbuilt để cạnh tranh vượt trội"
      }

      Hãy chắc chắn trả về phản hồi CHỈ gồm chuỗi JSON hợp lệ để có thể parse trực tiếp, không chứa các ký tự định dạng markdown như \`\`\`json.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ AI.");
    }

    let data: any;
    try {
      data = JSON.parse(text.trim());
    } catch (parseError: any) {
      console.error("AI Formula JSON parse failed. Raw text:", text);
      return Response.json({
        error: "Đã xảy ra lỗi trong quá trình xử lý công thức và định giá.",
        details: parseError.message,
        debugRawText: text
      }, { status: 500 });
    }
    return Response.json(data);
  } catch (error: any) {
    console.error("AI Formula generation failed:", error);
    return Response.json({
      error: "Đã xảy ra lỗi trong quá trình xử lý công thức và định giá.",
      details: error.message
    }, { status: 500 });
  }
};
