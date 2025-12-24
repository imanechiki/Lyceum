'use client'
import React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null

  return (
    <React.Suspense
      fallback={
        <pre className="bg-black p-4 border text-xs border-border rounded overflow-x-auto">
          <code>Loading…</code>
        </pre>
      }
    >
      {/* Lazy import to avoid loading prism on initial route */}
      <LazyHighlight code={code} language={language} />
    </React.Suspense>
  )
}

// Split-highlight component so prism-react-renderer only loads when needed
const LazyHighlight: React.FC<{ code: string; language?: string }> = ({ code, language = '' }) => {
  // dynamic import inside client component
  const HighlightModule = React.useMemo(() => import('prism-react-renderer'), [])
  const [mod, setMod] = React.useState<any>(null)

  React.useEffect(() => {
    HighlightModule.then(setMod)
  }, [HighlightModule])

  if (!mod) {
    return (
      <pre className="bg-black p-4 border text-xs border-border rounded overflow-x-auto">
        <code />
      </pre>
    )
  }

  const { Highlight, themes } = mod

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }: any) => (
        <pre className="bg-black p-4 border text-xs border-border rounded overflow-x-auto">
          {tokens.map((line: any, i: number) => (
            <div key={i} {...getLineProps({ className: 'table-row', line })}>
              <span className="table-cell select-none text-right text-white/25">{i + 1}</span>
              <span className="table-cell pl-4">
                {line.map((token: any, key: number) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  )
}
