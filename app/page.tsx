'use client'

import { useState, useCallback } from 'react'

const sampleMarkdown = `# Hello Markdown!

This is a **live preview** of your Markdown.

## Features
- Bold and *italic* text
- Lists
- Code blocks
- Links and images

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

> This is a blockquote

[Link to example](https://example.com)
`

function parseMarkdown(text: string): string {
  let html = text
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n/gim, '<br/>')

  // Wrap li elements in ul
  html = html.replace(/(<li>.*<\/li>)+/gim, '<ul>$&</ul>')
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote><br\/><blockquote>/gim, '<br/>')

  return html
}

export default function Home() {
  const [markdown, setMarkdown] = useState(sampleMarkdown)
  const [copied, setCopied] = useState(false)

  const html = parseMarkdown(markdown)

  const copyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [markdown])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-2xl shadow-lg">📝</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Markdown Previewer</h1>
                <p className="text-sm text-slate-500">Edit & preview</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 text-3xl shadow-xl mb-6">📝</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Markdown Previewer</h2>
            <p className="text-lg md:text-xl text-slate-600">Write Markdown and see the preview in real-time.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 h-[600px]">
            {/* Editor */}
            <div className="border-r border-slate-200">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">Markdown</span>
                <button onClick={copyMarkdown} className="text-xs font-medium text-slate-600 hover:text-slate-900">
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm bg-slate-50"
                placeholder="Write your Markdown here..."
              />
            </div>

            {/* Preview */}
            <div>
              <div className="px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">Preview</span>
              </div>
              <div 
                className="h-full p-4 overflow-auto prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
