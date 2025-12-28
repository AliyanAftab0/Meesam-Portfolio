import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

// baseURL is automatically inferred by Better Auth in Next.js
export const authClient = createAuthClient({
    plugins: [
        usernameClient()
    ]
});
