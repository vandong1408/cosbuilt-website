import { GoogleGenAI, Type } from "@google/genai";
import type { Env } from "../../_shared/types";

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    suggestedName: { type: Type.STRING },
    conceptDescription: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          percentage: { type: Type.STRING },
          role: { type: Type.STRING },
          origin: { type: Type.STRING }
        },
        required: ["name", "percentage", "role", "origin"]
      }
    },
    processingSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
    packagingDesign: {
      type: Type.OBJECT,
      properties: {
        bottleType: { type: Type.STRING },
        volumeMl: { type: Type.STRING },
        printingMethod: { type: Type.STRING }
      },
      required: ["bottleType", "volumeMl", "printingMethod"]
    },
    pricingEstimation: {
      type: Type.OBJECT,
      properties: {
        rawMaterialCostPerUnit: { type: Type.STRING },
        packagingCostPerUnit: { type: Type.STRING },
        manufacturingCostPerUnit: { type: Type.STRING },
        totalCostPerUnit: { type: Type.STRING },
        totalBatchCost: { type: Type.STRING },
        registrationFee: { type: Type.STRING },
        deliveryLeadTimeDays: { type: Type.STRING }
      },
      required: [
        "rawMaterialCostPerUnit", "packagingCostPerUnit", "manufacturingCostPerUnit",
        "totalCostPerUnit", "totalBatchCost", "registrationFee", "deliveryLeadTimeDays"
      ]
    },
    regulatoryAdvice: { type: Type.STRING },
    rdRecommendation: { type: Type.STRING }
  },
  required: [
    "suggestedName", "conceptDescription", "ingredients", "processingSteps",
    "packagingDesign", "pricingEstimation", "regulatoryAdvice", "rdRecommendation"
  ]
};

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

      Thiết kế công thức chi tiết gồm: tên thương mại, mô tả ý tưởng, danh sách nguyên liệu (tên chuẩn INCI, tỷ lệ %, vai trò, xuất xứ),
      các bước quy trình gia công đạt chuẩn CGMP, đề xuất bao bì đóng gói, dự toán chi phí (nguyên liệu/bao bì/gia công/tổng/phí đăng ký/thời gian giao hàng),
      lời khuyên pháp lý về công bố mỹ phẩm, và nhận xét đề xuất từ chuyên gia R&D.
    `;

    let lastError: any = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
            maxOutputTokens: 16384
          }
        });

        const text = response.text;
        if (!text) {
          throw new Error("Không nhận được phản hồi từ AI.");
        }

        const data = JSON.parse(text.trim());
        return Response.json(data);
      } catch (error: any) {
        lastError = error;
        console.error(`AI Formula attempt ${attempt} failed:`, error.message);
        if (error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes('"code":429')) {
          break;
        }
      }
    }

    throw lastError;
  } catch (error: any) {
    console.error("AI Formula generation failed:", error);
    const isQuotaError = error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes('"code":429');
    return Response.json({
      error: isQuotaError
        ? "Hệ thống AI đang tạm hết lượt sử dụng miễn phí trong hôm nay. Vui lòng thử lại sau hoặc liên hệ hotline để được hỗ trợ trực tiếp."
        : "Đã xảy ra lỗi trong quá trình xử lý công thức và định giá.",
      details: error.message
    }, { status: isQuotaError ? 429 : 500 });
  }
};
