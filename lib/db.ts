import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Project } from "@/types/project";
import * as schema from "./schema";

let sqlInstance: any = null;
let dbInstance: any = null;

const getSql = () => {
  if (sqlInstance) return sqlInstance;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not defined in .env.local");
  }
  sqlInstance = neon(url);
  return sqlInstance;
};

export const db = drizzle(getSql(), { schema });

// Use this for all raw queries
export const sql = (...args: any[]) => (getSql() as any)(...args);

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await sql`
      SELECT * FROM projects 
      WHERE is_featured = true 
      ORDER BY created_at DESC 
      LIMIT 6
    `;
    return projects as Project[];
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await sql`
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `;
    return projects as Project[];
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projects = await sql`
      SELECT * FROM projects 
      WHERE id = ${id}
      LIMIT 1
    `;
    return projects[0] as Project || null;
  } catch (error) {
    console.error("Error fetching project by id:", error);
    return null;
  }
}

export async function getSettings() {
  try {
    const settings = await sql`SELECT key, value FROM site_settings`;
    return settings.reduce((acc: any, { key, value }: { key: string; value: any }) => {
      acc[key] = value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export async function getServices() {
  try {
    const services = await sql`SELECT * FROM services ORDER BY display_order ASC`;
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
