<!-- <script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
</script> -->

<script>
  import { fetchingRates, translate } from '/src/currency.js' 
  import { onMount } from 'svelte'

  let rates

  let currency1 = 'USD'
  let currency2 = 'RUB'
  let valueMoney1 = 1
  let valueMoney2 = 10

  onMount(async ()=>{
    rates = await fetchingRates()
    valueMoney2 = rates['RUB']
  })

  

  function onChageFirstCurrency(){
    valueMoney2 = valueMoney1 / rates[currency1] * rates[currency2]
  }

  function onChageSecondCurrency(){
    valueMoney1 = valueMoney2 / rates[currency2] * rates[currency1]
  }

</script>

<main>
  <div class="container">
    {#if rates}
    <select name="" id="" bind:value={currency1} on:change={onChageFirstCurrency}>
      {#each Object.keys(rates) as currency}
        <option value={currency}>
          {`${translate(currency)} (${currency})`}
        </option>
      {/each}
    </select>

    <select name="" id="" bind:value={currency2} on:change={onChageSecondCurrency}>
      {#each Object.keys(rates) as currency}
        <option value={currency}>
          {`${translate(currency)} (${currency})`}
        </option>
      {/each}
    </select> 
    {:else}
      <p>Loading...</p>
    {/if}
  </div>

  <div class="container">
    <input type="number" name="" id="" class="inp" bind:value={valueMoney1} on:change={onChageFirstCurrency}>
    <input type="number" name="" id="" class="inp" bind:value={valueMoney2} on:change={onChageSecondCurrency}>
  </div>

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
