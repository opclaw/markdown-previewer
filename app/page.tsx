'use client'

import { useState } from 'react'
import styles from './page.module.css'

// Simple markdown parser
const parseMarkdown = (text: string): string => {
  return text
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Code block
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$1</ul>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br />')
}

const sampleMarkdown = `# Hello World

This is a **bold** text and this is *italic*.

## Features

* Easy to use
* Real-time preview
* Supports basic Markdown

## Code Example

\`\`\`
const greeting = "Hello";
console.log(greeting);
\`\`\`

[Visit GitHub](https://github.com)`

export default function Home() {
  const [input, setInput] = useState(sampleMarkdown)
  const [html, setHtml] = useState(parseMarkdown(sampleMarkdown))

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setInput(text)
    setHtml(parseMarkdown(text))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📝 Markdown Previewer</h1>
      
      <div className={styles.editor}>
        <div className={styles.pane}>
          <label>Markdown</label>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type markdown here..."
            className={styles.input}
          />
        </div>

        <div className={styles.pane}>
          <label>Preview</label>
          <div 
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}