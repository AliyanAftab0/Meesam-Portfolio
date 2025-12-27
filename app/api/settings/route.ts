import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await sql`SELECT key, value FROM site_settings`;
    const settingsMap = settings.reduce((acc: any, { key, value }: { key: string; value: any }) => {
      acc[key] = value;
      return acc;
    }, {});
    return NextResponse.json(settingsMap);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body; // Object with key-value pairs

    for (const [key, value] of Object.entries(settings)) {
      await sql`
        INSERT INTO site_settings (key, value)
        VALUES (${key}, ${value as string})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings Update Error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
