const pads = document.querySelectorAll(".pad");
var synth= new Tone.PolySynth().toMaster();
const now = Tone.now();
let startingTouchX;
let startingTouchY;
let eventTouchArray=[];
var pointer = document.querySelectorAll('.pointer');
const scaleButton = document.querySelector('.scaleButton');
const scaleMenu = document.querySelector('.scale-selector');
const scaleClose = document.querySelector('.close-scale');
const majScale = document.querySelector('.major-scale');
const majPenScale = document.querySelector('.major-pen-scale');
const minScale = document.querySelector('.minor-scale');
const minPenScale = document.querySelector('.minor-pen-scale');




const padsContainer = document.querySelector(".pads-container");

//create notes
const notesObj = 
{scale:"maj", 
notes: ['c','d','e','f','g','a','b'],
notesClass:['c full-up half-down','d full-up full-down','e half-up full-down','f full-up half-down','g full-up full-down','a full-up full-down','b half-up full-down']
};


// notesObj["notes"] = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
// notesObj["notesClass"] = ['c half-up half-down','c# half-up half-down chrom','d half-up half-down','dsharp half-up half-down chrom','e half-up half-down','f half-up half-down','fsharp half-up half-down chrom','g half-up half-down','gsharp half-up half-down chrom','a half-up half-down','asharp half-up half-down chrom','b half-up half-down'];
// notesObj["scale"]="maj"



scaleButton.addEventListener("touchstart",function(){
    scaleMenu.classList.add("active");
});

scaleClose.addEventListener("touchstart",function(){
    scaleMenu.classList.remove("active");
});
// scaleButton.addEventListener("touchstart",changeScale);
scaleButton.addEventListener("touchend",function(){
    setTimeout(function(){
        scaleButton.style.transform = "scale(1)";
        scaleButton.style.opacity ="1";
    }, 100);

    
});


majScale.addEventListener("touchstart",function(){
    notesObj["notes"] = ['c','d','e','f','g','a','b'];
    notesObj["notesClass"] = ['c full-up half-down','d full-up full-down','e half-up full-down','f full-up half-down','g full-up full-down','a full-up full-down','b half-up full-down'];
    notesObj["scale"]="maj"
    createPads();
    createPointer();
});
majPenScale.addEventListener("touchstart",function(){
    notesObj["notes"] = ['c','d','e','g','a'];
    notesObj["notesClass"] = ['c full-up threehalf-down','d full-up full-down','e full-down threehalf-up','g full-up threehalf-down','a full-down threehalf-up'];
    notesObj["scale"]="maj-pen";
    createPads();
    createPointer();
});
minScale.addEventListener("touchstart",function(){
    notesObj["notes"] = ['c','d','d#','e#','g','g#','a#'];
    notesObj["notesClass"] = ['c full-up full-down','d half-up full-down','dsharp full-up half-down','esharp full-up full-down','g half-up full-down','gsharp full-up half-down','asharp full-up full-down'];
    notesObj["scale"]="min"
    createPads();
    createPointer();
});
minPenScale.addEventListener("touchstart",function(){
    notesObj["notes"] = ['c','d#','f','g','a#'];
    notesObj["notesClass"] = ['c threehalf-up full-down','dsharp full-up threehalf-down','f full-up full-down','g threehalf-up full-down','asharp full-up threehalf-down'];
    notesObj["scale"]="min-pen"
    createPads();
    createPointer();
});



function changeScale(){
    scaleButton.style.opacity =".6";
    scaleButton.style.transform = "scale(1.1)";

    if (notesObj["scale"]==="maj"){
        notesObj["notes"] = ['c','d','e','g','a'];
        notesObj["notesClass"] = ['c full-up threehalf-down','d full-up full-down','e full-down threehalf-up','g full-up threehalf-down','a full-down threehalf-up'];
        notesObj["scale"]="maj-pen"
    } else if (notesObj["scale"]==="maj-pen"){
        notesObj["notes"] = ['c','d','d#','e#','g','g#','a#'];
        notesObj["notesClass"] = ['c full-up full-down','d half-up full-down','dsharp full-up half-down','esharp full-up full-down','g half-up full-down','gsharp full-up half-down','asharp full-up full-down'];
        notesObj["scale"]="min"
    } else if (notesObj["scale"]==="min"){
        notesObj["notes"] = ['c','d#','f','g','a#'];
        notesObj["notesClass"] = ['c threehalf-up full-down','dsharp full-up threehalf-down','f full-up full-down','g threehalf-up full-down','asharp full-up threehalf-down'];
        notesObj["scale"]="min-pen"
    } else{
        notesObj["notes"] = ['c','d','e','f','g','a','b'];
        notesObj["notesClass"] = ['c full-up half-down','d full-up full-down','e half-up full-down','f full-up half-down','g full-up full-down','a full-up full-down','b half-up full-down'];
        notesObj["scale"]="maj"
    }
    createPads();
    createPointer();
};



//generate pads
const rows = document.querySelectorAll(".row");

function createPads(){
    let html = "";
    let notes = notesObj["notes"]
    let notesClass = notesObj["notesClass"];
    let notesIndex = 0;
    let rowIndex = 4;
    let octIndex = 3;
    const numOfPadsInRow= 5;
    const numOfMaxPads =  numOfPadsInRow*numOfPadsInRow;

    for (let padsIndex = 1; padsIndex <=numOfMaxPads; padsIndex++){
        //add pad of "noteclass[notesindex] notes[notesindex] and oct[index]" to "rowindex"
        html += `<div class="pad ${notesClass[notesIndex]}" data-sound="${notes[notesIndex]}${octIndex}"><p>${notes[notesIndex]}<sub>${octIndex}</sub></p></div>`;

        //if row is filled with 5 pads, go to next row
        if (padsIndex%numOfPadsInRow===0){
            rows[rowIndex].innerHTML=html;
            html ="";
            rowIndex--;
        }

        //add oct once all notes go thru one
        if (padsIndex%notes.length===0){
            octIndex++;
        }
        
        //reset notes to starting 
        if (notesIndex< notes.length-1){
            notesIndex++;
        } else{
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

createPads();
createPointer();






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
