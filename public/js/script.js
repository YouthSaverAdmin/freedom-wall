document.getElementById('message-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('message-content').value;
  
    if (content) {
      await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      document.getElementById('message-content').value = '';
      loadMessages();
    }
  });
  
  async function loadMessages() {
    const res = await fetch('http://localhost:3000/api/messages');
    const messages = await res.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.textContent = message.content;
      messagesDiv.appendChild(messageElement);
    });
  }
  
  loadMessages();
  