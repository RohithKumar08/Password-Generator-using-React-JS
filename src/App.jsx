import { useState, useCallback, useEffect } from 'react'

function App() {
  const [length, setLength] = useState("8");
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) str += "0123456789";
    if(char) str += "!@#$%^&*(){}[]~`";

    for(let i = 0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }
    setPassword(pass);
  }, [length, number, char])
  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator])

  const copyText = () => {
    navigator.clipboard.writeText(password);
  }
  return (
    <>
    <div className='w-full max-w-md mx-auto rounded-lg shadow-md px-3 py-3 my-6 text-orange-500 bg-gray-700 '>
      <h1 className='text-white text-center my-1'>Password Generator</h1>
      <div className='flex shadow overflow-hidden rounded-lg mb-6'>
        <input type='text' value={password} placeholder='password' className='outline-none bg-white w-full px-2 py-2 ' readOnly></input>
        <button className='outline-none shrink-0 bg-blue-500 text-white px-3 py-2' onClick={copyText}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={8} max={20} value={length} onChange={(e) => setLength(e.target.value)} className='cursor-pointer' /><label>Length : {length}</label>
          <input type="checkbox" defaultChecked={number} onChange={() => setNumber((prev) => !prev)} className='cursor-pointer' /><label>Numbers</label>
          <input type="checkbox" defaultChecked={char} onChange={() => setChar((prev) => !prev)} className='cursor-pointer' /><label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
