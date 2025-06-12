import Link from "next/link";

export default function ClientCard({ client, onDelete }) {
  const {
    id,
    first_name,
    last_name,
    email,
    age,
    gender,
    goal,
    created_at,
    photo,
  } = client;
  const genderLabel =
    gender === "M" ? "Men" : gender === "W" ? "Women" : "Other";

  return (
    <Link href={`/clients/${client.id}/measurements`} className="block group">
      <div className="border border-subtitle rounded-2xl shadow p-6 w-full max-w-[420px] mx-auto group-hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold">
            {photo ? (
              <img
                src={photo}
                alt={`${first_name} ${last_name}`}
                className="w-full h-auto object-cover rounded-md"
              />
            ) : (
              `${first_name[0]}${last_name[0]}`
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {first_name} {last_name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-300">
          <p>
            <span className="font-medium">Age :</span> {age}
          </p>
          <p>
            <span className="font-medium">Gender :</span> {genderLabel}
          </p>
          <p>
            <span className="font-medium">Goal :</span> {goal}
          </p>
          <p>
            <span className="font-medium">Created :</span>{" "}
            {new Date(created_at).toLocaleDateString()}
          </p>

          {/* Independent delete button */}
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
