"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { useAuth } from "@/contexts/AuthContext";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <MotionLayoutWrapper>
      <div className="flex flex-col-reverse lg:flex-row items-center lg:h-[60vh]">
        <div className="flex flex-col items-center lg:items-start justify-center px-4 py-8 bg-background text-center lg:text-left">
          {/* Titre principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-center lg:text-left">
            Transform Your Fitness Journey
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-subtitle max-w-xl mb-8">
            Connect with expert coaches or build your coaching business with our
            all-in-one platform.
          </p>

          {/* Boutons conditionnels */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
            {/* Si connecté → bouton Client List */}
            {isAuthenticated ? (
              <Button color="blue" onClick={() => router.push("/clients")}>
                Client List
              </Button>
            ) : (
              // Sinon → bouton Devenir Coach
              <Button
                color="blue"
                onClick={() => router.push("/devenir-coach")}
              >
                Become a Coach
              </Button>
            )}

            {/* Bouton toujours visible */}
            <Button
              color="emptyBlue"
              onClick={() => router.push("/trouver-coach")}
            >
              Find a Coach
            </Button>

            {/* Si NON connecté → bouton Login */}
            {!isAuthenticated && (
              <Button color="emptyBlue" onClick={() => router.push("/login")}>
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Illustration */}
        <Image
          src="/img/coach-homepage.jpg"
          alt="Sport illustration"
          width={256}
          height={256}
          className="rounded object-cover w-full max-w-sm mx-auto hidden lg:block"
        />
      </div>
    </MotionLayoutWrapper>
  );
}
