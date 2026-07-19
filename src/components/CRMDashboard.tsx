import { useState, useEffect, FormEvent } from "react";
import { 
  Users, 
  Search, 
  FileSpreadsheet, 
  RefreshCw, 
  Database, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  XCircle, 
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
  Sparkles,
  ArrowUpToLine,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  deleteSheetRow 
} from "../lib/sheetsService";

interface CRMDashboardProps {
  customBlogPosts: any[];
  customImages: any[];
  customLogos: any[];
  websiteLogo: any;
  customProducts: any[];
  sheetsConfig: any;
  setCustomBlogPosts: (posts: any[]) => void;
  setCustomImages: (images: any[]) => void;
  setCustomLogos: (logos: any[]) => void;
  setWebsiteLogo: (logo: any) => void;
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
  customProducts,
  sheetsConfig,
  setCustomBlogPosts,
  setCustomImages,
  setCustomLogos,
  setWebsiteLogo,
  setCustomProducts,
  setSheetsConfig,
  onTabChange,
  onLogin,
  onLogout
}: CRMDashboardProps) {
  // Admin Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("cosbuilt_admin_logged_in") === "true";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Default account as admin / 1234
    if (usernameInput.trim().toLowerCase() === "admin" && passwordInput.trim() === "1234") {
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
    localStorage.removeItem("cosbuilt_admin_logged_in");
    setUsernameInput("");
    setPasswordInput("");
    if (onLogout) onLogout();
  };

  // Modals & State for CRUD
  const [editingBlogPost, setEditingBlogPost] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [editingImage, setEditingImage] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [editingProduct, setEditingProduct] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [editingPartnerLogo, setEditingPartnerLogo] = useState<{ index: number; isNew: boolean; data: any } | null>(null);
  const [isEditingWebsiteLogo, setIsEditingWebsiteLogo] = useState(false);
  const [tempWebsiteLogo, setTempWebsiteLogo] = useState({ 
    name: websiteLogo?.name || "COSBUILT", 
    slogan: websiteLogo?.slogan || "ESTD 1999",
    image: websiteLogo?.image || ""
  });
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [isSavingContent, setIsSavingContent] = useState(false);

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

  // Sync / Save dynamic changes helper
  const saveAllContent = async (
    payload: { articles?: any[]; images?: any[]; logos?: any[]; websiteLogo?: any; products?: any[] },
    actionInfo?: { action: "add" | "update" | "delete"; sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm"; index?: number; data?: any }
  ) => {
    setIsSavingContent(true);
    setActionMessage({ text: "Đang lưu thay đổi vào hệ thống...", type: "" });
    try {
      // 1. Save locally to server database cache first
      const res = await fetch("/api/sheets/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          if (payload.articles !== undefined) setCustomBlogPosts(result.data.articles);
          if (payload.images !== undefined) setCustomImages(result.data.images);
          if (payload.logos !== undefined) setCustomLogos(result.data.logos);
          if (payload.websiteLogo !== undefined) setWebsiteLogo(result.data.websiteLogo);
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
                  data.guidelines || ""
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

  const handleSaveBlogPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingBlogPost) return;
    const { index, isNew, data } = editingBlogPost;
    let newPosts = [...customBlogPosts];
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
      setEditingBlogPost(null);
    }
  };

  const handleDeleteBlogPost = async (index: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;
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
    if (!window.confirm("Bạn có chắc chắn muốn xóa hình ảnh này không?")) return;
    let newImages = [...customImages];
    const deletedItem = newImages[index];
    newImages.splice(index, 1);
    await saveAllContent({ images: newImages }, { action: "delete", sheetName: "Hình ảnh", index, data: deletedItem });
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
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (index: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
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
    if (!window.confirm("Bạn có chắc chắn muốn xóa đối tác này không?")) return;
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

  const [activeSubTab, setActiveSubTab] = useState<"leads" | "sheets" | "content">("leads");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sheet sync states
  const [sheetInput, setSheetInput] = useState(sheetsConfig.spreadsheetId || "");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
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
            headers: { "Content-Type": "application/json" },
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
      const res = await fetch("/api/leads");
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

  useEffect(() => {
    fetchLeads();
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
        headers: { "Content-Type": "application/json" },
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
    if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu tư vấn này không?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
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
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
            headers: { "Content-Type": "application/json" },
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

  // Filters leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.brandName && lead.brandName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                  type="password"
                  required
                  placeholder="Nhập mật khẩu quản trị"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:border-emerald-green focus:outline-none transition-all"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-600 text-xs font-semibold bg-red-50 border border-red-100 p-3 rounded-xl leading-snug">
                ⚠️ {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer tracking-wider uppercase"
            >
              <span>Đăng nhập hệ thống</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Info banner with user credentials helper */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100/60 text-[11px] text-amber-800 leading-normal flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Tài khoản đăng nhập quản trị viên:</strong><br />
              • Tên đăng nhập: <code className="font-mono bg-white/80 px-1 py-0.5 rounded font-bold">admin</code><br />
              • Mật khẩu: <code className="font-mono bg-white/80 px-1 py-0.5 rounded font-bold">1234</code>
            </div>
          </div>

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
          { id: "content", label: "BIÊN TẬP NỘI DUNG (CMS)", icon: Layers }
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
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-150">
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

              <div className="flex gap-2 w-full sm:w-auto shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-44 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Chờ xử lý">Chờ xử lý</option>
                  <option value="Đang liên hệ">Đang liên hệ</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Hủy">Đã hủy</option>
                </select>
              </div>
            </div>

            {/* Leads Table Card */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-3xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-50/70 border-b border-stone-150 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-6">Khách Hàng</th>
                      <th className="py-4 px-6">Thông Tin Liên Hệ</th>
                      <th className="py-4 px-6">Yêu Cầu Gia Công</th>
                      <th className="py-4 px-6">Lời Nhắn / Ghi Chú Admin</th>
                      <th className="py-4 px-6">Trạng Thái</th>
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
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-stone-900">{lead.name}</div>
                            {lead.brandName && (
                              <div className="text-emerald-green text-[11px] font-medium mt-0.5">
                                TH: {lead.brandName}
                              </div>
                            )}
                            <div className="text-stone-400 text-[10px] mt-1">
                              {new Date(lead.createdAt).toLocaleDateString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-mono text-stone-800 font-medium">{lead.phone}</div>
                            {lead.email && <div className="text-stone-500 text-xs mt-0.5">{lead.email}</div>}
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-medium text-stone-800">{lead.category}</div>
                            <div className="text-stone-500 text-[11px] mt-0.5">SL: {lead.moq} sản phẩm</div>
                          </td>
                          <td className="py-4 px-6 max-w-xs">
                            <div className="truncate text-stone-600 mb-1" title={lead.message}>
                              {lead.message || <span className="text-stone-300 italic">Không có lời nhắn</span>}
                            </div>
                            {lead.notes && (
                              <div className="bg-emerald-green/5 border border-emerald-green/10 text-emerald-green-dark p-1.5 rounded-md text-[11px] leading-normal">
                                <strong>Ghi chú admin:</strong> {lead.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {getStatusBadge(lead.status)}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleSelectLead(lead)}
                                className="p-2 text-stone-500 hover:text-emerald-green hover:bg-emerald-green-light rounded-lg transition-colors cursor-pointer"
                                title="Xem chi tiết & Cập nhật"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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

                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-3xs space-y-4">
                  <h4 className="font-serif font-bold text-sm text-stone-950">Ưu điểm của đồng bộ trực tiếp (OAuth API)</h4>
                  <div className="space-y-3.5">
                    {[
                      { title: "Bảo mật & Trực tiếp", desc: "Không cần triển khai các Web App công khai hay lộ mã nguồn. Mọi thao tác đều được bảo vệ bởi giao thức Google OAuth." },
                      { title: "Đồng bộ thời gian thực", desc: "Khi bạn Thêm, Sửa hoặc Xóa bài viết/hình ảnh trong phần 'Quản lý Nội dung', hệ thống sẽ tự động gửi cập nhật và ghi trực tiếp lên Sheet của bạn ngay lập tức." },
                      { title: "Tiết kiệm thời gian", desc: "Không cần am hiểu kỹ thuật để cấu hình các tiện ích mở rộng phức tạp. Chỉ cần 1 click và sẵn sàng vận hành." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-left">
                        <div className="w-5 h-5 bg-emerald-green-light text-emerald-green-dark rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="font-bold text-xs text-stone-900">{item.title}</h5>
                          <p className="text-stone-500 text-[11px] leading-relaxed font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
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

            {/* 1. Main Website Logo Config Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-3xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-green" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">Logo & Slogan chính của Website</h3>
                </div>
                {!isEditingWebsiteLogo ? (
                  <button
                    onClick={() => {
                      setTempWebsiteLogo({
                        name: websiteLogo?.name || "COSBUILT",
                        slogan: websiteLogo?.slogan || "ESTD 1999",
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
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Tên hiển thị (Logo Text)</label>
                      <input
                        type="text"
                        value={tempWebsiteLogo.name}
                        onChange={(e) => setTempWebsiteLogo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Slogan / Năm thành lập</label>
                      <input
                        type="text"
                        value={tempWebsiteLogo.slogan}
                        onChange={(e) => setTempWebsiteLogo(prev => ({ ...prev, slogan: e.target.value }))}
                        className="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                      />
                    </div>
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
                      <div className="text-[10px] font-bold text-stone-400 mt-1 uppercase tracking-widest">{websiteLogo?.slogan || "— ESTD 1999 —"}</div>
                    </div>
                  </div>
                  <div className="text-xs text-stone-500 font-light max-w-sm text-left">
                    Tên thương hiệu, slogan và hình ảnh logo này sẽ được cập nhật đồng bộ ở đầu trang menu (Navbar) cho khách truy cập website.
                  </div>
                </div>
              )}
            </div>

            {/* 2. Synced Articles Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-green" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">Danh Sách Bài Viết (Tin tức & Xu hướng)</h3>
                  <span className="bg-emerald-green-light text-emerald-green-dark font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                    {customBlogPosts.length} bài viết
                  </span>
                </div>
                <button
                  onClick={() => setEditingBlogPost({
                    index: -1,
                    isNew: true,
                    data: {
                      title: "",
                      category: "cẩm nang",
                      summary: "",
                      content: "",
                      date: new Date().toLocaleDateString("vi-VN"),
                      author: "Cosbuilt",
                      image: ""
                    }
                  })}
                  className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-3xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm Bài Viết
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customBlogPosts.map((post, index) => (
                  <div key={index} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 hover:shadow-2xs transition-all relative group">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4a5a3?q=80&w=400"} 
                      alt={post.title} 
                      className="w-24 h-24 object-cover rounded-xl bg-stone-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-emerald-green uppercase tracking-wider block bg-emerald-green-light px-2 py-0.5 rounded w-fit">
                        {post.category}
                      </span>
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1 pr-14">{post.title}</h4>
                      <p className="text-stone-500 text-[11px] leading-snug line-clamp-2 font-light">{post.summary}</p>
                      <div className="flex items-center gap-3 text-[10px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span>·</span>
                        <span>Tác giả: {post.author || "Cosbuilt"}</span>
                      </div>
                    </div>

                    {/* CRUD hover overlay controls */}
                    <div className="absolute top-3 right-3 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-200/60 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-150">
                      <button
                        onClick={() => setEditingBlogPost({ index, isNew: false, data: { ...post } })}
                        className="p-1 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"
                        title="Sửa bài"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(index)}
                        className="p-1 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"
                        title="Xóa bài"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Synced Images Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                <div className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-emerald-green" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">Thư Viện Ảnh Hoạt Động (Gallery)</h3>
                  <span className="bg-emerald-green-light text-emerald-green-dark font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                    {customImages.length} hình ảnh
                  </span>
                </div>
                <button
                  onClick={() => setEditingImage({
                    index: -1,
                    isNew: true,
                    data: {
                      title: "",
                      category: "nhà máy",
                      image: "",
                      description: ""
                    }
                  })}
                  className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-3xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm Hình Ảnh
                </button>
              </div>

              {customImages.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                  Chưa có hình ảnh nào. Hãy thêm ảnh mới để hiển thị trong Album Hoạt Động.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {customImages.map((img, index) => (
                    <div key={index} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-3xs group relative">
                      <div className="aspect-video relative bg-stone-100 overflow-hidden">
                        <img 
                          src={img.image} 
                          alt={img.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 bg-stone-900/70 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {img.category}
                        </span>

                        {/* Action controls */}
                        <div className="absolute top-2 right-2 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-200/60 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-150">
                          <button
                            onClick={() => setEditingImage({ index, isNew: false, data: { ...img } })}
                            className="p-1 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"
                            title="Sửa ảnh"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="p-1 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"
                            title="Xóa ảnh"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 space-y-0.5 text-left">
                        <h5 className="font-bold text-xs text-stone-950 truncate">{img.title}</h5>
                        {img.description && (
                          <p className="text-stone-500 text-[10px] truncate font-light">{img.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Synced Products Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-green" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">Danh Sách Sản Phẩm (Mẫu Thử Gia Công)</h3>
                  <span className="bg-emerald-green-light text-emerald-green-dark font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                    {customProducts.length} sản phẩm
                  </span>
                </div>
                <button
                  onClick={() => setEditingProduct({
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
                  })}
                  className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-3xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm Sản Phẩm
                </button>
              </div>

              {customProducts.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                  Chưa có sản phẩm nào. Hãy thêm sản phẩm mới để hiển thị trong mục mẫu thử gia công.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customProducts.map((prod, index) => (
                    <div key={index} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 hover:shadow-2xs transition-all relative group">
                      <img 
                        src={prod.image || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400"} 
                        alt={prod.title} 
                        className="w-20 h-20 object-cover rounded-xl bg-stone-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1 flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5">
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
                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="text-stone-900 font-bold text-xs">
                            {prod.price ? prod.price.toLocaleString("vi-VN") : "0"}đ
                          </span>
                          {prod.originalPrice > prod.price && (
                            <span className="text-stone-400 line-through text-[10px]">
                              {prod.originalPrice ? prod.originalPrice.toLocaleString("vi-VN") : "0"}đ
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action controls */}
                      <div className="absolute top-3 right-3 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-200/60 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-150">
                        <button
                          onClick={() => setEditingProduct({ index, isNew: false, data: { ...prod } })}
                          className="p-1 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"
                          title="Sửa sản phẩm"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(index)}
                          className="p-1 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Partner Logos Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-stone-150 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-green" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">Danh Sách Đối Tác & Thương Hiệu</h3>
                  <span className="bg-emerald-green-light text-emerald-green-dark font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                    {customLogos.length} đối tác
                  </span>
                </div>
                <button
                  onClick={() => setEditingPartnerLogo({ index: -1, isNew: true, data: { name: "", type: "" } })}
                  className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-3xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm Đối Tác
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {customLogos.map((logo, index) => (
                  <div key={index} className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between relative group hover:border-emerald-green transition-all shadow-3xs">
                    <div className="space-y-1 text-left">
                      <h5 className="font-bold text-xs text-stone-900 pr-12 truncate">{logo.name}</h5>
                      <span className="text-[10px] text-stone-400 block truncate">{logo.type}</span>
                    </div>
                    
                    <div className="absolute top-2.5 right-2.5 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-150 opacity-0 group-hover:opacity-100 transition-all duration-150">
                      <button
                        onClick={() => setEditingPartnerLogo({ index, isNew: false, data: { ...logo } })}
                        className="p-1 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"
                        title="Sửa đối tác"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeletePartnerLogo(index)}
                        className="p-1 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"
                        title="Xóa đối tác"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
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
                    "{selectedLead.message || "Không có nội dung lời nhắn đi kèm."}"
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
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-stone-150 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-stone-150 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif font-bold text-lg text-stone-950">
                  {editingBlogPost.isNew ? "Thêm Bài Viết Mới" : "Sửa Bài Viết"}
                </h3>
                <button
                  onClick={() => setEditingBlogPost(null)}
                  className="p-1.5 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveBlogPost} className="flex-1 overflow-y-auto p-6 space-y-4 text-left text-xs sm:text-sm">
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
                      <option value="cẩm nang">📖 Cẩm nang</option>
                      <option value="xu hướng">📈 Xu hướng</option>
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
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Nội dung chi tiết (Markdown / Văn bản)</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Nhập nội dung chi tiết bài viết..."
                    value={editingBlogPost.data.content}
                    onChange={(e) => setEditingBlogPost(prev => prev ? { ...prev, data: { ...prev.data, content: e.target.value } } : null)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none resize-none font-light font-mono text-[11px]"
                  />
                </div>

                <div className="p-4 border-t border-stone-150 bg-stone-50 flex gap-3 justify-end -mx-6 -mb-6">
                  <button
                    type="button"
                    onClick={() => setEditingBlogPost(null)}
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
                    <span>Lưu bài viết</span>
                  </button>
                </div>
              </form>
            </motion.div>
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
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-stone-150 max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-stone-150 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif font-bold text-lg text-stone-950">
                  {editingProduct.isNew ? "Thêm Sản Phẩm Mới" : "Sửa Sản Phẩm"}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4 text-left text-xs sm:text-sm">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Giá gốc (đ, ví dụ: 250000)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.originalPrice}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, originalPrice: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Giá khuyến mãi (đ)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.price}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, price: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">% Giảm giá (ví dụ: 15)</label>
                    <input
                      type="number"
                      step="1"
                      required
                      value={editingProduct.data.discountPercent}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, data: { ...prev.data, discountPercent: Number(e.target.value) } } : null)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:border-emerald-green focus:outline-none"
                    />
                  </div>
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

                <div className="p-4 border-t border-stone-150 bg-stone-50 flex gap-2 justify-end -mx-6 -mb-6 pt-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
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
                    <span>Lưu sản phẩm</span>
                  </button>
                </div>
              </form>
            </motion.div>
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
      </AnimatePresence>
      </div>
    </div>
  );
}
