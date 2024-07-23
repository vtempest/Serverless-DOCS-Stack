<script lang="ts">
  import { Footer, Header } from "$components/landing-page";
  import { Transition } from "$components/layout";

  let { data, children } = $props();
</script>

<div class="container">
  <Header user={data.user} />
  <!-- TODO this does not work, maybe because of Svelte 5 -->
  <Transition key={data.url} duration={1500}>
    {@render children()}
  </Transition>
  <Footer />
</div>
