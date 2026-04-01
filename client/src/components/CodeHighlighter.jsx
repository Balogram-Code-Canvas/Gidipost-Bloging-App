import { useEffect } from 'react'
import Prism from 'prismjs'

import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-swift'

// ✅ PHP removed - causes tokenizePlaceholders error

const CodeHighlighter = ({ content }) => {

  useEffect(() => {
    if (!content) return
    const timer = setTimeout(() => {
      highlightAll()
    }, 800)
    return () => clearTimeout(timer)
  }, [content])

  const highlightAll = () => {
    const richText = document.querySelector('.rich-text')
    if (!richText) return

    // Handle pre.ql-syntax blocks
    const qlSyntaxBlocks = richText.querySelectorAll('pre.ql-syntax')
    qlSyntaxBlocks.forEach((pre) => {
      if (pre.dataset.highlighted) return
      pre.dataset.highlighted = 'true'

      const rawCode = pre.innerText
      const detected = detectLanguage(rawCode)

      const codeEl = document.createElement('code')
      codeEl.className = `language-${detected}`
      codeEl.textContent = rawCode

      pre.innerHTML = ''
      pre.appendChild(codeEl)

      try {
        Prism.highlightElement(codeEl)
      } catch (err) {
        console.log('Highlight error:', err.message)
        codeEl.style.color = '#cdd6f4'
      }

      wrapWithCopyButton(pre, codeEl, detected)
    })

    // Handle pre>code blocks
    const preCodeBlocks = richText.querySelectorAll('pre code:not([data-highlighted])')
    preCodeBlocks.forEach((codeEl) => {
      if (codeEl.dataset.highlighted) return
      codeEl.dataset.highlighted = 'true'

      const rawCode = codeEl.innerText
      const detected = detectLanguage(rawCode)

      if (!codeEl.className.includes('language-')) {
        codeEl.className = `language-${detected}`
      }

      try {
        Prism.highlightElement(codeEl)
      } catch (err) {
        console.log('Highlight error:', err.message)
      }

      wrapWithCopyButton(codeEl.parentElement, codeEl, detected)
    })

    // Handle plain pre blocks
    const plainPreBlocks = richText.querySelectorAll('pre:not(.ql-syntax):not([data-highlighted])')
    plainPreBlocks.forEach((pre) => {
      if (pre.dataset.highlighted) return
      pre.dataset.highlighted = 'true'

      const rawCode = pre.innerText
      const detected = detectLanguage(rawCode)

      const codeEl = document.createElement('code')
      codeEl.className = `language-${detected}`
      codeEl.textContent = rawCode

      pre.innerHTML = ''
      pre.appendChild(codeEl)

      try {
        Prism.highlightElement(codeEl)
      } catch (err) {
        console.log('Highlight error:', err.message)
      }

      wrapWithCopyButton(pre, codeEl, detected)
    })

    // Handle paragraph-based code
    handleParagraphCode(richText)
  }

  const detectLanguage = (code) => {
    if (!code) return 'javascript'

    const patterns = {
      jsx: [/import React/, /from 'react'/, /<[A-Z][a-zA-Z]+/, /className=/, /useState|useEffect/],
      typescript: [/interface\s+\w+/, /type\s+\w+\s*=/, /:\s*(string|number|boolean|void)/],
      python: [/def\s+\w+\(/, /print\(/, /if\s+__name__/, /elif\s/, /:\s*$/m],
      css: [/\{[\s\S]*?\}/, /margin:|padding:|color:|background:|font-size|display:|flex|grid/],
      scss: [/\$\w+:/, /@mixin/, /@include/, /&:/],
      html: [/<html/, /<div/, /<body/, /<head/, /<script/, /<!DOCTYPE/],
      json: [/":\s*(true|false|null|\d+|")/, /^\s*[\[{]/],
      bash: [/^\s*(npm|yarn|git|cd|ls|mkdir|rm|sudo|apt|brew)\s/m, /\$\s/, /#!/],
      sql: [/SELECT\s|INSERT\s|UPDATE\s|DELETE\s|CREATE\s|FROM\s|WHERE\s/i],
      rust: [/fn\s+main\(/, /let\s+mut\s/, /use\s+std::/, /impl\s+/],
      go: [/func\s+main\(/, /package\s+main/, /import\s+\(/, /fmt\.Print/],
      java: [/public\s+class/, /public\s+static\s+void\s+main/, /System\.out\.print/],
      kotlin: [/fun\s+main\(/, /val\s+\w+\s*=/, /println\(/],
      swift: [/import\s+UIKit/, /func\s+\w+\(/, /var\s+\w+:/, /print\(/],
    }

    for (const [lang, langPatterns] of Object.entries(patterns)) {
      const matches = langPatterns.filter(p => p.test(code)).length
      if (matches >= 2) return lang
    }

    for (const [lang, langPatterns] of Object.entries(patterns)) {
      if (langPatterns.some(p => p.test(code))) return lang
    }

    return 'javascript'
  }

  const wrapWithCopyButton = (pre, codeEl, language) => {
    if (pre.parentElement?.classList.contains('code-block-wrapper')) return

    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'

    const header = document.createElement('div')
    header.className = 'code-block-header'

    const langBadge = document.createElement('div')
    langBadge.className = 'code-lang-badge'
    langBadge.innerHTML = `
      <span class="code-lang-dot"></span>
      <span class="code-lang-dot"></span>
      <span class="code-lang-dot"></span>
      <span class="code-lang-text">${language}</span>
    `

    const copyBtn = document.createElement('button')
    copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    `
    copyBtn.className = 'copy-btn'

    copyBtn.addEventListener('click', () => {
      const codeToCopy = codeEl.innerText
      if (navigator.clipboard) {
        navigator.clipboard.writeText(codeToCopy).then(() => {
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
          `
          copyBtn.classList.add('copied')
          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            `
            copyBtn.classList.remove('copied')
          }, 2000)
        })
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = codeToCopy
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        copyBtn.textContent = '✅ Copied!'
        setTimeout(() => copyBtn.textContent = 'Copy', 2000)
      }
    })

    header.appendChild(langBadge)
    header.appendChild(copyBtn)
    pre.parentNode.insertBefore(wrapper, pre)
    wrapper.appendChild(header)
    wrapper.appendChild(pre)
  }

  const handleParagraphCode = (richText) => {
    const codePatterns = [
      /^\s*(const|let|var|function|return|if|else|for|while|import|export|class|=>|async|await)\b/,
      /[{};]/,
      /^\s*(def|print|elif|lambda)\b/,
      /^\s*<[a-zA-Z][^>]*>/,
      /^\s*\.([\w-]+)\s*\{/,
      /:\s*(flex|grid|block|none|center|auto|100%|solid|relative|absolute)/,
      /^\s*(npm|yarn|git|cd|ls|node)\s/,
      /console\.|document\.|window\.|getElementById|querySelector/,
      /=>\s*[\{(]/,
      /font-family|font-size|background-color|border-radius|box-shadow/,
      /display:\s*(flex|grid|block|inline)/,
    ]

    const isCodeLine = (text) => {
      return codePatterns.some(pattern => pattern.test(text.trim()))
    }

    const paragraphs = Array.from(richText.querySelectorAll('p:not([data-checked])'))
    let i = 0

    while (i < paragraphs.length) {
      const p = paragraphs[i]
      p.dataset.checked = 'true'
      const text = p.innerText.trim()

      if (text && isCodeLine(text)) {
        const codeLines = []
        let j = i

        while (
          j < paragraphs.length &&
          paragraphs[j].innerText.trim() &&
          isCodeLine(paragraphs[j].innerText.trim())
        ) {
          codeLines.push(paragraphs[j].innerText)
          paragraphs[j].dataset.checked = 'true'
          j++
        }

        if (codeLines.length >= 2) {
          const rawCode = codeLines.join('\n')
          const detected = detectLanguage(rawCode)

          const wrapper = document.createElement('div')
          wrapper.className = 'code-block-wrapper'

          const header = document.createElement('div')
          header.className = 'code-block-header'

          const pre = document.createElement('pre')
          const codeEl = document.createElement('code')
          codeEl.className = `language-${detected}`
          codeEl.textContent = rawCode

          pre.appendChild(codeEl)

          // ✅ Try/catch around every Prism call
          try {
            Prism.highlightElement(codeEl)
          } catch (err) {
            console.log('Paragraph highlight error:', err.message)
            codeEl.style.color = '#cdd6f4'
            codeEl.style.fontFamily = 'monospace'
          }

          const langBadge = document.createElement('div')
          langBadge.className = 'code-lang-badge'
          langBadge.innerHTML = `
            <span class="code-lang-dot"></span>
            <span class="code-lang-dot"></span>
            <span class="code-lang-dot"></span>
            <span class="code-lang-text">${detected}</span>
          `

          const copyBtn = document.createElement('button')
          copyBtn.textContent = 'Copy'
          copyBtn.className = 'copy-btn'
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.textContent = '✅ Copied!'
              copyBtn.classList.add('copied')
              setTimeout(() => {
                copyBtn.textContent = 'Copy'
                copyBtn.classList.remove('copied')
              }, 2000)
            })
          })

          header.appendChild(langBadge)
          header.appendChild(copyBtn)
          wrapper.appendChild(header)
          wrapper.appendChild(pre)

          paragraphs[i].parentNode.insertBefore(wrapper, paragraphs[i])

          for (let k = i; k < j; k++) {
            if (paragraphs[k].parentNode) {
              paragraphs[k].remove()
            }
          }

          i = j
          continue
        }
      }
      i++
    }
  }

  return null
}

export default CodeHighlighter