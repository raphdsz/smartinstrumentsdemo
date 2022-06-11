const pads = document.querySelectorAll(".pad");
var synth= new Tone.PolySynth().toMaster();
const now = Tone.now();
let startingTouchX;
let startingTouchY;




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
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*1.75-30});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*3.5+30});
            }else{
                synth.set({ detune: 0 });
            }
        }else if(event.target.classList.contains("f")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 200});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -100});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*3.5-30});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*1.75+30});
            }else{
                synth.set({ detune: 0 });
            }
        }else if(event.target.classList.contains("c")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 200});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -100});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*3.5-30});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*1.75+30});
            }else{
                synth.set({ detune: 0 });
            }
        }else if(event.target.classList.contains("b")){
            if (event.touches[0].clientX - startingTouchX>60){
                synth.set({ detune: 100});
            }else if (event.touches[0].clientX - startingTouchX<-60){
                synth.set({ detune: -200});    
            }else if(event.touches[0].clientX - startingTouchX>20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*1.75-30});
            }else if(event.touches[0].clientX - startingTouchX<-20){
                synth.set({ detune: (event.touches[0].clientX - startingTouchX)*3.5+30});
            }else{
                synth.set({ detune: 0 });
            }
        }else if (event.touches[0].clientX - startingTouchX>60){
            synth.set({ detune: 200});
        }else if (event.touches[0].clientX - startingTouchX<-60){
            synth.set({ detune: -200});    
        }else if(event.touches[0].clientX - startingTouchX>20){
            synth.set({ detune: (event.touches[0].clientX - startingTouchX)*3.5-30});
        }else if(event.touches[0].clientX - startingTouchX<-20){
            synth.set({ detune: (event.touches[0].clientX - startingTouchX)*3.5+30});
        }else{
            synth.set({ detune: 0 });
        }
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


setViewportHeight();


window.addEventListener("resize",()=>{
    setTimeout(setViewportHeight, 100);
});







// (function(){
//     console.log('show-touch-js loaded!');
//     var svg_body = 'data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%3E%3Cellipse opacity=\'0.65\' ry=\'50\' rx=\'50\' id=\'svg_1\' cy=\'100\' cx=\'100\' stroke-width=\'100\' stroke=\'%23000\' fill=\'%23000\'/%3E%3Cellipse opacity=\'0.55\' ry=\'35\' rx=\'35\' id=\'svg_2\' cy=\'100\' cx=\'100\' stroke-width=\'100\' stroke=\'%23FFF\' fill=\'%23FFF\'/%3E%3C/g%3E%3C/svg%3E';
//     img = document.createElement('img');
//     img.src = svg_body;
//     img.style.width = '3em';
//     img.style.height = '3em';
//     img.style.display = 'none';
//     img.style.position = 'absolute';
//     document.addEventListener("DOMContentLoaded", function() {
//         document.body.append(img);
//         var showButtonHandler = function(event){
//             img.style.display = '';
//             img.style.left = 'calc(' + event.touches[0].clientX + 'px - 2em)';
//             img.style.top = 'calc(' + event.touches[0].clientY + 'px - 1.5em)';
//         };
//         pads.forEach(pad =>{
//             pad.addEventListener("touchmove", showButtonHandler);
//             pad.addEventListener("touchstart", showButtonHandler);
//             pad.addEventListener("touchend", function(event){
//                 img.style.display = 'none';
//             });
    
//         });
//     });
// })();


