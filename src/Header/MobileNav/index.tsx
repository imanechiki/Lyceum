import React from 'react'

type HeaderMobileProps = {
  logoSlot?: React.ReactNode
}

export const HeaderMobile = React.memo(
  ({ logoSlot }: HeaderMobileProps) => (
    <div className="flex items-center justify-center lg:hidden">
      {logoSlot}
    </div>
  ),
)

HeaderMobile.displayName = 'HeaderMobile'
