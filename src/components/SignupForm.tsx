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
// import { motion } from "framer-motion";
// import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";

import { CosmicButton } from "./CosmicButton";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSucceededRegister, sethasSucceededRegister] = useState(false);
  const [isError, setisError] = useState(false);
  const [ErrorText, setErrorText] = useState("");

  const make_account = api.auth.register.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      // router.push("/api/auth/signin");
      if (data.error === false) {
        sethasSucceededRegister(true);
      } else if (data.error === true) {
        setisError(true);
        setErrorText(
          data.error_description ?? " An unknown error has happened ",
        );
      }
    },
  });

  function on_click() {
    setIsLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;

    make_account.mutate({
      username: username,
      email: email,
      password: password,
    });
  }

  return (
    <Card className="relative w-full max-w-md overflow-hidden bg-gray-900/90 text-cyan-50 shadow-xl shadow-cyan-500/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />

      {isError === true && (
        <div className="m-5 bg-red-700 p-5 text-white">ERROR: {ErrorText}</div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-cyan-50">
            Create Account
          </CardTitle>
          <SpinningMolecule />
        </div>
        <CardDescription className="text-cyan-200">
          Join the cosmic adventure and start playing Multiversal Mishaps today!
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {/* <CosmicButton
              onClick={() => {
                on_click();
              }}
              text={"Register"}
            /> */}
          </div>

          <div className="flex items-center justify-between">
            {hasSucceededRegister === true && (
              <CosmicButton
                className="m-5"
                text={"CLICK HERE TO LOGIN"}
                href={"/api/auth/signin"}
              />
            )}{" "}
            {/* <motion.div
              className="relative h-32 w-48"
              animate={{
                background: [
                  "linear-gradient(to right, rgb(109, 40, 217), rgb(29, 78, 216))",
                  "linear-gradient(to right, rgb(244, 63, 94), rgb(168, 85, 247))",
                  "linear-gradient(to right, rgb(34, 197, 94), rgb(59, 130, 246))",
                  "linear-gradient(to right, rgb(249, 115, 22), rgb(236, 72, 153))",
                  "linear-gradient(to right, rgb(6, 182, 212), rgb(124, 58, 237))",
                  "linear-gradient(to right, rgb(234, 179, 8), rgb(239, 68, 68))",
                  "linear-gradient(to right, rgb(16, 185, 129), rgb(99, 102, 241))",
                  "linear-gradient(to right, rgb(245, 158, 11), rgb(217, 70, 239))",
                  "linear-gradient(to right, rgb(139, 92, 246), rgb(14, 165, 233))",
                  "linear-gradient(to right, rgb(220, 38, 38), rgb(79, 70, 229))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-cyan-400"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⌬
              </motion.div>
            </motion.div> */}
            {isLoading && <SciFiLoadingBar />}
          </div>

          <Button
            className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-violet-700 to-blue-700 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            disabled={isLoading}
            onClick={() => {
              on_click();
            }}
          >
            <span className="relative">
              {isLoading ? "Initializing..." : "Create Account"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-30" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
