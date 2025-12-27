import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Try to create the user
        try {
            const user = await auth.api.signUpEmail({
                body: {
                    email: "admin@amce-daddy.com",
                    password: "amcee_admin_2025",
                    name: "Admin",
                    username: "admin",
                },
            });
            return NextResponse.json({ 
                success: true, 
                message: "Admin user created successfully with username 'admin'.",
                user: { email: user.user.email, username: user.user.username }
            });
        } catch (e: any) {
            // If user already exists, update their username
            if (e.message?.toLowerCase().includes("already exists") || e.code === "USER_ALREADY_EXISTS") {
                await sql`UPDATE "user" SET username = 'admin' WHERE email = 'admin@amce-daddy.com'`;
                return NextResponse.json({ 
                    success: true, 
                    message: "Existing admin user updated with username 'admin'. You can now login.",
                });
            }
            throw e;
        }
    } catch (error: any) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ 
            error: "Seeding failed", 
            details: error.message 
        }, { status: 500 });
    }
}
