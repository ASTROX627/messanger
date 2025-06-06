import type { FC, JSX } from "react";
import Home from "./pages/home/Home";

const App: FC = (): JSX.Element => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Home/>
    </div>
  )
}

export default App;