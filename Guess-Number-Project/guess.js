 let Guess = document.getElementById("Guess")
 let CheckBtn = document.getElementById("Check")
 let ClearBtn = document.getElementById("Clear")
 let ResultBtn = document.getElementById("Result")


 // Random between 1 and 10
 let RandomNumber = Math.floor(Math.random()*10) + 1      // It generates a random integer between 1 and 10 like 3 8 1 10 
 CheckBtn.addEventListener("click",function(){

   let UserGuess = Number(Guess.value)

   if(Guess.value.trim() === ""){
     alert(" Please enter a number")
   }

   else if(UserGuess === RandomNumber){
     ResultBtn.textContent = " 🎉 You guess the correct number"
   }

   else if(UserGuess > RandomNumber){
     ResultBtn.textContent = "Too High"
   }

   else{
     ResultBtn.textContent = "Too Low"
   }
 })

 Guess.addEventListener("keypress",function(){
   if(event.key === "Enter"){
     CheckBtn.click()
   }
 })
 
 ClearBtn.addEventListener("click",function(){
   ResultBtn.textContent = ''
   Guess.value = ''
   Guess.focus()
 })