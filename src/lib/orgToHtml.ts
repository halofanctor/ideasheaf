import { unified } from 'unified'
import uniorgParse from 'uniorg-parse'
import uniorgExtractKeywords from 'uniorg-extract-keywords'
import { uniorgSlug } from 'uniorg-slug'
import uniorg2rehype from 'uniorg-rehype'
import { visit } from "unist-util-visit";

import rehypeTypst from '@myriaddreamin/rehype-typst'
import rehypeShiki from '@shikijs/rehype'

// import type { VFile } from 'vfile'
import type { Root, Element } from 'hast'
import type { Node } from 'unist'
import type { Plugin } from 'unified'

const fixTypstTags: Plugin<[], Root> = () => {
    return (tree: Root) => {
        visit(tree, "element", (node: Element) => {
            if (node.tagName === "h5:div") {
                node.tagName = "div";
            }
        });
    };
}

// A primitive compiler to return the node as-is without stringifying
const toJson: Plugin = function() {
    this.compiler = (node: Node) => node
}

const processor = unified()
  .use(uniorgParse)
  .use(uniorgExtractKeywords)
  .use(uniorgSlug)
  .use(uniorg2rehype)
  .use(rehypeShiki, {
    themes: {
      light: 'min-light',
      dark: 'min-dark',
    },
  })
  .use(rehypeTypst)
  .use(fixTypstTags)
  .use(toJson)

// Process an Org file into HAST
export default async function orgToHtml(file: string) {
  return await processor.process(file).catch((err: Error) => {
    console.error('failed to process file', file, err)
    throw err
  })
}
