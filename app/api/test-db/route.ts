import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Direct Drizzle test starting...");
        const result = await db.insert(schema.user).values({
            id: "test-" + Date.now(),
            name: "Test User",
            email: "test-" + Date.now() + "@example.com",
            emailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning();
        
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("Direct Drizzle test failed:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message,
            stack: error.stack,
            detail: error.detail // postgres specific error
        }, { status: 500 });
    }
}
