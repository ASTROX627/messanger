import { Search } from "lucide-react"
import type { FC, JSX } from "react"

const SearchInput:FC = ():JSX.Element => {
  return (
    <form className="flex items-center gap-2">
      <input 
        type="text" 
        placeholder="Search..."
        className="input rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <Search size={18}/>
      </button>
    </form>
  )
}

export default SearchInput