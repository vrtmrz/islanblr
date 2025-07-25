import { Hono } from "hono";
import { serveStatic } from "hono/deno";

import api from "./route/api.ts";

const app = new Hono();

app.route("/api", api);

app.use(
    "*",
    serveStatic({
        root: "./static",
    }),
);
if (Deno.env.get("NODE_ENV") !== "development") {
    console.log("[RUN] Serving static files is enabled in development mode.");
    app.use(
        "*",
        serveStatic({
            root: "./static_app",
        }),
    );
} else {
    console.log("Serving static files is not enabled in development mode.");
}
app.all("*", (c) => {
    return c.text("Not Found", 404);
});

export default app;
