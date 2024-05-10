<script>
  import { fetchingRates, translate } from '/src/currency.js' 
  import { onMount } from 'svelte'

  // объявление переменных
  let rates // переменная для хранения курсов валют
  let currency1 // валюта для первого поля
  let currency2 // валюта для второго поля
  let valueMoney1 // количество валюты первого поля
  let valueMoney2 // количество валюты второго поля

  onMount(async () => {
    rates = await fetchingRates()
    currency1 = 'USD'           // устанавливаем валюту по умолчанию для первого поля
    currency2 = 'RUB'           // устанавливаем валюту по умолчанию для второго поля
    valueMoney1 = 1             // устанавливаем количество валюты первого поля по умолчанию
    valueMoney2 = rates['RUB']  // устанавливаем количество валюты второго поля по умолчанию
  })

  // функция для обновления второго поля при изменении первого поля
  function onChageFirstCurrency() { 
    valueMoney2 = valueMoney1 / rates[currency1] * rates[currency2]
  }

  // функция для обновления первого поля при изменении второго поля
  function onChageSecondCurrency() { 
    valueMoney1 = valueMoney2 / rates[currency2] * rates[currency1]
  }
</script>

<main>
  <div class="container">
    {#if rates}
    <select bind:value={currency1} on:change={onChageFirstCurrency}>
      {#each Object.keys(rates) as currency}
        <option value={currency}>
          {`${translate(currency)} (${currency})`} <!-- отображаем название и код валюты с помощью функции translate -->
        </option>
      {/each}
    </select>

    <select bind:value={currency2} on:change={onChageSecondCurrency}>
      {#each Object.keys(rates) as currency}
        <option value={currency}>
          {`${translate(currency)} (${currency})`} <!-- отображаем название и код валюты с помощью функции translate -->
        </option>
      {/each}
    </select> 
    {:else}
      <p>Loading...</p>
    {/if}
  </div>

  <div class="container">
    <input type="number" bind:value={valueMoney1} on:change={onChageFirstCurrency}>
    <input type="number" bind:value={valueMoney2} on:change={onChageSecondCurrency}>
  </div>
</main>
