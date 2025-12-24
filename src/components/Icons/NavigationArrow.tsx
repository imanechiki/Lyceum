import type React from 'react'

interface NavigationArrowProps {
  width?: number | string
  height?: number | string
  color?: string
  className?: string
}

const NavigationArrow: React.FC<NavigationArrowProps> = ({
  width = 28,
  height = 14,
  color = 'black',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.970703 6.91064L17.5241 6.91064"
        stroke={color}
        strokeWidth="0.575758"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M15.5785 6.90878L27.4543 6.90879C20.9094 6.90878 12.6719 0.698319 12.6719 0.698319L15.5785 6.90878ZM15.5785 6.90878L12.6719 13.1211C12.6719 13.1211 20.9112 6.90878 27.4543 6.90879L15.5785 6.90878Z"
        fill={color}
        stroke={color}
        strokeWidth="0.287879"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default NavigationArrow
