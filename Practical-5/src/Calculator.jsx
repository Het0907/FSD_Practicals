
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // AC: All Clear
  const handleAllClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // C: Clear Entry (just clears current display)
  const handleClearEntry = () => {
    setDisplay('0');
  };

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 'Error';
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{display}</div>
      </div>
      <div className="calculator-keypad">
        {/* Row for AC and C */}
        <div className="row">
          <button className="key-ac" onClick={handleAllClear}>AC</button>
          <button className="key-delete" onClick={handleClearEntry}>C</button>
        </div>
        {/* Operator row */}
        <div className="row">
          <button className="key-operator" onClick={() => performOperation('/')}>/</button>
          <button className="key-operator" onClick={() => performOperation('*')}>*</button>
          <button className="key-operator" onClick={() => performOperation('+')}>+</button>
          <button className="key-operator" onClick={() => performOperation('-')}>-</button>
        </div>
        {/* Number rows */}
        <div className="row">
          <button className="key-number" onClick={() => inputNumber(1)}>1</button>
          <button className="key-number" onClick={() => inputNumber(2)}>2</button>
          <button className="key-number" onClick={() => inputNumber(3)}>3</button>
        </div>
        <div className="row">
          <button className="key-number" onClick={() => inputNumber(4)}>4</button>
          <button className="key-number" onClick={() => inputNumber(5)}>5</button>
          <button className="key-number" onClick={() => inputNumber(6)}>6</button>
        </div>
        <div className="row">
          <button className="key-number" onClick={() => inputNumber(7)}>7</button>
          <button className="key-number" onClick={() => inputNumber(8)}>8</button>
          <button className="key-number" onClick={() => inputNumber(9)}>9</button>
        </div>
        <div className="row">
          <button className="key-number" onClick={() => inputNumber(0)}>0</button>
          <button className="key-number" onClick={inputDecimal}>.</button>
          <button className="key-equals" onClick={handleEqual}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;