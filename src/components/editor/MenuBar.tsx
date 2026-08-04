import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';

import { menuBarStateSelector } from './menuBarState';
import { GhostButton } from '@bka-stuff/pe-mfe-utils';
import { FC } from 'react';

type Props = {
  editor: Editor | null;
  onSave?: () => void;
};

export const MenuBar: FC<Props> = ({ editor, onSave }) => {
  const editorState = useEditorState({
    // editor may be null at runtime, but the selector expects a non-null Editor.
    // Assert here to satisfy the useEditorState overload accepting Editor.
    editor: editor as Editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  function save() {
    console.log(`saving...`);
    const text = editor?.getText();
    console.log('text:::', text);
    const html = editor?.getHTML();
    console.log('html:::', html);
    const json = editor?.getJSON();
    console.log('json:::', json);
    onSave?.();
  }

  return (
    <div className="control-group">
      <div className="formatting-buttons">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          title="bold"
          className={editorState.isBold ? 'is-active' : ''}
        >
          <i className="fas fa-bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          title="italic"
          className={editorState.isItalic ? 'is-active' : ''}
        >
          <i className="fas fa-italic" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          title="strikethrough"
          className={editorState.isStrike ? 'is-active' : ''}
        >
          <i className="fas fa-strikethrough" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          title="code"
          className={editorState.isCode ? 'is-active' : ''}
        >
          <i className="fas fa-code" />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="paragraph"
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          <i className="fas fa-paragraph" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editorState.isHeading4 ? 'is-active' : ''}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editorState.isHeading5 ? 'is-active' : ''}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editorState.isHeading6 ? 'is-active' : ''}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          <i className="fas fa-list" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          <i className="fas fa-list-ol" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="code block"
          className={editorState.isCodeBlock ? 'is-active' : ''}
        >
          <i className="far fa-file-code" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="blockquote"
          className={editorState.isBlockquote ? 'is-active' : ''}
        >
          <i className="fas fa-quote-right" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="horizontal rule"
        >
          <i className="fas fa-ruler-horizontal" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          title="undo"
        >
          <i className="fas fa-undo" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          title="redo"
        >
          <i className="fas fa-redo" />
        </button>
      </div>
      <div className="tw:mt-2 tw:flex tw:gap-2">
        <GhostButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          text="Clear marks"
          color="blue"
          last
        />
        <GhostButton
          onClick={() => editor.chain().focus().clearNodes().run()}
          text="Clear nodes"
          color="blue"
          last
        />
        <GhostButton onClick={save} text="Save" color="blue" last />
      </div>
    </div>
  );
};
