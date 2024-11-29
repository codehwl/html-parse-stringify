
export default function parser (tokens) {
  let current = 0

  function walk () {
    let token = tokens[current]
    
    if (!token) return

    if (token.type === 'doctype') {
      current++
      return {
        type: 'doctype',
        value: token.value
      }
    }

    if (token.type === 'comment') {
      current++
      return {
        type: 'comment',
        value: token.value
      }
    }

    if (token.type === 'tag' || token.type === 'self-closing-tag') {
      const node = {
        type: 'element',
        name: token.value,
        attributes: {},
        children: [],
        isVoidElement: token.type === 'self-closing-tag'
      }

      token = tokens[++current]
      while (token && token.type === 'attribute') {
        node.attributes = Object.assign(node.attributes, token.value)
        token = tokens[++current]
      }

      if (node.isVoidElement) return node

      if (token && (token.type === 'end-tag')) {
        current++
      } else {
        let child = walk()
        while (child) {
          node.children.push(child)
          child = walk()
        }
        current++
      }

      return node
    }

    if (token.type === 'text') {
      current++
      return {
        type: 'text',
        value: token.value
      }
    }

    if (token.type === 'end-tag') {
      return
    }

    throw new TypeError(`Unknow token: '${token.value}'`)
  }

  const ast = {
    type: 'root',
    children: []
  }

  while (current < tokens.length) {
    ast.children.push(walk())
  }

  return ast
}
