interface IconProps {
  className?: string
}

export function UnauthorizedIcon({ className = 'h-64 w-64' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#FEE2E2" />
      <path
        d="M70 85C70 80.0294 74.0294 76 79 76H121C125.971 76 130 80.0294 130 85V115C130 119.971 125.971 124 121 124H79C74.0294 124 70 119.971 70 115V85Z"
        fill="#EF4444"
      />
      <rect x="88" y="64" width="24" height="16" rx="4" fill="#EF4444" />
      <circle cx="100" cy="100" r="6" fill="white" />
      <rect x="98" y="102" width="4" height="12" rx="2" fill="white" />
    </svg>
  )
}

export function ForbiddenIcon({ className = 'h-64 w-64' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#FEE2E2" />
      <path
        d="M100 40L60 80V140C60 145.523 64.4772 150 70 150H130C135.523 150 140 145.523 140 140V80L100 40Z"
        fill="#EF4444"
      />
      <circle cx="100" cy="110" r="8" fill="white" />
      <rect x="96" y="120" width="8" height="20" rx="4" fill="white" />
      <path d="M70 80L100 50L130 80H70Z" fill="#DC2626" />
    </svg>
  )
}

export function NotFoundIcon({ className = 'h-64 w-64' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#F3F4F6" />
      <path
        d="M60 100C60 77.9086 77.9086 60 100 60C122.091 60 140 77.9086 140 100C140 122.091 122.091 140 100 140C77.9086 140 60 122.091 60 100Z"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="8 8"
      />
      <circle cx="85" cy="90" r="5" fill="#6B7280" />
      <circle cx="115" cy="90" r="5" fill="#6B7280" />
      <path
        d="M85 115C85 115 90 110 100 110C110 110 115 115 115 115"
        stroke="#6B7280"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M140 140L160 160"
        stroke="#9CA3AF"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MethodNotAllowedIcon({ className = 'h-64 w-64' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#F3F4F6" />
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="3"
      />
      <rect
        x="96"
        y="60"
        width="8"
        height="80"
        fill="#DC2626"
        transform="rotate(45 100 100)"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        fill="transparent"
        stroke="#EF4444"
        strokeWidth="8"
      />
    </svg>
  )
}

export function InternalErrorIcon({ className = 'h-64 w-64' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#FEE2E2" />
      <rect x="60" y="80" width="80" height="60" rx="4" fill="#EF4444" />
      <rect x="70" y="90" width="20" height="3" fill="white" />
      <rect x="70" y="97" width="30" height="3" fill="white" />
      <rect x="70" y="104" width="25" height="3" fill="white" />
      <rect x="70" y="111" width="20" height="3" fill="white" />
      <rect x="70" y="118" width="28" height="3" fill="white" />
      <rect x="70" y="125" width="22" height="3" fill="white" />
      <path
        d="M110 95L125 110M125 95L110 110"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="80" cy="70" r="3" fill="#DC2626" />
      <circle cx="90" cy="65" r="2" fill="#DC2626" />
      <circle cx="120" cy="72" r="2.5" fill="#DC2626" />
    </svg>
  )
}

export function NoContentIcon({ className = 'h-64 w-64' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#F3F4F6" />
      <rect
        x="60"
        y="70"
        width="80"
        height="60"
        rx="4"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="2"
      />
      <path
        d="M75 85H125M75 95H115M75 105H120M75 115H110"
        stroke="#E5E7EB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="20" fill="#F3F4F6" />
      <path
        d="M90 100L95 105L110 90"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
