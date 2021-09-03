const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
const blackNotes = ['C♯/D♭', 'D♯/E♭', 'F♯/G♭', 'G♯/A♭', 'A♯/B♭'];
const whiteKeyCount = 8, blackKeyCount = 5;
const activeCount = whiteKeyCount + blackKeyCount;
const notesPath = 'notes/';
const notes = [
	{src: 'C.mp3', id: 1, type: 'white'},
	{src: 'D.mp3', id: 2, type: 'white'},
	{src: 'E.mp3', id: 3, type: 'white'},
	{src: 'F.mp3', id: 4, type: 'white'},
	{src: 'G.mp3', id: 5, type: 'white'},
	{src: 'A.mp3', id: 6, type: 'white'},
	{src: 'B.mp3', id: 7, type: 'white'},
	{src: 'topC.mp3', id: 8, type: 'white'},
	{src: 'Csharp.mp3', id: 9, type: 'balck'},
	{src: 'Dsharp.mp3', id: 10, type: 'balck'},
	{src: 'Fsharp.mp3', id: 11, type: 'balck'},
	{src: 'Gsharp.mp3', id: 12, type: 'balck'},
	{src: 'Asharp.mp3', id: 13, type: 'balck'},
];
let canvas, stage, keyboard, noteText, whiteKeyX = 0, blackKeyX = 50;

const tick = event => stage.update(event);

const showNote = note => {
	noteText.text = note;
	createjs.Tween.get(noteText)
		.to({alpha: 1}, 250)
		.to({scaleX: 3, scaleY: 3, alpha: 0}, 2000);
};

const keyPress = key => {
	// Only change alpha of white keys
	const keyAplha = key.name.includes('/') ? 1 : 0.9;

	createjs.Tween.get(key)
		.to({x: 3, scaleX: 0.99, scaleY: 0.99, alpha: keyAplha}, 100)
		.to({x: 0, scaleX: 1, scaleY: 1, alpha: 1}, 100);
};

const playNote = e => {
	const key = e.target;

	createjs.Sound.play(key.id);
	// Reset note text values ready for next tween
	noteText.alpha = 0;
	noteText.scaleX = 1;
	noteText.scaleY = 1;

	keyPress(key);
	showNote(key.name);
};

const init = () => {
	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);
	createjs.Sound.registerSounds(notes, notesPath);
	noteText = new createjs.Text('', '50px Arial', '#17964b');
	noteText.textAlign = 'center';
	noteText.regY = 25;
	noteText.x = canvas.width / 2;
	noteText.y = 70;

	keyboard = new createjs.Container();
	keyboard.y = 150;

	// Create white keys
	for (let i = 0; i < whiteKeyCount; i++) {
		const whiteKey = new createjs.Shape();

		whiteKey.graphics.beginFill('#fff').drawRoundRectComplex(whiteKeyX, 0, 80, 300, 0, 0, 5, 5);

		whiteKey.name = whiteNotes[i];
		whiteKey.id = i + 1;

		whiteKey.on("click", playNote);

		keyboard.addChild(whiteKey);

		whiteKeyX += 81;
	}
	// Create black keys
	for (let i = 0; i < blackKeyCount; i++) {
		const blackKey = new createjs.Shape();

		blackKey.graphics.beginFill('#222').drawRoundRectComplex(blackKeyX, 0, 60, 200, 0, 0, 10, 10);

		blackKey.name = blackNotes[i];
		blackKey.id = i + 9;

		blackKey.on("click", playNote);

		keyboard.addChild(blackKey);

		i == 1 ? blackKeyX += 161 : blackKeyX += 81;
	}

	stage.addChild(keyboard);
	stage.addChild(noteText);

	createjs.Ticker.addEventListener('tick', tick);
}

const loadSounds = () => {
	const preload = new createjs.LoadQueue();
	preload.loadFile(`${notesPath}C.mp3`);
	preload.loadFile(`${notesPath}Csharp.mp3`);
	preload.loadFile(`${notesPath}D.mp3`);
	preload.loadFile(`${notesPath}Dsharp.mp3`);
	preload.loadFile(`${notesPath}E.mp3`);
	preload.loadFile(`${notesPath}F.mp3`);
	preload.loadFile(`${notesPath}Fsharp.mp3`);
	preload.loadFile(`${notesPath}G.mp3`);
	preload.loadFile(`${notesPath}Gsharp.mp3`);
	preload.loadFile(`${notesPath}A.mp3`);
	preload.loadFile(`${notesPath}Asharp.mp3`);
	preload.loadFile(`${notesPath}topC.mp3`);

	preload.addEventListener('complete', init);
}

window.addEventListener('load', () => {
	loadSounds();
});
