import React from 'react';
import RichTextEditor from './RichTextEditor';

interface PostEditorProps {
  post: any;
  onChange: (post: any) => void;
  onSave: () => void;
}

export default function PostEditor({ post, onChange, onSave }: PostEditorProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-4">
        <input 
          type="text"
          placeholder="Tiêu đề bài viết"
          value={post.title || ""}
          onChange={(e) => onChange({ ...post, title: e.target.value })}
          className="w-full text-xl font-bold border border-stone-300 rounded-lg p-3"
        />
        <RichTextEditor
          value={post.content || ""}
          onChange={(value) => onChange({ ...post, content: value })}
        />
      </div>
      <div className="col-span-1 space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-left">
        <h4 className="font-bold text-sm">Cài đặt bài viết</h4>
        
        <label className="block text-xs font-bold text-stone-500">Trạng thái</label>
        <select value={post.status || "draft"} onChange={(e) => onChange({ ...post, status: e.target.value })} className="w-full text-xs border p-2 rounded">
          <option value="draft">Nháp</option>
          <option value="published">Xuất bản</option>
        </select>

        <label className="block text-xs font-bold text-stone-500">Ngày xuất bản</label>
        <input type="date" value={post.date || ""} onChange={(e) => onChange({ ...post, date: e.target.value })} className="w-full text-xs border p-2 rounded" />
        
        <label className="block text-xs font-bold text-stone-500">Đường dẫn bài viết (URL / Slug)</label>
        <div className="flex items-center rounded-lg border border-stone-300 bg-white overflow-hidden focus-within:border-emerald-green">
          <span className="bg-stone-100 text-stone-500 text-[11px] font-mono px-2.5 py-2 border-r border-stone-200 shrink-0 select-none">
            https://cosbuilt.vn/
          </span>
          <input 
            type="text" 
            placeholder="cam-nang-quy-trinh-dang-ky..." 
            value={(post.slug || post.url || "").replace(/^https?:\/\/cosbuilt\.vn\//, "")} 
            onChange={(e) => {
              const val = e.target.value.replace(/^https?:\/\/cosbuilt\.vn\//, "");
              onChange({ ...post, slug: val, url: val ? `https://cosbuilt.vn/${val}` : "" });
            }} 
            className="w-full text-xs p-2 focus:outline-none font-mono" 
          />
        </div>
        
        <label className="block text-xs font-bold text-stone-500">Tác giả</label>
        <input type="text" value={post.author || ""} onChange={(e) => onChange({ ...post, author: e.target.value })} className="w-full text-xs border p-2 rounded" />
        
        <label className="block text-xs font-bold text-stone-500">Danh mục</label>
        <select 
          value={post.category || "cẩm nang"} 
          onChange={(e) => onChange({ ...post, category: e.target.value })} 
          className="w-full text-xs border border-stone-300 rounded p-2 bg-white cursor-pointer font-semibold focus:outline-none focus:border-emerald-green"
        >
          <option value="cẩm nang">📖 Cẩm nang gia công</option>
          <option value="xu hướng">📈 Xu hướng nguyên liệu</option>
        </select>
        
        <label className="block text-xs font-bold text-stone-500">Thẻ</label>
        <input type="text" placeholder="Nhập thẻ..." value={post.tags || ""} onChange={(e) => onChange({ ...post, tags: e.target.value })} className="w-full text-xs border p-2 rounded" />

        <button onClick={onSave} className="w-full bg-emerald-green text-white font-bold py-2 rounded-lg text-xs mt-4">Lưu bài viết</button>
      </div>
    </div>
  );
}
