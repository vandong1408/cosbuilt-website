import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { toEditorHtml } from '../lib/articleContent';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        placeholder: placeholder,
        modules: {
          toolbar: [
            // H2/H3: trang bài viết đã có H1 (tên bài); H2/H3 tạo mục lục tự động.
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        },
      });

      quillInstance.current.on('text-change', () => {
        onChange(quillInstance.current?.root.innerHTML || '');
      });
      
      if (value) {
        quillInstance.current.clipboard.dangerouslyPasteHTML(toEditorHtml(value));
      }
    }
  }, [onChange, placeholder]);

  // Update content if value changes from outside
  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      // This is tricky, needs to avoid infinite loops or resetting selection
      // Simple implementation:
      quillInstance.current.clipboard.dangerouslyPasteHTML(toEditorHtml(value));
    }
  }, [value]);

  return (
    <div className="rich-text-editor">
      <div ref={quillRef} />
    </div>
  );
}
