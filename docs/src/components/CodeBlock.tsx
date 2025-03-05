'use client';
import * as React from 'react';
import copy from 'clipboard-copy';

import { CheckIcon } from 'docs/icons/CheckIcon';
import { CopyIcon } from 'docs/icons/CopyIcon';

import * as CodeBlock from './CodeBlock.pigment';
import * as ScrollArea from './ScrollArea';
import { GhostButton } from './GhostButton.pigment';
import { preContainer } from './CodeBlock.pigment';

const CodeBlockContext = React.createContext({ codeId: '', titleId: '' });

export function Root({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const titleId = React.useId();
  const codeId = React.useId();
  const context = React.useMemo(() => ({ codeId, titleId }), [codeId, titleId]);
  return (
    <CodeBlockContext.Provider value={context}>
      <CodeBlock.Root role="figure" aria-labelledby={titleId} className={className} {...props} />
    </CodeBlockContext.Provider>
  );
}

export function Panel({ className, children, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { codeId, titleId } = React.useContext(CodeBlockContext);
  const [copyTimeout, setCopyTimeout] = React.useState<number>(0);

  return (
    <CodeBlock.Panel className={className} {...props}>
      <CodeBlock.PanelTitle id={titleId}>{children}</CodeBlock.PanelTitle>
      <GhostButton
        className={CodeBlock.ghostButtonStyle().className}
        aria-label="Copy code"
        onClick={async () => {
          const code = document.getElementById(codeId)?.textContent;

          if (code) {
            await copy(code);
            const newTimeout = window.setTimeout(() => {
              window.clearTimeout(newTimeout);
              setCopyTimeout(0);
            }, 2000);
            window.clearTimeout(copyTimeout);
            setCopyTimeout(newTimeout);
          }
        }}
      >
        Copy
        <CodeBlock.CopyLabel>{copyTimeout ? <CheckIcon /> : <CopyIcon />}</CodeBlock.CopyLabel>
      </GhostButton>
    </CodeBlock.Panel>
  );
}

export function Pre({ className, ...props }: React.ComponentProps<'pre'>) {
  const { codeId } = React.useContext(CodeBlockContext);
  return (
    <ScrollArea.Root
      // Select code block contents on Ctrl/Cmd + A
      tabIndex={-1}
      className={`${preContainer}`}
      onKeyDown={(event) => {
        if (
          event.key === 'a' &&
          (event.metaKey || event.ctrlKey) &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          window.getSelection()?.selectAllChildren(event.currentTarget);
        }
      }}
    >
      <ScrollArea.Viewport
        style={{ overflow: undefined }}
        render={<CodeBlock.Pre {...props} id={codeId} className={className} />}
      />
      <ScrollArea.Scrollbar orientation="horizontal" />
    </ScrollArea.Root>
  );
}
