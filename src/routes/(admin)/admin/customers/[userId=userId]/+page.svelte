<script lang="ts">
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { Input } from "$components/ui/input";
  import * as Form from "$components/ui/form";
  import * as flashModule from "sveltekit-flash-message/client";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { updateUserFormSchema } from "$validations/app/update-user.schema.js";

  let { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(updateUserFormSchema),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule }
  });

  const { form: formData, enhance, delayed } = form;
</script>

<form class="flex max-w-xl flex-col gap-2" method="post" use:enhance>
  <Form.Field {form} name="name" class="space-y-1">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} type="text" bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors class="h-4 text-xs" />
  </Form.Field>
  <Form.Field {form} name="email" class="space-y-1">
    <Form.Control let:attrs>
      <Form.Label>Email</Form.Label>
      <Input {...attrs} type="email" bind:value={$formData.email} />
    </Form.Control>
    <Form.FieldErrors let:errors class="h-4 text-xs">
      {#if errors[0]}
        Invalid email
      {/if}
    </Form.FieldErrors>
  </Form.Field>
  <Form.Field {form} name="username" class="space-y-1">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} type="text" bind:value={$formData.username} />
    </Form.Control>
    <Form.FieldErrors class="h-4 text-xs" />
  </Form.Field>
  <Form.Field {form} name="isVerified" class="space-y-1">
    <Form.Control let:attrs>
      <Form.Label>Is verified?</Form.Label>
      <input {...attrs} type="checkbox" bind:checked={$formData.isVerified} />
    </Form.Control>
    <Form.FieldErrors class="h-4 text-xs" />
  </Form.Field>
  <Form.Field {form} name="isAdmin" class="space-y-1">
    <Form.Control let:attrs>
      <Form.Label>Is admin?</Form.Label>
      <input {...attrs} type="checkbox" bind:checked={$formData.isAdmin} />
    </Form.Control>
    <Form.FieldErrors class="h-4 text-xs" />
  </Form.Field>
  <Form.Button type="submit" disabled={$delayed}>
    {#if $delayed}
      <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> Loading...
    {:else}
      Edit user
    {/if}
  </Form.Button>
</form>
