"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId || projectId === "") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="premium-blur p-12 rounded-[32px] max-w-2xl border border-accent/20">
          <h1 className="text-4xl font-heading mb-6 text-gradient">
            Sanity Studio Setup Required
          </h1>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            To use the Sanity Studio, you need to configure your Sanity Project
            ID in your environment variables.
          </p>

          <div className="bg-surface p-6 rounded-2xl text-left border border-border mb-8 overflow-hidden">
            <p className="text-accent mb-4 font-mono text-sm uppercase tracking-widest">
              Steps to fix:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-foreground/80">
              <li>
                Create a project at{" "}
                <a
                  href="https://sanity.io/manage"
                  target="_blank"
                  className="text-accent hover:underline"
                >
                  sanity.io/manage
                </a>
              </li>
              <li>
                Copy your <strong>Project ID</strong>
              </li>
              <li>
                Add it to your <code>.env.local</code> file:
              </li>
            </ol>
            <pre className="mt-4 p-4 bg-black/50 rounded-lg text-accent/90 font-mono text-sm">
              NEXT_PUBLIC_SANITY_PROJECT_ID="your-id-here"
            </pre>
          </div>

          <p className="text-sm text-text-secondary">
            After updating the file, restart your development server.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
