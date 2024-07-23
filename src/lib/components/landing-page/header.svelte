<script lang="ts">
  import { Button } from "$components/ui/button";
  import { navLinks } from "$configs/landing/header-links";
  import type { User } from "lucia";
  import { enhance } from "$app/forms";
  import { route } from "$lib/ROUTES";
  
  import { ThemeSwitcher, Logo } from "$components/layout";

  type Props = { user: User | null };

  let { user }: Props = $props();
</script>

<header class="border-b border-gray-500 py-4 dark:border-gray-600">
  <nav class="flex justify-between">
    <Logo href={route("/")} hidden={true} />

    <ul class="hidden lg:flex lg:flex-row lg:font-medium">
      {#each navLinks as { name, href }}
        <li>
          <Button {href} variant="link" class="text-md text-black dark:text-white">
            {name}
            <span class="sr-only">{name}</span>
          </Button>
        </li>
      {/each}
    </ul>
    <div class="flex gap-2">
      <ThemeSwitcher />
      {#if user}
        <form method="post" action="/auth/logout" use:enhance>
          <Button type="submit" variant="outline">{"Logout"}</Button>
        </form>
        <Button href={route("/app/dashboard")}>
          {"Dashboard"}
          <span class="sr-only">{"Dashboard"}</span>
        </Button>
      {:else}
        <Button href={route("/auth/login")} variant="secondary">
          {"Login"}
          <span class="sr-only">{"Login"}</span>
        </Button>
        <Button href={route("/auth/register")}>
          {"Register"}
          <span class="sr-only">{"Register"}</span>
        </Button>
      {/if}
    </div>
  </nav>
</header>
