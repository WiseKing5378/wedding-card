document.addEventListener('DOMContentLoaded', () => {
  // Установите конечную дату
  const deadline = new Date('2025-10-04T14:00:00');
  
  // Найдите элементы DOM
  const elDays = document.querySelector('.timer__days');
  const elHours = document.querySelector('.timer__hours');
  const elMinutes = document.querySelector('.timer__minutes');
  const elSeconds = document.querySelector('.timer__seconds');
  
  // Функция склонения числительных
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
  };

  // Функция обновления таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

    if (diff === 0) {
      clearInterval(timerId);
    }
  };

  // Запустите таймер
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});












const form = document.getElementsByClassName('form')
const modal = document.getElementById('modal');




// Функция для отправки данных в Telegram
function sendDataToTelegram(formData) {
    const botToken = '8307638195:AAH6WDx-1RA84byyMCM7gMZTP0qk9n_pJqQ'; // Токен вашего бота
    const chatId = '-4860432464'; // ID получателя (пользователя)
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`; // URL для отправки сообщения


    const message = `
📩 Вам новая заявка:
<b>Имя:</b> ${formData.name}

<b>Телефон:</b> ${formData.phone}

<b>Необходимо размещение:</b> ${formData.home}

    `;

    const params = {
        chat_id: chatId, // ID чата
        text: message, // Текст сообщения
        parse_mode: 'HTML' // Режим парсинга HTML
    };

    // Отправляем данные с помощью fetch API
    return fetch(apiUrl, {
        method: 'POST', // Метод отправки
        headers: {
            'Content-Type': 'application/json', // Указываем тип содержимого
        },
        body: JSON.stringify(params) // Преобразуем параметры в JSON
    }).then(response => response.json()); // Возвращаем ответ в формате JSON
    
}


addEventListener('submit', (e) => {
    e.preventDefault();

        const formData = { 
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            home: document.getElementById('home').checked ? 'да': 'нет',
        };

        sendDataToTelegram(formData)
            .then(result => {
                    document.getElementById('form').style.display = 'none'
                    document.getElementById('modal').style.display = 'flex'
            })

});