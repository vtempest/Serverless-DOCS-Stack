<script lang="ts">
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { Button } from "$components/ui/button";
  import { APP_NAME } from "$lib/middleware/config";

</script>

<section id="hero" class="min-h-screen flex items-center justify-center">
   

    <h3 class="mb-8 text-6xl font-bold  lg:text-8xl">
      Welcome to {APP_NAME}!
    </h3>
    <div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <div class="flex flex-col gap-4">
        <p class="text-2xl ">
          {APP_NAME} is a SvelteKit template that comes with a lot of features and tools to help you build your next project.
        </p>
        <p class="text-2xl ">
        Drizzle ORM - Next gen, lightweight ORM compatible with Cloudflare D1

        </p>
        <p class="text-2xl ">
          OAuth Lucia - A fully typed auth library with Google oAuth sign-in and/or email signup via Resend mailer api
        </p>
        <p class="text-2xl ">
          Cloudflare - serverless autoscaling API and D1 database, great hosting platform with free tier
        </p>
        <p class="text-2xl ">
         SvelteKit - full stack interface and API routes framework
                 </p>
      </div>
      <div class="flex flex-col gap-4">
       
      </div>
</section>
