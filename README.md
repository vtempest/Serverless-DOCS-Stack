![](https://i.imgur.com/6r83blS.png)

![GitHub Discussions](https://img.shields.io/github/discussions/vtempest/Serverless-DOCS-Stack)![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)![](https://github.com/codespaces/badge.svg)

### [Live Demo](https://serverless-docs-stack.vtempest.workers.dev) 

### ⚒️ Serverless DOCS Stack: Drizzle OAuth Cloudflare Svelte

📚 [Drizzle ORM](https://orm.drizzle.team/kit-docs/quick) - lightweight ORM compatible with Cloudflare D1 and drizzle-kit to manage schema migrations

👤 [OAuth Lucia](https://github.com/lucia-auth/lucia) - Google oAuth sign-in and/or email signup via Resend mailer api, with 4 email templates: reset password, change email, verify email, welcome. Settings and admin panel for users.

☁️ [Cloudflare for Svelte](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/) - serverless autoscaling API and D1 database, great hosting platform with free tier

🖼️ [SvelteKit](https://github.com/sveltejs/kit) - full stack interface and API routes framework. Many developers prefer [Svelte over React](https://shakuro.com/blog/svelte-vs-react).

### 🧩 Interface Components:

🎨 [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) + [Bits UI](https://github.com/huntabyte/bits-ui) +  
[shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) - popular UI components, with demos like [Sidebar examples](https://next.shadcn-svelte.com/blocks) and [Magic UI Animations](https://animation-svelte.vercel.app/magic)

📝 [formsnap](https://github.com/svecosystem/formsnap) + [sveltekit-superforms](https://github.com/ciscoheat/sveltekit-superforms) + [zod](https://github.com/colinhacks/zod) - forms with Zod validation and [rate-limiting](https://github.com/ciscoheat/sveltekit-rate-limiter) in server-memory

📱 [lucide](https://github.com/lucide-icons/lucide) - icons

🛣️ [vite-plugin-kit-routes](https://github.com/jycouet/kitql/tree/main/packages/vite-plugin-kit-routes) - url routes

🌲 [pino](https://github.com/pinojs/pino) - logging

✅ [Vitest](https://vitest.dev/guide/ui) - unit testing web UI

⭐ _Extra Alternatives_: [List of Svelte Libraries](https://github.com/TheComputerM/awesome-svelte#ui-libraries), [Material UI](https://sveltematerialui.com/INSTALL.md), [SkeletonUI](https://www.skeleton.dev/components/app-rail), [Flowbite](https://flowbite-svelte.com/docs/pages/introduction), [Icon sets](https://www.svgrepo.com/collections)

### 🖼️ Sreenshots

![](https://i.imgur.com/jIaL6yP.png)![](https://i.imgur.com/NlkjlWI.png)

### ⬇️ Installation

Install prerequisites Node.js or Bun `curl -fsSL https://bun.sh/install | bash`. Optional: Setup shell with dev tools like nvim, fish, system info with [Server-Shell-Setup](https://github.com/vtempest/Server-Shell-Setup)

Clone to localhost or server `git clone https://github.com/vtempest/Serverless-DOCS-Stack`.  
Optional: Press `.` when on the Github repo page to fork and run in Github Workspaces.

CD to project directory `cd docs-stack-starter`.

Install dependencies `bun install`.

`mv .env.example .env ; mv wrangler.example.toml wrangler.toml` and set the domain and API keys in `.env`.

Auth providers, get id/secret from [Google](https://console.cloud.google.com/apis/credentials).

Set OAuth origin `http://localhost` and `http://localhost:5173` on local or `https://domain.com` on server.

Set redirect `http://localhost:5173/auth/oauth/google/callback` or `https://api.domain.com/auth/oauth/google/callback`.

Optional: For email auth, get API from [Resend](https://resend.com/api-keys) mailer and verify domain.

Log in with your Cloudflare account by running: `bunx wrangler login`.

Create your D1 database via dashboard or with `bunx wrangler d1 create my-db-prod`.

Copy the console output database\_name and database\_id.

Go to `wrangler.toml` and change `database_name` and `database_id`.

Go to `drizzle.config.ts` and change db name in `dbName`.

Go to `package.json` and change db name in `db:push:*` and `db:backup:prod`.

Generate and migrate the schema to dev or prod db: `bun run db:migrate; bun run db:push:dev; bun run db:push:prod`.

Develop on local with `bun dev`.

Deploy to prod with `bun serve`.

Domain: [Cloudflare Dashboard](https://dash.cloudflare.com) -> Workers and Pages -> \[your worker name\] -> Settings

Add-to-Home on Mobile Web: Design logo and generate icons for with [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) or [Favicon.io](https://favicon.io)

User Analytics: Get Google Analytics ID from [Google Analytics](https://support.google.com/analytics/answer/9539598?hl=en) or [SimpleAnalytics](https://www.simpleanalytics.com) and add to `app.html`.

Email Forwarding: Setup [Cloudflare Email Routing](https://blog.cloudflare.com/introducing-email-routing/) and [GMail's Send From Verification](https://support.google.com/mail/answer/22370?hl=en)