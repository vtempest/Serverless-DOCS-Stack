##  Serverless DOCS Stack 

### [Live Demo](https://serverless-docs-stack.vtempest.workers.dev)

### ⚒️ Drizzle OAuth Cloudflare Svelte 

📚 [Drizzle ORM](https://orm.drizzle.team/kit-docs/quick) - lightweight ORM compatible with Cloudflare D1 and drizzle-kit  to manage schema migrations

👤 [OAuth Lucia](https://github.com/lucia-auth/lucia) - Google oAuth sign-in and/or email signup via Resend mailer api, with 4 email templates: reset password, change email, verify email, welcome. Settings and admin panel for users.

☁️ [Cloudflare for Svelte](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/) - serverless autoscaling API and D1 database, great hosting platform with free tier

🖼️ [SvelteKit](https://github.com/sveltejs/kit) - full stack interface and API routes framework

### 🧩 Interface Components:

🎨 [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) + [Bits UI](https://github.com/huntabyte/bits-ui) + [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) - popular UI components which can be AI-generated at [v0.dev](https://v0.dev)

📝 [formsnap](https://github.com/svecosystem/formsnap) + [sveltekit-superforms](https://github.com/ciscoheat/sveltekit-superforms) + [zod](https://github.com/colinhacks/zod) - form validation

📱 [lucide](https://github.com/lucide-icons/lucide) -  icons

🛣️ [vite-plugin-kit-routes](https://github.com/jycouet/kitql/tree/main/packages/vite-plugin-kit-routes) - url routes

🌲 [pino](https://github.com/pinojs/pino) - logging


### Sreenshots

<img width="200px" src="https://i.imgur.com/jIaL6yP.png" />

<img  width="200px" src="https://i.imgur.com/NlkjlWI.png" />

### ⬇️ Installation

1. Install prerequisites Node.js or Bun `curl -fsSL https://bun.sh/install | bash`
2. Clone to localhost or server `git clone https://github.com/vtempest/docs-stack-starter`
3. `mv .env.example .env` and set the domain and API keys in `.env` 
4. Auth providers, get id/secret from [Google](https://console.cloud.google.com/apis/credentials) 
5. Set OAuth origin `http://localhost` and `http://localhost:5173` on local or `https://domain.com` on server
6. Set redirect `http://localhost:5173/auth/oauth/google/callback` or `https://api.domain.com/auth/oauth/google/callback`
7. For email auth, get API from [Resend](https://resend.com/api-keys) mailer and verify domain
8. Log in with your Cloudflare account by running: `bunx wrangler login`
9. Create your D1 database via dashboard or with `bunx wrangler d1 create my-db-prod`
10. Copy the console output database_name and database_id
11. Go to `wrangler.toml` and change `database_name` and `database_id`.
12. Go to `drizzle.config.ts` and change db name in `dbName`.
13. Go to `package.json` and change db name in `db:push:*`.
14. Generate and migrate the schema to dev or prod db: `bun run db:migrate; bun run db:push:dev; bun run db:push:prod`
15. Develop on local with `bun run dev` 
16. Deploy to prod  with `bun run deploy` 

