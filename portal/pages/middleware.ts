export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard", "nutrient-groups/:path*"] };
