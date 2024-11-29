const TAG = /[a-zA-Z0-9!]/
const WHITESPACE = /\s/
const TEXT = /[^<>]/

function isVoidElement (tagName) {
  const voidElements = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]
  return voidElements.includes(tagName.toLowerCase())
}

export default function tokenize (input) {
  const tokens = []
  let current = 0
  let lastChar = '' // 上一个字符
  let lastParen = '' // 上一个标签括号（< > /）
  let attrFlag = false // 标记是否正在处理属性

  while (current < input.length) {
    let char = input[current]

    if (char === '<' || char === '/' || char === '>') {
      lastParen = char
      lastChar = char
      attrFlag = false
      current++
      continue
    }

    if (lastChar === '<' && char === '!') {
      let value = ''
      while (!WHITESPACE.test(char) && char !== '>') {
        value += char
        char = input[++current]
      }

      // 声明
      if (value === '!DOCTYPE') {
        value = value + ' '
        char = input[++current]
        while (char !== '>') {
          value += char
          char = input[++current]
        }
        tokens.push({
          type: 'doctype',
          value: `<${value}>`
        })
        continue
      }

      if (value.startsWith('!--')) {
        while (!value.endsWith('-->')) {
          value += char
          char = input[++current]
        }
        const matchResult = value.match(/!--\s*(.*?)\s*--/)
        let comment = '' // 注释内容
        if (matchResult && matchResult[1]) {
          comment = matchResult[1]
        }
        tokens.push({
          type: 'comment',
          value: comment || ''
        })
        continue
      }
    }

    if ((lastChar === '/' || lastChar === '<') && TAG.test(char)) {
      let value = ''
      while (current < input.length && TAG.test(char)) {
        value += char
        char = input[++current]
      }

      const type = isVoidElement(value) ? 'self-closing-tag' : lastParen === '<' ? 'tag' : 'end-tag'
      tokens.push({
        type,
        value
      })
      lastChar = char
      attrFlag = true
      continue
    }

    if (WHITESPACE.test(char)) {
      current++
      lastChar = char
      continue
    }

    if (!attrFlag && TEXT.test(char)) {
      let value = ''
      while (current < input.length && TEXT.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({
        type: 'text',
        value
      })
      lastChar = char
      continue
    }

    // 属性，key=value或key形式
    if (attrFlag) {
      let attrName = ''
      let attrValue = ''
      while (char !== '=' && !WHITESPACE.test(char) && char !== '>') {
        attrName += char
        char = input[++current]
      }

      if (char === '=') {
        char = input[++current]
        // 处理属性值
        let quote = ''
        if (char === '"' || char === '\'') {
          quote = char
          char = input[++current]
        }
        while (char !== quote) {
          attrValue += char
          char = input[++current]
        }
        if (quote) {
          current++
        }
      } else {
        attrValue = true
      }

      tokens.push({
        type: 'attribute',
        value: {
          [attrName]: attrValue
        }
      })
      lastChar = char
      continue
    }

    throw new TypeError(`[html-parse-stringify] Unknow char: '${char}'`)
  }

  return tokens
}
