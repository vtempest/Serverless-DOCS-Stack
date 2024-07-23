<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import * as Form from "$components/ui/form";
  import { Input } from "$components/ui/input";
  import * as Card from "$components/ui/card";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { loginFormSchema } from "$validations/auth";
  import { Button } from "$components/ui/button";
  import { GitHub, Google } from "$components/icons";
  import { route } from "$lib/ROUTES.js";
  import * as flashModule from "sveltekit-flash-message/client";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  

  let { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(loginFormSchema),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });

  const { form: formData, enhance, delayed } = form;

</script>

<Card.Header class="space-y-1">
  <Card.Title class="text-2xl">{"Login to your account"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="grid grid-cols-2 gap-6">
    <Button variant="outline" href={route("GET /auth/oauth/github")}>
      <GitHub class="mr-2 h-4 w-4" />
      { "GitHub"}
    </Button>
    <Button variant="outline" href={route("GET /auth/oauth/google")}>
      <Google class="mr-2 h-4 w-4" />
      { "Google"}
    </Button>
  </div>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t"></span>
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-card px-2 text-muted-foreground"> {"or login with"
} </span>
    </div>
  </div>
  <form class="flex flex-col gap-2" method="post" use:enhance>
    <Form.Field {form} name="email" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label>{"Email" }</Form.Label>
        <Input {...attrs} type="email" bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Field {form} name="password" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label>{"Password"}</Form.Label>
        <Input {...attrs} type="password" bind:value={$formData.password} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <a href={route("/auth/reset-password")} class="flex justify-end text-right text-sm font-medium hover:underline">
      {"Forgot password?"}
    </a>
    <Form.Button type="submit" disabled={$delayed}>
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> {"Loading..."}
      {:else}
        Login
      {/if}
    </Form.Button>
  </form>
</Card.Content>
<Card.Footer>
  <p class="text-sm">
    {"Don't have an account yet?"}
    <a href={route("/auth/register")} class="font-medium hover:underline">
      {"Register"}
    </a>
  </p>
</Card.Footer>
