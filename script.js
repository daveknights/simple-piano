const notesPath = 'notes/';
const notes = [
	{src: 'C.mp3', id: 1, text: 'C'},
	{src: 'D.mp3', id: 2, text: 'D'},
	{src: 'E.mp3', id: 3, text: 'E'},
	{src: 'F.mp3', id: 4, text: 'F'},
	{src: 'G.mp3', id: 5, text: 'G'},
	{src: 'A.mp3', id: 6, text: 'A'},
	{src: 'B.mp3', id: 7, text: 'B'},
	{src: 'topC.mp3', id: 8, text: 'C'},
	{src: 'Csharp.mp3', id: 9, text: 'C♯/D♭'},
	{src: 'Dsharp.mp3', id: 10, text: 'D♯/E♭'},
	{src: 'Fsharp.mp3', id: 11, text: 'F♯/G♭'},
	{src: 'Gsharp.mp3', id: 12, text: 'G♯/A♭'},
	{src: 'Asharp.mp3', id: 13, text: 'A♯/B♭'},
];
let canvas, stage, keyboard, noteText, keyX = 0;

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

	notes.forEach((note, i) => {
		const key = new createjs.Shape();

		if (i === 8) {
			// Offset for first black key
			keyX = 50;
		}

		if (i < 8) {
			// White keys
			key.graphics.beginFill('#fff').drawRoundRectComplex(keyX, 0, 80, 300, 0, 0, 5, 5);

			keyX += 81;
		} else {
			// Black keys
			key.graphics.beginFill('#222').drawRoundRectComplex(keyX, 0, 60, 200, 0, 0, 10, 10);
			// Cater for no E♯/F♭ key
			i === 9 ? keyX += 161 : keyX += 81;
		}

		key.name = note.text;
		key.id = note.id;

		key.on("click", playNote);
		keyboard.addChild(key);
	});

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

window.addEventListener('load', () => loadSounds());
