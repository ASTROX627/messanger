import { LogOut } from "lucide-react"
import type { FC, JSX } from "react"

const Logout:FC = ():JSX.Element => {
  return (
    <div className="mt-auto mx-1">
      <LogOut className="cursor-pointer"/>
    </div>
  )
}

export default Logout