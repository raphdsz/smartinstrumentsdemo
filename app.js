const pads = document.querySelectorAll(".pad");
var synth= new Tone.PolySynth().toMaster();
const now = Tone.now()




const padsContainer = document.querySelector(".pads-container");





function playNote(event){
    if(event.target.classList.contains("pad")){
        event.preventDefault();
        // synth.triggerAttackRelease(event.target.dataset.sound,"16n");
        synth.triggerAttack(event.target.dataset.sound);
        // wait one second before triggering the release
        event.target.style.opacity= "1";
    }

}
function reset(event){
    if(event.target.classList.contains("pad")){
        synth.triggerRelease(event.target.dataset.sound);

        event.target.style.opacity= "0.8";
        
    }

}


padsContainer.addEventListener("mousedown",playNote);

padsContainer.addEventListener("touchstart",playNote);

padsContainer.addEventListener("touchend",reset);
padsContainer.addEventListener("mouseup",reset);
padsContainer.addEventListener("mouseout",reset);



function noteDown(e, isSharp){
    var note = e.dataset.note;
    e.style.background = isSharp ? 'black' : '#ccc'
    synth.triggerAttackRelease(note,"16n");
}




function setViewportHeight(){
    let vh = window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}


setViewportHeight();


window.addEventListener("resize",()=>{
    setTimeout(setViewportHeight, 100);
});



