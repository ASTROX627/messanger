import type { FC, JSX } from "react"

const GenderCheckbox:FC = ():JSX.Element => {
  return (
    <div className="flex mt-4 gap-3">
      <div className="flex flex-col">
        <label className="label gap-2 cursor-pointer">
          <span>Male</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="label gap-2 cursor-pointer">
          <span>Female</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckbox
