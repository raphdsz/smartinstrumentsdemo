//dynamically add pads

//select rows
const rows = document.querySelectorAll(".row");
//selectors
const pads = document.querySelectorAll(".pad");
var synth= new Tone.PolySynth().toMaster();
const now = Tone.now();
let startingTouchX;
let startingTouchY;
let eventTouchArray=[];
const padsContainer = document.querySelector(".pads-container");
var pointer = document.querySelectorAll('.pointer');
const scaleButton = document.querySelector('.scaleButton');


const notesObj = 
{scale:"maj", 
notes: ['c','d','e','f','g','a','b'],
notesClass:['c full-up half-down','d full-up full-down','e half-up full-down','f full-up half-down','g full-up full-down','a full-up full-down','b half-up full-down']
};


// let notes = ['c','d','e','f','g','a','b'];

scaleButton.addEventListener("touchstart",changeScale);
scaleButton.addEventListener("touchend",function(){
    setTimeout(function(){
        scaleButton.style.transform = "scale(1)";
        scaleButton.style.opacity ="1";
    }, 100);

    
});

function changeScale(){
    scaleButton.style.opacity =".6";
    scaleButton.style.transform = "scale(1.1)";

    if (notesObj["scale"]==="maj"){
        notesObj["notes"] = ['c','d','e','g','a'];
        notesObj["notesClass"] = ['c full-up twofull-down','d full-up full-down','e full-down twofull-up','g full-up twofull-down','a full-down twofull-up'];
        notesObj["scale"]="maj-pen"
    } else if (notesObj["scale"]==="maj-pen"){
        notesObj["notes"] = ['c','d','d#','e#','g','g#','a#'];
        notesObj["notesClass"] = ['c full-up full-down','d half-up full-down','dsharp full-up half-down','esharp full-up full-down','g half-up full-down','gsharp full-up half-down','asharp full-up full-down'];
        notesObj["scale"]="min"
    } else{
        notesObj["notes"] = ['c','d','e','f','g','a','b'];
        notesObj["notesClass"] = ['c full-up half-down','d full-up full-down','e half-up full-down','f full-up half-down','g full-up full-down','a full-up full-down','b half-up full-down'];
        notesObj["scale"]="maj"
    }
    createPads();
};



function createPads(){
    let html = "";
    let notes = notesObj["notes"]
    let notesClass = notesObj["notesClass"];


    rows.forEach(row => {

        for (let i = 0; i <notes.length ; i++){
            let note = notes[i];
            let noteClass = notesClass[i];
            html += `<div class="pad ${noteClass}" data-sound="${note}${row.dataset.oct}"><p>${note}<sub>${row.dataset.oct}</sub></p></div>`;
            html += '</div>';

        }
        row.innerHTML=html;
        html ="";
    });
}



function playNote(event){
    synth.triggerRelease(event.target.dataset.sound);

    if(event.target.classList.contains("pad")){
        startingTouchY=event.touches[0].clientY;
        startingTouchX=event.touches[0].clientX;
        event.preventDefault();
        // synth.triggerAttackRelease(event.target.dataset.sound,"16n");
        synth.set({ detune: 0, volume:0});
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

function detune(){
    console.log(event.touches[0].clientX - startingTouchX);
    if(event.touches.length===1){
        if(event.touches[0].clientX - startingTouchX>20){
            if(event.target.classList.contains("full-up")){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*9.7});
                if (event.touches[0].clientX - startingTouchX>40){
                    synth.set({ detune: 200});
                }
            }else if(event.target.classList.contains("half-up")){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*4.85});

                if (event.touches[0].clientX - startingTouchX>40){
                    synth.set({ detune: 100});
                }
            }else if(event.target.classList.contains("twofull-up")){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*9.7/2*3});
                if (event.touches[0].clientX - startingTouchX>40){
                    synth.set({ detune: 300});
                }
            }
        }else if (event.touches[0].clientX - startingTouchX<-20){
            if(event.target.classList.contains("full-down")){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*9.7});
                if (event.touches[0].clientX - startingTouchX<-40){
                    synth.set({ detune: -200});
                }
            }else if(event.target.classList.contains("half-down")){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*4.85});
                if (event.touches[0].clientX - startingTouchX<-40){
                    synth.set({ detune: -100});
                }
            }else if(event.target.classList.contains("twofull-down")){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*9.7/2*3});
                if (event.touches[0].clientX - startingTouchX<-40){
                    synth.set({ detune: -300});
                }
            }
        }else{
            synth.set({ detune: 0 });
        }
        //     if (event.touches[0].clientX - startingTouchX>40){
        //         synth.set({ detune: 200});
        //     }else if (event.touches[0].clientX - startingTouchX<-40){
        //         synth.set({ detune: -100});    
        //     }else if(event.touches[0].clientX - startingTouchX>20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*9.7});
        //     }else if(event.touches[0].clientX - startingTouchX<-20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*4.85});
        //     }else{
        //         synth.set({ detune: 0 });
        //     }
        // }else if(event.target.classList.contains("e")){
        //     if (event.touches[0].clientX - startingTouchX>40){
        //         synth.set({ detune: 100});
        //     }else if (event.touches[0].clientX - startingTouchX<-40){
        //         synth.set({ detune: -200});    
        //     }else if(event.touches[0].clientX - startingTouchX>20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*4.85});
        //     }else if(event.touches[0].clientX - startingTouchX<-20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*9.7});
        //     }else{
        //         synth.set({ detune: 0 });
        //     }
        // }else if(event.target.classList.contains("f")){
        //     if (event.touches[0].clientX - startingTouchX>40){
        //         synth.set({ detune: 200});
        //     }else if (event.touches[0].clientX - startingTouchX<-40){
        //         synth.set({ detune: -100});    
        //     }else if(event.touches[0].clientX - startingTouchX>20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*9.7});
        //     }else if(event.touches[0].clientX - startingTouchX<-20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*4.85});
        //     }else{
        //         synth.set({ detune: 0 });
        //     }
        // }else if(event.target.classList.contains("b")){
        //     if (event.touches[0].clientX - startingTouchX>40){
        //         synth.set({ detune: 100});
        //     }else if (event.touches[0].clientX - startingTouchX<-40){
        //         synth.set({ detune: -200});    
        //     }else if(event.touches[0].clientX - startingTouchX>20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*4.85});
        //     }else if(event.touches[0].clientX - startingTouchX<-20){
        //         synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*9.7});
        //     }else{
        //         synth.set({ detune: 0 });
        //     }
        // }else if (event.touches[0].clientX - startingTouchX>40){
        //     synth.set({ detune: 200});
        // }else if (event.touches[0].clientX - startingTouchX<-40){
        //     synth.set({ detune: -200});    
        // }else if(event.touches[0].clientX - startingTouchX>20){
        //     synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*9.7});
        // }else if(event.touches[0].clientX - startingTouchX<-20){
        //     synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*9.7});
        // }else{
        //     synth.set({ detune: 0 });
        // }
        synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.03 });
        // synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.04 });
    
    }
}

// padsContainer.addEventListener("mousedown",playNote);
padsContainer.addEventListener("touchstart",playNote);
padsContainer.addEventListener("touchend",reset);
padsContainer.addEventListener("touchmove",detune);

// padsContainer.addEventListener("mouseup",reset);
// padsContainer.addEventListener("mouseout",reset);





function setViewportHeight(){
    let vh = window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

createPads();
createPointer();
setViewportHeight();


window.addEventListener("resize",()=>{
    setTimeout(setViewportHeight, 100);
});



function addTouchLength(){
    eventTouchArray.push(event.touches.length);
}

function changeTouchLength(){
    if (eventTouchArray[eventTouchArray.length-1]>=2){
        startingTouchY=event.touches[0].clientY;
        startingTouchX=event.touches[0].clientX;
    }
}
function createPointer(){
    const pads = document.querySelectorAll(".pad");
    var showButtonHandler = function(event){

        pointer[0].style.visibility = 'visible';  
        pointer[0].style.opacity = '1';
        pointer[0].style.left = 'calc(' + event.touches[0].clientX + 'px - 1.5em)';
        pointer[0].style.top = 'calc(' + event.touches[0].clientY + 'px - 1.5em)';

        if (event.touches.length===2){
            pointer[1].style.visibility = 'visible';  
            pointer[1].style.opacity = '1';
            pointer[1].style.left = 'calc(' + event.touches[1].clientX + 'px - 1.5em)';
            pointer[1].style.top = 'calc(' + event.touches[1].clientY + 'px - 1.5em)';
    }
        if (event.touches.length===3){
            pointer[2].style.visibility = 'visible';  
            pointer[2].style.opacity = '1';
            pointer[2].style.left = 'calc(' + event.touches[2].clientX + 'px - 1.5em)';
            pointer[2].style.top = 'calc(' + event.touches[2].clientY + 'px - 1.5em)';

            pointer[1].style.visibility = 'visible';  
            pointer[1].style.opacity = '1';
            pointer[1].style.left = 'calc(' + event.touches[1].clientX + 'px - 1.5em)';
            pointer[1].style.top = 'calc(' + event.touches[1].clientY + 'px - 1.5em)';

    }
        if (event.touches.length===4){
            pointer[3].style.visibility = 'visible';  
            pointer[3].style.opacity = '1';
            pointer[3].style.left = 'calc(' + event.touches[3].clientX + 'px - 1.5em)';
            pointer[3].style.top = 'calc(' + event.touches[3].clientY + 'px - 1.5em)';

            pointer[2].style.visibility = 'visible';  
            pointer[2].style.opacity = '1';
            pointer[2].style.left = 'calc(' + event.touches[2].clientX + 'px - 1.5em)';
            pointer[2].style.top = 'calc(' + event.touches[2].clientY + 'px - 1.5em)';

            pointer[1].style.visibility = 'visible';  
            pointer[1].style.opacity = '1';
            pointer[1].style.left = 'calc(' + event.touches[1].clientX + 'px - 1.5em)';
            pointer[1].style.top = 'calc(' + event.touches[1].clientY + 'px - 1.5em)';

    }
        if (event.touches.length===5){
            pointer[4].style.visibility = 'visible';  
            pointer[4].style.opacity = '1';
            pointer[4].style.left = 'calc(' + event.touches[4].clientX + 'px - 1.5em)';
            pointer[4].style.top = 'calc(' + event.touches[4].clientY + 'px - 1.5em)';

            pointer[3].style.visibility = 'visible';  
            pointer[3].style.opacity = '1';
            pointer[3].style.left = 'calc(' + event.touches[3].clientX + 'px - 1.5em)';
            pointer[3].style.top = 'calc(' + event.touches[3].clientY + 'px - 1.5em)';

            pointer[2].style.visibility = 'visible';  
            pointer[2].style.opacity = '1';
            pointer[2].style.left = 'calc(' + event.touches[2].clientX + 'px - 1.5em)';
            pointer[2].style.top = 'calc(' + event.touches[2].clientY + 'px - 1.5em)';

            pointer[1].style.visibility = 'visible';  
            pointer[1].style.opacity = '1';
            pointer[1].style.left = 'calc(' + event.touches[1].clientX + 'px - 1.5em)';
            pointer[1].style.top = 'calc(' + event.touches[1].clientY + 'px - 1.5em)';

    }
        
    };

    pads.forEach(pad =>{
        pad.addEventListener("touchmove", showButtonHandler);
        pad.addEventListener("touchstart", showButtonHandler);
        pad.addEventListener("touchend", function(event){
        pointer[0].style.visibility = 'hidden';
        pointer[0].style.opacity = '0';
        pointer[1].style.visibility = 'hidden';
        pointer[1].style.opacity = '0';
        pointer[2].style.visibility = 'hidden';
        pointer[2].style.opacity = '0';
        pointer[3].style.visibility = 'hidden';
        pointer[3].style.opacity = '0';
        pointer[4].style.visibility = 'hidden';
        pointer[4].style.opacity = '0';
        });
    });


};


// padsContainer.addEventListener("mousedown",playNote);
padsContainer.addEventListener("touchstart",playNote);
padsContainer.addEventListener("touchend",reset);
padsContainer.addEventListener("touchmove",detune);
padsContainer.addEventListener("touchstart",addTouchLength);
padsContainer.addEventListener("touchend",changeTouchLength);






