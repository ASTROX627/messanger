import type { FC, JSX } from "react"
import SearchInput from "./SearchInput"
import Converstations from "./Converstations"
import Logout from "./Logout"

const Sidebar:FC = ():JSX.Element => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput/>
      <div className="divider px-3"></div>
      <Converstations/>
      <Logout/>
    </div>
  )
}

export default Sidebar
