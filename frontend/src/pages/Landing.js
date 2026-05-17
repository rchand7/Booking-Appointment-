export default function Landing() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">
        Recover Lost Revenue from Denials
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Expert RCM consulting to increase collections and reduce denials.
      </p>

      <a href="/booking">
        <button className="bg-blue-600 text-white px-6 py-3 mt-6 rounded hover:bg-blue-700">
          Book Free Consultation
        </button>
      </a>
    </div>
  );
}