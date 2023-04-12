# Проект React Posts App

## Реализовано:
1. Каталог постов
2. Страницы:
    - Главная страница неавторизованного пользователя
    - Главная страница авторизованного пользователя (список постов)
    - Страница поста
    - Страница избранных постов
    - Страница с информацией о текущем пользователе с возможностью редактирования данных
    - Страница просмотра данных пользователя
    - Страница политики конфиденциальности
    - Страница "Не найдено"
3. Модальные окна с функциями:
    - Авторизация (вход, регистрация, восстановление пароля по токену)
    - Добавление нового поста
    - Редактирование созданного поста
4. Дополнительный функционал: 
    - Сортировка постов по:
        - Дате создания (новые / старые)
        - Количеству комментариев
        - Количеству лайков
    - Поиск постов по:
        - Ключевому слову в заголовке
        - Тегу (для поиска по тегу нужно добавить символ # в начало слова в поисковой строке)
    - Пагинация с опцией выбора отображения количества постов на странице
    - Удаление поста
    - Добавление / удаление комментариев к посту
    - Футер с годом создания приложения и ссылками на контакты автора
    - Кнопка выхода из аккаунта
    - Аккордеон на странице политики конфиденциальности
    - Адаптивная мобильная версия
5. Использованные хуки:
    - useState
    - useEffect
    - useParams
    - useForm
    - useMemo
    - useNavigate
    - useLocation
    - useCallback
    - useContext
    - Кастомные хуки useDebounce и useCurrentWidth

## Использованные технологии
  1. React
  2. React-router-dom (BrowserRouter, Routes, Route)
  3. JavaScript (JSX)
  4. Props, context
  5. SCSS 
  6. AntDesign
  7. REST API
  8. Git 

## Для запуска проекта нужно:
 - Перейти в директорию проекта
 - npm install / yarn add / pnpm install
 - Команда для запуска npm start
 - Команда для сборки npm run build  

<br>
<br>
<br>
<br>  

___
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
