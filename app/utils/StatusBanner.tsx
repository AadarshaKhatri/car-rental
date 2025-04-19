import { ReactElement } from "react"

const StatusBanner = ({children}:{children : ReactElement}) => {
  return (
    <div className="px-3 py-2 text-sm">
      {children}
    </div>
  )
}

export default StatusBanner