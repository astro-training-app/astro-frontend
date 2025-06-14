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
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-center lg:text-left">
            Transform Your Fitness Journey
          </h1>

          <p className="text-lg sm:text-xl text-subtitle max-w-xl mb-8">
            Connect with expert coaches or build your coaching business with our
            all-in-one platform.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
            {isAuthenticated ? (
              <Button color="blue" onClick={() => router.push("/clients")}>
                Client List
              </Button>
            ) : (
              <Button color="blue" onClick={() => router.push("/register")}>
                Become a Coach
              </Button>
            )}

            <Button color="emptyBlue" onClick={() => router.push("/partners")}>
              Find a Coach
            </Button>

            {!isAuthenticated && (
              <Button color="emptyBlue" onClick={() => router.push("/login")}>
                Login
              </Button>
            )}
          </div>
        </div>

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
