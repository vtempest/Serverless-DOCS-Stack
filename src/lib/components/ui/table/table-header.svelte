<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils/style-transitions";

  type $$Props = HTMLAttributes<HTMLTableSectionElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<thead class={cn("[&_tr]:border-b", className)} {...$$restProps} on:click on:keydown>
  <slot />
</thead>
