import { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [currency, setCurrency] = useState('');
  const [oldCurrency, setOldCurrency] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/447795cb4b939bb25b18ef45/latest/USD`);
      setExchangeRates(response.data.conversion_rates);
      console.log(response.data.conversion_rates);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (value && oldCurrency && currency && exchangeRates[oldCurrency] && exchangeRates[currency]) {
      const converted = (value / exchangeRates[oldCurrency]) * exchangeRates[currency];
      setConvertedValue(converted.toFixed(2));
    }
  }, [value, oldCurrency, currency, exchangeRates]);

  const handleOnChange = (e) => {
    if (value = '') {
      setConvertedValue('')
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Currency Converter</h1>
              <div className="form-group">
                <label htmlFor="baseCurrency">Base Currency</label>
                <select
                  id="baseCurrency"
                  className="form-control"
                  onChange={(e) => setOldCurrency(e.target.value)}
                >
                  <option value="">Select Base Currency</option>
                  {Object.keys(exchangeRates).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">{`Amount in ${oldCurrency}`}</label>
                <input
                  type="number"
                  id="amount"
                  className="form-control"
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="targetCurrency">Target Currency</label>
                <select
                  id="targetCurrency"
                  className="form-control"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="">Select Target Currency</option>
                  {Object.keys(exchangeRates).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="convertedAmount">{`Converted Amount in ${currency}`}</label>
                <input
                  type="number"
                  id="convertedAmount"
                  className="form-control"
                  value={convertedValue}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default App
