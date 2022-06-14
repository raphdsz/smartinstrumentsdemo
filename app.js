const pads = document.querySelectorAll(".pad");
var synth= new Tone.PolySynth().toMaster();
const now = Tone.now();
let startingTouchX;
let startingTouchY;
let eventTouchArray=[];



const padsContainer = document.querySelector(".pads-container");





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
        detune();
    }

}
function reset(event){
    
    if(event.target.classList.contains("pad")){

        synth.triggerRelease(event.target.dataset.sound);

        event.target.style.opacity= "0.8";
        
    }

}

function detune(){
    
    if(event.touches.length===1){
        if(event.target.classList.contains("e")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 100});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -200});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*2.5});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*5});
            }else{
                synth.set({ detune: 0 });
            }
        }else if(event.target.classList.contains("f")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 200});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -100});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*5});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*2.5});
            }else{
                synth.set({ detune: 0 });
            }
        }else if(event.target.classList.contains("c")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 200});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -100});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*5});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*2.5});
            }else{
                synth.set({ detune: 0 });
            }
        }else if(event.target.classList.contains("b")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 100});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -200});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*2.5});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*5});
            }else{
                synth.set({ detune: 0 });
            }
        }else if (event.touches[0].clientX - startingTouchX>60){
            synth.set({ detune: 200});
        }else if (event.touches[0].clientX - startingTouchX<-60){
            synth.set({ detune: -200});    
        }else if(event.touches[0].clientX - startingTouchX>20){
            synth.set({ detune: (event.touches[0].clientX - startingTouchX-20)*5});
        }else if(event.touches[0].clientX - startingTouchX<-20){
            synth.set({ detune: (event.touches[0].clientX - startingTouchX+20)*5});
        }else{
            synth.set({ detune: 0 });
        }
        synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.03 });
        // synth.set({ volume: (startingTouchY - event.touches[0].clientY)*.04 });
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







(function(){
    // var svg_body = 'data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%3E%3Cellipse opacity=\'0.65\' ry=\'50\' rx=\'50\' id=\'svg_1\' cy=\'100\' cx=\'100\' stroke-width=\'100\' stroke=\'%23000\' fill=\'%23000\'/%3E%3Cellipse opacity=\'0.55\' ry=\'35\' rx=\'35\' id=\'svg_2\' cy=\'100\' cx=\'100\' stroke-width=\'100\' stroke=\'%23FFF\' fill=\'%23FFF\'/%3E%3C/g%3E%3C/svg%3E';
    // var img = document.createElement('img');
    // img.classList.add("pointer")
    // img.src = svg_body;
    // var img3 = document.createElement('img');
    // img3.classList.add("pointer")
    // img3.src = svg_body;

    var pointer = document.querySelectorAll('.pointer');



    document.addEventListener("DOMContentLoaded", function() {
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
    });
})();


