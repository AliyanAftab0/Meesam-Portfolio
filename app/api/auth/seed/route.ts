import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await auth.api.signUpEmail({
            body: {
                email: "admin@amce-daddy.com",
                password: "amcee_admin_2025",
                name: "Admin",
            },
        });

        return NextResponse.json({ 
            success: true, 
            message: "Admin user seeded successfully. You can now login at /admin/login",
            user: { email: user.user.email, name: user.user.name }
        });
    } catch (error: any) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ 
            error: "Seeding failed", 
            details: error.message 
        }, { status: 500 });
    }
}
