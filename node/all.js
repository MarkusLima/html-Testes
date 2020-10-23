const utterance = new SpeechSynthesisUtterance();

utterance.lang = "pt-BR";
utterance.voice =2;

function play(){
    speechSynthesis.speak(utterance);
}

function stop(){
    speechSynthesis.cancel();
}

function setText(event){
    utterance.text = event.target.innerText;
    play();
}