import { ReactRenderer } from '@tiptap/react';

import MentionList from '../components/MentionList';

const suggestion = {
  render: () => {
    let reactRenderer: ReactRenderer;

    return {
      onStart: (props: any) => {
        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });
      },

      onUpdate(props: any) {
        reactRenderer?.updateProps(props);
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          reactRenderer?.destroy();
          return true;
        }

        return (reactRenderer?.ref as any)?.onKeyDown(props);
      },

      onExit() {
        console.log('onExitddwe');
        reactRenderer?.destroy();
      },
    };
  },
};

export default suggestion;
