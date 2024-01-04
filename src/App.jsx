import { useCallback, useEffect, useState,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useref hook 
  const passwordref = useRef(null)


  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenrator()
  },[length,numberAllowed,charAllowed,passwordGenrator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'><h1 className='text-white text-center'>password Genrator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text ' value={password} className='ouline-none w-full py-1 px-3 ' placeholder='password' readOnly ref={passwordref}>
          </input>
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gsp-x-2'>
          <div className='flex item-center gap-x-1 '>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }}></input>
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' className='cursor-pointer' onChange={() => { setNumberAllowed((prev) => !prev) }}></input>
             <label htmlFor='numberInput'>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllowed} id='charInput' className='cursor-pointer' onChange={() => { setCharAllowed((prev) => !prev) }}></input>
             <label htmlFor='charInput'>Charcter</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
