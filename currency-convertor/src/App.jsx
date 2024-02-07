// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const CurrencyConverterApp = () => {
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const handleFromCurrencyChange = (event) => {
    const value = event.target.value;
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (event) => {
    const value = event.target.value;
    setToCurrency(value);
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div className="converter-container">
        <div className="input-container">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="amount-input"
          />
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Add more currency options as needed */}
          </select>
        </div>
        <div className="equals-sign">&#61;</div>
        <div className="output-container">
          <p className="converted-amount">{convertedAmount}</p>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Add more currency options as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterApp;
