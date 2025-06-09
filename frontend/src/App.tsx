import type { FC, JSX } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";




const App: FC = (): JSX.Element => {
  return (
    <div className="p-4 min-h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
      <Toaster
        position="bottom-left"
        reverseOrder={true}
      />
    </div>
  )
}

export default App;