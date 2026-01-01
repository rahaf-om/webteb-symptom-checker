import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
    Bold, Italic, List, ListOrdered, Heading1, Heading2,
    Quote, Undo, Redo, ImageIcon, Link
} from 'lucide-react';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="tiptap-toolbar">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`tiptap-button ${editor.isActive('bold') ? 'is-active' : ''}`}
                title="Bold"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`tiptap-button ${editor.isActive('italic') ? 'is-active' : ''}`}
                title="Italic"
            >
                <Italic size={18} />
            </button>
            <div className="divider" style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`tiptap-button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
                title="H1"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`tiptap-button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
                title="H2"
            >
                <Heading2 size={18} />
            </button>
            <div className="divider" style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`tiptap-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                title="Bullet List"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`tiptap-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                title="Ordered List"
            >
                <ListOrdered size={18} />
            </button>
            <div className="divider" style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
            <button
                onClick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
                className="tiptap-button"
                title="Add Image"
            >
                <ImageIcon size={18} />
            </button>
            <div className="divider" style={{ width: '1px', background: '#ddd', margin: '0 4px' }} />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="tiptap-button"
                title="Undo"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="tiptap-button"
                title="Redo"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

const RichTextEditor = ({ value, onChange, placeholder = "Start typing..." }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update content if value changes from outside (e.g. switching sections)
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="tiptap-editor">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="tiptap-content" />
        </div>
    );
};

export default RichTextEditor;
