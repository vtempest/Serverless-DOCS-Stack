<script lang="ts">
  import { route } from "$lib/ROUTES";

  import type { Snippet } from "svelte";
  import type { User } from "lucia";
  import { Input } from "$components/ui/input";
  import { Logo, ThemeSwitcher, UserDropdownMenu } from "$components/layout";

  type Props = {
    children: Snippet;
    data: {
      user: User;
    };
  };

  let { children, data }: Props = $props();
  const { user } = data;
</script>

<nav class="mx-6 my-3 flex justify-between">
  <Logo href={route("/app/dashboard")} hidden={true} />

  <div class="flex gap-2">
    <Input type="search" placeholder="Search..." class="h-10 md:w-[100px] lg:w-[300px]" />

    <ThemeSwitcher />
    <UserDropdownMenu {user} />
  </div>
</nav>

<section>
  {@render children()}
</section>
