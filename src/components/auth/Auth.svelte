<script lang="ts">
  import firebaseAPI from "../../lib/Firebase";
  import type { UserCredential } from "firebase/auth";

  import Login from "./Login.svelte";
  import Register from "./Register.svelte";

  let elementClass = "container";

  let showSignUp = () => {
    elementClass = "container right-panel-active";
  };

  let showSignIn = () => {
    elementClass = "container";
  };

  let login = (e: CustomEvent<{ email: string; password: string }>) => {
    firebaseAPI
      .login(e.detail.email, e.detail.password)
      .subscribe((user: UserCredential) => {
        console.log("login", user);
      });
  };
  let register = (e: CustomEvent<{ email: string; password: string }>) => {
    firebaseAPI
      .register(e.detail.email, e.detail.password)
      .subscribe((user: UserCredential) => {
        console.log("register", user);
      });
  };
</script>

<!-- <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> -->
<div class={elementClass}>
  <Register on:register={register} />
  <Login on:login={login} />
  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-left">
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button class="ghost" on:click={showSignIn}>Sign In</button>
      </div>
      <div class="overlay-panel overlay-right">
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button class="ghost" on:click={showSignUp}>Sign Up</button>
      </div>
    </div>
  </div>
</div>

<footer>
  <p>
    Design created by
    <a target="_blank" href="https://florin-pop.com" rel="noreferrer"
      >Florin Pop</a
    >
    <a
      target="_blank"
      href="https://codepen.io/FlorinPop17/pen/vPKWjd"
      rel="noreferrer">here</a
    >.
  </p>
</footer>

<style>
  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  :global(.form-container) {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  :global(.sign-in-container) {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active :global(.sign-in-container) {
    transform: translateX(100%);
  }

  :global(.sign-up-container) {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active :global(.sign-up-container) {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

</style>
