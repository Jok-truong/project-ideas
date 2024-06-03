import { Fluency } from "./components/Fluency";
import Hero from "./components/Hero";
import Languages from "./components/Languages";
import Metrics from "./components/Metrics";

function LandingPage() {
  return (
    <>
      <Hero />
      <Languages />
      <Metrics>
        <Fluency />
      </Metrics>
    </>
  );
}

export default LandingPage;
