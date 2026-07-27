import { BookOpen, Sparkles, Image, Settings, Users, LogOut } from "lucide-react";

export default function Sidebar({ activeTab, onTabChange, onLogout }: { activeTab: string, onTabChange: (tab: string) => void, onLogout: () => void }) {
  const menuItems = [
    { id: "articles", label: "Bài viết", icon: BookOpen },
    { id: "products", label: "Sản phẩm", icon: Sparkles },
    { id: "images", label: "Hình ảnh", icon: Image },
    { id: "users", label: "Người dùng", icon: Users },
  ];

  return (
    <div className="w-64 bg-stone-950 text-stone-300 flex flex-col h-full border-r border-stone-800">
      <div className="p-6 font-serif font-bold text-xl text-white">Cosbuilt Admin</div>
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id 
                ? "bg-emerald-green text-white shadow-lg" 
                : "hover:bg-stone-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-stone-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-900/20 hover:text-red-400 transition-all">
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
