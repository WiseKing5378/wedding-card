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
const modal = document.getElementsByClassName('modal');
console.log(modal)



// Функция для отправки данных в Telegram
function sendDataToTelegram(formData) {
    const botToken = '8307638195:AAH6WDx-1RA84byyMCM7gMZTP0qk9n_pJqQ'; // Токен вашего бота
    const chatId = '-4860432464'; // ID получателя (пользователя)
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`; // URL для отправки сообщения

    // Формируем сообщение в формате HTML
    const message = `
📩 Вам новая заявка:
<b>Имя:</b> ${formData.name}

<b>Телефон:</b> ${formData.phone}

    `;
console.log(message)
    // Параметры, которые будем отправлять
    const params = {
        chat_id: chatId, // ID чата
        text: message, // Текст сообщения
        parse_mode: 'HTML' // Режим парсинга HTML
    };
modal.innerHTML = '<div class="modal-content"><p>Отправка данных...</p></div>';
    // Отправляем данные с помощью fetch API
    return fetch(apiUrl, {
        method: 'POST', // Метод отправки
        headers: {
            'Content-Type': 'application/json', // Указываем тип содержимого
        },
        body: JSON.stringify(params) // Преобразуем параметры в JSON
    }).then(response => response.json()); // Возвращаем ответ в формате JSON
    
}

// Обработчик события отправки формы
addEventListener('submit', (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы
    if (true) { // Проверяем форму на валидность
        const formData = { // Собираем данные из формы
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
        };

        // Показать состояние загрузки
        modal.innerHTML = '<div class="modal-content"><p>Отправка данных...</p></div>';
        console.log(modal)

        // Отправляем данные в Telegram
        sendDataToTelegram(formData)
            .then(result => {
                if (result.ok) {
                    // Если данные успешно отправлены
                     console.log('11')
                    modal.innerHTML = '<div class="modal-content"><p>Ваша анкета успешно отправлена</p></div>';
                } else {
                    // Если произошла ошибка при отправке
                    console.log('errorr')
                    modal.innerHTML = '<div class="modal-content"><p>Ошибка при отправке анкеты. Пожалуйста, попробуйте еще раз.</p></div>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Обработка ошибки
                modal.innerHTML = '<div class="modal-content"><p>Произошла ошибка. Пожалуйста, попробуйте позже.</p></div>';
            })
            .finally(() => {
                // Закрываем модальное окно и сбрасываем форму через 3 секунды
                setTimeout(() => {
                    // modal.style.display = 'none';
                    form.reset(); // Сброс формы
                }, 3000);
            });
    }
});