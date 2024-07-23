<script lang="ts">
  import { APP_NAME } from "$configs/general";

  type Props = {
    href: string;
    hidden: boolean;
  };

  let { href, hidden }: Props = $props();
</script>

<a {href} class="flex items-center gap-3">
  <img src="/logo.png" class="size-9" alt={`${APP_NAME} logo`} />
  <span class="text-xl font-bold text-black dark:text-white" class:hidden class:sm:block={hidden}>{APP_NAME}</span>
</a>
