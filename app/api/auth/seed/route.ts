import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Starting two-step seed process...");
        
        let user;
        try {
            // Step 1: Create user with standard email/password
            user = await auth.api.signUpEmail({
                body: {
                    email: "admin@amce-daddy.com",
                    password: "amcee_admin_2025",
                    name: "Admin",
                },
            });
            console.log("Step 1 success: User created via signUpEmail");
        } catch (e: any) {
            console.error("signUpEmail step failed:", e.message);
            // If user already exists, we'll try to update it in the next step
            if (!e.message?.toLowerCase().includes("already exists") && e.code !== "USER_ALREADY_EXISTS" && e.status !== 422) {
                throw e;
            }
        }

        // Step 2: Manually set the username via raw SQL
        console.log("Step 2: Updating username manually...");
        await sql`UPDATE "user" SET username = 'admin' WHERE email = 'admin@amce-daddy.com'`;
        
        return NextResponse.json({ 
            success: true, 
            message: "Admin account initialized and username set to 'admin'. You can now login.",
        });

    } catch (error: any) {
        console.error("Seed Process Failed:", error);
        return NextResponse.json({ 
            error: "Seeding failed", 
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
