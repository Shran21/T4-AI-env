const API_URL = 'http://192.168.0.146:5000/message';
const chatContainer = document.getElementById('chat-container');
const chatHeader = document.querySelector('.chat-header');
const chatHeaderClose = document.getElementById('chat-header-close');
const chatHeaderMinimize = document.getElementById('chat-header-minimize');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBubble = document.getElementById('chat-bubble');
const chatForm = document.getElementById('chat-form');
			
let chatOpen = false;
let initSent = false;
	

function addMessage(message, sender) {
	const messageElement = document.createElement('div');
		messageElement.classList.add('chat-message');
		messageElement.classList.add(sender);
	const messageText = document.createTextNode(message);
		messageElement.appendChild(messageText);
		chatBody.appendChild(messageElement);
		chatBody.scrollTop = chatBody.scrollHeight;
}
		
function handleSendClick() {
	const message = chatInput.value;
		if (message.trim() !== '') {
			addMessage(message, 'sender');
			fetch(API_URL, {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				message: message
				})
			})
			.then(response => response.json())
			.then(data => {
					
			addMessage(data.message, 'receiver');
			})
			.catch(error => {
			console.error('Error:', error);
			});
		
			chatInput.value = '';
				}
			}
			
			chatInput.addEventListener('keydown', event => {
				if (event.keyCode === 13) {
					event.preventDefault();
					handleSendClick();
					}
				});
			
			
			chatSend.addEventListener('click', handleSendClick);			
				
				
function toggleChat() {
	chatOpen = !chatOpen;
		if (chatOpen) {
			chatContainer.style.display = 'block';
			chatBubble.style.display = 'none';

	}}
chatBubble.addEventListener('click', toggleChat);


chatHeaderClose.addEventListener('click', toggleChat);

chatHeaderMinimize.addEventListener('click', toggleChat);


chatForm.addEventListener('submit', function(event) {
	event.preventDefault();
	sendMessage();
});


function sendMessage() {
	const message = chatInput.value;
	chatInput.value = '';	
	const messageElement = document.createElement('div');
	messageElement.classList.add('chat-message', 'user-message');
	messageElement.innerHTML = message;	
	chatMessages.appendChild(messageElement);
	generateResponse(message);
}

function generateResponse(message) {
	const messageElement = document.createElement('div');
	messageElement.classList.add('chat-message', 'bot-message');
	messageElement.innerHTML = response;
	chatMessages.appendChild(messageElement);
}