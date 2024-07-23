<script lang="ts">
  import { fade } from "svelte/transition";
  import { prefersReducedMotion } from "$stores/reduced-motion.store";
  import type { Snippet } from "svelte";

  type Props = {
    /**
     * Keeps track of page path. It's used to rerender the entire page.
     */
    key: string;

    /**
     * Duration of the animation in milliseconds.
     */
    duration: number;

    children: Snippet;
  };

  let { key, duration = 300, children }: Props = $props();
</script>

{#key key}
  {#if $prefersReducedMotion}
    {@render children()}
  {:else}
    <div in:fade={{ delay: duration, duration }} out:fade={{ duration }}>
      {@render children()}
    </div>
  {/if}
{/key}
