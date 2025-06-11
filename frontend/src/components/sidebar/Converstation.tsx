import type { FC, JSX } from "react";

const Converstation: FC = ():JSX.Element => {
  return(
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" alt="user image" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">Jhone Doe</p>
            <span>🎃</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"/>
    </>
  )
}

export default Converstation;