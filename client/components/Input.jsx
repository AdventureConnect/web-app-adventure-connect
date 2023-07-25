import React, { useState } from 'react'

function Input({ type, text, handler, val }) {
  const [hasVal, setHasVal] = useState(Boolean(val))

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    handler(inputValue);
    setHasVal(Boolean(inputValue));
  };

  return (
    <>
      <input 
        type={type} 
        className="
          bg-white/80 
          focus:bg-white/90 
          text-black
          peer 
          w-full 
          border-b 
          rounded-md 
          p-2 
          placeholder:text-transparent
        " 
        placeholder="name" 
        autoComplete="off"
        value={val}
        onChange={handleInputChange}
      />
      <label 
        htmlFor={type}
        className={`
          absolute 
          left-0 
          ml-1 
          px-1 
          -translate-y-3 
          bg-inherit 
          pointer-events-none 
          text-sm 
          duration-100 
          ease-linear
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:text-gray-500 
          peer-placeholder-shown:text-sm
          peer-focus:ml-1 
          peer-focus:-translate-y-8 
          peer-focus:px-1 
          peer-focus:z-10 
          peer-focus:text-sm 
        peer-focus:text-zinc-200

          ${hasVal ? '-translate-y-8' : ''}
        `}
      >
        {text}
      </label>
    </>
  )
}

export default Input
