//console.log('loaded!');
var time = 10;
var interval, siren;

document.addEventListener('DOMContentLoaded', function(){
	console.log("DOM got loaded");
	document.getElementById('reset').addEventListener('click', start);
	// look up how setInterval works.
});
//console.log('loaded! again');
function start(){
	console.log('starting game');
	addWireListeners();
	clearInterval(interval);
	time = 10;
	document.getElementById('timer').textContent = time;
	interval = setInterval(tick, 1000); // look up how setInterval works.
	this.textContent = 'Try Again!';
	document.getElementsByTagName('body')[0].classList.remove('exploaded');
	document.getElementsByTagName('body')[0].classList.add('unexploaded');
	document.getElementById('message').textContent = 'You have save this city!';
	document.getElementById('timer').style.color = 'chartreuse';
	siren=document.getElementById('siren');
	siren.play();
}
function tick(){
	console.log('tick!', time);
	time -= 1;
	document.getElementById('timer').textContent = time;
	if (time<= 10){
	document.getElementById('timer').style.color = 'red';
	}
	
	if(time <= 0){
		loseGame();
	}
}
function addWireListeners(){
//	console.log('Adding event listeners to wires');
	var wireImages = document.querySelectorAll('#box img');
//	console.log(wireImages);
	for (var i = 0; i < wireImages.length; i++){
		wireImages[i].src = './img/uncut-'+ wireImages[i].id+'-wire.png';
		// this decides wheather wire should be cut or not:
		wireImages[i].setAttribute('data-cute', (Math.random() > 0.5).toString());
		console.log(wireImages[i]);
		wireImages[i].addEventListener('click', clickWire);
	}
	//if all false, that's not a great game reset: 
	if(checkWin()){
		start();
	}
}
function removeWireListeners(){
	var wireImages = document.querySelectorAll('#box img');
	for (var i = 0; i < wireImages.length; i++){
		wireImages[i].removeEventListener('click', clickWire);
	}
}
function clickWire(){
	console.log('wire clicked', this.id);
	this.src = './img/cut-' + this.id + '-wire.png';
	this.removeEventListener('click', clickWire);
//	checking 
	if(this.getAttribute('data-cute') === 'true'){
		console.log('Yay');
		this.setAttribute('data-cute', 'false');
		document.getElementById('buzz').play();
		if(checkWin()){
			winGame();
			console.log('I WIN!');
		}else{
			console.log('keep on trying!');
		
			}
	    }
	    else {
		console.log('BOOM!');
		loseGame();
	}
}
function checkWin(){
	var wireImages = document.querySelectorAll('#box img');
	for (var i = 0; i < wireImages.length; i++){
		if (wireImages[i].getAttribute('data-cute') ==='true'){
			return false;
		}
	}
	return true;
}
function stopGame(message){
	clearInterval(interval);
	removeWireListeners();
	siren.pause();
	document.getElementById('message').textContent = message;

}
function winGame(){
//	console.log('win FNC');
	stopGame('YAAY, YOU SAVED THE city!!!!');
	var cheer = document.getElementById('cheer');

	cheer.addEventListener('ended', function(){
		document.getElementById('success').play();});
	cheer.play();

//	document.getElementById('message').textContent = 'YAAY, YOU SAVED THE city!!!!';
}
function loseGame(){
	stopGame('You have failed this city!');
	//show.explosion
	document.getElementsByTagName('body')[0].classList.remove('unexploaded');
	document.getElementsByTagName('body')[0].classList.add('exploaded');
	//play.explosion.noise
	var explodeSound = document.getElementById('explode');
	explodeSound.play();
	//Set some loser text: 
//	document.getElementById('message').textContent = 'You have failed this city!';
}
















