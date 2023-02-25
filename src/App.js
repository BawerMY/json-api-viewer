import { useState } from 'react';
import './App.css';
const $ = require('jquery-browserify')
function App() {
  const [url, setUrl] = useState('')
  var jsx = <></>
  var data = ['empty object']
  $.ajax({
    dataType: 'json',
    async: false,
    url: url,
    success: function(d) {data = d},
    error: function() {data = ['empty object']},
    statusCode: {404: function () {data = ['json not found']}}
    })

// optimisation so bad async true/false
// maybe base url whit button or/and test if it is an ok url(or website)














  function Dict({s, o}) {
    const [open, setOpen] = useState(Object.keys(s).length<50)
    return (
      <div>
        <span className='text-[#569CD6]' onClick={(e) => {setOpen(!open); e.stopPropagation()}} >{o}:{' '}</span>
        <span onClick={(e) => {setOpen(true); e.stopPropagation()}}>
          {Array.isArray(s)?'[':'{'}
          {open?<div className='pl-4 border-l-[1px] border-white'>{Object.keys(s).map((obj) =>
          {
            if(typeof(s[obj])==="object") return <Dict key={obj} s={s[obj]} o={obj} />
            return <div key={obj}><span className='text-[#569CD6]'>{obj}: </span>{function() {
              switch(typeof(s[obj])){
                case "string" : return <span className='text-[#CE9178]'>"{s[obj]}"</span>
                case "number" : return <span className='text-[#B5CEA8]'>{s[obj]}</span>
                case "string" : return <span className='text-[#4EC9B0]'>{s[obj]}</span>
                default: return s[obj]
              }
            }()}</div>
          })}</div>:Object.keys(s).length}
          {Array.isArray(s)?']':'}'}
        </span>
      </div>
    )
  }
jsx = <Dict s={data} o={'object'} />
const [autoSet, setAutoSet] = useState(false)
  return (
    <div className="min-w-screen min-h-screen flex flex-col p-4 gap-4 bg-[#1e1e1e] text-white">
      <div className='flex gap-2'>
        <input onChange={(e) => {autoSet&&setUrl(e.target.value+'/'+document.getElementById('sublink').value)}} className='rounded-lg flex-auto py-2 px-4 border-[1px] border-[#045cff] bg-transparent' placeholder='API base url' id='base' type="text" />
      </div>
        <div className='flex gap-2'>
          <div className='flex flex-auto'>
            <input onChange={(e) => {autoSet&&setUrl(document.getElementById('base').value+'/'+e.target.value)}} className='z-10 rounded-l-lg flex-auto py-2 px-4 border-[1px] border-r-0 border-[#045cff] bg-transparent' placeholder='API suburl' id='sublink' type="text" />
            <button onClick={() => {setAutoSet(!autoSet); setUrl(document.getElementById('base').value+document.getElementById('sublink').value)}} className='rounded-r-lg bg-white px-1 border-[1px] border-l-0 border-[#045cff] outline-[#045cff]'>
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={autoSet?"M8.5 16L1 8.5L8.5 1":"M1 1L8.5 8.5L1 16"} stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        {!autoSet&&<button className='w-1/6 py-2 px-4 rounded-lg bg-green-800' onClick={() => setUrl(document.getElementById('base').value+document.getElementById('sublink').value)}>Set</button>}
      </div>
      <div>
        {jsx}
      </div>
    </div>
  );
}

export default App;