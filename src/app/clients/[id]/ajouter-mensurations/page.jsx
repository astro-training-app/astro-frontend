"use client";

import { useParams } from "next/navigation";
import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";

export default function AjouterMensurationsPage() {
  const { id } = useParams();
  const [mensurations, setMensurations] = useState([]);

  useEffect(() => {
    const fetchMensurations = async () => {
      const res = await fetch(
        `http://localhost:3000/api/mensurations/client/${id}`
      );
      const data = await res.json();
      setMensurations(data);
    };

    fetchMensurations();
  }, [id]);


  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ajouter une mensuration pour le client #{id}
      </h1>

      <FormulaireMensurations clientId={id} />
    </main>
  );
}
