const loadingdeta= ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displaydata(data.data))
}
const removeactive = () =>{
  const removeactiveclass  = document.querySelectorAll('.lesoon-btn')
  removeactiveclass.forEach(btn => btn.classList.remove('active'))
 
  
}

const loadContainer = (id)=>{
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
                        <button class=" bg-gray-200 p-4 rounded"><i class="fa-solid fa-circle-info"></i></button>
                    <button class=" bg-gray-200 p-4 rounded"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                  </div>
         `
       wordContainer.appendChild(div)
     })

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