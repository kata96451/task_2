Даний застосунок призначений для видозміни масиву об'єктів data. Після отримання JSON(файл db.json) даних у форматі
{
  "data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},
           {"user": "greg@mail.com", "rating": 14, "disabled": false},
           {"user": "john@mail.com", "rating": 25, "disabled": true}],
  "condition": {
    "exclude": [{"disabled": true}], "sort_by": ["rating"]
  }
}

функція main в залежності від умови у condition викликає відповідні функції. Результатом функції являється видозмінений об'єкт, який можна побачити у консолі та у новому файлі result.json

Для використання цього додатка після встановлення даних файлу локально потрібно:
1. у терміналі запустити команду npm i
2. запустити додаток у середовищі node.js. Для цього можна використати одну с наведених команд:
  - node app.js
  - npx nodemon app.js
  - npm run watch
