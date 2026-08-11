import { Edit3, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageManagement({
  images,
  searchTerm,
  onEdit,
  onDelete,
  page,
  setPage,
  totalPages
}: {
  images: any[];
  searchTerm: string;
  onEdit: (image: any, index: number) => void;
  onDelete: (index: number) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="text-left">
          <h3 className="font-serif font-bold text-lg text-stone-900">Thư Viện Ảnh Gallery ({images.length})</h3>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 text-stone-400 text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
          Không tìm thấy hình ảnh nào khớp với từ khóa "{searchTerm}".
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={index} className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md hover:border-emerald-green/30 transition-all duration-200 relative group">
                <div className="aspect-square relative bg-stone-100 overflow-hidden">
                  <img 
                    src={img.image} 
                    alt={img.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="origin-when-cross-origin"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 bg-white/95 backdrop-blur-3xs p-1 rounded-lg border border-stone-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-150">
                    <button onClick={() => onEdit(img, index)} className="p-1 hover:bg-stone-100 rounded text-stone-700 hover:text-emerald-green cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                    <button onClick={() => onDelete(index)} className="p-1 hover:bg-red-50 rounded text-stone-700 hover:text-red-600 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="p-2 text-left">
                  <h5 className="font-bold text-[10px] text-stone-950 truncate">{img.title}</h5>
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
  );
}
