import { CreatorProfile } from "~/components/CreatorProfile";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";

export default function AboutCreatorPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
      <CreatorProfile />
    </div>
  );
}
