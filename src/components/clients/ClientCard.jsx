import Link from "next/link";

export default function ClientCard({ client, onDelete }) {
  const { id, prenom, nom, email, age, sexe, objectif, created_at, photo } =
    client;
  const sexeLabel = sexe === "H" ? "Man" : sexe === "F" ? "Woman" : "Other";

  return (
    <Link href={`/clients/${client.id}/mensuration`} className="block group">
      <div className="bg-white dark:bg-background dark:border rounded-2xl shadow p-6 w-full max-w-[420px] mx-auto group-hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-zinc-600 flex items-center justify-center text-xl font-bold text-white">
            {photo ? (
              <img
                src={photo}
                alt={`${prenom} ${nom}`}
                className="w-full h-auto object-cover rounded-md"
              />
            ) : (
              `${prenom[0]}${nom[0]}`
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {prenom} {nom}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-300">
          <p>
            <span className="font-medium">Age :</span> {age} years
          </p>
          <p>
            <span className="font-medium">Gender :</span> {sexeLabel}
          </p>
          <p>
            <span className="font-medium">Goal :</span> {objectif}
          </p>
          <p>
            <span className="font-medium">Registered on :</span>{" "}
            {new Date(created_at).toLocaleDateString()}
          </p>

          {/* bouton indépendant du lien */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(client.id);
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}
