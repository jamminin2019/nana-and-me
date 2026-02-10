"use client";
import { useQuery } from "@tanstack/react-query";

async function getHealth() {
  const res = await fetch("http://localhost:4000/admin/health/renders");
  return res.json();
}

export default function Page() {
  const { data } = useQuery({ queryKey: ["health"], queryFn: getHealth, initialData: [] });

  return (
    <main className="mx-auto max-w-5xl p-8 space-y-6">
      <h1 className="text-3xl font-bold">Nana & Me Admin Console</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="font-semibold">Template Builder</h2>
          <p className="text-sm text-slate-600">Manage ABC template versions, intro/outro, and letter prompts.</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="font-semibold">Render Health</h2>
          <pre className="text-xs mt-2 bg-slate-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </section>
    </main>
  );
}
