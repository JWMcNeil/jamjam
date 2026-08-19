import { BoardModal } from '@/components/board/BoardModal'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { queryBoardItemBySlug } from '@/lib/board/fetch'

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function BoardModalSlot({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const item = await queryBoardItemBySlug(decodedSlug)

  if (!item) {
    return <PayloadRedirects url={`/board/${decodedSlug}`} />
  }

  return <BoardModal item={item} closeMode="page" />
}
