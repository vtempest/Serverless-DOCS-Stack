<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { Input } from "$components/ui/input";
  import { Button } from "$components/ui/button";
  import * as Form from "$components/ui/form";
  import * as Card from "$components/ui/card";
  import { PasswordStrength } from "$components/layout";
  import { GitHub, Google } from "$components/icons";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { registerFormSchema } from "$validations/auth";
  import { route } from "$lib/ROUTES";
  import * as flashModule from "sveltekit-flash-message/client";
  import { passwordStrength, type FirstOption, type Result, type Option } from "check-password-strength";
  import Eye from "lucide-svelte/icons/eye";
  import EyeOff from "lucide-svelte/icons/eye-off";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  

  let { data } = $props();

  // TODO rename this
  let isPasswordFieldFocused = $state(false);
  let revealPassword = $state(false);
  let passwordInputType = $derived(revealPassword ? "text" : "password");

  const form = superForm(data.form, {
    validators: zodClient(registerFormSchema),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });
  const { form: formData, enhance, delayed } = form;


  const customOptions: [FirstOption<string>, ...Option<string>[]] = [
    { id: 0, value: "Too weak", minDiversity: 0, minLength: 0 },
    { id: 1, value: "Weak", minDiversity: 1, minLength: 6 },
    { id: 2, value: "Medium", minDiversity: 2, minLength: 6 },
    { id: 3, value: "Strong", minDiversity: 3, minLength: 8 }
  ];

  let pwd: Result<string> = $state(passwordStrength($formData.password, customOptions));
  let myData: Array<{ name: string; isDone: boolean }> = $derived([
    { name: "Minimum number of characters is "+8, isDone: pwd.length >= 8 },
    { name: "Must contain lowercase.", isDone: pwd.contains.includes("lowercase") },
    { name: "Must contain uppercase.", isDone: pwd.contains.includes("uppercase") },
    { name: "Must contain numbers.", isDone: pwd.contains.includes("number") },
    { name: "Must contain special characters.", isDone: pwd.contains.includes("symbol") }
  ]);

  $effect(() => {
    pwd = passwordStrength($formData.password, customOptions);
  });
</script>

<Card.Header class="space-y-1">
  <Card.Title class="text-2xl">{ "Create an account"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="grid grid-cols-2 gap-6">
    <!-- <Button variant="outline" href={route("GET /auth/oauth/github")}>
      <GitHub class="mr-2 h-4 w-4" />
      { "GitHub"}
    </Button> -->
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
      <span class="bg-card px-2 text-muted-foreground"> {"or register with"} </span>
    </div>
  </div>
  <form class="flex flex-col gap-2" method="post" use:enhance>
    <Form.Field {form} name="name" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label>{"Name"}</Form.Label>
        <Input {...attrs} type="name" bind:value={$formData.name} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Field {form} name="email" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label>{"Email" }</Form.Label>
        <Input {...attrs} type="email" bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors class="h-4 text-xs" />
    </Form.Field>
    <Form.Field {form} name="password" class="relative mb-2 space-y-1">
      <Form.Control let:attrs>
        <Form.Label>{"Password"}</Form.Label>
        <Input
          {...attrs}
          type={passwordInputType}
          bind:value={$formData.password}
          onfocus={() => (isPasswordFieldFocused = true)}
          onblur={() => (isPasswordFieldFocused = false)}
        />
        <Button variant="ghost" class="absolute right-1 top-7 size-8 p-0" on:click={() => (revealPassword = !revealPassword)}>
          {#if passwordInputType === "text"}
            <Eye size={22} />
          {:else}
            <EyeOff size={22} />
          {/if}
        </Button>
        {#if isPasswordFieldFocused}
          <PasswordStrength {pwd} {myData}></PasswordStrength>
        {/if}
      </Form.Control>
      <Form.FieldErrors let:errors class="h-4 text-xs">
        {#if errors[0]}
          {errors[0]}
        {/if}
      </Form.FieldErrors>
    </Form.Field>
    <Form.Field {form} name="passwordConfirm" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label>{ "Password confirm"}</Form.Label>
        <Input {...attrs} type="password" bind:value={$formData.passwordConfirm} />
      </Form.Control>
      <Form.FieldErrors let:errors class="h-4 text-xs">
        {#if errors[0]}
          {errors[0]}
        {/if}
      </Form.FieldErrors>
    </Form.Field>
    <Form.Button type="submit" class="mt-4" disabled={$delayed}>
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> {"Loading..."}
      {:else}
        {"Register"}
      {/if}
    </Form.Button>
  </form>
</Card.Content>
<Card.Footer>
  <p class="text-sm">
    {"Already have an account?"} <a href={route("/auth/login")} class="font-medium hover:underline">Login</a>
  </p>
</Card.Footer>
