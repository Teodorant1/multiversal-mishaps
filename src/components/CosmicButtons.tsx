"use client";

import SciFiPortal from "./SciFiPortal";
import SpinningMolecule from "./SpinningMolecule";

export default function CosmicButtons() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-center text-4xl font-bold text-white">
        Cosmic Control Panel
      </h1>
      <div className="mb-12 flex justify-center space-x-8">
        <SciFiPortal />
        <SpinningMolecule />
      </div>
    </div>
  );
}
