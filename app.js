const pads = document.querySelectorAll(".pad");
var synth= new Tone.PolySynth().toMaster();
const now = Tone.now();
let startingTouchX;
let startingTouchY;
let eventTouchArray=[];
var pointer = document.querySelectorAll('.pointer');
const scaleButton = document.querySelector('.scaleButton');
const scaleMenu = document.querySelector('.scale-selector');
const majScale = document.querySelector('.major-scale');
const majPenScale = document.querySelector('.major-pen-scale');
const minScale = document.querySelector('.minor-scale');
const minPenScale = document.querySelector('.minor-pen-scale');
const chrScale = document.querySelector('.chromatic-scale');
const cKey = document.querySelector('.c-key');
const csharpKey = document.querySelector('.csharp-key');
const dKey = document.querySelector('.d-key');
const dsharpKey = document.querySelector('.dsharp-key');
const eKey = document.querySelector('.e-key');
const fKey = document.querySelector('.f-key');
const fsharpKey = document.querySelector('.fsharp-key');
const gKey = document.querySelector('.g-key');
const gsharpKey = document.querySelector('.gsharp-key');
const aKey = document.querySelector('.a-key');
const asharpKey = document.querySelector('.asharp-key');
const bKey = document.querySelector('.b-key');
const keybutton = document.querySelectorAll('.keybutton');
const closeButton = document.querySelector(".closeButton");



const padsContainer = document.querySelector(".pads-container");

let currentScale ="maj";
let currentKey=0;



//create notes
const notesObj = 
{scale:currentScale, 
notes: [],
notesClass:[]
};



var toggle = false;

function toggleImg(){
    if (toggle === true) {
        scaleButton.src="./images/scale.png";
        closeButton.style.opacity=1;
    } else {
        scaleButton.src="./images/Scale_Selected.png";
        closeButton.style.opacity=.3;
    }
    toggle = !toggle; 

}

scaleButton.addEventListener("touchstart",function(){
    scaleMenu.classList.toggle("active");
    toggleImg();
});

const octaveButton = document.querySelector('.octaveButton');


octaveButton.addEventListener("touchstart",function(){
});

// scaleButton.addEventListener("touchstart",changeScale);
// scaleButton.addEventListener("touchend",function(){
//     setTimeout(function(){
//         scaleButton.style.transform = "scale(1)";
//         scaleButton.style.opacity ="1";
//     }, 100);

    
// });

function generateScale(scaleType, startingNote){
    var NOTES_NUM_NAMES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b","c oct", "c# oct", "d oct", "d# oct", "e oct", "f oct", "f# oct", "g oct", "g# oct", "a oct", "a# oct", "b oct"]


    let scale = [];
    if (scaleType==="maj"){
        scale = [-1,0,2,4,5,7,9,11,12];
    } else if (scaleType==="min"){
        scale = [-2,0,2,3,5,7,8,10,12];
    } else if(scaleType==="min-pen"){
        scale = [-2,0,3,5,7,10,12];
    } else if(scaleType==="maj-pen"){
        scale = [-3,0,2,4,7,9,12];
    } else if(scaleType==="chr"){
        scale = [-1,0,1,2,3,4,5,6,7,8,9,10,11,12];
    }
    // var startingNote = 0;  // C
    var myScale = [];
    var myScaleClass = [];
    let nextInterval;
    let prevInterval;
    
    for(var i=1; i < scale.length-1; i++) {
        let currentNote = NOTES_NUM_NAMES[scale[i] + startingNote];
        myScale.push(currentNote);
        if(scale[i+1] - scale[i]===2){
            nextInterval = " full-up"
        }else if(scale[i+1] - scale[i]===1){
            nextInterval = " half-up"
        }else{
            nextInterval = " threehalf-up"
        }
        if(i===1){
            if(scale[i-1]===-2){
                prevInterval = " full-down"
            }else if(scale[i-1]===-1){
                prevInterval = " half-down"
            }else{
                prevInterval = " threehalf-down"
            }
        }
        else if(scale[i] - scale[i-1]===2){
            prevInterval = " full-down"
        }else if(scale[i] - scale[i-1]===1){
            prevInterval = " half-down"
        }else{
            prevInterval = " threehalf-down"
        }
    myScaleClass.push(currentNote + nextInterval + prevInterval);
        nextInterval="";
        prevInterval="";
    }
    notesObj["notes"] = myScale;
    notesObj["notesClass"] = myScaleClass;
    notesObj["scale"]=scaleType;
    
createPads(startingNote);
createPointer();

}



majScale.addEventListener("touchstart",function(e){
    e.preventDefault();
    majScale.classList.add("active");
    majPenScale.classList.remove("active");
    minScale.classList.remove("active");
    minPenScale.classList.remove("active");
    chrScale.classList.remove("active");
    currentScale="maj";
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});
majPenScale.addEventListener("touchstart",function(e){
    e.preventDefault();
    majScale.classList.remove("active");
    majPenScale.classList.add("active");
    minScale.classList.remove("active");
    minPenScale.classList.remove("active");
    chrScale.classList.remove("active");
    chrScale.classList.remove("active");
    currentScale="maj-pen";
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});
minScale.addEventListener("touchstart",function(e){
    e.preventDefault();
    majScale.classList.remove("active");
    majPenScale.classList.remove("active");
    minScale.classList.add("active");
    minPenScale.classList.remove("active");
    chrScale.classList.remove("active");
    currentScale="min";
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});
minPenScale.addEventListener("touchstart",function(e){
    e.preventDefault();
    majScale.classList.remove("active");
    majPenScale.classList.remove("active");
    minScale.classList.remove("active");
    minPenScale.classList.add("active");
    chrScale.classList.remove("active");
    currentScale="min-pen";
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});
chrScale.addEventListener("touchstart",function(e){
    e.preventDefault();
    majScale.classList.remove("active");
    majPenScale.classList.remove("active");
    minScale.classList.remove("active");
    minPenScale.classList.remove("active");
    chrScale.classList.add("active");
    currentScale="chr";
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});





cKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    cKey.classList.add("active");
    currentKey=0;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

csharpKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    csharpKey.classList.add("active");
    currentKey=1;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});


dKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    dKey.classList.add("active");
    currentKey=2;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

dsharpKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    dsharpKey.classList.add("active");
    currentKey=3;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

eKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    eKey.classList.add("active");
    currentKey=4;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

fKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    fKey.classList.add("active");
    currentKey=5;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});
fsharpKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    fsharpKey.classList.add("active");
    currentKey=6;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

gKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    gKey.classList.add("active");
    currentKey=7;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

gsharpKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    gsharpKey.classList.add("active");
    currentKey=7;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

aKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    aKey.classList.add("active");
    currentKey=9;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});
asharpKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    asharpKey.classList.add("active");
    currentKey=10;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});

bKey.addEventListener("touchend",function(e){
    e.preventDefault();
    keybutton.forEach(key=>{
        key.classList.remove("active");
    })
    bKey.classList.add("active");
    currentKey=11;
    generateScale(currentScale,currentKey);
    createPads();
    createPointer();
});





//generate pads
const rows = document.querySelectorAll(".row");

function createPads(startingNote){
    let html = "";
    let notes = notesObj["notes"]
    let notesClass = notesObj["notesClass"];
    let notesIndex = 0;
    let rowIndex = 4;
    let octIndex = 3;
    const numOfPadsInRow= 5;
    const numOfMaxPads =  numOfPadsInRow*numOfPadsInRow;
    let octChecker =false;
    let chr="";

    if (notesObj["scale"]==="chr"){
        chr="chr"
    }else{
        chr="";
    }

    for (let padsIndex = 1; padsIndex <=numOfMaxPads; padsIndex++){
        let currentNote = notes[notesIndex];
        if(notes[notesIndex].includes(" oct")){
            currentNote = notes[notesIndex].replace(" oct",'');
            octChecker=true;
            if(!notes[notesIndex-1].includes(" oct")){
                octIndex++;    
            }
        }

        //add pad of "noteclass[notesindex] notes[notesindex] and oct[index]" to "rowindex"
        html += `<div class="pad ${notesClass[notesIndex]} padcolor${notesIndex} ${chr}" data-sound="${currentNote}${octIndex}"><p>${currentNote}<sub>${octIndex}</sub></p></div>`;

        //if row is filled with 5 pads, go to next row
        if (padsIndex%numOfPadsInRow===0){
            rows[rowIndex].innerHTML=html;
            html ="";
            rowIndex--;
        }

        //add oct once all notes go thru one
        
        //reset notes to starting 
        if (notesIndex< notes.length-1){
            notesIndex++;
        } else{
            if(octChecker===false){
                octIndex++;    
            }
            notesIndex=0;

        }

    };


    // rows.forEach(row => {

    //     for (let i = 0; i <notes.length ; i++){
    //         let note = notes[i];
    //         let noteClass = notesClass[i];
    //         html += `<div class="pad ${noteClass}" data-sound="${note}${row.dataset.oct}"><p>${note}<sub>${row.dataset.oct}</sub></p></div>`;
    //         html += '</div>';

    //     }
    //     row.innerHTML=html;
    //     html ="";
    // });
}







function playNote(event){
    synth.triggerRelease(event.target.dataset.sound);

    if(event.target.classList.contains("pad")){
        startingTouchY=event.touches[0].clientY;
        startingTouchX=event.touches[0].clientX;
        if (event.cancelable) event.preventDefault();
        // synth.triggerAttackRelease(event.target.dataset.sound,"16n");
        synth.set({ detune: 0, volume:0});
        synth.triggerAttack(event.target.dataset.sound);
        // wait one second before triggering the release
        event.target.style.opacity= "1";
        detune();
    }

}
function reset(event){
    
    if(event.target.classList.contains("pad")){

        synth.triggerRelease(event.target.dataset.sound);

        event.target.style.opacity= "0.8";
        
    }

}

// function detune(){
    
//     if(event.touches.length===1){
//         if(event.target.classList.contains("e")){
//             if (event.touches[0].clientX - startingTouchX>60){
//                 synth.set({ detune: 100});
//             }else if (event.touches[0].clientX - startingTouchX<-60){
//                 synth.set({ detune: -200});    
//             }else if(event.touches[0].clientX - startingTouchX>20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*2.5});
//             }else if(event.touches[0].clientX - startingTouchX<-20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*5});
//             }else{
//                 synth.set({ detune: 0 });
//             }
//         }else if(event.target.classList.contains("f")){
//             if (event.touches[0].clientX - startingTouchX>60){
//                 synth.set({ detune: 200});
//             }else if (event.touches[0].clientX - startingTouchX<-60){
//                 synth.set({ detune: -100});    
//             }else if(event.touches[0].clientX - startingTouchX>20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*5});
//             }else if(event.touches[0].clientX - startingTouchX<-20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*2.5});
//             }else{
//                 synth.set({ detune: 0 });
//             }
//         }else if(event.target.classList.contains("c")){
//             if (event.touches[0].clientX - startingTouchX>60){
//                 synth.set({ detune: 200});
//             }else if (event.touches[0].clientX - startingTouchX<-60){
//                 synth.set({ detune: -100});    
//             }else if(event.touches[0].clientX - startingTouchX>20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*5});
//             }else if(event.touches[0].clientX - startingTouchX<-20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*2.5});
//             }else{
//                 synth.set({ detune: 0 });
//             }
//         }else if(event.target.classList.contains("b")){
//             if (event.touches[0].clientX - startingTouchX>60){
//                 synth.set({ detune: 100});
//             }else if (event.touches[0].clientX - startingTouchX<-60){
//                 synth.set({ detune: -200});    
//             }else if(event.touches[0].clientX - startingTouchX>20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*2.5});
//             }else if(event.touches[0].clientX - startingTouchX<-20){
//                 synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*5});
//             }else{
//                 synth.set({ detune: 0 });
//             }
//         }else if (event.touches[0].clientX - startingTouchX>60){
//             synth.set({ detune: 200});
//         }else if (event.touches[0].clientX - startingTouchX<-60){
//             synth.set({ detune: -200});    
//         }else if(event.touches[0].clientX - startingTouchX>20){
//             synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*5});
//         }else if(event.touches[0].clientX - startingTouchX<-20){
//             synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*5});
//         }else{
//             synth.set({ detune: 0 });
//         }
//         synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.03 });
//         // synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.04 });
//     }
// }


function detune(){
    let minDist=20;
    let maxDist=60;
    let movementMultiplier = maxDist/12;
    if(event.touches.length===1){
        if(event.touches[0].clientX - startingTouchX>minDist){
            if(event.target.classList.contains("full-up")){
                if (event.touches[0].clientX - startingTouchX>maxDist){
                    synth.set({ detune: 200});
                }else{
                    synth.set({ detune: (event.touches[0].clientX - startingTouchX-minDist)*movementMultiplier});
                }
            }else if(event.target.classList.contains("half-up")){
                if (event.touches[0].clientX - startingTouchX>maxDist){
                    synth.set({ detune: 100});
                }else{
                    synth.set({ detune: (event.touches[0].clientX - startingTouchX-minDist)*movementMultiplier/2});
                }
            }else if(event.target.classList.contains("threehalf-up")){
                if (event.touches[0].clientX - startingTouchX>maxDist){
                    synth.set({ detune: 300});
                }else{
                    synth.set({ detune: (event.touches[0].clientX - startingTouchX-minDist)*movementMultiplier/2*3});
                }
            }
        }else if (event.touches[0].clientX - startingTouchX<-minDist){
            if(event.target.classList.contains("full-down")){
                if (event.touches[0].clientX - startingTouchX<-maxDist){
                    synth.set({ detune: -200});
                }else{
                    synth.set({ detune: (event.touches[0].clientX - startingTouchX+minDist)*movementMultiplier});
                }
            }else if(event.target.classList.contains("half-down")){
                if (event.touches[0].clientX - startingTouchX<-maxDist){
                    synth.set({ detune: -100});
                }else{
                    synth.set({ detune: (event.touches[0].clientX - startingTouchX+minDist)*movementMultiplier/2});
                }
            }else if(event.target.classList.contains("threehalf-down")){
                if (event.touches[0].clientX - startingTouchX<-maxDist){
                    synth.set({ detune: -300});
                }else{
                    synth.set({ detune: (event.touches[0].clientX - startingTouchX+minDist)*movementMultiplier/2*3});
                }
            }
        }else{
            synth.set({ detune: 0 });
        }
        synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.03 });
    
    }
}


function addTouchLength(){
    eventTouchArray.push(event.touches.length);
}

function changeTouchLength(){
    if (eventTouchArray[eventTouchArray.length-1]>=2){
        startingTouchY=event.touches[0].clientY;
        startingTouchX=event.touches[0].clientX;
    }

}


// padsContainer.addEventListener("mousedown",playNote);
padsContainer.addEventListener("touchstart",playNote);
padsContainer.addEventListener("touchend",reset);
padsContainer.addEventListener("touchmove",detune);
padsContainer.addEventListener("touchstart",addTouchLength);
padsContainer.addEventListener("touchend",changeTouchLength);

// padsContainer.addEventListener("mouseup",reset);
// padsContainer.addEventListener("mouseout",reset);





function setViewportHeight(){
    let vh = window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}


setViewportHeight();


window.addEventListener("resize",()=>{
    setTimeout(setViewportHeight, 100);
});







function createPointer(){
    const pads = document.querySelectorAll(".pad");
    var showButtonHandler = function(event){

        pointer[0].style.visibility = 'visible';  
        pointer[0].style.opacity = '1';
        pointer[0].style.left = 'calc(' + event.touches[0].clientX + 'px - 1.5em)';
        pointer[0].style.top = 'calc(' + event.touches[0].clientY + 'px - 1.5em)';
        // pointer[0].style.background = event
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


generateScale(currentScale,currentKey);
