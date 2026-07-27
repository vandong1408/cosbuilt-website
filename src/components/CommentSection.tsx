export default function CommentSection({ comments = [] }: { comments: any[] }) {
  return (
    <div className="mt-8 border-t border-stone-100 pt-6">
      <h4 className="font-bold text-sm text-stone-900 mb-4">Bình luận ({comments.length})</h4>
      {comments.length === 0 ? (
        <p className="text-xs text-stone-400">Chưa có bình luận nào.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-stone-50 p-3 rounded-lg border border-stone-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-stone-900">{comment.author}</span>
                <span className="text-[10px] text-stone-400">{comment.date}</span>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
