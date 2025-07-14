import { useState, useCallback, useEffect ,useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // we are now monitoring the length
  // initial 8 length password
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  ////////////////////////////////////////////////
  //  useRef
  // for feedback
  ////////////////////////////////////////////////

  const passwordRef = useRef(null)

  ////////////////////////////////////////////////////
  //  useCallback --> based on memoization
  ////////////////////////////////////////////////////
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklmnbvcxz";

    if (numberAllowed) str += "0123456789";

    if (symbolAllowed) str += "!@#$%^&*()_+";

    // loop as many times as char length is update

    for (let i = 0; i < length; i++) {
      // random number generator
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  // copy button
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
  }

  ////////////////////////////////////////////////////////////////////////
  // useEffect
  // run piece of code in variety of scenirious
  // like in loding mounting
  // basically we run the method as soon as some thing changes
  // [] iske under jo jo likh rhe hai wha se change hote rhega
  ///////////////////////////////////////////////////////////////////////

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            name=""
            id=""
            value={password}
            className="outline-none w-full py-1 px-3 text-amber-900"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              // humlog prev ko reverse kar rhe

              onChange={() => {
                setNumberAllowed((previous) => !previous);
              }}
              name=""
              id=""
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={symbolAllowed}
              // humlog prev ko reverse kar rhe

              onChange={() => {
                setSymbolAllowed((previous) => !previous);
              }}
              name=""
              id=""
            />
            <label htmlFor="symbol">Symbol</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
