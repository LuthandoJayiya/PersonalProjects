import { useState, type FormEvent } from "react";
import { Mail, Link2, Send, CheckCircle, AlertCircle } from "lucide-react";
import type { ApiResponse } from "../interfaces/ApiResponse";

//i can split these files into seperate components but for simplicity, we will keep it in one file
// This component is a simple form to test the API endpoint
const ApiTestForm = () => {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResponse(null);
    setLoading(true);

    try {
      //i can use .env filles to store the API URL, but for simplicity i'll hardcode it
      const res = await fetch("http://localhost:3000/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url }),
      });

      console.log("Response:", res);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unknown error");
      setResponse(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-lg border bg-white text-black">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Send className="w-5 h-5 text-blue-500" /> API Test Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <Link2 className="absolute left-3 top-3 text-gray-400" />
          <input
            type="url"
            placeholder="URL to validate"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Validate
            </>
          )}
        </button>
      </form>

      {/* Success Response */}
      {response && (
        <div className="mt-6 p-4 border border-green-500 bg-green-50 rounded-xl flex gap-2">
          <CheckCircle className="text-green-500" />
          <pre className="text-sm text-green-800 whitespace-pre-wrap break-all">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 border border-red-500 bg-red-50 rounded-xl flex gap-2">
          <AlertCircle className="text-red-500" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ApiTestForm;
