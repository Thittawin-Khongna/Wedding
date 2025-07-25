const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);
        messageInput.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // เลื่อนไปข้อความล่าสุด
    }
});

const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const weddingDate = new Date('November 3, 2025 09:00:00').getTime(); // แก้ไขวันที่และเวลาตามงานแต่งของคุณ

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysSpan.textContent = String(days).padStart(2, '0');
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');
    } else {
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
    }
};

updateCountdown();
setInterval(updateCountdown, 1000);

const wishForm = document.getElementById('wish-form');
const messagesContainer = document.getElementById('messages');

let wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];

function renderWishes() {
    messagesContainer.innerHTML = '';
    if (wishes.length === 0) {
        messagesContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d;">ยังไม่มีคำอวยพรในขณะนี้</p>';
        return;
    }

    // Sort wishes by timestamp (newest first)
    // Create a copy to avoid mutating the original array when sorting
    const sortedWishes = [...wishes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sortedWishes.forEach(wish => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-item');
        messageElement.innerHTML = `<strong>${wish.name}:</strong> ${wish.message}`;
        messagesContainer.appendChild(messageElement); // Append to the bottom
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

if (wishForm) {
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('wish-name');
        const messageInput = document.getElementById('wish-message');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            const newWish = { name, message, timestamp: new Date().toISOString() };
            wishes.push(newWish);
            localStorage.setItem('weddingWishes', JSON.stringify(wishes));
            renderWishes();
            nameInput.value = '';
            messageInput.value = '';
        } else {
            alert('กรุณากรอกชื่อและคำอวยพรให้ครบถ้วน');
        }
    });


const form = document.getElementById('blessingForm');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const blessingList = document.getElementById('blessingList');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) return;

    const blessingItem = document.createElement('div');
    blessingItem.classList.add('blessing-item');

    blessingItem.innerHTML = `
      <p><strong>${name}</strong> กล่าวว่า:</p>
      <p>${message}</p>
    `;

    blessingList.prepend(blessingItem);

    nameInput.value = '';
    messageInput.value = '';
  });
}

function submitWish() {
    const name = document.getElementById("nameInput").value.trim();
    const wish = document.getElementById("wishInput").value.trim();
    const list = document.getElementById("wishesContainer");

    if (name === "" || wish === "") {
        alert("กรุณากรอกชื่อและคำอวยพรให้ครบถ้วน");
        return;
    }

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${name}:</strong> ${wish}`;
    list.appendChild(listItem);

    // Clear inputs
    document.getElementById("nameInput").value = "";
    document.getElementById("wishInput").value = "";
}

