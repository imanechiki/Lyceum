import { unstable_cache } from 'next/cache'

import type { Header as HeaderType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { HeaderClient } from './Component.client'

const fetchHeader = getCachedGlobal('header', 1)

const getHeaderData = unstable_cache(
  async () => (await fetchHeader()) as Partial<HeaderType> | null,
  ['global_header'],
  { tags: ['global_header'] },
)

export async function Header() {
  const headerData = await getHeaderData()

  return <HeaderClient headerData={headerData} />
}
