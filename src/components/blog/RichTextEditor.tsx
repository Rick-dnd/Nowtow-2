'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  autosave?: boolean;
  autosaveKey?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  'aria-label': string;
}

function ToolbarButton({ onClick, isActive, disabled, children, 'aria-label': ariaLabel }: ToolbarButtonProps): React.ReactElement {
  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn('h-8 w-8 p-0', isActive && 'bg-primary text-primary-foreground')}
      aria-label={ariaLabel}
      aria-pressed={isActive}
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({
  content,
  onChange,
  autosave = true,
  autosaveKey = 'blog-draft'
}: RichTextEditorProps): React.ReactElement {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor: updatedEditor }): void => {
      const html = updatedEditor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
        'aria-label': 'Rich text editor',
        'role': 'textbox',
        'aria-multiline': 'true',
      },
    },
  });

  // Autosave to localStorage
  useEffect((): (() => void) | void => {
    if (!editor || !autosave) return;

    const saveInterval = setInterval((): void => {
      const html = editor.getHTML();
      if (html && html !== '<p></p>') {
        localStorage.setItem(autosaveKey, html);
        console.log('Content autosaved');
      }
    }, 30000); // Save every 30 seconds

    return (): void => clearInterval(saveInterval);
  }, [editor, autosave, autosaveKey]);

  // Load autosaved content on mount
  useEffect((): void => {
    if (!editor || !autosave) return;

    const savedContent = localStorage.getItem(autosaveKey);
    if (savedContent && savedContent !== '<p></p>' && !content) {
      editor.commands.setContent(savedContent);
      onChange(savedContent);
    }
  }, [editor, autosave, autosaveKey, content, onChange]);

  if (!editor) {
    return (
      <div className="border rounded-lg p-4">
        <div className="h-8 bg-muted animate-pulse rounded mb-4" />
        <div className="min-h-[400px] bg-muted/30 animate-pulse rounded" />
      </div>
    );
  }

  const wordCount = editor.state.doc.textContent.split(/\s+/).filter((word) => word.length > 0).length;
  const charCount = editor.state.doc.textContent.length;

  return (
    <div className="border rounded-lg overflow-hidden" role="region" aria-label="Text editor">
      {/* Toolbar */}
      <div className="bg-muted/30 border-b p-2 flex flex-wrap gap-1" role="toolbar" aria-label="Text formatting toolbar">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          aria-label="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          aria-label="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          aria-label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          aria-label="Inline code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          aria-label="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          aria-label="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          aria-label="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-8" />

        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          aria-label="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          aria-label="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Stats Footer */}
      <div className="bg-muted/30 border-t px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex gap-4">
          <span aria-live="polite">{wordCount} words</span>
          <span aria-live="polite">{charCount} characters</span>
        </div>
        {autosave && (
          <span className="text-xs">Autosave enabled (every 30s)</span>
        )}
      </div>
    </div>
  );
}
