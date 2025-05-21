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
      <div className="flex h-[60vh] flex-initial">
        <div className="flex flex-col items-start justify-center px-4 py-8 bg-background">
          {/* Titre principal */}

          <h1 className="text-7xl font-bold mb-6">
            Transform Your Fitness Journey
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-subtitle max-w-xl mb-8">
            Connect with expert coaches or build your coaching business with our
            all-in-one platform.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button color="blue" onClick={() => router.push("/devenir-coach")}>
              Become a Coach
            </Button>
            <Button
              color="emptyBlue"
              onClick={() => router.push("/trouver-coach")}
            >
              Find a Coach
            </Button>
            <Button color="emptyBlue" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>

          {/* Illustration */}
        </div>
        <Image
          src="/img/coach-homepage.jpg"
          alt="Sport illustration"
          width={256}
          height={256}
          className="rounded "
        />
      </div>
    </MotionLayoutWrapper>
  );
}
