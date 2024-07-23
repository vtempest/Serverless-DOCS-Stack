<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { socials, sections } from "$configs/landing/footer-links";
  
  import { Logo } from "$components/layout";

  let currentYear = $state("");

  $effect(() => {
    currentYear = new Date().getFullYear().toString();
  });
</script>

<footer >
  <hr class="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
  <div class="md:flex md:justify-between">
    <div class="mb-6 md:mb-0">
    </div>
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-6">
      {#each sections as { name, data }}
        <div>
          <h2 class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">{name}</h2>
          <ul class="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
            {#each data as { name, href }}
              <li>
                <a {href} class="hover:underline">{name}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
  <hr class="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
  <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
    <!-- <span class="text-sm text-gray-600 dark:text-gray-400">
      © {currentYear} <a href={route("/")} class="hover:underline">KSS</a>™. {"All Rights Reserved."}
    </span>
    <div class="flex gap-6">
      {#each socials as { href, component }}
        <a {href}>
          <svelte:component this={component} class="size-5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white" />
        </a>
      {/each}
    </div> -->
  </div>
</footer>
