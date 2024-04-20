import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <HeroBanner />
        </div>
        <About />
      </div>
    </BrowserRouter>
  );
}

export default App;
