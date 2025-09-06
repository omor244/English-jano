const loadingdeta= ()=>{
  
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displaydata(data.data))
}
const removeactive = () =>{
  const removeactiveclass  = document.querySelectorAll('.lesoon-btn')
  removeactiveclass.forEach(btn => btn.classList.remove('active'))
 
  
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadContainer = (id)=>{
  setTimeout(() => {
  managesppiner()
  // displayword()
 
 
},2000)
  managesppiner(true)
   fetch(`https://openapi.programming-hero.com/api/level/${id}`)
   .then(res => res.json())
   .then(data =>{
    removeactive()
    const clickbtn = document.getElementById(`lesson-btn-${id}`)
    clickbtn.classList.add('active')

    displayword(data.data)
   } )
    
  
}
const displayword= (words) =>{
   
    const wordContainer = document.getElementById('word-container')
     wordContainer.innerHTML = ''
    if(words.length === 0 ){
             wordContainer.innerHTML = `

             <div class="text-center col-span-full  py-10 space-y-4">
             <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="text-lg font-bold text-gray-500 font-bang">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
                <h2 class="text-4xl font-semibold font-bang">নেক্সট Lesson এ যান</h2>
            </div>
             
             `
       managesppiner(false)
        return
    }
     
  

     words.forEach((word) => {
          
         const div = document.createElement('div')
         div.innerHTML= `
                <div class="bg-white text-center py-12 px-6 space-y-4 shadow-sm rounded-lg">
                      <h2 class="text-4xl font-bold ">${word.word ? word.word:" word paoa jai ni"}</h2>
                      <p class="font-semibold">Meaning /Pronounciation </p>
                      <div class="text-2xl font-semibold text-gray-700 font-bang">${word.meaning ? word.meaning  : 'Meaning paoa jai ni'} / ${word.pronunciation ? word.pronunciation : 'pronunciation paoa jai ni'}</div>
                      <div class="flex justify-between mt-10">
                        <button onclick=" loadworddetails(${word.id})" class=" bg-gray-200 p-4 rounded"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class=" bg-gray-200 p-4 rounded"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                  </div>
         `
       wordContainer.appendChild(div)
     })
    managesppiner(false)
}


const loadworddetails = (id) =>{
  console.log(id)
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
  .then(res => res.json())
  .then(data => displaywordDetails(data.data))


  my_modal_1.showModal()
}

const createElement = (arr)=> {
  const htmlelements = arr.map((el)=> `<span class="btn mr-4">${el}<span/>`)
  return htmlelements.join(" ")
}

const  managesppiner = (status) => {
  if(status === true){
    document.getElementById('sppiner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
    document.getElementById('sppiner').classList.add('hidden')
      document.getElementById('word-container').classList.remove('hidden')
  }
}



const displaywordDetails = (details) => {
    console.log(details)
  const modal = document.getElementById('my_modal_1')
  const modalcontainer = document.getElementById('modalContainer')
  

  // "status": true,
  // "message": "successfully fetched a word details",
  // "data": {
  //   "word": "Eager",
  //   "meaning": "আগ্রহী",
  //   "pronunciation": "ইগার",
  //   "level": 1,
  //   "sentence": "The kids were eager to open their gifts.",
  //   "points": 1,
  //   "partsOfSpeech": "adjective",
  //   "synonyms": [
  //     "enthusiastic",
  //     "excited",
  //     "keen"

    modalcontainer.innerHTML=`
     <h1 class="font-bold text-4xl">${details.word} ( <i class="fa-solid fa-microphone-lines"></i> :${details.pronunciation})</h1>
         <p class="text-xl font-semibold">Meaning</p>
         <p class="text-xl font-medium">${details.meaning}</p>
         <div>
            <h2 class="text-xl font-semibold">Example</h2>
            <p class="text-lg font-normal text-gray-400">${details.sentence}</p>
         </div>
         <div>
            <h2 class="text-xl font-semibold mb-3">synonyms</h2>
           <div >
             ${createElement(details.synonyms)}
           </div>
         </div>
        <button class="btn btn-primary rounded-xl">Complete Learning</button>
    
    `
   
}


const displaydata= (data) =>{
 
    const btnContainer = document.getElementById('btn-container')
      btnContainer.innerHTML = ''
    
    for(const deta of data){
     
        const btn = document.createElement('div')
        btn.innerHTML= `
       <button id="lesson-btn-${deta.level_no}" onclick="loadContainer(${deta.level_no
})" class="btn btn-outline btn-primary lesoon-btn"><i class="fa-solid fa-book-open"></i> Lesson-${deta.level_no
}</button>


        
        `
        btnContainer.appendChild(btn)
    }
   
}

loadingdeta()




document.getElementById('search-btn').addEventListener('click', () =>{
  const input = document.getElementById('search-input')
   const inputvalue  = input.value.trim().toLowerCase()
    removeactive()

   fetch('https://openapi.programming-hero.com/api/words/all')
   .then(res => res.json())
   .then(data => {
    const deta = data.data
     
    const matchingData = deta.filter(word => word.word.toLowerCase().includes(inputvalue))
    displayword(matchingData)
   })
} )