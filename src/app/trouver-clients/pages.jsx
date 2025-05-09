import ClientForm from "@/components/clients/ClientForm";

export default function PageTrouverClient() {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Formulaire Client</h1>
      <ClientForm />
    </main>
  );
}
