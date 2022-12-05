<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    register: { email: string; password: string };
  }>();

  export let email = "";
  export let password = "";

  const register = () => {
    dispatch("register", { email, password });
  };
</script>

<div class="form-container sign-up-container">
  <form action="#">
    <h1>Create Account</h1>
    <span>or use your email for registration</span>
    <input bind:value={email} type="email" placeholder="Email" />
    <input bind:value={password} type="password" placeholder="Password" />
    <button on:click={register}>Sign Up</button>
  </form>
</div>
