<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    login: { email: string; password: string };
  }>();

  export let email = "";
  export let password = "";

  const login = () => {
    dispatch("login", { email, password });
  };
</script>

<div class="form-container sign-in-container">
  <form action="#">
    <h1>Sign in</h1>
    <span>or use your account</span>
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />
    <a href="#">Forgot your password?</a>
    <button on:click={login}>Sign In</button>
  </form>
</div>
