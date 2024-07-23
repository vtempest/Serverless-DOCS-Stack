<script lang="ts">
  import { Button } from "$components/ui/button";
  import { route } from "$lib/ROUTES";

  import * as DropdownMenu from "$components/ui/dropdown-menu";
  import * as Avatar from "$components/ui/avatar";

  import CircleUser from "lucide-svelte/icons/circle-user";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import Lock from "lucide-svelte/icons/lock";
  import LogOut from "lucide-svelte/icons/log-out";
  import Settings from "lucide-svelte/icons/settings";

  import type { User } from "lucia";
  import { enhance } from "$app/forms";

  type Props = {
    user: User;
  };

  let { user }: Props = $props();

  let initials = $state("");

  $effect(() => {
    initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  });
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="ghost" builders={[builder]} class="relative size-10 rounded-full">
      <Avatar.Root class="size-10">
        <!-- <Avatar.Image src={user.avatarUrl} alt={`${user.name} avatar`} /> -->
        <Avatar.Fallback>
          {initials}
        </Avatar.Fallback>
      </Avatar.Root>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="end">
    <DropdownMenu.Label class="font-normal">
      <div class="flex flex-col space-y-1">
        <p class="text-sm font-medium leading-none">{user.name}</p>
        <p class="text-xs leading-none text-muted-foreground">{user.email}</p>
      </div>
    </DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <Button variant="ghost" class="h-6 w-full justify-start p-0" href={route("/app/profile")}>
          <CircleUser class="mr-1 size-5" />
          Profile
        </Button>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Button variant="ghost" class="h-6 w-full justify-start p-0" href={route("/app/billing")}>
          <CreditCard class="mr-1 size-5" />
          Billing
        </Button>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Button variant="ghost" class="h-6 w-full justify-start p-0" href={route("/app/settings")}>
          <Settings class="mr-1 size-5" />
          Settings
        </Button>
      </DropdownMenu.Item>
      {#if user.isAdmin}
        <DropdownMenu.Item>
          <Button variant="ghost" class="h-6 w-full justify-start p-0" href={route("/admin")}>
            <Lock class="mr-1 size-5" />
            Admin
          </Button>
        </DropdownMenu.Item>
      {/if}
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      <LogOut class="mr-1 size-5" />
      <form method="post" action="/auth/logout" class="w-full" use:enhance>
        <Button type="submit" variant="ghost" class="h-6 w-full justify-start p-0">Logout</Button>
      </form>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
