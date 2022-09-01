import schema from './schema.json'
import { ISchema } from './type'

const genIndent = (len: number, size: number) => {
  let spaces = ''
  const all = len * size
  for (let i = 0; i < all; i++) {
    spaces += ' '
  }
  return spaces
}

const recursiveSchema = (schema: ISchema, deep: number) => {
  const { children, tagName } = schema
  let nestContent = ''
  if (children) {
    deep += 1
    children.forEach(item => {
      nestContent += recursiveSchema(item, deep)
    })
  }
  return `\r\n${genIndent(deep, 2)}<${tagName}>${nestContent}</${tagName}>\r\n`
}

const genTemplate = (node: string) => {
  return `<template>
    ${ node }
  </template>`
}

const genScript = () => {
  return `<script lang="ts">
  </script>`
}

const genStyle = () => {
  return `<style lang="scss">
  </style>`
}


const main = () => {
  const ret = recursiveSchema(schema, 1)
  const pageTpl = `
  ${genScript()}
  ${genTemplate(ret)}
  ${genStyle()}
  `
  console.log(pageTpl)
}

main()