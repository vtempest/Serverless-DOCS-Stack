<script lang="ts">
  import { Button } from "$components/ui/button";
  import type { User } from "lucia";
  import { enhance } from "$app/forms";
  import { APP_NAME } from "$lib/middleware/config";
  
  import  ThemeSwitcher from "./theme-switcher.svelte";

  type Props = { user: User | null };

  const navLinks = [
    { name: "Home", href: ("/") },
  ]

  let { user }: Props = $props();
  let hidden = false;
</script>

<header class="border-b border-gray-500 py-4 dark:border-gray-600">
  <nav class="flex justify-between">


        
    <a href="/" class="flex items-center gap-3">
      <img src="/icons/apple-touch-icon.png" class="size-9" alt={`${APP_NAME} logo`} />
      <span class="text-xl font-bold text-black dark:text-white" class:hidden>{APP_NAME}</span>
    </a>

    <ul class="hidden lg:flex lg:flex-row lg:font-medium">
      <!-- {#each navLinks as { name, href }}
        <li>
          <Button {href} variant="link" class="text-md text-black dark:text-white">
            {name}
            <span class="sr-only">{name}</span>
          </Button>
        </li>
      {/each} -->
    </ul>
    <div class="flex gap-2">
      <ThemeSwitcher />
      {#if user}
        <form method="post" action="/auth/logout" use:enhance>
          <Button type="submit" variant="outline">{"Logout"}</Button>
        </form>
        <Button href={("/app/settings")}>
          {"Settings"}
          <span class="sr-only">{"Settings"}</span>
        </Button>
      {:else}
        <Button href={("/auth/login")} variant="secondary">
          {"Login"}
          <span class="sr-only">{"Login"}</span>
        </Button>
        <Button href={("/auth/register")}>
          {"Register"}
          <span class="sr-only">{"Register"}</span>
        </Button>
      {/if}
    </div>
  </nav>
</header>
