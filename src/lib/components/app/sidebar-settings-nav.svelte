<script lang="ts">
  import { cn } from "$lib/utils/style-transitions";
  import { page } from "$app/stores";
  import { Button } from "$components/ui/button";
  import { cubicInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  type Props = {
    items: { href: string; title: string }[];
    class?: string;
  };

  let { class: className, items }: Props = $props();

  const [send, receive] = crossfade({ duration: 250, easing: cubicInOut });
</script>

<nav class={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
  {#each items as item}
    {@const isActive = $page.url.pathname === item.href}

    <Button
      href={item.href}
      variant="ghost"
      class={cn(!isActive && "hover:underline", "relative justify-start hover:bg-transparent")}
      data-sveltekit-noscroll
    >
      {#if isActive}
        <div class="absolute inset-0 rounded-md bg-muted" in:send={{ key: "active-sidebar-tab" }} out:receive={{ key: "active-sidebar-tab" }}></div>
      {/if}
      <div class="relative">
        {item.title}
      </div>
    </Button>
  {/each}
</nav>
