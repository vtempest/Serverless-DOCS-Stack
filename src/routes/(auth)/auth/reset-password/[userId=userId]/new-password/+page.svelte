<script lang="ts">
  import * as Card from "$components/ui/card";
  import * as Form from "$components/ui/form";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as flashModule from "sveltekit-flash-message/client";
  import { resetPasswordFormSchemaThirdStep } from "$validations/auth";
  import { Input } from "$components/ui/input";
  import { PasswordStrength } from "$components/layout";
  import { passwordStrength, type FirstOption, type Result, type Option } from "check-password-strength";
  import Eye from "lucide-svelte/icons/eye";
  import EyeOff from "lucide-svelte/icons/eye-off";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { Button } from "$components/ui/button";
  

  let { data } = $props();

  let isPasswordFieldFocused = $state(false);
  let revealPassword = $state(false);
  let passwordInputType = $derived(revealPassword ? "text" : "password");

  const form = superForm(data.form, {
    validators: zodClient(resetPasswordFormSchemaThirdStep),
    delayMs: 500,
    timeoutMs: 5000,
    multipleSubmits: "prevent",
    syncFlashMessage: true,
    flashMessage: { module: flashModule },
  });

  const { form: formData, enhance, delayed } = form;


  // ! this code is duplicated from register route
  // TODO export
  const customOptions: [FirstOption<string>, ...Option<string>[]] = [
    { id: 0, value: "Too weak", minDiversity: 0, minLength: 0 },
    { id: 1, value: "Weak", minDiversity: 2, minLength: 6 },
    { id: 2, value: "Medium", minDiversity: 3, minLength: 8 },
    { id: 3, value: "Strong", minDiversity: 4, minLength: 10 }
  ];

  let pwd: Result<string> = $state(passwordStrength($formData.password, customOptions));
  let myData: Array<{ name: string; isDone: boolean }> = $derived([
    { name: "Minimum number of characters is " + 10, isDone: pwd.length >= 10 },
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
  <Card.Title class="text-2xl">{"Reset your password"}</Card.Title>
</Card.Header>
<Card.Content class="grid gap-4">
  <div class="text-muted-foreground">{"Now you can update your password."}</div>
  <form class="flex flex-col gap-3" method="post" use:enhance>
    <Form.Field {form} name="password" class="relative space-y-1">
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
    <Form.Field {form} name="passwordConfirm" class="mt-2 space-y-1">
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
    <Form.Button type="submit" disabled={$delayed}>
      {#if $delayed}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> {"Loading..."}
      {:else}
        {"Verify"}
      {/if}
    </Form.Button>
  </form>
</Card.Content>
