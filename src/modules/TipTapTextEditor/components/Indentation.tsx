import { Extension } from '@tiptap/core';
import { CommandProps } from '@tiptap/core';

export const Indentation = Extension.create({
  name: 'indentation',
  // @ts-expect-error dfsfsdf
  addCommands() {
    return {
      increaseIndent:
        () =>
        ({ chain }: CommandProps) => {
          return chain()
            .command(({ tr, state }) => {
              state.selection.ranges.forEach(({ $from, $to }) => {
                for (let pos = $from.pos; pos <= $to.pos; pos++) {
                  const node = state.doc.nodeAt(pos);
                  if (node && node.type.name === 'paragraph') {
                    const style = node.attrs.style as string | undefined;
                    const currentIndent = style ? parseInt(style.replace('margin-left:', ''), 10) || 0 : 0;
                    tr.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      style: `margin-left: ${currentIndent + 20}px`,
                    });
                  }
                }
              });
              return true;
            })
            .run();
        },

      decreaseIndent:
        () =>
        ({ chain }: CommandProps) => {
          return chain()
            .command(({ tr, state }) => {
              state.selection.ranges.forEach(({ $from, $to }) => {
                for (let pos = $from.pos; pos <= $to.pos; pos++) {
                  const node = state.doc.nodeAt(pos);
                  if (node && node.type.name === 'paragraph') {
                    const style = node.attrs.style as string | undefined;
                    const currentIndent = style ? parseInt(style.replace('margin-left:', ''), 10) || 0 : 0;
                    const newIndent = Math.max(currentIndent - 20, 0);
                    tr.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      style: `margin-left: ${newIndent}px`,
                    });
                  }
                }
              });
              return true;
            })
            .run();
        },
    };
  },
});
