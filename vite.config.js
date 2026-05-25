import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                history: resolve(__dirname, "history.html"),
            },
        },
    },
});
