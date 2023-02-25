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
    statusCode: {404: function () {data = ['json not found']}}
    })

// optimisation so bad async true/false
// maybe base url whit button or/and test if it is an ok url(or website)














  function Dict({s, o}) {
    const [open, setOpen] = useState(Object.keys(s).length<50)
    return (
      <div>
        <span className='text-[#569CD6]' onClick={(e) => {setOpen(!open); e.stopPropagation()}} >{o}:{' '}</span>
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
      </div>
    )
  }
jsx = <Dict s={data} o={'object'} />
  return (
    <div className="min-w-screen min-h-screen flex flex-col p-4 gap-4 bg-[#1e1e1e] text-white">
      <input className='rounded-lg py-2 px-4 border-[1px] border-[#045cff] bg-transparent outline-[#045cff]' placeholder='API base url' onChange={(e) => setUrl(e.target.value+'/'+document.getElementById('sublink').value)} id='base' type="text" />
      <input className='rounded-lg py-2 px-4 border-[1px] border-[#045cff] bg-transparent outline-[#045cff]' placeholder='API suburl' onChange={(e) => setUrl(document.getElementById('base').value+'/'+e.target.value)} id='sublink' type="text" />
      <div>
        {jsx}
      </div>
    </div>
  );
}

export default App;