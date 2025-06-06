import type { FC, JSX } from "react"
import Converstation from "./Converstation"

const Converstations:FC = ():JSX.Element => {
  return (
    <div className="flex flex-col py-2 overflow-auto">
      <Converstation/>
      <Converstation/>
      <Converstation/>
      <Converstation/>
      <Converstation/>
    </div>
  )
}

export default Converstations