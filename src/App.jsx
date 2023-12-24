import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (charAllow) str += "!@#$%^&*-_+=[]{}~`";
    if (numberAllow) str += "0123456789";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, setPassword]);

  const passwordRef = useRef(null);

  return (
    <div className="main">
      <h1>Password Generator</h1>

      <div className="pass_gen">
        <div className="pass_card">
          <div className="inp_field">
            <input type="text" value={password} readOnly ref={passwordRef} />
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <div className="pass_func">
            <div className="inp_func">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="">Length: {length}</label>
            </div>
            <div className="inp_func">
              <input
                type="checkbox"
                id="charAllow"
                onChange={(e) => {
                  setCharAllow((prev) => !prev);
                }}
              />
              <label htmlFor="charAllow">Characters</label>
            </div>
            <div className="inp_func">
              <input
                type="checkbox"
                id="numAllow"
                onChange={(e) => {
                  setNumberAllow((prev) => !prev);
                }}
              />
              <label htmlFor="numAllow">Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
