/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect , useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+{}:._~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);


  useEffect(() => {
    passwordGenerator()

  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(password);

  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-5 my-10 text-black bg-gray-400">
        <h1 className="text-center font-bold text-3xl py-4">
          Password Generator
        </h1>
        <div className="flex gap-2 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full px-3 py-3 rounded-lg"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-800"
          onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>
        <div className="flex gap-3">
          <input type="range" min={0} max={50} value={length} className="cursor-pointer"
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label htmlFor="" className="text-gray-800 font-semibold">
            Length:{length}
          </label>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="" className="text-gray-800 font-semibold">
            Number
          </label>
          <input type="checkbox" defaultChecked={charAllowed} id="charInput"
            onClick={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="" className="text-gray-800 font-semibold">
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
