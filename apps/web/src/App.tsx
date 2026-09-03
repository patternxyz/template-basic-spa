import { useEffect, useState } from "react";

type HelloResponse = {
  message: string;
};

type ApiState =
  | { status: "loading"; message: string }
  | { status: "ready"; message: string }
  | { status: "error"; message: string };

const technologies = [
  {
    name: "React 19",
    description: "Interactive, component-based framework for user interfaces.",
  },
  {
    name: "Single Page App",
    description: "Fast client-side experience served from one HTML entry point.",
  },
  {
    name: "Vite 8",
    description: "Fast development server with hot reload and optimized builds.",
  },
  {
    name: "Tailwind CSS 4",
    description: "Rapid, consistent styling with utility classes.",
  },
  {
    name: "NestJS 11",
    description: "Modular, testable backend application structure.",
  },
  {
    name: "Express 5",
    description: "Serves the API and compiled SPA together for simple deployments.",
  },
  {
    name: "TypeScript 7",
    description: "Strict type safety across the frontend and backend.",
  },
  {
    name: "npm workspaces",
    description: "Web app and API packages in one repository with shared dependencies.",
  },
  {
    name: "PostgreSQL + TypeORM",
    description: "Relational persistence with typed database access.",
  },
  {
    name: "Node.js 22.22",
    description: "Stable, modern JavaScript production runtime for the backend.",
  },
  {
    name: "Docker",
    description: "Packages the entire application into a portable image.",
  },
  {
    name: "GitHub Actions + Cloud Run",
    description: "Automated validation and deployment to managed infrastructure.",
  },
];

export default function App() {
  const [api, setApi] = useState<ApiState>({
    status: "loading",
    message: "Contacting the API…",
  });

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json() as Promise<HelloResponse>;
      })
      .then(({ message }) => setApi({ status: "ready", message }))
      .catch(() => setApi({ status: "error", message: "The API is currently unavailable." }));
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-end px-6 py-12">
          <nav aria-label="Main navigation" className="flex gap-5 text-sm">
            <a href="#home">Home</a>
            <a href="#api-status">API status</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-12">
        <section id="home">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">
            SPA Template
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-7xl">
            Accelerate your next single-page app.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A focused monorepo for building single-page React applications with a typed API,
            PostgreSQL persistence, container-based deployment, and optional Google Cloud setup.
          </p>

          <ul className="mt-8 grid max-w-5xl list-disc gap-x-10 gap-y-2 pl-5 text-slate-700 md:grid-cols-3">
            {technologies.map(({ name, description }) => (
              <li key={name}>
                <strong className="block font-medium text-slate-950">{name}</strong>
                {description}
              </li>
            ))}
          </ul>

          <div className="mb-12 flex flex-wrap justify-center gap-4 pt-32">
            <a
              className="rounded-md bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800 hover:text-white"
              href="#api-status"
            >
              Check the API Status
            </a>
          </div>
        </section>

        <section className="scroll-mt-8 border-t border-slate-200 pt-16" id="api-status">
          <p className="text-sm font-semibold tracking-widest text-blue-700 uppercase">
            End-to-end example
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">API status</h2>
          <dl
            aria-live="polite"
            className="mt-8 grid max-w-md grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <dt className="text-slate-500">Status</dt>
            <dd
              className={
                api.status === "ready"
                  ? "font-medium text-emerald-700"
                  : api.status === "error"
                    ? "font-medium text-red-700"
                    : "font-medium text-slate-500"
              }
            >
              {api.status === "ready"
                ? "Available"
                : api.status === "error"
                  ? "Unavailable"
                  : "Loading"}
            </dd>
            <dt className="text-slate-500">Endpoint</dt>
            <dd className="font-medium text-slate-950">GET /api/hello</dd>
            <dt className="text-slate-500">Response</dt>
            <dd className="font-medium text-slate-950">{api.message}</dd>
          </dl>
        </section>
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-slate-500">
          <p className="pt-1">
            Repository Maintained by <span className="font-medium text-slate-700">Pattern X</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
