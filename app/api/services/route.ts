import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await sql`SELECT * FROM services ORDER BY display_order ASC`;
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    await sql`
      INSERT INTO services (title, description, display_order)
      VALUES (${title}, ${description}, (SELECT COALESCE(MAX(display_order), -1) + 1 FROM services))
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, description } = await request.json();
    await sql`
      UPDATE services 
      SET title = ${title}, description = ${description}
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await sql`DELETE FROM services WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
