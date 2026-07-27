import { useState } from "react";
import { BookOpen, Calendar, Edit3, Trash2, ChevronLeft, ChevronRight, PlusCircle, Folder, Tag } from "lucide-react";
import PostEditor from "./PostEditor";

export default function ArticleManagement({
  posts,
  searchTerm,
  onEdit,
  onDelete,
  page,
  setPage,
  totalPages,
  onSaveNew
}: {
  posts: any[];
  searchTerm: string;
  onEdit: (post: any, index: number) => void;
  onDelete: (index: number) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onSaveNew: (post: any) => void;
}) {
  const [activeSubTab, setActiveSubTab] = useState<"list" | "add" | "categories" | "tags">("list");
  const [newPost, setNewPost] = useState({});

  const tabs = [
    { id: "list", label: "Tất cả bài viết", icon: BookOpen },
    { id: "add", label: "Thêm bài viết", icon: PlusCircle },
    { id: "categories", label: "Danh mục", icon: Folder },
    { id: "tags", label: "Thẻ", icon: Tag },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-stone-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeSubTab === tab.id
                ? "border-emerald-green text-emerald-green"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === "list" && (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
              Không tìm thấy bài viết nào khớp với từ khóa "{searchTerm}".
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post, index) => (
                  <div key={index} className="bg-white border border-stone-200 rounded-xl p-3 flex gap-3 hover:shadow-sm hover:border-emerald-green/30 transition-all duration-200 relative group">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1556228578-0f85a1a1d596?q=80&w=400"} 
                      alt={post.title} 
                      className="w-20 h-20 object-cover rounded-lg bg-stone-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 flex-1 min-w-0 text-left">
                      <span className="text-[9px] font-bold text-emerald-green uppercase tracking-wider block bg-emerald-green-light px-2 py-0.5 rounded w-fit">
                        {post.category}
                      </span>
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1 pr-10">{post.title}</h4>
                      <p className="text-stone-500 text-[10px] leading-snug line-clamp-2 font-light">{post.summary}</p>
                    </div>

                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150">
                      <button onClick={() => onEdit(post, index)} className="p-1.5 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => onDelete(index)} className="p-1.5 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 pt-4 border-t border-stone-100 mt-6">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 border rounded-lg hover:bg-stone-50"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-xs text-stone-600">{page} / {totalPages}</span>
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 border rounded-lg hover:bg-stone-50"><ChevronRight className="w-4 h-4" /></button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {activeSubTab === "add" && <PostEditor post={newPost} onChange={setNewPost} onSave={() => onSaveNew(newPost)} />}
      {activeSubTab === "categories" && <div className="text-sm">Trang quản lý danh mục</div>}
      {activeSubTab === "tags" && <div className="text-sm">Trang quản lý thẻ</div>}
    </div>
  );
}
