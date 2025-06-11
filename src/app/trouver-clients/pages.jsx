import ClientForm from "@/components/clients/ClientForm";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";

export default function PageTrouverClient() {
  return (
    <MotionLayoutWrapper>
      <main className="min-h-screen bg-gray-900 text-white py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Client Form</h1>
        <ClientForm />
      </main>
    </MotionLayoutWrapper>
  );
}
