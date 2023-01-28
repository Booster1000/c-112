prediction_1 = "";
prediction_2 = "";

Webcam.set({
    height: 300,
    width: 400,
    image_format: 'jpeg',
    jpeg_quality: 100
});

camera = document.getElementById('webcam_view');

Webcam.attach('#webcam_view');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('snapshot').innerHTML = '<img id="sba" src=" ' + data_uri + ' " >'
    })
}

console.log("ml5.version", ml5.version);

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/N9QCiLUlc/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model loading succeeded!');
}

function check() {
    img = document.getElementById('sba');
    Classifier.classify(img, got_result);
}

function got_result(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById('emotion_1').innerHTML = results[0].label;
        document.getElementById('emotion_2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == 'Sad') {
            document.getElementById('emoji_1').innerHTML = '&#128532';
        }
        if (results[0].label == 'Happy') {
            document.getElementById('emoji_1').innerHTML = '&#128522';
        }
        if (results[0].label == 'Angry') {
            document.getElementById('emoji_1').innerHTML = '&#128545';
        }

        if (results[1].label == 'Sad') {
            document.getElementById('emoji_2').innerHTML = '&#128532';
        }
        if (results[1].label == 'Happy') {
            document.getElementById('emoji_2').innerHTML = '&#128522';
        }
        if (results[1].label == 'Angry') {
            document.getElementById('emoji_2').innerHTML = '&#128545';
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = 'My first prediction is' + prediction_1;
    speak_data_2 = 'And my second prediction is' + prediction_2;
    speech = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(speech);
}