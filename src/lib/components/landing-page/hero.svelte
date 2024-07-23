<script lang="ts">
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { Button } from "$components/ui/button";
  import { GitHub, Drizzle, Svelte, Tailwind, Cloudflare, Shacdn, TypeScript, Pnpm, Superforms } from "$components/icons";
  import { route } from "$lib/ROUTES";
  import { APP_NAME } from "$configs/general";

</script>

<section id="hero">
   

    <h3 class="mb-8 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
      Welcome to {APP_NAME}!
    </h3>
    <div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <div class="flex flex-col gap-4">
        <p class="text-lg text-gray-600 dark:text-gray-400">
          {APP_NAME} is a SvelteKit template that comes with a lot of features and tools to help you build your next project.
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          
  Drizzle ORM - Next gen, lightweight ORM compatible with Cloudflare D1

        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400">

          OAuth Lucia - A fully typed auth library with Google oAuth sign-in and/or email signup via Resend mailer api
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400">

          Cloudflare - serverless autoscaling API and D1 database, great hosting platform with free tier
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400">

         SvelteKit - full stack interface and API routes framework
                 </p>
      </div>
      <div class="flex flex-col gap-4">
       
      </div>
</section>
