<script lang="ts">
  import { Footer, Header } from "$components/landing-page";
  import { fade } from "svelte/transition";

  let { data, children } = $props();

</script>
 
<div class="container">
  <Header user={data.user} />
  <div in:fade={{ delay: 300, duration: 300 }} out:fade={{ duration: 300 }}>
    <!-- {@render children()} -->
    <slot />

  </div>
  <Footer />
</div>
