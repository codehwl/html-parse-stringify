import tokenizer from './tokenizer'
import parser from './parser'
import generateCode from './generateCode'

const compiler = (input, options={}) => {
  const tokens = tokenizer(input)
  if (options.logTokens) {
    console.log('---------- TOKENS START ----------')
    console.log(tokens)
    console.log('---------- TOKENS END ----------')
  }
  const ast = parser(tokens)

  return ast
}

export default {
  parse: compiler,
  stringify: generateCode
}
