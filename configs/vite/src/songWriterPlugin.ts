import { writeFile } from "node:fs/promises";
import type { Plugin } from "vite";
import { songFilePath, songsDir } from "./songDir";

interface SaveBody {
  id: string;
  data: unknown;
}

/**
 * Dev-only `/__save-song` endpoint that overwrites `${SONGS_DIR}/${id}.json`.
 * Updates an existing preset only — it 404s rather than silently creating a
 * new file in `SONGS_DIR`.
 */
export function songWriterPlugin(): Plugin {
  return {
    name: "song-print:song-writer",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__save-song", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const { id, data } = JSON.parse(Buffer.concat(chunks).toString("utf8")) as SaveBody;

          const dir = songsDir();
          if (!dir) {
            res.statusCode = 400;
            res.end("SONGS_DIR is not set — nothing to save to");
            return;
          }

          const path = await songFilePath(dir, id);
          if (!path) {
            res.statusCode = 404;
            res.end(`no preset "${id}" in SONGS_DIR`);
            return;
          }

          await writeFile(path, JSON.stringify(data, null, 2) + "\n", "utf8");

          res.statusCode = 204;
          res.end();
        } catch (e) {
          res.statusCode = 400;
          res.end((e as Error).message);
        }
      });
    },
  };
}
