import { useState } from 'react';
import './styles.css';

import { EditorContent, useEditor } from '@tiptap/react';
import { renderToReactElement } from '@tiptap/static-renderer';
import { initialValue, extensions } from './editorUtils';

import { MenuBar } from './MenuBar';

const StaticView = ({ onDoubleClick }: { onDoubleClick: () => void }) => {
  const element = renderToReactElement({ extensions, content: initialValue });
  return <div onDoubleClick={onDoubleClick}>{element}</div>;
};

const EditableView = ({ onSave }: { onSave: () => void }) => {
  const editor = useEditor({
    extensions,
    content: initialValue,
  });
  return (
    <>
      <MenuBar editor={editor} onSave={onSave} />
      <EditorContent editor={editor} />
    </>
  );
};

export default () => {
  const [displayEditor, setDisplayEditor] = useState(false);
  if (displayEditor) {
    return <EditableView onSave={() => setDisplayEditor(false)} />;
  }

  return <StaticView onDoubleClick={() => setDisplayEditor(true)} />;
};
