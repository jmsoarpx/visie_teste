import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Header } from "./shared/components/header";

function App() {
   return (
      <BrowserRouter>
         <Header />
         <div className="container">
            <AppRoutes />
         </div>
      </BrowserRouter>
   );
}

export default App;
