"use-client";

{
  /* route pour la page trouver un coach */
}

export default function TrouverCoach() {
  const coachs = [
    {
      id: 1,
      nom: "Jean Dupont",
      email: "jean.dupont@fitcoach.com",
      bio: "Coach certifié, spécialisé en musculation.",
    },
    {
      id: 2,
      nom: "Claire Martin",
      email: "claire.martin@fitcoach.com",
      bio: "Coach forme et bien-être, yoga et pilates.",
    },
    {
      id: 3,
      nom: "Ahmed Ben",
      email: "ahmed.ben@fitcoach.com",
      bio: "Coach sportif à domicile, nutrition et cardio.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Trouver un coach</h2>
      <ul className="space-y-6">
        {coachs.map((item) => {
          return (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.nom}
              </h3>
              <p className="text-gray-600">{item.bio}</p>
              <p className="text-sm text-gray-500 italic">{item.email}</p>
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Contacter
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
