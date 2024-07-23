<script lang="ts">
  import { Button, buttonVariants } from "$components/ui/button";
  import { route } from "$lib/ROUTES";
  import * as Table from "$components/ui/table";
  import Check from "lucide-svelte/icons/check";
  import Pencil from "lucide-svelte/icons/pencil";
  import Trash2 from "lucide-svelte/icons/trash-2";
  import X from "lucide-svelte/icons/x";
  import { Input } from "$components/ui/input";
  import * as AlertDialog from "$components/ui/alert-dialog";
  import * as Dialog from "$components/ui/dialog";
  import * as Form from "$components/ui/form";
  import { enhance } from "$app/forms";
  import { Label } from "$components/ui/label/index.js";
  import { Switch } from "$components/ui/switch/index.js";
  import * as Avatar from "$components/ui/avatar";
  import * as Card from "$components/ui/card";
  

  const { data } = $props();
</script>

<Card.Root>
  <Card.Header class="pb-2">
    <Card.Title class="text-2xl">{"Customers"}</Card.Title>
  </Card.Header>
  <Card.Content>
    <Table.Root class="mb-10 w-full">
      <Table.Caption>Add pagination to this table</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[40px]">Avatar</Table.Head>
          <Table.Head class="w-[50px]">ID</Table.Head>
          <Table.Head>Name</Table.Head>
          <Table.Head>Username</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head class="w-[75px]">Verified</Table.Head>
          <Table.Head class="w-[75px]">Admin</Table.Head>
          <Table.Head class="w-[200px]">Created At</Table.Head>
          <Table.Head class="w-[200px]">Modified At</Table.Head>
          <Table.Head class="w-8 px-0"></Table.Head>
          <Table.Head class="w-8 px-0"></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.users as user (user.id)}
          {@const initials = user.name
            .split(" ")
            .map((w) => w[0].toUpperCase())
            .join("")}
          <Table.Row>
            <Table.Cell>
              <Avatar.Root class="size-10">
                <!-- <Avatar.Image src={user.avatarUrl} alt={`${user.name} avatar`} /> -->
                <Avatar.Fallback>
                  {initials}
                </Avatar.Fallback>
              </Avatar.Root>
            </Table.Cell>
            <Table.Cell class="font-medium">
              <Button variant="link" href={route("/admin/customers/[userId=userId]", { userId: user.id })}>
                {user.id}
              </Button>
            </Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              {#if user.isVerified}
                <Check color="green" class="mx-auto" />
              {:else}
                <X color="red" class="mx-auto" />
              {/if}
            </Table.Cell>
            <Table.Cell>
              {#if user.isAdmin}
                <Check color="green" class="mx-auto" />
              {:else}
                <X color="red" class="mx-auto" />
              {/if}
            </Table.Cell>
            <Table.Cell>{user.createdAt.toLocaleString()}</Table.Cell>
            <Table.Cell>{user.modifiedAt?.toLocaleString()}</Table.Cell>
            <Table.Cell class="w-8 px-2">
              <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "default" }) + " size-10 !p-0"}>
                  <Pencil class="size-5" />
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update profile</Dialog.Title>
                    <Dialog.Description>Make changes to user profile here. Click save when you're done.</Dialog.Description>
                  </Dialog.Header>
                  <form method="post" action={route("updateUser /admin/customers")} use:enhance class="flex flex-col gap-4">
                    <Input name="userId" value={user.id} type="hidden" />
                    <div class="flex flex-col items-start gap-2">
                      <Label for="name">Name</Label>
                      <Input name="name" value={user.name} type="text" />
                    </div>
                    <div class="flex flex-col items-start gap-2">
                      <Label for="email">Email</Label>
                      <Input name="email" value={user.email} type="email" />
                    </div>
                    <div class="flex flex-col items-start gap-2">
                      <Label for="username">Username</Label>
                      <Input name="username" value={user.username} type="text" />
                    </div>
                    <div class="flex items-center space-x-2">
                      <Switch name="isVerified" id="isVerified" checked={user.isVerified} />
                      <Label for="isVerified">Is verified?</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Switch name="isAdmin" id="isAdmin" checked={user.isAdmin} />
                      <Label for="isAdmin">Is admin?</Label>
                    </div>
                    <Form.Button type="submit">Save changes</Form.Button>
                  </form>
                </Dialog.Content>
              </Dialog.Root>
            </Table.Cell>
            <Table.Cell class="w-8 px-1">
              <AlertDialog.Root>
                <AlertDialog.Trigger class={buttonVariants({ variant: "destructive" }) + " size-10 !p-0"}>
                  <Trash2 class="size-5" />
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Header>
                    <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                    <AlertDialog.Description>
                      This action cannot be undone. This will permanently delete this user from our servers.
                    </AlertDialog.Description>
                  </AlertDialog.Header>
                  <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <form method="post" action={route("deleteUser /admin/customers")} use:enhance>
                      <Input type="hidden" name="userId" value={user.id} />
                      <AlertDialog.Action class={buttonVariants({ variant: "destructive" })} type="submit">Submit</AlertDialog.Action>
                    </form>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card.Root>
