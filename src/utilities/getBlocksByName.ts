type NamedBlock = {
  blockName?: string | null
  blockType?: string
  [key: string]: unknown
}

/**
 * Creates a map of blocks by their blockName for easy access
 * @param blocks - Array of blocks from StaticPage
 * @returns Map of blockName -> block
 */
export function getBlocksByName<T extends NamedBlock>(blocks: T[] | null | undefined) {
  if (!blocks || !Array.isArray(blocks)) {
    return new Map<string, T>()
  }

  const blocksMap = new Map<string, T>()

  for (const block of blocks) {
    if (block.blockName) {
      blocksMap.set(block.blockName, block)
    }
  }

  return blocksMap
}

/**
 * Helper to get a specific block by name and type
 * @param blocks - Array of blocks from StaticPage
 * @param blockName - Name of the block to find
 * @param blockType - Optional block type to filter by
 * @returns The block if found, undefined otherwise
 */
export function getBlockByName<T extends NamedBlock = NamedBlock>(
  blocks: T[] | null | undefined,
  blockName: string,
  blockType?: string,
): T | undefined {
  if (!blocks || !Array.isArray(blocks)) {
    return undefined
  }

  const block = blocks.find(
    (b) => b.blockName === blockName && (!blockType || b.blockType === blockType),
  )

  return block as T | undefined
}
