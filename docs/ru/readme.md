# Templater
Templater - программа, с помощью которой можно создавать файлы word с помощью данных из excel файла

[readme in English](../../README.md)

# Состояние резилов
**Windows**: Не протестированно
**Mac**:
*Intel*: Протестированно - Работает
*Arm*: Не протестированно
**Linux**: Не протестированно


# Возможности
- шаблонизация 
- возможность сопоставлять заголовки таблицы и имена переменных из шаблона

# Ограничения
## Требования к Word файлу
Переменные должны быть в формате { var_name }
Доступные символы для имен переменных: A-Z, a-z, 0-9, _
## Требования к Excel файлу
Первая строка всегда воспринимается как заголовки таблицы
## Выходные файлы
Выходные файлы будут называться output_N.docx, где N - номер строки данных из таблицы

# Установка
## Самостоятельная установка
### Для windows
```$ npm run build:win```
### Для macOS
```$ npm run build:mac```
### Для Linux
```$ npm run build:linux```

# Руководство пользователя
1. Выберете word файл шаблона
2. Выбере excel файл с данными
3. Нажмите Go to config
4. Сопаставьте имена переменных и заголовки таблицы
5. Нажмите Template it!
6. Выберете папку куда сохраните результат
7. Готово


# Планы по развитию
## Pretty Update
Улучшить общий UX и взаимодействие с программной. Сделать ее доступнее для пользователей

Планируемые фичи:
- Фича: локализация на языки ООН
- Показать в проводнике / finder выбранный файл
- Перетаскивание файлов шаблона и данных
- Поддержка других форматов для шаблонов и для данных

## Feedback Update
Дать позльзователям быстрее и надежнее даввать обратную связь

Планируемые фичи:
- отправить отчет об ошибке (в issues на гитхаб)
- указать на неправильный перевод

## Control Update
Дать больше возможностей для кастомизация

Планируемые фичи:
- Возможность указывать имена файлов с использованием шаблонной строки
- Возможность отмечать те данные которые хочешь сделать из таблицы 
- Возможность смены шаблона захвата переменных
- Возможность сохранить настроек
- Возможность выбрать глубину заголовков (если не одна строка, а например там есть )