export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="max-w-3xl text-center">

        {/* Badge */}
        <p className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
          Business Growth & Consulting Solutions
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Grow Your Business with
          <span className="text-blue-600"> Expert Consulting</span>
        </h1>

        {/* Sub text */}
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          We help you with job-related consultation, website & app development,
          and revenue recovery from denied claims using proven RCM strategies.
        </p>

        {/* Feature points */}
        <div className="mt-8 grid gap-3 text-gray-700 text-base">
          <p>✔ Job Consultation & Career Guidance</p>
          <p>✔ Website & App Development for Business Growth</p>
          <p>✔ Recover Lost Revenue from Insurance Denials</p>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <a href="/booking">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-blue-700 hover:scale-105 transition">
              Book Free Consultation
            </button>
          </a>
        </div>

      </div>
    </div>
  );
}
