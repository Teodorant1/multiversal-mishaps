"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SpinningMolecule } from "./SpinningMolecule";
import { SciFiLoadingBar } from "./SciFiLoadingBar";
import { api } from "~/trpc/react";
import { CosmicButton } from "./CosmicButton";
import { ErrorPopup } from "./ErrorPopup";

export function SignupForm() {
  const [hasSucceededRegister, setHasSucceededRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");

  const makeAccount = api.auth.register.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      if (data.error === false) {
        setHasSucceededRegister(true);
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });

  const handleRegisterClick = () => {
    setIsLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;

    makeAccount.mutate({ username, email, password });
  };

  return (
    <Card className="relative w-full max-w-md overflow-hidden bg-gray-900/90 text-cyan-50 shadow-xl shadow-cyan-500/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
      {isError && (
        <div className="mx-auto flex items-center justify-center">
          <ErrorPopup message={errorText} onDismiss={() => setIsError(null)} />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-cyan-50">
            {hasSucceededRegister
              ? "Registration Successful!"
              : "Create Account"}
          </CardTitle>
          <SpinningMolecule />
        </div>
        {!hasSucceededRegister && (
          <CardDescription className="text-cyan-200">
            Join the cosmic adventure and start playing Multiversal Mishaps
            today!
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {hasSucceededRegister ? (
          <CosmicButton
            className="m-5"
            text="CLICK HERE TO LOGIN"
            href="/api/auth/signin"
          />
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyan-200">
                Email
              </Label>
              <Input
                id="email"
                placeholder="cosmic.player@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="border-cyan-800 bg-gray-900/50 text-cyan-50 placeholder:text-cyan-500/50 focus:border-cyan-500 focus:ring-cyan-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-cyan-200">
                Username
              </Label>
              <Input
                id="username"
                placeholder="CosmicExplorer"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="border-cyan-800 bg-gray-900/50 text-cyan-50 placeholder:text-cyan-500/50 focus:border-cyan-500 focus:ring-cyan-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyan-200">
                Password
              </Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="w-full border-cyan-800 bg-gray-900/50 text-cyan-50 placeholder:text-cyan-500/50 focus:border-cyan-500 focus:ring-cyan-500/20"
              />
            </div>

            {isLoading && <SciFiLoadingBar />}

            <Button
              className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-violet-700 to-blue-700 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              disabled={isLoading}
              onClick={handleRegisterClick}
            >
              <span className="relative">
                {isLoading ? "Initializing..." : "Create Account"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-30" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
