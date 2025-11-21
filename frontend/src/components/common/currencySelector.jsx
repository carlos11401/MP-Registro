import React from 'react';
import { useCurrency } from '../../context/currency/currency.contex';

const CurrencySelector = () => {
  // get exchange rates from context
  const {currency, changeCurrency, exchangeRates} = useCurrency();

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    
    <select value={currency} onChange={handleCurrencyChange}>
      {exchangeRates.map((rate) => (
        <option key={rate.id} value={rate.name}>
          {rate.name}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
