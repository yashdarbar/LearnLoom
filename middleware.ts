import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/yash(.*)"]);
// const isPublicRoute = createRouteMatcher(["/api/webhook", "/api/uploadthing(.*)"]);

export default clerkMiddleware()
// export default clerkMiddleware((auth, req) => {
//     if (isProtectedRoute(req)) auth().protect();

//     if (!isPublicRoute(req)) auth().protect();
// });


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/((?!api/uploadthing).*)"],
};
