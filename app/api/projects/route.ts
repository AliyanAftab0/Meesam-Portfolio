import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, video_url, image_url, is_featured, skills } = body;

    const result = await sql`
      INSERT INTO projects (title, description, category, video_url, image_url, is_featured, skills)
      VALUES (${title}, ${description}, ${category}, ${video_url}, ${image_url}, ${is_featured}, ${skills})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, category, video_url, image_url, is_featured, skills } = body;

    const result = await sql`
      UPDATE projects 
      SET 
        title = ${title}, 
        description = ${description}, 
        category = ${category}, 
        video_url = ${video_url}, 
        image_url = ${image_url}, 
        is_featured = ${is_featured}, 
        skills = ${skills}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await sql`DELETE FROM projects WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
