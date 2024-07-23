<script lang="ts">
  import { slide } from "svelte/transition";
  import type { Result } from "check-password-strength";
  import Check from "lucide-svelte/icons/check";
  import X from "lucide-svelte/icons/x";
  

  type Props = { pwd: Result<string>; myData: Array<{ name: string; isDone: boolean }> };

  let { pwd, myData }: Props = $props();
</script>

<div class="!mt-2 flex h-2 w-full flex-row items-stretch gap-1">
  {#each Array(4).keys() as i}
    {#if pwd.id === 0}
      <span class:bg-red-600={pwd.length > 0 && i <= pwd.id} class="grow rounded border"></span>
    {:else if pwd.id === 1}
      <span class:bg-orange-600={i <= pwd.id} class="grow rounded border"></span>
    {:else if pwd.id === 2}
      <span class:bg-yellow-600={i <= pwd.id} class="grow rounded border"></span>
    {:else if pwd.id === 3}
      <span class:bg-green-600={i <= pwd.id} class="grow rounded border"></span>
    {/if}
  {/each}
</div>
<div transition:slide class="rounded-lg border py-2 pl-4">
  <div id="hs-strong-password-hints">
    <div>
      <span class="text-sm text-gray-800 dark:text-gray-200">{"Level:"} <span class="font-bold">{pwd.value}</span></span>
    </div>

    <h4 class="my-2 text-sm text-gray-800 dark:text-white">{"Your password must contain:"}</h4>

    <ul class="space-y-1 text-sm text-gray-500">
      {#each myData as { name, isDone }}
        <li class="flex items-center gap-x-2" class:text-green-600={isDone}>
          <span class:hidden={!isDone}>
            <Check class="size-4" color="green" />
          </span>

          <span class:hidden={isDone}>
            <X class="size-4" />
          </span>
          {name}
        </li>
      {/each}
    </ul>
  </div>
</div>
