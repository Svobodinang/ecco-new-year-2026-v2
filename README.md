# native-js-starter

## vite + pug + scss + typescript

Базовый проект для начала работы над простым проектом без фрейморвка. 
Подходит для одностраничного сайта, можно сделать несколько независимых страниц.
Преднастроены стили, медиа запросы, струтура проекта и линтеры.

#### Start
```
npm i
npm run dev
```

#### Deploy
```
npm i
npm run build
npm run preview
```

#### Просмотр в статике

Проект собирается в папку dist
Чтобы просто открыть файл index.html в статике, поменять в index.html:

```
<script **type="module"** src="./assets/main-hdw8aNdb.js"></script>
```

на

```
<script **defer** src="./assets/main-hdw8aNdb.js"></script>
```
