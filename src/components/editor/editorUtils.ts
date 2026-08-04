import { TextStyleKit } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

export const extensions = [TextStyleKit, StarterKit];

export const initialValue = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Hi there,',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'this is a ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'italic',
            },
          ],
          text: 'basic',
        },
        {
          type: 'text',
          text: ' example of ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Tiptap',
        },
        {
          type: 'text',
          text: ". Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:",
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: "That's a bullet list with one …",
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '… or two list items.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:",
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'css',
      },
      content: [
        {
          type: 'text',
          text: 'body {\n  display: none;\n}',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.",
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Wow, that's amazing. Good work, boy! 👏 ",
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: '— Mom',
            },
          ],
        },
      ],
    },
  ],
};
