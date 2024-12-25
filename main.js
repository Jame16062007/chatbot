const responses = {
    "hola": [
        "<img src='img_chania.jpg' alt='Flowers'>",
        "¡Hey! Me alegro de verte por aquí",
        "<strong>¡Hola!</strong> ¿En qué puedo ayudarte hoy?",
        "<span style='color: blue'>¡Bienvenido!</span> ¿Qué tal estás?"
    ],
    "como estas": [
        "¡Muy bien, gracias por preguntar! ¿Y tú qué tal?",
        "<em>¡Excelente!</em> ¿Qué tal va tu día?",
        "<strong>¡Todo genial por aquí!</strong> ¿Y tú?",
        "<span style='color: green'>¡Perfecto!</span> ¿Cómo te encuentras?"
    ],
    "adios": [
        "¡Hasta luego! <strong>Que tengas un excelente día</strong>",
        "<span style='color: blue'>¡Adiós! Fue un placer ayudarte</span>",
        "<em>¡Nos vemos pronto!</em> Cuídate mucho",
        "¡Hasta la próxima! Que te vaya bien"
    ],
    "default": [
        "No entiendo. ¿Podrías reformular tu pregunta?",
        "<em>Disculpa</em>, ¿puedes decirlo de otra manera?",
        "<strong>No he comprendido</strong>, ¿podrías explicarlo diferente?"
    ]
};

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function addMessage(message, isUser) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const profilePic = document.createElement('img');
    profilePic.className = 'profile-pic';
    profilePic.src = isUser ? '/api/placeholder/30/30' : 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png';
    profilePic.alt = isUser ? 'User' : 'Bot';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = isUser ? sanitizeHTML(message) : message;
    
    messageDiv.appendChild(profilePic);
    messageDiv.appendChild(messageContent);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(message) {
    message = message.toLowerCase();
    const responseArray = responses[message] || responses["default"];
    return getRandomResponse(responseArray);
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, true);
        input.value = '';
        
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, false);
        }, 500);
    }
}

document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
