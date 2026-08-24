import { useState, useEffect, FormEvent } from "react";
import ArticleManagement from "./ArticleManagement";
import ImageManagement from "./ImageManagement";
import Sidebar from "./Sidebar";
import RichTextEditor from "./RichTextEditor";
import { 
  Users, 
  Search, 
  FileSpreadsheet, 
  RefreshCw, 
  Database, 
  Trash2, 
  Eye,
  EyeOff, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  XCircle, 
  X,
  Mail,
  Image, 
  BookOpen, 
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Lock,
  User,
  LogOut,
  Plus,
  Edit3,
  Briefcase,
  Check,
  Save,
  FileText,
  Sparkles,
  ArrowUpToLine,
  Upload,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { authHeaders, setAdminToken, clearAdminToken, verifyAdminToken } from "../lib/adminAuth";
import { slugify } from "../lib/slug";
import {
  initAuth,
  googleSignIn,
  googleLogout,
  getAccessToken
} from "../firebase";
import { 
  extractSpreadsheetId, 
  createNewSpreadsheet, 
  setupSpreadsheetTables, 
  syncSpreadsheetData, 
  appendSheetRow, 
  updateSheetRow, 
  deleteSheetRow,
  syncLeadsToSpreadsheet
} from "../lib/sheetsService";

const getProductPriceRange = (prod: any, quantity = 1) => {
  const isMask = prod.title?.toLowerCase().includes("mặt nạ") || prod.id?.toLowerCase().includes("mask") || prod.category === "mask";
  if (isMask) {
    const min = 6000 * quantity;
    const max = 16000 * quantity;
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  } else {
    const min = 60000 * quantity;
    const max = 160000 * quantity;
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  }
};

const getProductOriginalPriceRange = (prod: any, quantity = 1) => {
  const isMask = prod.title?.toLowerCase().includes("mặt nạ") || prod.id?.toLowerCase().includes("mask") || prod.category === "mask";
  if (isMask) {
    const min = 8000 * quantity;
    const max = 20000 * quantity;
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  } else {
    const min = 80000 * quantity;
    const max = 200000 * quantity;
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  }
};

const getPackagingTypeLabel = (type: string) => {
  switch (type) {
    case "bottle": return "Chai";
    case "jar": return "Hũ";
    case "tube": return "Tuýp";
    case "dropper": return "Lọ nhỏ giọt";
    case "sachet": return "Gói";
    default: return type;
  }
};

const getDefaultPackagings = (prod: any) => {
  const productObj = typeof prod === "string" ? { category: prod } : (prod || {});
  
  // Deterministic seed for this product
  const combined = (productObj.id || "") + (productObj.title || "");
  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = combined.charCodeAt(i) + ((seed << 5) - seed);
  }
  seed = Math.abs(seed);

  const isMask = productObj.title?.toLowerCase().includes("mặt nạ") || productObj.id?.toLowerCase().includes("mask") || productObj.category === "mask";
  const isSerumOrLiquid = productObj.title?.toLowerCase().includes("serum") || productObj.title?.toLowerCase().includes("tinh chất") || productObj.title?.toLowerCase().includes("ampoule") || productObj.title?.toLowerCase().includes("xịt") || productObj.title?.toLowerCase().includes("nước") || productObj.title?.toLowerCase().includes("toner");
  const isMakeup = productObj.category === "makeup" || productObj.title?.toLowerCase().includes("son") || productObj.title?.toLowerCase().includes("phấn") || productObj.title?.toLowerCase().includes("kem nền") || productObj.title?.toLowerCase().includes("cushion") || productObj.title?.toLowerCase().includes("eyeliner");

  const serumPool = [
    "photo-1620916566398-39f1143ab7be",
    "photo-1601049541289-9b1b7bbbfe19",
    "photo-1611930022073-b7a4ba5fcccd",
    "photo-1547887537-6158d64c35b3",
    "photo-1616683693504-3ea7e9ad6fec",
    "photo-1551288049-bebda4e38f71",
    "photo-1612817288484-6f916006741a",
    "photo-1556228453-efd6c1ff04f6"
  ];

  const creamPool = [
    "photo-1608248597279-f99d160bfcbc",
    "photo-1556228720-195a672e8a03",
    "photo-1617897903246-719242758050",
    "photo-1601924994987-69e26d50dc26",
    "photo-1584622650111-993a426fbf0a",
    "photo-1611080626919-7cf5a9dbab5b",
    "photo-1515377905703-c4788e51af15",
    "photo-1608571423902-eed4a5ad8108"
  ];

  const cleanserPool = [
    "photo-1450133064473-71024230f91b",
    "photo-1556229174-5e42a09e45af",
    "photo-1535585209827-a15fcdbc4c2d",
    "photo-1526947425960-945c6e72858f",
    "photo-1434626881859-194d67b2b86f",
    "photo-1544816155-12df9643f363",
    "photo-1540555700478-4be289fbecef",
    "photo-1626806787461-102c1bfaaea1",
    "photo-1570172619644-dfd03ed5d881"
  ];

  const maskPool = [
    "photo-1512290923902-8a9f81dc236c",
    "photo-1570172619644-dfd03ed5d881",
    "photo-1460925895917-afdab827c52f",
    "photo-1598440947619-2c35fc9aa908",
    "photo-1608248597279-f99d160bfcbc"
  ];

  const makeupPool = [
    "photo-1586495777744-4413f21062fa",
    "photo-1596462502278-27bfdc403348",
    "photo-1512496015851-a90fb38ba796",
    "photo-1522335789203-aabd1fc54bc9",
    "photo-1607604276583-eef5d076aa5f"
  ];

  const selectImg = (pool: string[], indexOffset: number) => {
    const imgId = pool[(seed + indexOffset) % pool.length];
    return `https://images.unsplash.com/${imgId}?q=80&w=600`;
  };

  if (isMask) {
    return [
      {
        type: "sachet" as const,
        name: "Túi Sachet Màng Nhôm Mờ",
        image: selectImg(maskPool, 0),
        description: "Túi nhôm phức hợp 3 lớp giúp lưu giữ trọn vẹn hoạt chất, chống thấm khí tuyệt đối và bảo quản tối ưu."
      },
      {
        type: "jar" as const,
        name: "Hũ Thủy Tinh Cao Cấp",
        image: selectImg(maskPool, 1),
        description: "Thiết kế hũ thủy tinh mờ sang trọng, nắp vân giả gỗ tinh tế, thích hợp cho mặt nạ đất sét/kem dẻo."
      },
      {
        type: "tube" as const,
        name: "Tuýp Nhựa PE Cấp Thực Phẩm",
        image: selectImg(maskPool, 2),
        description: "Tuýp nhựa dẻo phủ lì (matte surface) tinh tế, nắp bật kín khít bảo quản vệ sinh cho mặt nạ dạng gel."
      },
      {
        type: "bottle" as const,
        name: "Chai Nhấn Vòi Chân Không",
        image: selectImg(maskPool, 3),
        description: "Vòi nhấn hút chân không tiện lợi, kiểm soát liều lượng và ngăn chặn tối đa quá trình oxy hóa tinh chất mặt nạ."
      }
    ];
  } else if (isSerumOrLiquid) {
    return [
      {
        type: "dropper" as const,
        name: "Lọ Dropper Thủy Tinh Nâu",
        image: selectImg(serumPool, 0),
        description: "Lọ nhỏ giọt thủy tinh cao cấp bảo vệ tối đa các tinh chất đặc trị nhạy cảm trước bức xạ tia cực tím."
      },
      {
        type: "bottle" as const,
        name: "Chai Nhấn Vòi Chân Không",
        image: selectImg(serumPool, 1),
        description: "Chai vòi nhấn hút chân không acrylic cao cấp chống tiếp xúc không khí oxy hóa, kiểm soát lượng nhấn cực chuẩn."
      },
      {
        type: "tube" as const,
        name: "Tuýp Nhỏ Đầu Nhọn Định Lượng",
        image: selectImg(serumPool, 2),
        description: "Thiết kế tuýp thon gọn với đầu phun định lượng siêu nhỏ thích hợp cho các tinh chất cô đặc cao."
      },
      {
        type: "dropper" as const,
        name: "Lọ Dropper Thủy Tinh Trong",
        image: selectImg(serumPool, 3),
        description: "Thủy tinh borosilicate siêu trong suốt khoe trọn vẹn màu sắc tự nhiên và cấu trúc hạt của tinh chất cao cấp."
      }
    ];
  } else if (isMakeup) {
    return [
      {
        type: "bottle" as const,
        name: "Vỏ Son / Hộp Acrylic Cao Cấp",
        image: selectImg(makeupPool, 0),
        description: "Thiết kế vỏ tinh xảo, chất liệu acrylic dày dặn, sang trọng khẳng định giá trị thương hiệu dẫn đầu."
      },
      {
        type: "jar" as const,
        name: "Hộp Compact Phấn Nước Tiện Dụng",
        image: selectImg(makeupPool, 1),
        description: "Hộp phấn nước tích hợp gương soi sắc nét và bông mút rubycell kháng khuẩn kháng nước tuyệt đối."
      },
      {
        type: "bottle" as const,
        name: "Chai Thủy Tinh Vòi Nhấn Tinh Tế",
        image: selectImg(makeupPool, 2),
        description: "Chai kem nền thủy tinh mờ dầy dặn cầm đầm tay, vòi nhấn mạ kim loại sang trọng nâng tầm đẳng cấp mỹ phẩm."
      },
      {
        type: "tube" as const,
        name: "Bút Kẻ / Thỏi Satin Độc Quyền",
        image: selectImg(makeupPool, 3),
        description: "Bao bì dạng bút hoặc thỏi bấm thông minh, tối ưu hóa thao tác trang điểm chuyên nghiệp hằng ngày."
      }
    ];
  } else {
    const pool = productObj.category === "facial-care" ? creamPool : cleanserPool;
    return [
      {
        type: "jar" as const,
        name: "Hũ Thủy Tinh Ép Kim Sang Trọng",
        image: selectImg(pool, 0),
        description: "Hũ thủy tinh đúc đầm tay, nắp mạ vàng/bạc ép kim cực kỳ đẳng cấp nâng cao giá trị định vị thương hiệu."
      },
      {
        type: "bottle" as const,
        name: "Chai Nhấn Vòi Pump Cao Cấp",
        image: selectImg(pool, 1),
        description: "Vòi pump tiện dụng dễ kiểm soát dung lượng, lý tưởng cho các dòng lotion dưỡng da, sữa rửa mặt."
      },
      {
        type: "tube" as const,
        name: "Tuýp Nhôm Matte Thân Thiện",
        image: selectImg(pool, 2),
        description: "Chất liệu nhôm dẻo dễ tái chế thân thiện môi trường, bề mặt phủ mờ phong cách tối giản Bắc Âu."
      },
      {
        type: "jar" as const,
        name: "Hộp Kim Metal Nhôm Minimalist",
        image: selectImg(pool, 3),
        description: "Hộp nhôm phủ sơn tĩnh điện lì thời thượng, nắp vặn ren kín khí, hoàn hảo cho định dạng sáp hoặc hạt scrub tự nhiên."
      }
    ];
  }
};

interface CRMDashboardProps {
  customBlogPosts: any[];
  customImages: any[];
  customLogos: any[];
  websiteLogo: any;
  footerLogo: any;
  customProducts: any[];
  sheetsConfig: any;
  setCustomBlogPosts: (posts: any[]) => void;
  setCustomImages: (images: any[]) => void;
  setCustomLogos: (logos: any[]) => void;
  setWebsiteLogo: (logo: any) => void;
  setFooterLogo: (logo: any) => void;
  setCustomProducts: (products: any[]) => void;
  setSheetsConfig: (config: any) => void;
  onTabChange: (tab: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function CRMDashboard({
  customBlogPosts,
  customImages,
  customLogos,
  websiteLogo,
  footerLogo,
  customProducts,
  sheetsConfig,
  setCustomBlogPosts,
  setCustomImages,
  setCustomLogos,
  setWebsiteLogo,
  setFooterLogo,
  setCustomProducts,
  setSheetsConfig,
  onTabChange,
  onLogin,
  onLogout
}: CRMDashboardProps) {
  // Admin Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Require BOTH the logged-in flag and a stored admin token, so that a stale
    // flag from before the server-auth upgrade never grants access on its own.
    return localStorage.getItem("cosbuilt_admin_logged_in") === "true"
      && !!localStorage.getItem("cosbuilt_admin_token");
  });
  const [activeSidebarTab, setActiveSidebarTab] = useState("articles");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Admin Credentials State. The username is a cosmetic first gate stored
  // locally; the real password is verified server-side against ADMIN_TOKEN.
  const [adminUsername, setAdminUsername] = useState(() => localStorage.getItem("admin_username") || "admin");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toLowerCase() !== adminUsername.trim().toLowerCase()) {
      setLoginError("Tên đăng nhập hoặc mật khẩu quản trị không chính xác.");
      return;
    }

    // The password IS the server-side ADMIN_TOKEN. Verify it against the
    // server so that access to sensitive data is enforced by the backend,
    // not just the browser.
    const token = passwordInput.trim();
    setIsLoggingIn(true);
    const ok = await verifyAdminToken(token);
    setIsLoggingIn(false);

    if (ok) {
      setAdminToken(token);
      setIsLoggedIn(true);
      localStorage.setItem("cosbuilt_admin_logged_in", "true");
      setLoginError("");
      if (onLogin) onLogin();
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu quản trị không chính xác.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    clearAdminToken();
    localStorage.removeItem("cosbuilt_admin_logged_in");
    setUsernameInput("");
    setPasswordInput("");
    if (onLogout) onLogout();
  };

  // Modals & State for CRUD
  const [editingBlogPost, setEditingBlogPost] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  // JSON snapshot of the article as opened, to detect unsaved changes on exit.
  const [blogInitialSnapshot, setBlogInitialSnapshot] = useState<string>("");
  const [showBlogExitPrompt, setShowBlogExitPrompt] = useState(false);
  const [editingImage, setEditingImage] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [editingProduct, setEditingProduct] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [productInitialSnapshot, setProductInitialSnapshot] = useState<string>("");
  const [showProductExitPrompt, setShowProductExitPrompt] = useState(false);
  const [newPkg, setNewPkg] = useState<{ type: "bottle" | "jar" | "tube" | "dropper" | "sachet"; name: string; image: string; description: string } | null>(null);
  const [editingPkgIdx, setEditingPkgIdx] = useState<number | null>(null);
  const [editingPartnerLogo, setEditingPartnerLogo] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [isEditingWebsiteLogo, setIsEditingWebsiteLogo] = useState(false);
  const [tempWebsiteLogo, setTempWebsiteLogo] = useState({
    name: websiteLogo?.name || "COSBUILT",
    slogan: websiteLogo?.slogan || "ESTD 1999",
    image: websiteLogo?.image || ""
  });
  const [isEditingFooterLogo, setIsEditingFooterLogo] = useState(false);
  const [tempFooterLogo, setTempFooterLogo] = useState({
    name: footerLogo?.name || "COSBUILT",
    slogan: footerLogo?.slogan || "ESTD 1999",
    image: footerLogo?.image || ""
  });
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Initialize tempWebsiteLogo whenever websiteLogo updates
  useEffect(() => {
    if (websiteLogo) {
      setTempWebsiteLogo({
        name: websiteLogo.name,
        slogan: websiteLogo.slogan,
        image: websiteLogo.image || ""
      });
    }
  }, [websiteLogo]);

  // Initialize tempFooterLogo whenever footerLogo updates
  useEffect(() => {
    if (footerLogo) {
      setTempFooterLogo({
        name: footerLogo.name,
        slogan: footerLogo.slogan,
        image: footerLogo.image || ""
      });
    }
  }, [footerLogo]);

  // Sync / Save dynamic changes helper
  const saveAllContent = async (
    payload: { articles?: any[]; images?: any[]; logos?: any[]; websiteLogo?: any; footerLogo?: any; products?: any[] },
    actionInfo?: { action: "add" | "update" | "delete"; sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm"; index?: number; data?: any }
  ) => {
    setIsSavingContent(true);
    setActionMessage({ text: "Đang lưu thay đổi vào hệ thống...", type: "" });
    try {
      // 1. Save locally to server database cache first
      const res = await fetch("/api/sheets/data", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          if (payload.articles !== undefined) setCustomBlogPosts(result.data.articles);
          if (payload.images !== undefined) setCustomImages(result.data.images);
          if (payload.logos !== undefined) setCustomLogos(result.data.logos);
          if (payload.websiteLogo !== undefined) setWebsiteLogo(result.data.websiteLogo);
          if (payload.footerLogo !== undefined) setFooterLogo(result.data.footerLogo);
          if (payload.products !== undefined) setCustomProducts(result.data.products);
          
          // 2. If logged in with Google and a Spreadsheet ID exists, perform direct sync!
          if (actionInfo && googleToken && sheetsConfig.spreadsheetId) {
            setActionMessage({ text: "Đang tự động đồng bộ sang Google Sheet...", type: "" });
            try {
              const spreadsheetId = sheetsConfig.spreadsheetId;
              const { action, sheetName, index, data } = actionInfo;
              
              if (sheetName === "Bài viết") {
                const rowValues = [
                  data.title || "",
                  data.category || "",
                  data.summary || "",
                  data.content || "",
                  data.image || "",
                  data.author || "",
                  data.date || ""
                ];
                if (action === "add") {
                  await appendSheetRow(spreadsheetId, googleToken, "Bài viết", rowValues);
                } else if (action === "update" && index !== undefined) {
                  await updateSheetRow(spreadsheetId, googleToken, "Bài viết", index, rowValues);
                } else if (action === "delete" && index !== undefined) {
                  await deleteSheetRow(spreadsheetId, googleToken, "Bài viết", index);
                }
              } else if (sheetName === "Hình ảnh") {
                const rowValues = [
                  data.title || "",
                  data.category || "",
                  data.description || "",
                  data.image || ""
                ];
                if (action === "add") {
                  await appendSheetRow(spreadsheetId, googleToken, "Hình ảnh", rowValues);
                } else if (action === "update" && index !== undefined) {
                  await updateSheetRow(spreadsheetId, googleToken, "Hình ảnh", index, rowValues);
                } else if (action === "delete" && index !== undefined) {
                  await deleteSheetRow(spreadsheetId, googleToken, "Hình ảnh", index);
                }
              } else if (sheetName === "Sản phẩm") {
                const rowValues = [
                  data.id || "",
                  data.title || "",
                  data.category || "",
                  data.lab || "",
                  data.skinTypes ? data.skinTypes.join(", ") : "",
                  data.rating !== undefined ? String(data.rating) : "",
                  data.ratingValue !== undefined ? String(data.ratingValue) : "",
                  data.reviewsCount !== undefined ? String(data.reviewsCount) : "",
                  data.originalPrice !== undefined ? String(data.originalPrice) : "",
                  data.price !== undefined ? String(data.price) : "",
                  data.discountPercent !== undefined ? String(data.discountPercent) : "",
                  data.badge || "",
                  data.testedCount !== undefined ? String(data.testedCount) : "",
                  data.hotPercent !== undefined ? String(data.hotPercent) : "",
                  data.image || "",
                  data.description || "",
                  data.ingredients || "",
                  data.guidelines || "",
                  JSON.stringify(data.packagings || [])
                ];
                if (action === "add") {
                  await appendSheetRow(spreadsheetId, googleToken, "Sản phẩm", rowValues);
                } else if (action === "update" && index !== undefined) {
                  await updateSheetRow(spreadsheetId, googleToken, "Sản phẩm", index, rowValues);
                } else if (action === "delete" && index !== undefined) {
                  await deleteSheetRow(spreadsheetId, googleToken, "Sản phẩm", index);
                }
              }
              setActionMessage({ text: "Đã lưu thay đổi vào hệ thống và đồng bộ Google Sheet thành công! 📊", type: "success" });
            } catch (sheetErr: any) {
              console.error("Direct sheets write failed:", sheetErr);
              setActionMessage({ 
                text: `Đã lưu website thành công, nhưng lỗi đồng bộ sang Google Sheet: ${sheetErr.message}.`, 
                type: "error" 
              });
              setTimeout(() => setActionMessage({ text: "", type: "" }), 6000);
              return true;
            }
          } else {
            setActionMessage({ text: "Đã lưu thay đổi thành công vào hệ thống!", type: "success" });
          }
          setTimeout(() => setActionMessage({ text: "", type: "" }), 3000);
          return true;
        }
      }
      setActionMessage({ text: "Không thể lưu thay đổi. Vui lòng thử lại.", type: "error" });
    } catch (err: any) {
      console.error(err);
      setActionMessage({ text: "Lỗi kết nối máy chủ: " + err.message, type: "error" });
    } finally {
      setIsSavingContent(false);
    }
    return false;
  };

  // Open the full-page article editor and remember a snapshot for the
  // unsaved-changes check on exit.
  const openBlogEditor = (payload: { index: number; isNew: boolean; data: any }) => {
    setBlogInitialSnapshot(JSON.stringify(payload.data));
    setShowBlogExitPrompt(false);
    setEditingBlogPost(payload);
  };

  // Persist the given article data (core save used by both "publish" and "draft").
  const persistBlogPost = async (data: any) => {
    if (!editingBlogPost) return false;
    const { index, isNew } = editingBlogPost;
    const newPosts = [...customBlogPosts];
    let actionDetails: any;
    if (isNew) {
      newPosts.push(data);
      actionDetails = { action: "add", sheetName: "Bài viết", data };
    } else {
      newPosts[index] = data;
      actionDetails = { action: "update", sheetName: "Bài viết", index, data };
    }
    const success = await saveAllContent({ articles: newPosts }, actionDetails);
    if (success) {
      setShowBlogExitPrompt(false);
      setEditingBlogPost(null);
    }
    return success;
  };

  const handleSaveBlogPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingBlogPost) return;
    // Explicit save = publish, unless the author kept it a draft on purpose.
    const data = { ...editingBlogPost.data, status: editingBlogPost.data.status || "published" };
    await persistBlogPost(data);
  };

  // "Save as draft" from the exit prompt: keep the work, hide it from the public site.
  const handleSaveBlogDraft = async () => {
    if (!editingBlogPost) return;
    await persistBlogPost({ ...editingBlogPost.data, status: "draft" });
  };

  // Close the editor. Warn if there are unsaved changes.
  const handleCloseBlogEditor = () => {
    const dirty = editingBlogPost && JSON.stringify(editingBlogPost.data) !== blogInitialSnapshot;
    if (dirty) {
      setShowBlogExitPrompt(true);
    } else {
      setEditingBlogPost(null);
    }
  };

  const handleDeleteBlogPost = async (index: number) => {
    let newPosts = [...customBlogPosts];
    const deletedItem = newPosts[index];
    newPosts.splice(index, 1);
    await saveAllContent({ articles: newPosts }, { action: "delete", sheetName: "Bài viết", index, data: deletedItem });
  };

  const handleSaveImage = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;
    const { index, isNew, data } = editingImage;
    let newImages = [...customImages];
    let actionDetails: any;
    if (isNew) {
      newImages.push(data);
      actionDetails = { action: "add", sheetName: "Hình ảnh", data };
    } else {
      newImages[index] = data;
      actionDetails = { action: "update", sheetName: "Hình ảnh", index, data };
    }
    const success = await saveAllContent({ images: newImages }, actionDetails);
    if (success) {
      setEditingImage(null);
    }
  };

  const handleDeleteImage = async (index: number) => {
    let newImages = [...customImages];
    const deletedItem = newImages[index];
    newImages.splice(index, 1);
    await saveAllContent({ images: newImages }, { action: "delete", sheetName: "Hình ảnh", index, data: deletedItem });
  };

  const openProductEditor = (payload: { index: number; isNew: boolean; data: any }) => {
    setProductInitialSnapshot(JSON.stringify(payload.data));
    setShowProductExitPrompt(false);
    setEditingProduct(payload);
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const { index, isNew, data } = editingProduct;
    let newProducts = [...customProducts];
    let actionDetails: any;
    if (isNew) {
      newProducts.push(data);
      actionDetails = { action: "add", sheetName: "Sản phẩm", data };
    } else {
      newProducts[index] = data;
      actionDetails = { action: "update", sheetName: "Sản phẩm", index, data };
    }
    const success = await saveAllContent({ products: newProducts }, actionDetails);
    if (success) {
      setShowProductExitPrompt(false);
      setEditingProduct(null);
    }
  };

  const handleCloseProductEditor = () => {
    const dirty = editingProduct && JSON.stringify(editingProduct.data) !== productInitialSnapshot;
    if (dirty) setShowProductExitPrompt(true);
    else setEditingProduct(null);
  };

  const handleDeleteProduct = async (index: number) => {
    let newProducts = [...customProducts];
    const deletedItem = newProducts[index];
    newProducts.splice(index, 1);
    await saveAllContent({ products: newProducts }, { action: "delete", sheetName: "Sản phẩm", index, data: deletedItem });
  };

  const handleSavePartnerLogo = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingPartnerLogo) return;
    const { index, isNew, data } = editingPartnerLogo;
    let newLogos = [...customLogos];
    if (isNew) {
      newLogos.push(data);
    } else {
      newLogos[index] = data;
    }
    const success = await saveAllContent({ logos: newLogos });
    if (success) {
      setEditingPartnerLogo(null);
    }
  };

  const handleDeletePartnerLogo = async (index: number) => {
    let newLogos = [...customLogos];
    newLogos.splice(index, 1);
    await saveAllContent({ logos: newLogos });
  };

  const handleSaveWebsiteLogo = async () => {
    const success = await saveAllContent({ websiteLogo: tempWebsiteLogo });
    if (success) {
      setIsEditingWebsiteLogo(false);
    }
  };

  const handleSaveFooterLogo = async () => {
    const success = await saveAllContent({ footerLogo: tempFooterLogo });
    if (success) {
      setIsEditingFooterLogo(false);
    }
  };

  const [activeSubTab, setActiveSubTab] = useState<"leads" | "sheets" | "content" | "admin-settings">("leads");
  const [cmsSubTab, setCmsSubTab] = useState<"articles" | "products" | "images" | "partners" | "logo">("articles");
  const [cmsSearchTerm, setCmsSearchTerm] = useState("");
  const [cmsArticlesPage, setCmsArticlesPage] = useState(1);
  const [cmsProductsPage, setCmsProductsPage] = useState(1);
  const [cmsImagesPage, setCmsImagesPage] = useState(1);
  const [cmsPartnersPage, setCmsPartnersPage] = useState(1);

  useEffect(() => {
    setCmsSearchTerm("");
    setCmsArticlesPage(1);
    setCmsProductsPage(1);
    setCmsImagesPage(1);
    setCmsPartnersPage(1);
  }, [cmsSubTab]);

  useEffect(() => {
    setCmsArticlesPage(1);
    setCmsProductsPage(1);
    setCmsImagesPage(1);
    setCmsPartnersPage(1);
  }, [cmsSearchTerm]);

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [leadsPage, setLeadsPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const [editingLeadNotesId, setEditingLeadNotesId] = useState<string | null>(null);
  const [editingLeadNotesValue, setEditingLeadNotesValue] = useState("");
  
  // Sheet sync states
  const [sheetInput, setSheetInput] = useState(sheetsConfig.spreadsheetId || "");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [isSyncingLeads, setIsSyncingLeads] = useState(false);
  const [leadsSyncMessage, setLeadsSyncMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [instructionTab, setInstructionTab] = useState<"read" | "write">("read");

  // Google Sheets Direct Integration state
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  
  // Selected lead for detail/editing modal
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [isSavingLead, setIsSavingLead] = useState(false);

  // Image Upload helper state & function
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File): Promise<string> => {
    setIsUploading(true);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: authHeaders(true),
            body: JSON.stringify({
              filename: file.name,
              base64: reader.result as string
            })
          });
          if (!res.ok) {
            throw new Error(`Server returned status ${res.status}`);
          }
          const data = await res.json();
          if (data.success && data.url) {
            resolve(data.url);
          } else {
            throw new Error(data.error || "Không thể lưu file ảnh.");
          }
        } catch (err: any) {
          reject(err);
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = (error) => {
        setIsUploading(false);
        reject(error);
      };
    });
  };

  // Fetch leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error("Failed to load leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load leads only once authenticated. Re-runs when the admin logs in, so the
  // list populates immediately without a manual page reload. Avoids firing
  // unauthorized /api/leads requests (401) before login.
  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (sheetsConfig.spreadsheetId) {
      setSheetInput(sheetsConfig.spreadsheetId);
    }
  }, [sheetsConfig]);

  // Hook up Firebase Auth to listen for Google login
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle lead select
  const handleSelectLead = (lead: any) => {
    setSelectedLead(lead);
    setAdminNotes(lead.notes || "");
    setLeadStatus(lead.status || "Chờ xử lý");
  };

  // Save lead edits
  const handleSaveLead = async () => {
    if (!selectedLead) return;
    setIsSavingLead(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({
          status: leadStatus,
          notes: adminNotes
        })
      });
      if (res.ok) {
        // Refresh leads list
        await fetchLeads();
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
    } finally {
      setIsSavingLead(false);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: authHeaders()
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  // Quick update lead (for inline status and notes changes)
  const handleQuickUpdateLead = async (id: string, updatedStatus: string, updatedNotes: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({
          status: updatedStatus,
          notes: updatedNotes
        })
      });
      if (res.ok) {
        await fetchLeads();
      }
    } catch (error) {
      console.error("Failed to quick update lead:", error);
    }
  };

  // Google sign in / sign out handlers
  const handleGoogleSignIn = async () => {
    setIsSyncing(true);
    setSyncMessage({ text: "Đang kết nối tài khoản Google của bạn...", type: "" });
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
        setSyncMessage({ 
          text: `Kết nối thành công! Đã đăng nhập bằng tài khoản: ${result.user.displayName || result.user.email}.`, 
          type: "success" 
        });
      }
    } catch (err: any) {
      console.error("Google login failed:", err);
      setSyncMessage({ text: `Kết nối thất bại: ${err.message || "Không thể truy cập tài khoản Google."}`, type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await googleLogout();
      setGoogleUser(null);
      setGoogleToken(null);
      setSyncMessage({ text: "Đã ngắt kết nối tài khoản Google.", type: "success" });
    } catch (err: any) {
      console.error("Logout failed:", err);
    }
  };

  // Creates a brand new Spreadsheet completely automatically on the admin's Google Drive
  const handleCreateAndSetupNewSheet = async () => {
    if (!googleToken) {
      setSyncMessage({ text: "Vui lòng kết nối tài khoản Google của bạn trước.", type: "error" });
      return;
    }
    setIsSettingUp(true);
    setSyncMessage({ text: "Đang tạo Google Sheet mới trên Drive của bạn...", type: "" });
    try {
      const newSheet = await createNewSpreadsheet("COSBUILT - Hệ thống Website CMS", googleToken);
      const spreadsheetId = newSheet.spreadsheetId;
      
      setSyncMessage({ text: "Đang tự động khởi tạo tab 'Bài viết', 'Hình ảnh' & 'Sản phẩm' cùng cột tiêu đề...", type: "" });
      
      // Setup the tables and upload current list of posts, images, and products so they are backed up right away
      await setupSpreadsheetTables(spreadsheetId, googleToken, customBlogPosts, customImages, customProducts);
      
      // Save configuration
      const configRes = await fetch("/api/sheets/config", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ spreadsheetId })
      });
      if (!configRes.ok) throw new Error("Không thể lưu cấu hình");
      
      setSheetsConfig({
        spreadsheetId,
        lastSynced: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        hasArticles: customBlogPosts.length > 0,
        hasImages: customImages.length > 0,
        hasProducts: customProducts.length > 0
      });
      setSheetInput(spreadsheetId);
      setSyncMessage({
        text: `Tự động tạo bảng Google Sheet thành công! 🎉 Đã tải lên ${customBlogPosts.length} bài viết, ${customImages.length} ảnh hoạt động và ${customProducts.length} sản phẩm lên Sheet mới của bạn.`,
        type: "success"
      });
    } catch (err: any) {
      console.error("Failed to automatically create and setup sheet:", err);
      setSyncMessage({ text: `Tạo bảng tự động thất bại: ${err.message}`, type: "error" });
    } finally {
      setIsSettingUp(false);
    }
  };

  // Sets up headers & tables on an existing sheet the user pasted
  const handleSetupExistingSheet = async () => {
    const spreadsheetId = extractSpreadsheetId(sheetInput);
    if (!spreadsheetId) {
      setSyncMessage({ text: "Vui lòng nhập đường dẫn hoặc ID Google Sheet.", type: "error" });
      return;
    }
    if (!googleToken) {
      setSyncMessage({ text: "Vui lòng kết nối tài khoản Google trước.", type: "error" });
      return;
    }
    setIsSettingUp(true);
    setSyncMessage({ text: "Đang khởi tạo các tab 'Bài viết', 'Hình ảnh' & 'Sản phẩm' trên Google Sheet của bạn...", type: "" });
    try {
      await setupSpreadsheetTables(spreadsheetId, googleToken, customBlogPosts, customImages, customProducts);
      
      // Save configuration
      const configRes = await fetch("/api/sheets/config", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ spreadsheetId })
      });
      if (!configRes.ok) throw new Error("Không thể lưu cấu hình");
      
      setSheetsConfig({
        spreadsheetId,
        lastSynced: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        hasArticles: customBlogPosts.length > 0,
        hasImages: customImages.length > 0,
        hasProducts: customProducts.length > 0
      });
      setSyncMessage({
        text: "Tự động khởi tạo cấu trúc bảng trên Google Sheet thành công! ⚡ Đã tải lên các bài viết, hình ảnh và sản phẩm ban đầu.",
        type: "success"
      });
    } catch (err: any) {
      console.error("Failed to setup existing sheet:", err);
      setSyncMessage({ text: `Khởi tạo bảng thất bại: ${err.message}`, type: "error" });
    } finally {
      setIsSettingUp(false);
    }
  };

  // Sync Google Sheets data directly to website using client-side Sheets API
  const handleSyncSheets = async () => {
    const spreadsheetId = extractSpreadsheetId(sheetInput);
    if (!spreadsheetId) {
      setSyncMessage({ text: "Vui lòng nhập đường dẫn hoặc ID Google Sheet.", type: "error" });
      return;
    }
    if (!googleToken) {
      setSyncMessage({ text: "Vui lòng kết nối tài khoản Google của bạn trước.", type: "error" });
      return;
    }
    setIsSyncing(true);
    setSyncMessage({ text: "Đang đọc và đồng bộ dữ liệu từ Google Sheet về Website...", type: "" });
    try {
      // 1. Fetch data directly from sheets
      const sheetData = await syncSpreadsheetData(spreadsheetId, googleToken);
      
      // 2. Save to local backend database
      const saveRes = await fetch("/api/sheets/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articles: sheetData.articles,
          images: sheetData.images,
          products: sheetData.products
        })
      });
      
      if (saveRes.ok) {
        const result = await saveRes.json();
        if (result.success) {
          setCustomBlogPosts(result.data.articles);
          setCustomImages(result.data.images);
          setCustomProducts(result.data.products);
          
          // Update configuration in server
          const nowStr = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
          await fetch("/api/sheets/config", {
            method: "POST",
            headers: authHeaders(true),
            body: JSON.stringify({ spreadsheetId })
          });
          
          setSheetsConfig((prev: any) => ({
            ...prev,
            spreadsheetId,
            lastSynced: nowStr,
            hasArticles: result.data.articles.length > 0,
            hasImages: result.data.images.length > 0,
            hasProducts: result.data.products.length > 0
          }));
          
          setSyncMessage({
            text: `Đồng bộ thành công! Đã tải xuống ${result.data.articles.length} bài viết, ${result.data.images.length} hình ảnh, và ${result.data.products.length} sản phẩm về Website. ✨`,
            type: "success"
          });
        } else {
          throw new Error("Không thể lưu dữ liệu đồng bộ vào website.");
        }
      } else {
        throw new Error("Lỗi kết nối máy chủ.");
      }
    } catch (err: any) {
      console.error("Direct sheets sync failed:", err);
      setSyncMessage({ text: `Đồng bộ thất bại: ${err.message}`, type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  // Push / overwrite all current website data to Google Sheets
  const handlePushToSheets = async () => {
    const spreadsheetId = extractSpreadsheetId(sheetInput);
    if (!spreadsheetId) {
      setSyncMessage({ text: "Vui lòng nhập đường dẫn hoặc ID Google Sheet.", type: "error" });
      return;
    }
    if (!googleToken) {
      setSyncMessage({ text: "Vui lòng kết nối tài khoản Google của bạn trước.", type: "error" });
      return;
    }
    setIsSyncing(true);
    setSyncMessage({ text: "Đang tiến hành tải tất cả dữ liệu từ website lên Google Sheet...", type: "" });
    try {
      await setupSpreadsheetTables(spreadsheetId, googleToken, customBlogPosts, customImages, customProducts);
      
      const nowStr = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
      setSheetsConfig((prev: any) => ({
        ...prev,
        lastSynced: nowStr,
        hasArticles: customBlogPosts.length > 0,
        hasImages: customImages.length > 0,
        hasProducts: customProducts.length > 0
      }));
      
      setSyncMessage({
        text: `Đã đẩy toàn bộ ${customBlogPosts.length} bài viết, ${customImages.length} hình ảnh, và ${customProducts.length} sản phẩm hiện tại từ Website lên Google Sheet thành công! 📊`,
        type: "success"
      });
    } catch (err: any) {
      console.error("Direct sheets push failed:", err);
      setSyncMessage({ text: `Đẩy dữ liệu lên Google Sheet thất bại: ${err.message}`, type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncLeadsToSheet = async () => {
    const spreadsheetId = sheetsConfig.spreadsheetId || extractSpreadsheetId(sheetInput);
    if (!spreadsheetId) {
      setLeadsSyncMessage({ text: "Vui lòng liên kết Google Sheet ở tab 'ĐỒNG BỘ GOOGLE SHEET' trước.", type: "error" });
      setTimeout(() => setLeadsSyncMessage({ text: "", type: "" }), 5000);
      return;
    }
    if (!googleToken) {
      setLeadsSyncMessage({ text: "Vui lòng kết nối tài khoản Google ở tab 'ĐỒNG BỘ GOOGLE SHEET' trước.", type: "error" });
      setTimeout(() => setLeadsSyncMessage({ text: "", type: "" }), 5000);
      return;
    }
    setIsSyncingLeads(true);
    setLeadsSyncMessage({ text: "Đang đồng bộ danh sách khách hàng lên Google Sheet...", type: "" });
    try {
      await syncLeadsToSpreadsheet(spreadsheetId, googleToken, leads);
      setLeadsSyncMessage({
        text: `Đồng bộ thành công ${leads.length} yêu cầu tư vấn của khách hàng lên Google Sheet tab 'Yêu cầu tư vấn'! 📊`,
        type: "success"
      });
      setTimeout(() => setLeadsSyncMessage({ text: "", type: "" }), 6000);
    } catch (err: any) {
      console.error("Leads sheet sync failed:", err);
      setLeadsSyncMessage({ text: `Đồng bộ thất bại: ${err.message}`, type: "error" });
      setTimeout(() => setLeadsSyncMessage({ text: "", type: "" }), 6000);
    } finally {
      setIsSyncingLeads(false);
    }
  };

  // Filters leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.brandName && lead.brandName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || lead.category === categoryFilter;
    const matchesDate = filterDate === "" || (lead.createdAt && lead.createdAt.startsWith(filterDate));
    
    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  });

  // Reset page when filters change
  useEffect(() => {
    setLeadsPage(1);
  }, [searchTerm, statusFilter, categoryFilter, filterDate]);

  const leadsPerPage = 5;
  const paginatedLeads = filteredLeads.slice((leadsPage - 1) * leadsPerPage, leadsPage * leadsPerPage);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Chờ xử lý":
        return <span className="bg-amber-50 text-amber-700 border border-amber-150 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit"><Clock className="w-3 h-3" /> Chờ xử lý</span>;
      case "Đang liên hệ":
        return <span className="bg-blue-50 text-blue-700 border border-blue-150 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit"><PhoneCall className="w-3 h-3" /> Đang liên hệ</span>;
      case "Đã hoàn thành":
        return <span className="bg-emerald-green-light text-emerald-green-dark border border-emerald-green/15 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit"><CheckCircle2 className="w-3 h-3" /> Đã hoàn thành</span>;
      case "Hủy":
        return <span className="bg-red-50 text-red-700 border border-red-150 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit"><XCircle className="w-3 h-3" /> Đã hủy</span>;
      default:
        return <span className="bg-stone-50 text-stone-600 border border-stone-150 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit">{status}</span>;
    }
  };

  // Helper metrics
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => l.status === "Chờ xử lý").length;
  const inProgressLeads = leads.filter(l => l.status === "Đang liên hệ").length;
  const completedLeads = leads.filter(l => l.status === "Đã hoàn thành").length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 selection:bg-emerald-green-light selection:text-emerald-green-dark">
        {/* Decorative ambient background spots */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-stone-200 rounded-3xl max-w-md w-full shadow-xl relative overflow-hidden p-8 space-y-6 text-left z-10"
        >
          {/* Logo / Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-green-light text-emerald-green rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-serif font-black text-2xl text-stone-950 tracking-tight">COSBUILT ADMIN</h2>
            <p className="text-stone-500 text-xs font-light">
              Hệ thống Quản lý khách hàng (CRM) và Biên tập nội dung Website (CMS).
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="Nhập tên đăng nhập (Ví dụ: admin)"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:border-emerald-green focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Mật khẩu bảo mật</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  required
                  placeholder="Nhập mật khẩu quản trị"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm focus:border-emerald-green focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 hover:text-stone-600"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-red-600 text-xs font-semibold bg-red-50 border border-red-100 p-3 rounded-xl leading-snug">
                ⚠️ {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{isLoggingIn ? "Đang xác thực..." : "Đăng nhập hệ thống"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => onTabChange("home")}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1"
            >
              Quay lại trang chủ website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Premium Back-office Navigation Bar */}
      <header className="bg-stone-900 text-white sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Branding & Status Badge */}
          <div className="flex items-center gap-3">
            <span className="font-serif font-black text-lg tracking-wider text-emerald-green">COSBUILT</span>
            <span className="text-stone-700 font-mono text-xs">|</span>
            <span className="bg-emerald-green-light/10 text-emerald-green text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-green/20 uppercase tracking-widest">
              Hệ Thống Quản Trị
            </span>
          </div>

          {/* Right: Actions & User Info */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="hidden sm:flex items-center gap-2 border-r border-stone-850 pr-4">
              <div className="w-8 h-8 rounded-full bg-emerald-green/20 border border-emerald-green/30 text-emerald-green flex items-center justify-center font-bold text-xs font-serif">
                CB
              </div>
              <div className="text-left leading-none">
                <span className="text-xs font-bold block text-stone-200">Admin Cosbuilt</span>
                <span className="text-[9px] text-stone-500 flex items-center gap-1 mt-0.5 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-green animate-pulse inline-block"></span>
                  Trực tuyến
                </span>
              </div>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => onTabChange("home")}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/15 transition-all px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Quay lại Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Log out Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/15 hover:border-red-500/25 transition-all px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Back-office Workspace */}
      <div id="crm-admin-panel" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header with Elegant Stats Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-150 pb-6">
        <div className="space-y-1.5 text-left">
          <span className="bg-emerald-green-light text-emerald-green text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-widest">
            Hệ Thống Quản Trị
          </span>
          <h1 className="text-3xl font-serif font-black text-stone-900 tracking-tight">HỆ THỐNG CRM & CMS COSBUILT</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-light">
            Cơ sở dữ liệu quản trị khách hàng, quản lý yêu cầu gia công mỹ phẩm và đồng bộ tài nguyên từ Google Sheets.
          </p>
        </div>
        
        <button 
          onClick={fetchLeads} 
          disabled={loading}
          className="bg-stone-50 border border-stone-200 hover:bg-stone-100 disabled:opacity-50 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Tải lại dữ liệu
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-150 shadow-2xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-green/5 text-emerald-green">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Yêu cầu tư vấn</span>
            <span className="text-2xl font-bold text-stone-900 mt-1 block">{totalLeads}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-150 shadow-2xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Chờ xử lý</span>
            <span className="text-2xl font-bold text-stone-900 mt-1 block">{pendingLeads}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-150 shadow-2xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Đang liên hệ</span>
            <span className="text-2xl font-bold text-stone-900 mt-1 block">{inProgressLeads}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-150 shadow-2xs flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-purple-50 text-purple-600">
            <Database className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Tài nguyên Sheet</span>
            <span className="text-base font-bold text-stone-800 mt-1 block truncate">
              {customBlogPosts.length} bài | {customImages.length} ảnh
            </span>
          </div>
        </div>
      </div>

      {/* Sub Tabs Selection */}
      <div className="flex border-b border-stone-200">
        {[
          { id: "leads", label: "YÊU CẦU TƯ VẤN (CRM)", icon: Users },
          { id: "sheets", label: "ĐỒNG BỘ GOOGLE SHEET", icon: FileSpreadsheet },
          { id: "content", label: "BIÊN TẬP NỘI DUNG (CMS)", icon: Layers },
          { id: "admin-settings", label: "TÀI KHOẢN ADMIN", icon: Lock }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap uppercase ${
                isActive 
                  ? "border-emerald-green text-emerald-green bg-emerald-green/5" 
                  : "border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[400px]">
        {/* LEADS PANEL */}
        {activeSubTab === "leads" && (
          <div className="space-y-6 pt-2">
            
            {/* Status Segmented Control Tabs */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block text-left">Lọc theo trạng thái xử lý:</span>
              <div className="flex overflow-x-auto pb-1 gap-2 scrollbar-none">
                {[
                  { id: "all", label: "Tất cả yêu cầu", count: totalLeads },
                  { id: "Chờ xử lý", label: "Chờ xử lý ⏳", count: pendingLeads },
                  { id: "Đang liên hệ", label: "Đang liên hệ 📞", count: inProgressLeads },
                  { id: "Đã hoàn thành", label: "Đã hoàn thành ✅", count: completedLeads },
                  { id: "Hủy", label: "Đã hủy ❌", count: leads.filter(l => l.status === "Hủy").length }
                ].map(tab => {
                  const isActive = statusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                        isActive 
                          ? "bg-emerald-green text-white border-emerald-green shadow-xs" 
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-white/20 text-white font-bold" : "bg-stone-100 text-stone-600 font-medium"}`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Capsules */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block text-left">Lọc theo danh mục gia công:</span>
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
                {[
                  { id: "all", label: "Tất cả danh mục" },
                  { id: "Chăm sóc da mặt", label: "Chăm sóc da mặt 🧴" },
                  { id: "Chăm sóc body", label: "Chăm sóc cơ thể 🧼" },
                  { id: "Chăm sóc tóc", label: "Chăm sóc tóc 💇‍♀️" },
                  { id: "Mặt nạ", label: "Mặt nạ dưỡng 🎭" },
                  { id: "Trang điểm", label: "Trang điểm 💄" },
                  { id: "Chăm sóc cá nhân", label: "Cá nhân & Vệ sinh 🪥" },
                  { id: "Công nghệ mới", label: "Dòng công nghệ mới ⚡" }
                ].map(cat => {
                  const isActive = categoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                        isActive 
                          ? "bg-stone-900 text-white border-stone-900 shadow-xs" 
                          : "bg-stone-100 text-stone-600 border-transparent hover:bg-stone-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search and Sheet Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo Tên, Số điện thoại, Email, Thương hiệu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:border-emerald-green focus:outline-none transition-all"
                />
              </div>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:border-emerald-green focus:outline-none transition-all w-full sm:w-auto"
                title="Lọc theo ngày đăng ký"
              />

              <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                <button
                  onClick={handleSyncLeadsToSheet}
                  disabled={isSyncingLeads}
                  className="w-full sm:w-auto bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                  title="Đồng bộ toàn bộ danh sách khách hàng sang Google Sheet"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  {isSyncingLeads ? "Đang đồng bộ..." : "Đồng bộ Sheet"}
                </button>
              </div>
            </div>

            {leadsSyncMessage.text && (
              <div className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
                leadsSyncMessage.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : leadsSyncMessage.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}>
                {isSyncingLeads ? (
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                ) : (
                  <FileSpreadsheet className="w-4 h-4 shrink-0" />
                )}
                <span>{leadsSyncMessage.text}</span>
              </div>
            )}

            {/* Leads Table Card */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-3xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-50/70 border-b border-stone-150 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-6">Khách Hàng</th>
                      <th className="py-4 px-6">Thông Tin Liên Hệ</th>
                      <th className="py-4 px-6">Yêu Cầu Gia Công</th>
                      <th className="py-4 px-6">Lời nhắn của khách hàng</th>
                      <th className="py-4 px-6">Trạng Thái (Chọn nhanh)</th>
                      <th className="py-4 px-6 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-500 font-light">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-green mb-3" />
                          Đang tải danh sách yêu cầu...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400 font-light">
                          Không tìm thấy yêu cầu tư vấn nào phù hợp.
                        </td>
                      </tr>
                    ) : (
                      paginatedLeads.map((lead) => {
                        const initials = lead.name ? lead.name.split(" ").pop()?.substring(0, 2).toUpperCase() : "KH";
                        const isEditingNotes = editingLeadNotesId === lead.id;
                        
                        // Deterministic soft background for avatar
                        const colors = [
                          "bg-emerald-50 text-emerald-700 border-emerald-100",
                          "bg-blue-50 text-blue-700 border-blue-100",
                          "bg-purple-50 text-purple-700 border-purple-100",
                          "bg-amber-50 text-amber-700 border-amber-100",
                          "bg-rose-50 text-rose-700 border-rose-100"
                        ];
                        const colorIndex = (lead.name || "").length % colors.length;
                        const avatarClass = `w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${colors[colorIndex]} shrink-0 border`;

                        return (
                          <tr key={lead.id} className="hover:bg-stone-50/50 transition-colors">
                            {/* KHÁCH HÀNG */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className={avatarClass}>{initials}</div>
                                <div className="text-left">
                                  <div className="font-bold text-stone-900 text-sm">{lead.name}</div>
                                  <div className="text-stone-400 text-[10px] mt-0.5">
                                    {new Date(lead.createdAt).toLocaleDateString("vi-VN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric"
                                    })}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* LIÊN HỆ */}
                            <td className="py-4 px-6 text-left">
                              <div className="font-mono text-stone-800 font-semibold flex items-center gap-1.5 text-xs">
                                <span className="cursor-pointer hover:text-emerald-green" onClick={() => {navigator.clipboard.writeText(lead.phone); alert("Đã copy số điện thoại!");}} title="Bấm để copy số điện thoại">{lead.phone}</span>
                                <a 
                                  href={`tel:${lead.phone}`}
                                  className="p-1 hover:bg-stone-100 text-stone-400 hover:text-emerald-green rounded transition-colors"
                                  title="Gọi điện trực tiếp"
                                >
                                  <PhoneCall className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <div className="text-stone-500 text-xs mt-0.5 flex items-center gap-1.5">
                                <span className="cursor-pointer hover:text-blue-600 truncate max-w-[140px]" onClick={() => {navigator.clipboard.writeText(lead.email || ""); alert("Đã copy email!");}} title="Bấm để copy email">{lead.email || "N/A"}</span>
                                {lead.email && (
                                  <a 
                                    href={`mailto:${lead.email}`}
                                    className="p-1 hover:bg-stone-100 text-stone-400 hover:text-blue-600 rounded transition-colors"
                                    title="Gửi email"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* THƯƠNG HIỆU & YÊU CẦU */}
                            <td className="py-4 px-6 text-left">
                              <div className="font-bold text-stone-800 text-xs">{lead.category}</div>
                              <div className="text-stone-500 text-[11px] mt-0.5 font-medium">SL: {lead.moq} sản phẩm</div>
                              {lead.brandName && (
                                <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-green/5 text-emerald-green border border-emerald-green/10">
                                  TH: {lead.brandName}
                                </div>
                              )}
                            </td>

                            {/* LỜI NHẮN CỦA KHÁCH HÀNG (READ-ONLY) */}
                            <td className="py-4 px-6 max-w-xs text-left">
                                <div className="text-stone-600 text-xs leading-relaxed">
                                  {lead.notes ? (
                                    <span className="italic">"{lead.notes}"</span>
                                  ) : (
                                    <span className="text-stone-300 italic text-[11px]">Không có lời nhắn</span>
                                  )}
                                </div>
                            </td>

                            {/* TRẠNG THÁI (QUICK CHANGE DROP-DOWN!) */}
                            <td className="py-4 px-6 text-left">
                              <select
                                value={lead.status || "Chờ xử lý"}
                                onChange={async (e) => {
                                  await handleQuickUpdateLead(lead.id, e.target.value, lead.notes || "");
                                }}
                                className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition-colors ${
                                  lead.status === "Chờ xử lý" 
                                    ? "bg-amber-50 text-amber-700 border-amber-200" 
                                    : lead.status === "Đang liên hệ"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : lead.status === "Đã hoàn thành"
                                    ? "bg-emerald-50 text-emerald-850 border-emerald-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                              >
                                <option value="Chờ xử lý">⏳ Chờ xử lý</option>
                                <option value="Đang liên hệ">📞 Đang liên hệ</option>
                                <option value="Đã hoàn thành">✅ Hoàn thành</option>
                                <option value="Hủy">❌ Hủy bỏ</option>
                              </select>
                            </td>

                            {/* THAO TÁC */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleSelectLead(lead)}
                                  className="p-2 text-stone-500 hover:text-emerald-green hover:bg-emerald-green-light rounded-lg transition-colors cursor-pointer"
                                  title="Xem chi tiết đầy đủ & Ghi chú dài"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteConfirm({
                                      title: "Xóa yêu cầu tư vấn",
                                      message: "Bạn có chắc chắn muốn xóa yêu cầu tư vấn này không?",
                                      onConfirm: () => {
                                        handleDeleteLead(lead.id);
                                        setDeleteConfirm(null);
                                      }
                                    });
                                  }}
                                  className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Xóa yêu cầu tư vấn"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-6 border-t border-stone-150">
                  <button
                    disabled={leadsPage === 1}
                    onClick={() => setLeadsPage(p => Math.max(1, p - 1))}
                    className="p-2 bg-stone-100 rounded-lg hover:bg-stone-200 disabled:opacity-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLeadsPage(i + 1)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${leadsPage === i + 1 ? "bg-emerald-green text-white" : "bg-white border border-stone-200"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={leadsPage === totalPages}
                    onClick={() => setLeadsPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 bg-stone-100 rounded-lg hover:bg-stone-200 disabled:opacity-50 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SHEETS SYNC PANEL */}
        {activeSubTab === "sheets" && (
          <section className="space-y-6 text-left pt-2">
            {/* Status Alert & Sync Feedback Banner */}
            {syncMessage.text && (
              <div className={`p-4 rounded-xl text-xs flex gap-2 items-start border ${
                syncMessage.type === "success" 
                  ? "bg-emerald-green/5 border-emerald-green/20 text-emerald-green-dark font-medium" 
                  : "bg-red-50 border-red-100 text-red-700 font-medium"
              }`}>
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{syncMessage.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Connection & Account Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-green">
                      <FileSpreadsheet className="w-6 h-6" />
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 font-medium">Kết Nối Google Sheets 📊</h3>
                    </div>
                    <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
                      Sử dụng Google Sheets làm hệ quản trị nội dung (CMS) trực tiếp cho website. Hệ thống sẽ tự động đồng bộ dữ liệu hai chiều và cập nhật bài viết, hình ảnh trong thời gian thực.
                    </p>
                  </div>

                  {/* Google Authentication Section */}
                  <div className="pt-2 border-t border-stone-100">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">1. Tài khoản Google</h4>
                    
                    {!googleUser ? (
                      <div className="space-y-3">
                        <p className="text-xs text-stone-500 font-light leading-relaxed">
                          Hãy kết nối với tài khoản Google chứa Trang tính của bạn. Quy trình an toàn 100% nhờ xác thực Google OAuth.
                        </p>
                        <button
                          onClick={handleGoogleSignIn}
                          disabled={isSyncing}
                          className="w-full flex items-center justify-center gap-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-sm px-4 py-3 rounded-xl transition-all shadow-2xs hover:shadow-xs cursor-pointer disabled:bg-stone-100 disabled:text-stone-400"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#EA4335"
                              d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.62 14.94 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.81 2.96c.92-2.73 3.47-4.42 6.69-4.42z"
                            />
                            <path
                              fill="#4285F4"
                              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.43-4.91 3.43-8.6z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.31 14.54c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.5 6.98C.54 8.9 0 11.05 0 13.3c0 2.25.54 4.4 1.5 6.32l3.81-2.96.01-.12z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.1-4.26 1.1-3.22 0-5.77-1.69-6.69-4.42l-3.81 2.96C3.39 20.35 7.35 23 12 23z"
                            />
                          </svg>
                          <span>{isSyncing ? "Đang kết nối..." : "Kết nối với Google"}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {googleUser.photoURL ? (
                            <img 
                              src={googleUser.photoURL} 
                              alt="Avatar" 
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full border border-stone-300"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-emerald-green-light text-emerald-green-dark flex items-center justify-center font-bold text-sm">
                              {googleUser.displayName?.charAt(0) || "G"}
                            </div>
                          )}
                          <div className="text-left">
                            <div className="font-bold text-xs text-stone-900">{googleUser.displayName || "Người dùng Google"}</div>
                            <div className="text-[11px] text-stone-500 font-mono">{googleUser.email}</div>
                          </div>
                        </div>
                        <button
                          onClick={handleGoogleSignOut}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Đăng xuất khỏi Google"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Google Sheet Connection and Setup Section */}
                  {googleUser && (
                    <div className="space-y-4 pt-4 border-t border-stone-100">
                      <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">2. Thiết lập Google Sheet</h4>
                      
                      {/* Sub-Option A: Automatic 1-Click creation */}
                      <div className="bg-emerald-green/5 p-4 rounded-2xl border border-emerald-green/15 space-y-3">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-bold text-xs text-stone-900 block">Lựa chọn 1: Tạo mới Google Sheet tự động (Khuyên dùng) ✨</span>
                            <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                              Chỉ cần 1 click, hệ thống sẽ tự động tạo một Google Sheet hoàn toàn mới trên Google Drive của bạn, khởi tạo các bảng và tải lên toàn bộ bài viết, ảnh mẫu lên Sheet.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleCreateAndSetupNewSheet}
                          disabled={isSettingUp}
                          className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-300"
                        >
                          {isSettingUp ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                          <span>{isSettingUp ? "Đang xử lý..." : "Tự Động Tạo Sheet Mới & Tải Lên 🆕"}</span>
                        </button>
                      </div>

                      {/* Sub-Option B: Connect Existing Spreadsheet */}
                      <div className="space-y-2 pt-2">
                        <span className="font-bold text-xs text-stone-900 block">Lựa chọn 2: Sử dụng Google Sheet đã có của bạn</span>
                        <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                          Dán link Google Sheet đã có của bạn vào đây, sau đó nhấp nút bên cạnh để hệ thống khởi tạo các tab "Bài viết" và "Hình ảnh" cùng dữ liệu ban đầu.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input 
                            type="text" 
                            value={sheetInput}
                            onChange={(e) => setSheetInput(e.target.value)}
                            placeholder="Nhập link Google Sheet của bạn tại đây..."
                            className="flex-1 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/15 focus:outline-hidden transition-all bg-stone-50/50"
                          />
                          <button
                            onClick={handleSetupExistingSheet}
                            disabled={isSettingUp || !sheetInput.trim()}
                            className="bg-stone-950 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            {isSettingUp ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span>Khởi Tạo Bảng ⚡</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Spreadsheet Info Badge if spreadsheetId exists */}
                {sheetsConfig.spreadsheetId && (
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-100 pb-2">3. Trạng thái và Hành động</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-150">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">ID Google Sheet</span>
                        <span className="text-xs font-mono font-bold text-stone-800 mt-1 block truncate" title={sheetsConfig.spreadsheetId}>
                          {sheetsConfig.spreadsheetId}
                        </span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-150">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Đồng bộ cuối</span>
                        <span className="text-xs font-bold text-stone-800 mt-1 block truncate">
                          {sheetsConfig.lastSynced || "Chưa có"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <a 
                        href={`https://docs.google.com/spreadsheets/d/${sheetsConfig.spreadsheetId}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 font-bold text-xs px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-green" />
                        <span>Mở Trang Tính Trên Drive ↗</span>
                      </a>
                      
                      {googleToken && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            onClick={handleSyncSheets}
                            disabled={isSyncing}
                            className="bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:bg-stone-200 disabled:text-stone-400"
                            title="Tải dữ liệu từ Google Sheet về cập nhật cho Website"
                          >
                            {isSyncing ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4 text-emerald-green" />
                            )}
                            <span>Đồng bộ về Web 🔄</span>
                          </button>

                          <button
                            onClick={handlePushToSheets}
                            disabled={isSyncing}
                            className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-green/10 disabled:bg-stone-200 disabled:text-stone-400"
                            title="Ghi đè tất cả bài viết và hình ảnh hiện tại từ Website lên Google Sheet"
                          >
                            {isSyncing ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <ArrowUpToLine className="w-4 h-4" />
                            )}
                            <span>Đẩy dữ liệu lên Sheet ⬆️</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-stone-400 text-center font-light leading-relaxed">
                      💡 Mẹo: Nhấn <strong>"Đồng bộ về Web 🔄"</strong> để cập nhật bài viết từ Sheet về Web, hoặc nhấn <strong>"Đẩy dữ liệu lên Sheet ⬆️"</strong> để tải ngược lại tất cả bài viết từ Web lên Sheet!
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Schema and Instructions */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-emerald-green">
                    <Database className="w-5 h-5" />
                    <h4 className="font-serif font-bold text-base sm:text-lg">Cấu Trúc Bảng Dữ Liệu</h4>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    Khi khởi tạo, Google Sheet của bạn sẽ được thiết lập tự động gồm ba trang tính (sheet) con với cấu trúc cột chuẩn xác để phục vụ cho website CMS:
                  </p>
                  <div className="space-y-4 pt-2 text-xs text-left">
                    <div className="space-y-1.5">
                      <span className="text-emerald-green font-bold text-[10px] uppercase tracking-wider block">Trang tính 1: "Bài viết" (Blog Posts)</span>
                      <div className="bg-white/5 p-3 rounded-lg font-mono text-[10px] text-stone-200 overflow-x-auto whitespace-nowrap scrollbar-none border border-white/5">
                        Tiêu đề | Danh mục | Tóm tắt | Nội dung | Hình ảnh | Tác giả | Ngày
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-emerald-green font-bold text-[10px] uppercase tracking-wider block">Trang tính 2: "Hình ảnh" (Activities Library)</span>
                      <div className="bg-white/5 p-3 rounded-lg font-mono text-[10px] text-stone-200 overflow-x-auto whitespace-nowrap scrollbar-none border border-white/5">
                        Tiêu đề | Danh mục | Mô tả | Hình ảnh
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-emerald-green font-bold text-[10px] uppercase tracking-wider block">Trang tính 3: "Sản phẩm" (Products List)</span>
                      <div className="bg-white/5 p-3 rounded-lg font-mono text-[10px] text-stone-200 overflow-x-auto whitespace-nowrap scrollbar-none border border-white/5">
                        Mã SP | Tiêu đề | Danh mục | Phòng LAB | Loại da | Số sao | Điểm đánh giá | Lượt reviews | Giá gốc | Giá bán | % Giảm giá | Nhãn | Lượt thử lâm sàng | % Độ HOT | Hình ảnh | Mô tả | Thành phần | Hướng dẫn sử dụng
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ADMIN SETTINGS PANEL */}
        {activeSubTab === "admin-settings" && (
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 text-left pt-2">
            <h3 className="font-serif font-bold text-xl text-stone-900">Quản lý Tài khoản Admin</h3>
            <p className="text-stone-500 text-sm font-light">Cập nhật tên đăng nhập hiển thị. Mật khẩu quản trị được bảo vệ ở phía máy chủ.</p>

            <div className="space-y-4 max-w-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Tên đăng nhập</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-green focus:outline-none transition-all"
                />
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-1.5">
                <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider">Mật khẩu bảo mật</label>
                <p className="text-xs text-amber-800 font-light leading-relaxed">
                  Mật khẩu đăng nhập chính là giá trị secret <code className="font-mono font-bold">ADMIN_TOKEN</code> được đặt trên Cloudflare.
                  Để đổi mật khẩu, cập nhật secret này trong Cloudflare Pages (Settings → Environment variables / Secrets) rồi deploy lại.
                  Không thể đổi mật khẩu trực tiếp tại đây vì lý do an toàn.
                </p>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem("admin_username", adminUsername);
                  alert("Đã lưu tên đăng nhập admin!");
                }}
                className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        )}

        {/* SYNCED CONTENT MANAGER */}
        {activeSubTab === "content" && (
          <div className="space-y-8 text-left">
            {/* Action feedback banner */}
            {actionMessage.text && (
              <div className={`p-4 rounded-xl text-xs flex gap-2 items-start border ${
                actionMessage.type === "success" 
                  ? "bg-emerald-green/5 border-emerald-green/20 text-emerald-green-dark font-medium" 
                  : actionMessage.type === "error"
                    ? "bg-red-50 border-red-100 text-red-700"
                    : "bg-stone-50 border-stone-200 text-stone-600 animate-pulse"
              }`}>
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{actionMessage.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column: Category navigation directory */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-stone-50 p-4 rounded-3xl border border-stone-200 shadow-3xs">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 pl-2">
                    Danh mục quản trị
                  </h4>
                  <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                    {[
                      { id: "articles", label: "Bài viết", count: customBlogPosts.length, icon: BookOpen, desc: "Tin tức & Xu hướng" },
                      { id: "products", label: "Sản phẩm", count: customProducts.length, icon: Sparkles, desc: "Mẫu thử gia công" },
                      { id: "images", label: "Thư viện ảnh", count: customImages.length, icon: Image, desc: "Gallery hoạt động" },
                      { id: "partners", label: "Đối tác liên kết", count: customLogos.length, icon: Briefcase, desc: "Logo thương hiệu" },
                      { id: "logo", label: "Cấu hình Logo", count: null, icon: Layers, desc: "Logo & Slogan chính" },
                    ].map((subTab) => {
                      const Icon = subTab.icon;
                      const isSelected = cmsSubTab === subTab.id;
                      return (
                        <button
                          key={subTab.id}
                          onClick={() => setCmsSubTab(subTab.id as any)}
                          className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-all cursor-pointer whitespace-nowrap shrink-0 lg:flex-none ${
                            isSelected
                              ? "bg-emerald-green text-white font-bold shadow-md shadow-emerald-green/15 translate-x-0.5"
                              : "bg-white border border-stone-150 hover:bg-stone-50 text-stone-700 font-medium"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4.5 h-4.5 shrink-0 ${isSelected ? "text-white" : "text-emerald-green"}`} />
                            <div className="text-left">
                              <div className="text-xs">{subTab.label}</div>
                              <div className={`text-[9px] font-normal block ${isSelected ? "text-emerald-100" : "text-stone-400"}`}>
                                {subTab.desc}
                              </div>
                            </div>
                          </div>
                          {subTab.count !== null && (
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              isSelected ? "bg-white/20 text-white" : "bg-emerald-green-light text-emerald-green-dark"
                            }`}>
                              {subTab.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Directory content with embedded search bar */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Embedded dynamic search and action header */}
                {cmsSubTab !== "logo" && (
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50 p-4 rounded-3xl border border-stone-200">
                    <div className="relative w-full sm:max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder={
                          cmsSubTab === "articles" ? "Tìm theo tiêu đề, tóm tắt, tác giả..." :
                          cmsSubTab === "products" ? "Tìm theo tên sản phẩm, danh mục, phòng LAB..." :
                          cmsSubTab === "images" ? "Tìm theo tiêu đề, danh mục ảnh..." :
                          "Tìm kiếm tên đối tác, loại đối tác..."
                        }
                        value={cmsSearchTerm}
                        onChange={(e) => setCmsSearchTerm(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:border-emerald-green focus:outline-none transition-all"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (cmsSubTab === "articles") {
                          openBlogEditor({
                            index: -1,
                            isNew: true,
                            data: {
                              title: "",
                              slug: "",
                              url: "",
                              category: "cẩm nang",
                              summary: "",
                              content: "",
                              status: "published",
                              date: new Date().toLocaleDateString("vi-VN"),
                              author: "Cosbuilt",
                              image: ""
                            }
                          });
                        } else if (cmsSubTab === "products") {
                          openProductEditor({
                            index: -1,
                            isNew: true,
                            data: {
                              id: "product_" + Math.random().toString(36).substring(2, 9),
                              title: "",
                              category: "facial-care",
                              lab: "Cosbuilt LAB",
                              skinTypes: ["Mọi loại da"],
                              rating: 5,
                              ratingValue: 4.8,
                              reviewsCount: 120,
                              originalPrice: 250000,
                              price: 190000,
                              discountPercent: 24,
                              badge: "NEW",
                              testedCount: 100,
                              hotPercent: 85,
                              image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400",
                              description: "Mẫu thử nghiệm sản phẩm chăm sóc da cao cấp gia công bởi Cosbuilt.",
                              ingredients: "Nước tinh khiết, Hyaluronic Acid, Niacinamide, Glycerin.",
                              guidelines: "Thoa đều lên vùng da mặt và cổ sau khi rửa sạch mỗi sáng và tối."
                            }
                          });
                        } else if (cmsSubTab === "images") {
                          setEditingImage({
                            index: -1,
                            isNew: true,
                            data: {
                              title: "",
                              category: "nhà máy",
                              image: "",
                              description: ""
                            }
                          });
                        } else if (cmsSubTab === "partners") {
                          setEditingPartnerLogo({
                            index: -1,
                            isNew: true,
                            data: { name: "", type: "" }
                          });
                        }
                      }}
                      className="w-full sm:w-auto bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm {cmsSubTab === "articles" ? "bài viết" : cmsSubTab === "products" ? "sản phẩm" : cmsSubTab === "images" ? "hình ảnh" : "đối tác"}</span>
                    </button>
                  </div>
                )}

                {/* Sub-tab 1: Articles Directory */}
                {cmsSubTab === "articles" && (() => {
                  const filteredArticles = customBlogPosts.filter(post => 
                    (post.title || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (post.summary || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (post.category || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (post.author || "").toLowerCase().includes(cmsSearchTerm.toLowerCase())
                  );

                  const itemsPerPage = 4;
                  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
                  const activePage = Math.min(cmsArticlesPage, Math.max(1, totalPages));
                  const paginatedArticles = filteredArticles.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                  return (
                      <ArticleManagement
                      posts={paginatedArticles}
                      searchTerm={cmsSearchTerm}
                      onEdit={(post, index) => {
                          const originalIndex = customBlogPosts.findIndex(p => p.title === post.title);
                          openBlogEditor({ index: originalIndex >= 0 ? originalIndex : index, isNew: false, data: { ...post } });
                      }}
                      onDelete={(index) => {
                          const post = paginatedArticles[index];
                          const originalIndex = customBlogPosts.findIndex(p => p.title === post.title);
                          setDeleteConfirm({
                            title: "Xóa bài viết",
                            message: "Bạn có chắc chắn muốn xóa bài viết này không?",
                            onConfirm: () => {
                                handleDeleteBlogPost(originalIndex >= 0 ? originalIndex : index);
                                setDeleteConfirm(null);
                            }
                          });
                      }}
                      page={activePage}
                      setPage={setCmsArticlesPage}
                      totalPages={totalPages}
                      onSaveNew={async (post) => {
                        let newPosts = [...customBlogPosts];
                        newPosts.push(post);
                        await saveAllContent({ articles: newPosts }, { action: "add", sheetName: "Bài viết", data: post });
                      }}
                    />
                  );
                })()}

                {/* Sub-tab 2: Products Directory */}
                {cmsSubTab === "products" && (() => {
                  const filteredProducts = customProducts.filter(prod => 
                    (prod.title || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (prod.id || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (prod.category || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (prod.lab || "").toLowerCase().includes(cmsSearchTerm.toLowerCase())
                  );

                  const itemsPerPage = 6;
                  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
                  const activePage = Math.min(cmsProductsPage, Math.max(1, totalPages));
                  const paginatedProducts = filteredProducts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <div className="text-left">
                          <h3 className="font-serif font-bold text-lg text-stone-900">Danh Sách Sản Phẩm Mẫu ({filteredProducts.length})</h3>
                          <p className="text-stone-400 text-xs font-light">Quản lý các công thức và mẫu thử sản phẩm hỗ trợ khách đặt gia công</p>
                        </div>
                      </div>

                      {filteredProducts.length === 0 ? (
                        <div className="text-center py-12 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                          Không tìm thấy sản phẩm nào khớp với từ khóa "{cmsSearchTerm}".
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedProducts.map((prod, index) => {
                              const originalIndex = customProducts.findIndex(p => p.id === prod.id || p.title === prod.title);
                              return (
                                <div key={index} className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-emerald-green/30 transition-all duration-200 relative group">
                                  <div className="flex gap-3">
                                    <img 
                                      src={prod.image || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400"} 
                                      alt={prod.title} 
                                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-stone-100 shrink-0 border border-stone-100"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="space-y-1 flex-1 min-w-0 text-left">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-[8px] font-bold text-emerald-green uppercase tracking-wider bg-emerald-green-light px-1.5 py-0.5 rounded">
                                          {prod.category}
                                        </span>
                                        {prod.badge && (
                                          <span className="text-[8px] font-bold text-white uppercase tracking-wider bg-amber-500 px-1.5 py-0.5 rounded">
                                            {prod.badge}
                                          </span>
                                        )}
                                      </div>
                                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate pr-12" title={prod.title}>{prod.title}</h4>
                                      <p className="text-[10px] text-stone-400 font-medium">LAB: {prod.lab || "Cosbuilt LAB"}</p>
                                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2 pt-0.5">
                                        <span className="text-stone-900 font-bold text-xs">
                                          {getProductPriceRange(prod)}
                                        </span>
                                        {prod.priceRange && (
                                          <span className="text-stone-900 font-bold text-xs">
                                            {prod.priceRange}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* CRUD controls */}
                                  <div className="absolute top-3 right-3 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-150">
                                    <button
                                      type="button"
                                      onClick={() => openProductEditor({ index: originalIndex >= 0 ? originalIndex : index, isNew: false, data: { ...prod } })}
                                      className="p-1.5 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"
                                      title="Sửa sản phẩm"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const finalIndex = originalIndex >= 0 ? originalIndex : index;
                                        setDeleteConfirm({
                                          title: "Xóa sản phẩm",
                                          message: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
                                          onConfirm: () => {
                                            handleDeleteProduct(finalIndex);
                                            setDeleteConfirm(null);
                                          }
                                        });
                                      }}
                                      className="p-1.5 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"
                                      title="Xóa sản phẩm"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Beautiful Pagination Controls */}
                          {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-1.5 pt-4 border-t border-stone-100 mt-6">
                              <button
                                type="button"
                                onClick={() => setCmsProductsPage(prev => Math.max(1, prev - 1))}
                                disabled={activePage === 1}
                                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  activePage === 1
                                    ? "text-stone-300 border-stone-150 bg-stone-50 cursor-not-allowed"
                                    : "text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                }`}
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, idx) => {
                                  const pageNum = idx + 1;
                                  const isActive = activePage === pageNum;
                                  return (
                                    <button
                                      key={pageNum}
                                      type="button"
                                      onClick={() => setCmsProductsPage(pageNum)}
                                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center border ${
                                        isActive
                                          ? "bg-emerald-green text-white border-emerald-green shadow-xs"
                                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                      }`}
                                    >
                                      {pageNum}
                                    </button>
                                  );
                                })}
                              </div>

                              <button
                                type="button"
                                onClick={() => setCmsProductsPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={activePage === totalPages}
                                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  activePage === totalPages
                                    ? "text-stone-300 border-stone-150 bg-stone-50 cursor-not-allowed"
                                    : "text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                }`}
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Sub-tab 3: Gallery Directory */}
                {cmsSubTab === "images" && (() => {
                  const filteredImages = customImages.filter(img => 
                    (img.title || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (img.category || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (img.description || "").toLowerCase().includes(cmsSearchTerm.toLowerCase())
                  );

                  const itemsPerPage = 6;
                  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
                  const activePage = Math.min(cmsImagesPage, Math.max(1, totalPages));
                  const paginatedImages = filteredImages.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                  return (
                    <ImageManagement
                      images={paginatedImages}
                      searchTerm={cmsSearchTerm}
                      onEdit={(img, index) => {
                          const originalIndex = customImages.findIndex(i => i.image === img.image && i.title === img.title);
                          setEditingImage({ index: originalIndex >= 0 ? originalIndex : index, isNew: false, data: { ...img } })
                      }}
                      onDelete={(index) => {
                          const img = paginatedImages[index];
                          const originalIndex = customImages.findIndex(i => i.image === img.image && i.title === img.title);
                          setDeleteConfirm({
                            title: "Xóa hình ảnh",
                            message: "Bạn có chắc chắn muốn xóa hình ảnh này không?",
                            onConfirm: () => {
                                handleDeleteImage(originalIndex >= 0 ? originalIndex : index);
                                setDeleteConfirm(null);
                            }
                          });
                      }}
                      page={activePage}
                      setPage={setCmsImagesPage}
                      totalPages={totalPages}
                    />
                  );
                })()}

                {/* Sub-tab 4: Partners Directory */}
                {cmsSubTab === "partners" && (() => {
                  const filteredPartners = customLogos.filter(logo => 
                    (logo.name || "").toLowerCase().includes(cmsSearchTerm.toLowerCase()) ||
                    (logo.type || "").toLowerCase().includes(cmsSearchTerm.toLowerCase())
                  );

                  const itemsPerPage = 6;
                  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
                  const activePage = Math.min(cmsPartnersPage, Math.max(1, totalPages));
                  const paginatedPartners = filteredPartners.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <div className="text-left">
                          <h3 className="font-serif font-bold text-lg text-stone-900">Danh Sách Đối Tác & Thương Hiệu ({filteredPartners.length})</h3>
                          <p className="text-stone-400 text-xs font-light">Các đối tác và khách hàng hợp tác sản xuất cùng Cosbuilt</p>
                        </div>
                      </div>

                      {filteredPartners.length === 0 ? (
                        <div className="text-center py-12 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                          Không tìm thấy đối tác nào khớp với từ khóa "{cmsSearchTerm}".
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {paginatedPartners.map((logo, index) => {
                              const originalIndex = customLogos.findIndex(l => l.name === logo.name);
                              return (
                                <div key={index} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-3 relative group hover:shadow-md hover:border-emerald-green/30 transition-all duration-200 text-left">
                                  {logo.image ? (
                                    <img 
                                      src={logo.image} 
                                      alt={logo.name} 
                                      className="w-12 h-12 object-contain bg-stone-50 rounded-xl p-1 border border-stone-100 shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center text-[10px] font-bold border border-stone-100 shrink-0">
                                      No Logo
                                    </div>
                                  )}
                                  <div className="space-y-1 text-left min-w-0 flex-1">
                                    <h5 className="font-bold text-xs text-stone-900 pr-8 truncate" title={logo.name}>{logo.name}</h5>
                                    <span className="text-[10px] text-stone-400 block truncate">{logo.type}</span>
                                  </div>
                                  
                                  <div className="absolute top-2 right-2 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-150 opacity-0 group-hover:opacity-100 transition-all duration-150">
                                    <button
                                      type="button"
                                      onClick={() => setEditingPartnerLogo({ index: originalIndex >= 0 ? originalIndex : index, isNew: false, data: { ...logo } })}
                                      className="p-1 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"
                                      title="Sửa đối tác"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const finalIndex = originalIndex >= 0 ? originalIndex : index;
                                        setDeleteConfirm({
                                          title: "Xóa đối tác liên kết",
                                          message: "Bạn có chắc chắn muốn xóa đối tác này không?",
                                          onConfirm: () => {
                                            handleDeletePartnerLogo(finalIndex);
                                            setDeleteConfirm(null);
                                          }
                                        });
                                      }}
                                      className="p-1 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"
                                      title="Xóa đối tác"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Beautiful Pagination Controls */}
                          {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-1.5 pt-4 border-t border-stone-100 mt-6">
                              <button
                                type="button"
                                onClick={() => setCmsPartnersPage(prev => Math.max(1, prev - 1))}
                                disabled={activePage === 1}
                                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  activePage === 1
                                    ? "text-stone-300 border-stone-150 bg-stone-50 cursor-not-allowed"
                                    : "text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                }`}
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>

                              <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, idx) => {
                                  const pageNum = idx + 1;
                                  const isActive = activePage === pageNum;
                                  return (
                                    <button
                                      key={pageNum}
                                      type="button"
                                      onClick={() => setCmsPartnersPage(pageNum)}
                                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center border ${
                                        isActive
                                          ? "bg-emerald-green text-white border-emerald-green shadow-xs"
                                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                      }`}
                                    >
                                      {pageNum}
                                    </button>
                                  );
                                })}
                              </div>

                              <button
                                type="button"
                                onClick={() => setCmsPartnersPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={activePage === totalPages}
                                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                  activePage === totalPages
                                    ? "text-stone-300 border-stone-150 bg-stone-50 cursor-not-allowed"
                                    : "text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                }`}
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Sub-tab 5: General Website Logo Directory */}
                {cmsSubTab === "logo" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <div className="text-left">
                        <h3 className="font-serif font-bold text-lg text-stone-900">Cấu Hình Chung & Logo Website</h3>
                        <p className="text-stone-400 text-xs font-light">Tùy biến logo Navbar và logo Footer riêng biệt, mỗi logo cập nhật độc lập trên website</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-3xs space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-emerald-green" />
                          <h3 className="font-serif font-bold text-lg text-stone-900">Logo chính của Website</h3>
                        </div>
                        {!isEditingWebsiteLogo ? (
                          <button
                            onClick={() => {
                              setTempWebsiteLogo({
                                name: websiteLogo?.name || "COSBUILT",
                                slogan: websiteLogo?.slogan || "",
                                image: websiteLogo?.image || ""
                              });
                              setIsEditingWebsiteLogo(true);
                            }}
                            className="border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Sửa Logo
                          </button>
                        ) : null}
                      </div>

                      {isEditingWebsiteLogo ? (
                        <div className="space-y-4 pt-1 text-left">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Tên hiển thị (Logo Text)</label>
                            <input
                              type="text"
                              value={tempWebsiteLogo.name}
                              onChange={(e) => setTempWebsiteLogo(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Hình ảnh Logo (Tùy chọn - Thay cho dạng chữ)</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Có thể upload file bên cạnh hoặc điền link ảnh..."
                                value={tempWebsiteLogo.image}
                                onChange={(e) => setTempWebsiteLogo(prev => ({ ...prev, image: e.target.value }))}
                                className="flex-1 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none font-mono text-[11px]"
                              />
                              <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none">
                                {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-green" /> : <Upload className="w-3.5 h-3.5" />}
                                <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  disabled={isUploading}
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const url = await handleImageUpload(file);
                                        setTempWebsiteLogo(prev => ({ ...prev, image: url }));
                                      } catch (err: any) {
                                        alert("Lỗi tải ảnh lên: " + err.message);
                                      }
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => setIsEditingWebsiteLogo(false)}
                              className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleSaveWebsiteLogo}
                              disabled={isSavingContent}
                              className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Lưu Logo
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4">
                            {websiteLogo?.image ? (
                              <div className="bg-white p-2 rounded-xl border border-stone-150 shrink-0">
                                <img 
                                  src={websiteLogo.image} 
                                  alt={websiteLogo.name} 
                                  className="h-12 w-auto object-contain max-w-[150px]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ) : null}
                            <div className="text-left">
                              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Tên hiển thị hiện tại</div>
                              <div className="font-serif font-black text-2xl text-stone-900 tracking-widest mt-1 uppercase">{websiteLogo?.name || "COSBUILT"}</div>
                            </div>
                          </div>
                          <div className="text-xs text-stone-500 font-light max-w-sm text-left">
                            Tên thương hiệu và hình ảnh logo này sẽ được cập nhật đồng bộ ở đầu trang menu (Navbar) cho khách truy cập website.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-3xs space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-emerald-green" />
                          <h3 className="font-serif font-bold text-lg text-stone-900">Logo chân trang (Footer)</h3>
                        </div>
                        {!isEditingFooterLogo ? (
                          <button
                            onClick={() => {
                              setTempFooterLogo({
                                name: footerLogo?.name || "COSBUILT",
                                slogan: footerLogo?.slogan || "",
                                image: footerLogo?.image || ""
                              });
                              setIsEditingFooterLogo(true);
                            }}
                            className="border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Sửa Logo
                          </button>
                        ) : null}
                      </div>

                      {isEditingFooterLogo ? (
                        <div className="space-y-4 pt-1 text-left">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Tên hiển thị (Logo Text)</label>
                            <input
                              type="text"
                              value={tempFooterLogo.name}
                              onChange={(e) => setTempFooterLogo(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Hình ảnh Logo (Tùy chọn - Thay cho dạng chữ)</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Có thể upload file bên cạnh hoặc điền link ảnh..."
                                value={tempFooterLogo.image}
                                onChange={(e) => setTempFooterLogo(prev => ({ ...prev, image: e.target.value }))}
                                className="flex-1 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none font-mono text-[11px]"
                              />
                              <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none">
                                {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-green" /> : <Upload className="w-3.5 h-3.5" />}
                                <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  disabled={isUploading}
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const url = await handleImageUpload(file);
                                        setTempFooterLogo(prev => ({ ...prev, image: url }));
                                      } catch (err: any) {
                                        alert("Lỗi tải ảnh lên: " + err.message);
                                      }
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              onClick={() => setIsEditingFooterLogo(false)}
                              className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleSaveFooterLogo}
                              disabled={isSavingContent}
                              className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Lưu Logo
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4">
                            {footerLogo?.image ? (
                              <div className="bg-stone-950 p-2 rounded-xl border border-stone-150 shrink-0">
                                <img
                                  src={footerLogo.image}
                                  alt={footerLogo.name}
                                  className="h-12 w-auto object-contain max-w-[150px]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ) : null}
                            <div className="text-left">
                              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Tên hiển thị hiện tại</div>
                              <div className="font-serif font-black text-2xl text-stone-900 tracking-widest mt-1 uppercase">{footerLogo?.name || "COSBUILT"}</div>
                            </div>
                          </div>
                          <div className="text-xs text-stone-500 font-light max-w-sm text-left">
                            Tên thương hiệu và hình ảnh logo này sẽ được cập nhật đồng bộ ở cuối trang (Footer) cho khách truy cập website.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEAD DETAILS & UPDATE MODAL */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-stone-150 max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-stone-150 flex justify-between items-center bg-stone-50">
                <div className="space-y-1 text-left">
                  <span className="bg-emerald-green-light text-emerald-green-dark text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    Yêu cầu tư vấn chi tiết
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-950">{selectedLead.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 text-left text-xs sm:text-sm">
                {/* Customer Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Số điện thoại / Zalo</span>
                    <div className="font-bold text-stone-900 font-mono text-sm">{selectedLead.phone}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Địa chỉ Email</span>
                    <div className="text-stone-800 break-all">{selectedLead.email || "N/A"}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Tên thương hiệu dự kiến</span>
                    <div className="font-semibold text-stone-800">{selectedLead.brandName || <span className="text-stone-300 italic">Chưa có</span>}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Thời gian đăng ký</span>
                    <div className="text-stone-500 font-light">
                      {new Date(selectedLead.createdAt).toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>

                {/* Formula Specifications */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-150 grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Hạng mục cần gia công</span>
                    <div className="font-bold text-stone-900">{selectedLead.category}</div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Sản lượng dự kiến</span>
                    <div className="font-bold text-stone-900">{selectedLead.moq} sản phẩm</div>
                  </div>
                </div>

                {/* Customer Message */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Lời nhắn của khách hàng</span>
                  <div className="p-4 bg-amber-50/50 border border-amber-150 rounded-2xl text-stone-700 italic font-light leading-relaxed whitespace-pre-line">
                    "{selectedLead.notes || "Không có nội dung lời nhắn đi kèm."}"
                  </div>
                </div>

                {/* Admin Editing status & notes */}
                <div className="space-y-4 pt-4 border-t border-stone-150">
                  <h4 className="font-serif font-bold text-sm text-stone-900">Cập Nhật Trạng Thái & Ghi Chú Admin</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Trạng thái xử lý</label>
                      <select
                        value={leadStatus}
                        onChange={(e) => setLeadStatus(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none cursor-pointer font-bold"
                      >
                        <option value="Chờ xử lý">⏳ Chờ xử lý</option>
                        <option value="Đang liên hệ">📞 Đang liên hệ</option>
                        <option value="Đã hoàn thành">✅ Đã hoàn thành</option>
                        <option value="Hủy">❌ Đã hủy (Spam/Hủy bỏ)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Ghi chú tiến trình (Nội bộ)</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Nhập tiến độ liên hệ: vd: Đã gửi mẫu serum ngày 19/7, đang đợi phản hồi chất kem của khách..."
                      rows={3}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none resize-none font-light"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-stone-150 bg-stone-50 flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSaveLead}
                  disabled={isSavingLead}
                  className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  {isSavingLead ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Lưu cập nhật</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* CMS: EDIT BLOG POST MODAL */}
        {editingBlogPost && (
          <div className="fixed inset-0 z-50 bg-stone-100 flex flex-col">
            {/* Full-page editor header */}
            <div className="px-5 sm:px-8 py-4 border-b border-stone-200 flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={handleCloseBlogEditor}
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-green transition-colors cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Quay lại danh sách
                </button>
                <span className="w-px h-5 bg-stone-200 hidden sm:block" />
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-950 truncate">
                  {editingBlogPost.isNew ? "Thêm Bài Viết Mới" : "Sửa Bài Viết"}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  editingBlogPost.data.status === "draft"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-green-light text-emerald-green"
                }`}>
                  {editingBlogPost.data.status === "draft" ? "Bản nháp" : "Xuất bản"}
                </span>
              </div>
              <button
                type="submit"
                form="blog-editor-form"
                className="flex items-center gap-1.5 bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                Lưu & Xuất bản
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form id="blog-editor-form" onSubmit={handleSaveBlogPost} className="max-w-3xl mx-auto p-5 sm:p-8 space-y-4 text-left text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tiêu đề bài viết</label>
                    <input
                      type="text"
                      required
                      value={editingBlogPost.data.title}
                      onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, title: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Danh mục</label>
                    <select
                      value={editingBlogPost.data.category}
                      onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, category: e.target.value as any } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none cursor-pointer font-bold"
                    >
                      <option value="cẩm nang">📖 Cẩm nang gia công</option>
                      <option value="xu hướng">📈 Xu hướng nguyên liệu</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tác giả</label>
                    <input
                      type="text"
                      required
                      value={editingBlogPost.data.author}
                      onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, author: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Ngày đăng</label>
                    <input
                      type="text"
                      required
                      value={editingBlogPost.data.date}
                      onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, date: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Trạng thái</label>
                    <select
                      value={editingBlogPost.data.status || "published"}
                      onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, status: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none cursor-pointer font-bold"
                    >
                      <option value="published">✅ Xuất bản (hiển thị trên web)</option>
                      <option value="draft">📝 Bản nháp (ẩn với khách)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Đường dẫn bài viết (URL / Slug)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const s = slugify(editingBlogPost.data.title || "");
                        setEditingBlogPost(prev => prev ? {
                          ...prev,
                          data: { ...prev.data, slug: s, url: s ? `https://cosbuilt.vn/tin-tuc/${s}` : "" }
                        } : null);
                      }}
                      className="text-[10px] font-bold text-emerald-green hover:underline shrink-0"
                    >
                      Tạo từ tiêu đề
                    </button>
                  </div>
                  <div className="flex items-center rounded-xl border border-stone-300 bg-white overflow-hidden focus-within:border-emerald-green">
                    <span className="bg-stone-100 text-stone-500 text-xs font-mono px-3 py-2 border-r border-stone-200 shrink-0 select-none">
                      cosbuilt.vn/tin-tuc/
                    </span>
                    <input
                      type="text"
                      placeholder="cam-nang-quy-trinh-dang-ky-giay-phep"
                      value={editingBlogPost.data.slug || ""}
                      onChange={(e) => {
                        const val = slugify(e.target.value);
                        setEditingBlogPost(prev => prev ? {
                          ...prev,
                          data: {
                            ...prev.data,
                            slug: val,
                            url: val ? `https://cosbuilt.vn/tin-tuc/${val}` : ""
                          }
                        } : null);
                      }}
                      className="w-full bg-transparent px-3 py-2 text-xs focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 leading-snug">
                    Để trống sẽ tự tạo từ tiêu đề. Chỉ chữ thường không dấu và dấu gạch ngang.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hình ảnh bìa (Chọn file từ máy hoặc điền URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={editingBlogPost.data.image}
                      onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, image: e.target.value } } : null)}
                      className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none font-mono text-[11px]"
                    />
                    <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none">
                      {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-green" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await handleImageUpload(file);
                              setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, image: url } } : null);
                            } catch (err: any) {
                              alert("Lỗi tải ảnh lên: " + err.message);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tóm tắt ngắn gọn</label>
                  <textarea
                    required
                    rows={2}
                    value={editingBlogPost.data.summary}
                    onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, summary: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none resize-none font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Nội dung chi tiết (Markdown / Văn bản)</label>
                  </div>
                  <RichTextEditor
                    placeholder="Nhập nội dung chi tiết bài viết..."
                    value={editingBlogPost.data.content || ""}
                    onChange={(value) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, content: value } } : null)}
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseBlogEditor}
                    className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveBlogDraft}
                    disabled={isSavingContent}
                    className="bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lưu nháp</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    {isSavingContent ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Lưu & Xuất bản</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Unsaved-changes exit prompt */}
            {showBlogExitPrompt && (
              <div className="fixed inset-0 z-[60] bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-sm w-full p-6 text-left space-y-4">
                  <h4 className="font-serif font-bold text-base text-stone-950">Bài viết chưa được lưu</h4>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Bạn có thay đổi chưa lưu. Bạn muốn lưu lại thành bản nháp trước khi thoát không?
                  </p>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveBlogDraft}
                      disabled={isSavingContent}
                      className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      {isSavingContent ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                      Lưu nháp & Thoát
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowBlogExitPrompt(false); setEditingBlogPost(null); }}
                      className="w-full bg-white border border-stone-200 hover:bg-red-50 hover:text-red-600 text-stone-700 font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all"
                    >
                      Thoát không lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBlogExitPrompt(false)}
                      className="w-full text-stone-500 hover:text-stone-800 font-bold text-xs py-2 rounded-xl cursor-pointer transition-all"
                    >
                      Tiếp tục viết
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CMS: EDIT IMAGE MODAL */}
        {editingImage && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-stone-150 max-w-md w-full shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-stone-150 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif font-bold text-lg text-stone-950">
                  {editingImage.isNew ? "Thêm Hình Ảnh Hoạt Động" : "Sửa Hình Ảnh"}
                </h3>
                <button
                  onClick={() => setEditingImage(null)}
                  className="p-1.5 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveImage} className="p-6 space-y-4 text-left text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tiêu đề ảnh</label>
                  <input
                    type="text"
                    required
                    value={editingImage.data.title}
                    onChange={(e) => setEditingImage(prev => prev ? { ...prev, data: { ...prev.data, title: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Danh mục hiển thị</label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: nhà máy, sản phẩm, sự kiện..."
                    value={editingImage.data.category}
                    onChange={(e) => setEditingImage(prev => prev ? { ...prev, data: { ...prev.data, category: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hình ảnh hoạt động (Chọn file từ máy hoặc điền URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={editingImage.data.image}
                      onChange={(e) => setEditingImage(prev => prev ? { ...prev, data: { ...prev.data, image: e.target.value } } : null)}
                      className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none font-mono text-[11px]"
                    />
                    <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none">
                      {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-green" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await handleImageUpload(file);
                              setEditingImage(prev => prev ? { ...prev, data: { ...prev.data, image: url } } : null);
                            } catch (err: any) {
                              alert("Lỗi tải ảnh lên: " + err.message);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Mô tả ngắn</label>
                  <input
                    type="text"
                    value={editingImage.data.description || ""}
                    onChange={(e) => setEditingImage(prev => prev ? { ...prev, data: { ...prev.data, description: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="p-4 border-t border-stone-150 bg-stone-50 flex gap-3 justify-end -mx-6 -mb-6 pt-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingImage(null)}
                    className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    {isSavingContent ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Lưu ảnh</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* CMS: EDIT PRODUCT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-stone-100 flex flex-col">
            <div className="px-5 sm:px-8 py-4 border-b border-stone-200 flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={handleCloseProductEditor}
                  className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-green transition-colors cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Quay lại danh sách
                </button>
                <span className="w-px h-5 bg-stone-200 hidden sm:block" />
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-950 truncate">
                  {editingProduct.isNew ? "Thêm Sản Phẩm Mới" : "Sửa Sản Phẩm"}
                </h3>
              </div>
              <button
                type="submit"
                form="product-editor-form"
                className="flex items-center gap-1.5 bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                Lưu sản phẩm
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form id="product-editor-form" onSubmit={handleSaveProduct} className="max-w-3xl mx-auto p-5 sm:p-8 space-y-4 text-left text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tên sản phẩm</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.data.title}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, title: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Danh mục</label>
                    <select
                      value={editingProduct.data.category}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, category: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none cursor-pointer font-bold"
                    >
                      <option value="facial-care">Chăm sóc mặt (facial-care)</option>
                      <option value="body-care">Chăm sóc cơ thể (body-care)</option>
                      <option value="hair-care">Chăm sóc tóc (hair-care)</option>
                      <option value="lip-care">Chăm sóc môi (lip-care)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Phòng LAB phát triển</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.data.lab}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, lab: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Loại da phù hợp (cách nhau bằng dấu phẩy)</label>
                    <input
                      type="text"
                      value={editingProduct.data.skinTypes ? editingProduct.data.skinTypes.join(", ") : ""}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, skinTypes: e.target.value.split(",").map(s => s.trim()) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Số sao (Rating, ví dụ: 5)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.rating}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, rating: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Điểm đánh giá (ví dụ: 4.8)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={editingProduct.data.ratingValue}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, ratingValue: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Số lượt đánh giá (Reviews)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.reviewsCount}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, reviewsCount: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Giá khoảng (ví dụ: 60-160k)</label>
                    <input
                      type="text"
                      value={editingProduct.data.priceRange || ""}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, priceRange: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Nhãn nổi bật (Badge, ví dụ: "HOT" hoặc trống)</label>
                    <input
                      type="text"
                      value={editingProduct.data.badge || ""}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, badge: e.target.value } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Lượt thử nghiệm lâm sàng (ví dụ: 150)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.testedCount}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, testedCount: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">% Mức độ HOT (ví dụ: 89)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.hotPercent}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, hotPercent: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hình ảnh sản phẩm (Chọn file từ máy hoặc điền URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingProduct.data.image}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, image: e.target.value } } : null)}
                      className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                    <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none">
                      {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-green" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await handleImageUpload(file);
                              setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, image: url } } : null);
                            } catch (err: any) {
                              alert("Lỗi tải ảnh lên: " + err.message);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Mô tả ngắn sản phẩm</label>
                  <textarea
                    required
                    rows={2}
                    value={editingProduct.data.description}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, description: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Thành phần chi tiết</label>
                  <textarea
                    required
                    rows={2}
                    value={editingProduct.data.ingredients}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, ingredients: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hướng dẫn sử dụng</label>
                  <textarea
                    required
                    rows={2}
                    value={editingProduct.data.guidelines}
                    onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, guidelines: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                {/* Custom Packaging / Trial Image Manager */}
                <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-emerald-green" />
                        Quản lý mẫu thử & Bao bì từng sản phẩm
                      </h4>
                      <p className="text-[10px] text-stone-500 font-light">Thêm, sửa hoặc xoá các mẫu chai lọ/tuýp chứa mẫu thử cho sản phẩm này.</p>
                    </div>
                    {!newPkg && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewPkg({
                            type: "bottle",
                            name: "",
                            image: "",
                            description: ""
                          });
                          setEditingPkgIdx(null);
                        }}
                        className="bg-emerald-green/10 hover:bg-emerald-green/20 text-emerald-green border border-emerald-green/20 font-bold text-[10px] px-2.5 py-1 rounded-lg cursor-pointer transition-all flex items-center gap-1 shrink-0 select-none"
                      >
                        <Plus className="w-3 h-3" />
                        Thêm bao bì
                      </button>
                    )}
                  </div>

                  {/* Packagings Form Inline */}
                  {newPkg && (
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3.5 shadow-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[11px] text-stone-800 uppercase tracking-wider">
                          {editingPkgIdx !== null ? "✏️ Sửa mẫu bao bì" : "➕ Thêm mẫu bao bì mới"}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewPkg(null);
                            setEditingPkgIdx(null);
                          }}
                          className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-stone-500 uppercase">Loại bao bì</label>
                          <select
                            value={newPkg.type}
                            onChange={(e) => setNewPkg(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-green"
                          >
                            <option value="bottle">Chai (bottle)</option>
                            <option value="jar">Hũ (jar)</option>
                            <option value="tube">Tuýp (tube)</option>
                            <option value="dropper">Ống nhỏ giọt (dropper)</option>
                            <option value="sachet">Gói (sachet)</option>
                          </select>
                        </div>

                        {newPkg.image && (
                          <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-2 h-14">
                            <img
                              src={newPkg.image}
                              alt="Preview"
                              className="h-10 w-10 object-cover rounded bg-stone-50 border border-stone-100"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-[10px] text-stone-400 truncate flex-1 font-mono">
                              Ảnh đã chọn
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-stone-500 uppercase">Hình ảnh mẫu thử (Chọn file hoặc điền URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            placeholder="https://..."
                            value={newPkg.image}
                            onChange={(e) => setNewPkg(prev => prev ? { ...prev, image: e.target.value } : null)}
                            className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-green font-mono text-[10px]"
                          />
                          <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none font-sans">
                            {isUploading ? <RefreshCw className="w-3 h-3 animate-spin text-emerald-green" /> : <Upload className="w-3 h-3" />}
                            <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const url = await handleImageUpload(file);
                                    setNewPkg(prev => prev ? { ...prev, image: url } : null);
                                  } catch (err: any) {
                                    alert("Lỗi tải ảnh lên: " + err.message);
                                  }
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setNewPkg(null);
                            setEditingPkgIdx(null);
                          }}
                          className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-[10px] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newPkg.image) {
                              alert("Vui lòng điền đầy đủ hoặc tải lên ảnh bao bì!");
                              return;
                            }
                            // Save into editingProduct's packagings
                            setEditingProduct(prev => {
                              if (!prev) return null;
                              let currentPackagings = prev.data.packagings || [];
                              if (currentPackagings.length === 0) {
                                // Fallback default packagings if empty
                                currentPackagings = getDefaultPackagings(prev.data);
                              }
                              let updated = [...currentPackagings];
                              const savedPkg = {
                                ...newPkg,
                                name: newPkg.name || getPackagingTypeLabel(newPkg.type),
                                description: newPkg.description || ""
                              };
                              if (editingPkgIdx !== null) {
                                updated[editingPkgIdx] = savedPkg;
                              } else {
                                updated.push(savedPkg);
                              }
                              return { ...prev, data: { ...prev.data, packagings: updated } };
                            });
                            setNewPkg(null);
                            setEditingPkgIdx(null);
                          }}
                          className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-[10px] px-4 py-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>{editingPkgIdx !== null ? "Lưu thay đổi" : "Xác nhận thêm"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Existing Packagings list */}
                  {(() => {
                    let currentPackagings = editingProduct.data.packagings;
                    if (!currentPackagings || currentPackagings.length === 0) {
                      currentPackagings = getDefaultPackagings(editingProduct.data);
                    }
                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[350px] overflow-y-auto pr-1">
                        {currentPackagings.map((pkg: any, idx: number) => (
                          <div key={idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-2.5 flex flex-col hover:border-emerald-green/30 transition-all text-xs font-sans relative group">
                            <div className="aspect-square w-full rounded-xl overflow-hidden border border-stone-200 bg-white mb-2 relative">
                              {pkg.image ? (
                                <img 
                                  src={pkg.image} 
                                  alt={pkg.name || "packaging"} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full rounded-lg bg-stone-100 text-stone-400 flex items-center justify-center text-[9px] font-bold">
                                  Không có ảnh
                                </div>
                              )}
                              
                              {/* Hover quick overlay for fast actions too */}
                              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                <span className="bg-white/95 backdrop-blur-3xs text-[9px] font-bold text-stone-700 px-2 py-0.5 rounded shadow-xs">
                                  {getPackagingTypeLabel(pkg.type)}
                                </span>
                              </div>
                            </div>

                            {/* Permanently visible label & action footer */}
                            <div className="flex items-center justify-between mt-auto pt-1 border-t border-stone-200/60">
                              <span className="text-[10px] font-bold text-stone-600 bg-stone-200/60 px-1.5 py-0.5 rounded truncate max-w-[70px]" title={getPackagingTypeLabel(pkg.type)}>
                                {getPackagingTypeLabel(pkg.type)}
                              </span>
                              <div className="flex gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewPkg({ ...pkg });
                                    setEditingPkgIdx(idx);
                                  }}
                                  className="p-1 bg-white border border-stone-200 hover:border-emerald-green hover:text-emerald-green rounded-lg text-stone-500 transition-all shadow-3xs cursor-pointer"
                                  title="Sửa mẫu bao bì"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteConfirm({
                                      title: "Xóa mẫu bao bì",
                                      message: "Bạn có chắc chắn muốn xóa mẫu bao bì này?",
                                      onConfirm: () => {
                                        setEditingProduct(prev => {
                                          if (!prev) return null;
                                          let list = prev.data.packagings || [];
                                          if (list.length === 0) {
                                            list = getDefaultPackagings(prev.data);
                                          }
                                          const updated = list.filter((_: any, i: number) => i !== idx);
                                          return { ...prev, data: { ...prev.data, packagings: updated } };
                                        });
                                        setDeleteConfirm(null);
                                      }
                                    });
                                  }}
                                  className="p-1 bg-white border border-stone-200 hover:border-red-500 hover:text-red-600 rounded-lg text-stone-500 transition-all shadow-3xs cursor-pointer"
                                  title="Xóa mẫu bao bì"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseProductEditor}
                    className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    {isSavingContent ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Lưu sản phẩm</span>
                  </button>
                </div>
              </form>
            </div>

            {showProductExitPrompt && (
              <div className="fixed inset-0 z-[60] bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-sm w-full p-6 text-left space-y-4">
                  <h4 className="font-serif font-bold text-base text-stone-950">Thay đổi chưa được lưu</h4>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Bạn có thay đổi chưa lưu ở sản phẩm này. Bạn có chắc muốn thoát?
                  </p>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => { setShowProductExitPrompt(false); setEditingProduct(null); }}
                      className="w-full bg-white border border-stone-200 hover:bg-red-50 hover:text-red-600 text-stone-700 font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all"
                    >
                      Thoát không lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductExitPrompt(false)}
                      className="w-full text-stone-500 hover:text-stone-800 font-bold text-xs py-2 rounded-xl cursor-pointer transition-all"
                    >
                      Tiếp tục chỉnh sửa
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CMS: EDIT PARTNER LOGO MODAL */}
        {editingPartnerLogo && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-stone-150 max-w-xs w-full shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-stone-150 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif font-bold text-sm text-stone-950">
                  {editingPartnerLogo.isNew ? "Thêm Đối Tác Mới" : "Sửa Đối Tác"}
                </h3>
                <button
                  onClick={() => setEditingPartnerLogo(null)}
                  className="p-1 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePartnerLogo} className="p-5 space-y-4 text-left text-xs">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tên đối tác / Thương hiệu</label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: Luxury Spa Group"
                    value={editingPartnerLogo.data.name}
                    onChange={(e) => setEditingPartnerLogo(prev => prev ? { ...prev, data: { ...prev.data, name: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Phân loại / Mô tả</label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: Thương hiệu Spa cao cấp"
                    value={editingPartnerLogo.data.type}
                    onChange={(e) => setEditingPartnerLogo(prev => prev ? { ...prev, data: { ...prev.data, type: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hình ảnh Logo đối tác (Tùy chọn - Chọn file hoặc điền URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Có thể upload file bên cạnh hoặc điền link..."
                      value={editingPartnerLogo.data.image || ""}
                      onChange={(e) => setEditingPartnerLogo(prev => prev ? { ...prev, data: { ...prev.data, image: e.target.value } } : null)}
                      className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none font-mono text-[11px]"
                    />
                    <label className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0 select-none">
                      {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-green" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{isUploading ? "Đang tải..." : "Tải lên"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await handleImageUpload(file);
                              setEditingPartnerLogo(prev => prev ? { ...prev, data: { ...prev.data, image: url } } : null);
                            } catch (err: any) {
                              alert("Lỗi tải ảnh lên: " + err.message);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="p-4 border-t border-stone-150 bg-stone-50 flex gap-2 justify-end -mx-5 -mb-5 pt-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingPartnerLogo(null)}
                    className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1 shadow-2xs"
                  >
                    {isSavingContent ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    <span>Lưu đối tác</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {deleteConfirm && (
          <div className="fixed inset-0 z-55 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-stone-150 max-w-xs w-full shadow-2xl p-6 space-y-4 text-center"
            >
              <div className="mx-auto w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-stone-950">
                  {deleteConfirm.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {deleteConfirm.message}
                </p>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={deleteConfirm.onConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all shadow-2xs"
                >
                  Xác nhận xóa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
