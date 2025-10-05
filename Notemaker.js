function getDate()
{
  let x = new Date;
  let day = x.getDate();
  let month = x.toLocaleString('default',{month:'short'});
  let year = x.getFullYear();

  return `${day} ${month} ${year}`;
}

 let savedNotes =  [];
window.onload = function() {
    // Load saved notes
    let saved = localStorage.getItem("savedNotes");
    if (saved) {
        savedNotes = JSON.parse(saved);
        showNotes();
    }

    // Load selected color (radio button)
    const savedColorNum = localStorage.getItem('selectedColor');
    const radios = document.querySelectorAll('input[name="color"]');

    if (savedColorNum !== null) {
        // check the saved radio button
        radios.forEach((radio, index) => {
            radio.checked = index == savedColorNum;
        });

        // Apply the saved color to inputs and pin
        changeColor(savedColorNum);
    } else {
        // If nothing saved, pick the checked radio or default to first
        const checkedRadio = document.querySelector('input[name="color"]:checked');
        const num = checkedRadio ? Number(checkedRadio.value) - 1 : 0;
        changeColor(num);
    }

    // Add listener to update color whenever radio changes
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                changeColor(index);
            }
        });
    });
};






noteRotate = [-3 , -2, -1, 0 , 1 , 2, 3];



  let colors = ['#FF6B6B','#FFF176',"#4FC3F7",'#81C784'];



function changeColor(num) {
    const title = document.querySelector('.titleInput');
    const text = document.querySelector('.textInput');
    const pin = document.querySelector('.pin');

    const selectedColor = colors[num];

    title.style.backgroundColor = selectedColor;
    text.style.backgroundColor = selectedColor;
    pin.style.backgroundColor = selectedColor;

    // Save current selection in localStorage
    localStorage.setItem('selectedColor', num);
}





function addNote()
{
  let noteText = document.querySelector('.textInput').value;
  
  let createdDate = getDate();
  let title = document.getElementById('title').value;



let colorValue = Number(document.querySelector('input[name="color"]:checked').value) - 1;

let x=  colors[colorValue];
  
rotation = noteRotate[Math.floor(Math.random()*noteRotate.length)];



  
  if (noteText === "")
    {
      alert("enter text");
    }
  else if( title === "")
  {
    alert("enter title");
  }
  else
  {
  
  document.querySelector(".textInput").value = "";

  document.getElementById("title").value = "";
  
  saveNote(title,noteText,createdDate,x,rotation);
  }


  }


function removeNote(id)
{
    savedNotes = savedNotes.filter(note => note.id !== id);
  localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
  showNotes();
}

 function  saveNote(title,noteText,createdDate,x,rotation)
 {
  let text = document.getElementById('innerText').value;
  

  let note = {

     id : Date.now() ,
     noteName : title ,
     text : noteText,
     createdOn : createdDate ,
     color : x,
     rotate : rotation,

  }
  savedNotes.push(note);
  localStorage.setItem("savedNotes",JSON.stringify(savedNotes));
  showNotes();
 }



function showNotes()
{
 let pinBoard = document.querySelector('.pinBoard');
 pinBoard.innerHTML='';
 savedNotes.forEach(note=>{
 let Note = document.createElement("div");
 Note.innerHTML = `<button onclick="removeNote(${note.id});" class="removeButton">⚫</button>
 <br><span class="title">${note.noteName}</span> <br>  <br>
  ${note.text} <span class="createdDate">Created on: ${note.createdOn}<span>`;
 Note.className="stickyNote";
    Note.style.backgroundColor = note.color;
      Note.style.transform = `rotate(${note.rotate}deg)`;
      document.querySelector('.pinBoard').appendChild(Note);
 })
}

