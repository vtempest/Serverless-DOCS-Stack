<script lang="ts">
  import type { User } from "lucia";
  import { page } from "$app/stores";

  import { Button } from "$components/ui/button";
  import { Input } from "$components/ui/input";
  import * as Sheet from "$components/ui/sheet";
  import * as Tooltip from "$components/ui/tooltip";
  import { UserDropdownMenu } from "$components/layout";

  import { route } from "$lib/ROUTES";

  import type { Snippet } from "svelte";
  import { APP_NAME } from "$configs/general";

  import Home from "lucide-svelte/icons/home";
  import Menu from "lucide-svelte/icons/menu";
  import Package from "lucide-svelte/icons/package";
  import Search from "lucide-svelte/icons/search";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import Settings from "lucide-svelte/icons/settings";
  import UsersRound from "lucide-svelte/icons/users-round";

  

  type Props = {
    children: Snippet;
    data: {
      user: User;
    };
  };

  let { children, data }: Props = $props();
  const { user } = data;

  const sidebarItems = [
    { name: "Dashboard", href: route("/admin"), icon: Home },
    { name: "Customers", href: route("/admin/customers"), icon: UsersRound },
    { name: "Orders", href: route("/admin/orders"), icon: ShoppingCart },
    { name: "Products", href: route("/admin/products"), icon: Package },
    { name: "Settings", href: route("/admin/settings"), icon: Settings }
  ];
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
  <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav class="mt-1 flex h-full flex-col items-center gap-4 px-2 py-4">
      <img src="/logo.png" class="size-8" alt={`${APP_NAME} logo`} />
      {#each sidebarItems as { name, href, icon }, i}
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              {href}
              class="flex h-9 w-9 items-center border border-gray-600 border-solid justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
              class:mt-auto={i === sidebarItems.length - 1}
              use:builder.action
              {...builder}
            >
              <svelte:component this={icon} class="h-5 w-5" />
              <span class="sr-only">{name}</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">{name}</Tooltip.Content>
        </Tooltip.Root>
      {/each}
    </nav>
  </aside>
  <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <header
      class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
    >
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
            <Menu class="h-5 w-5" />
            <span class="sr-only">{"Toggle menu"}</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="sm:max-w-xs">
          <nav class="grid gap-6 text-lg font-medium">
            <a href={route("/admin")} class="flex h-10 w-10 items-center justify-center">
              <img src="/logo.png" class="size-8" alt={`${APP_NAME} logo`} />
              <span class="sr-only">{APP_NAME}</span>
            </a>
            {#each sidebarItems as { name, href, icon }}
              <a
                {href}
                class="flex items-center gap-4 px-2.5 bg-muted/50 bg-slate-400 text-muted-foreground hover:text-foreground"
                class:text-muted-foreground={$page.url.pathname !== href}
                class:text-foreground={$page.url.pathname === href}
              >
                <svelte:component this={icon} class="h-5 w-5" />
                {name}
              </a>
            {/each}
          </nav>
        </Sheet.Content>
      </Sheet.Root>
      <div class="relative ml-auto flex-1 md:grow-0">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder={"Search..."} class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
      </div>
      <UserDropdownMenu {user} />
    </header>

    <section class="px-6 py-2">
      {@render children()}
    </section>
  </div>
</div>
