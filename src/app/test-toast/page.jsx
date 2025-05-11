"use clientq";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TestToast() {
  const handleSuccess = () => {
    toast.success("Bravo koka, tu as reussi !");
  };

  const handleError = () => {
    toast.error("Oups ! une erreur s'est produite");
  };

  const handleInfo = () => {
    toast.info("Juste une info !");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-white p-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Test des Toasts</h1>

      <button
        onClick={handleSuccess}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Afficher un toast 
      </button>

      <button
        onClick={handleError}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Afficher une erreur 
      </button>

      <button
        onClick={handleInfo}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Afficher une info 
      </button>
    </div>
  );
}
