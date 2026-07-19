import { useState, useEffect } from "react";
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
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CRMDashboardProps {
  customBlogPosts: any[];
  customImages: any[];
  sheetsConfig: any;
  setCustomBlogPosts: (posts: any[]) => void;
  setCustomImages: (images: any[]) => void;
  setSheetsConfig: (config: any) => void;
  onTabChange: (tab: string) => void;
}

export default function CRMDashboard({
  customBlogPosts,
  customImages,
  sheetsConfig,
  setCustomBlogPosts,
  setCustomImages,
  setSheetsConfig,
  onTabChange
}: CRMDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"leads" | "sheets" | "content">("leads");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sheet sync states
  const [sheetInput, setSheetInput] = useState(sheetsConfig.spreadsheetId || "");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  
  // Selected lead for detail/editing modal
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [isSavingLead, setIsSavingLead] = useState(false);

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

  // Sheets sync action
  const handleSyncSheets = async () => {
    if (!sheetInput.trim()) {
      setSyncMessage({ text: "Vui lòng nhập đường dẫn Google Sheet hợp lệ.", type: "error" });
      return;
    }
    setIsSyncing(true);
    setSyncMessage({ text: "", type: "" });
    try {
      // First save configuration
      const configRes = await fetch("/api/sheets/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadsheetId: sheetInput })
      });
      if (!configRes.ok) throw new Error("Không thể lưu cấu hình");

      // Then trigger sync
      const syncRes = await fetch("/api/sheets/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spreadsheetId: sheetInput })
      });
      const data = await syncRes.json();
      if (syncRes.ok && data.success) {
        setSyncMessage({ 
          text: `Đồng bộ thành công! Đã tải ${data.articlesCount} bài viết và ${data.imagesCount} hình ảnh.`, 
          type: "success" 
        });
        
        // Update parent/local states
        setSheetsConfig({
          spreadsheetId: data.spreadsheetId,
          lastSynced: data.lastSynced,
          hasArticles: data.articlesCount > 0,
          hasImages: data.imagesCount > 0
        });

        // Reload the data from backend
        const dataRes = await fetch("/api/sheets/data");
        if (dataRes.ok) {
          const freshData = await dataRes.json();
          if (freshData.articles && freshData.articles.length > 0) {
            setCustomBlogPosts(freshData.articles);
          }
          if (freshData.images && freshData.images.length > 0) {
            setCustomImages(freshData.images);
          }
        }
      } else {
        setSyncMessage({ text: data.error || "Không thể đồng bộ dữ liệu.", type: "error" });
      }
    } catch (e: any) {
      setSyncMessage({ text: `Lỗi kết nối: ${e.message}`, type: "error" });
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
          { id: "content", label: "BÀI VIẾT & HÌNH ẢNH HIỆN TẠI", icon: Layers }
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
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left pt-2">
            {/* Left: Sync Control Panel */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-green">
                    <FileSpreadsheet className="w-6 h-6" />
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">Đồng Bộ Bài Viết & Thư Viện Ảnh</h3>
                  </div>
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
                    Sử dụng Google Sheets làm hệ quản trị nội dung (CMS) cho website. Bạn có thể dễ dàng đăng bài viết mới hoặc hình ảnh hoạt động của nhà máy.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Đường dẫn (URL) hoặc ID của Google Sheet
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        value={sheetInput}
                        onChange={(e) => setSheetInput(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs.../edit"
                        className="flex-1 border border-stone-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/15 focus:outline-hidden transition-all bg-stone-50/50"
                      />
                      <button
                        onClick={handleSyncSheets}
                        disabled={isSyncing}
                        className="bg-emerald-green hover:bg-emerald-green-dark disabled:bg-stone-400 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {isSyncing ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                        <span>{isSyncing ? "Đang đồng bộ..." : "Đồng Bộ Ngay"}</span>
                      </button>
                    </div>
                  </div>

                  {syncMessage.text && (
                    <div className={`p-4 rounded-xl text-xs flex gap-2 items-start border ${
                      syncMessage.type === "success" 
                        ? "bg-emerald-green/5 border-emerald-green/20 text-emerald-green-dark font-medium" 
                        : "bg-red-50 border-red-100 text-red-700"
                    }`}>
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{syncMessage.text}</span>
                    </div>
                  )}
                </div>

                {/* Connection Status Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-150">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Trạng thái</span>
                    <span className="text-xs font-bold text-stone-800 mt-1 block">
                      {sheetsConfig.spreadsheetId ? "🟢 Đã kết nối" : "⚪ Chưa kết nối"}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Tổng tài nguyên</span>
                    <span className="text-xs font-bold text-stone-800 mt-1 block">
                      {customBlogPosts.length} bài viết | {customImages.length} ảnh
                    </span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-center">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Đồng bộ gần nhất</span>
                    <span className="text-xs font-bold text-stone-800 mt-1 block truncate" title={sheetsConfig.lastSynced || "Chưa đồng bộ"}>
                      {sheetsConfig.lastSynced || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sheet Columns Schema */}
              <div className="bg-stone-900 text-stone-100 p-6 rounded-3xl space-y-4">
                <h4 className="font-serif font-bold text-base flex items-center gap-2 text-emerald-green">
                  <span>Mẫu Cấu Trúc Google Sheet chuẩn</span>
                </h4>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Thiết lập Google Sheet với hai trang tính (sheet) con được đổi tên đúng ký tự sau:
                </p>
                <div className="space-y-4 pt-1 text-xs text-left">
                  <div className="space-y-1.5">
                    <span className="text-emerald-green font-bold text-[10px] uppercase tracking-wider">Trang tính 1: "Bài viết" (Articles)</span>
                    <div className="bg-white/5 p-3 rounded-lg font-mono text-[10px] text-stone-200 overflow-x-auto whitespace-nowrap scrollbar-none border border-white/5">
                      Tiêu đề | Danh mục | Tóm tắt | Nội dung | Ngày | Tác giả | Hình ảnh
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-emerald-green font-bold text-[10px] uppercase tracking-wider">Trang tính 2: "Hình ảnh" (Images)</span>
                    <div className="bg-white/5 p-3 rounded-lg font-mono text-[10px] text-stone-200 overflow-x-auto whitespace-nowrap scrollbar-none border border-white/5">
                      Tiêu đề | Danh mục | Hình ảnh | Mô tả
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Setup Guidance */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-5">
                <h4 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
                  Hướng dẫn thiết lập 5 bước
                </h4>
                
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Mở Google Trang tính", desc: "Tạo một bảng tính Google Sheet trống hoàn toàn mới trong tài khoản Google của bạn." },
                    { step: "2", title: "Đổi tên các Trang tính", desc: "Ở góc dưới màn hình Google Sheet, đổi tên 2 trang tính (sheet) thành: 'Bài viết' và 'Hình ảnh'." },
                    { step: "3", title: "Thiết lập dòng tiêu đề", desc: "Tại dòng 1, nhập chính xác các tên cột mẫu ở ô màu đen bên cạnh làm tiêu đề. Sau đó nhập dữ liệu từ dòng số 2." },
                    { step: "4", title: "Chia sẻ quyền truy cập công khai", desc: "Bấm 'Chia sẻ' (Share) -> Thay đổi quyền truy cập thành 'Bất kỳ ai có liên kết đều có thể xem' (Anyone with link can view)." },
                    { step: "5", title: "Kết nối & Đồng bộ", desc: "Sao chép toàn bộ đường link trình duyệt của Google Sheet dán vào ô bên trái và bấm 'Đồng Bộ Ngay' để lưu dữ liệu lên hệ thống!" }
                  ].map((stepItem, idx) => (
                    <div key={idx} className="flex gap-4 text-left">
                      <div className="w-6 h-6 bg-emerald-green-light text-emerald-green-dark rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {stepItem.step}
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-xs text-stone-900">{stepItem.title}</h5>
                        <p className="text-stone-500 text-[11px] leading-relaxed font-light">{stepItem.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SYNCED CONTENT MANAGER */}
        {activeSubTab === "content" && (
          <div className="space-y-8 text-left">
            {/* Synced Articles Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-150 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-green" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Danh Sách Bài Viết Đã Đồng Bộ</h3>
                <span className="bg-emerald-green-light text-emerald-green-dark font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                  {customBlogPosts.length} bài viết
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customBlogPosts.map((post, index) => (
                  <div key={index} className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-4 hover:shadow-2xs transition-all">
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
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{post.title}</h4>
                      <p className="text-stone-500 text-[11px] leading-snug line-clamp-2 font-light">{post.summary}</p>
                      <div className="flex items-center gap-3 text-[10px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span>·</span>
                        <span>Tác giả: {post.author || "Cosbuilt"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Synced Images Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-stone-150 pb-3">
                <Image className="w-5 h-5 text-emerald-green" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Thư Viện Ảnh Đã Đồng Bộ</h3>
                <span className="bg-emerald-green-light text-emerald-green-dark font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                  {customImages.length} hình ảnh
                </span>
              </div>

              {customImages.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                  Chưa có hình ảnh nào được đồng bộ từ Google Sheet. Tab "ALBUM HOẠT ĐỘNG" hiện đang sử dụng thư viện mẫu.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {customImages.map((img, index) => (
                    <div key={index} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-3xs group">
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
      </AnimatePresence>
      </div>
    </div>
  );
}
