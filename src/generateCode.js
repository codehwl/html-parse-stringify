export default function generateCode (node) {
  if (node.type === 'root') {
    return node.children.map(generateCode).join('')
  }

  if (node.type === 'doctype') {
    return node.value
  }

  if (node.type === 'comment') {
    return `<!-- ${node.value} -->`
  }

  if (node.type === 'text') {
    return node.value
  }

  if (node.type === 'element') {
    let attributes = ''
    for (const key in node.attributes) {
      attributes += ` ${key}="${node.attributes[key]}"`
    }
    const children = node.children.map(generateCode).join('')

    return `<${node.name}${attributes}>${children}</${node.name}>`
  }
}
