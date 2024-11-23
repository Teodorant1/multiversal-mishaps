import MultiversalMishaps from "../components/MultiversalMishaps";
import AnimatedCelestialBodies from "../components/AnimatedCelestialBodies";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 text-white">
      <AnimatedCelestialBodies />
      <MultiversalMishaps />
    </main>
  );
}
