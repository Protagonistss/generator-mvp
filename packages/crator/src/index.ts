import schema from './schema.json'
import { ISchema } from './type'

const recursiveSchema = (schema: ISchema) => {
  const { children, tagName } = schema
  let nestContent = ''
  if (children) {
    children.forEach(item => {
      nestContent += recursiveSchema(item)
    })
  }
  return `<${tagName}>${nestContent}</${tagName}>`
}


const main = () => {
  const ret = recursiveSchema(schema)
  console.log(ret)
}

main()