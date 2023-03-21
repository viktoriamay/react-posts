// кастомные хуки можно использовать за пределами компонентов
// внутри кастомных хуков можно использовать дефолтные хуки

import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {

  // в стейт прокидываем велью (в нашем случае это вводимое в инпут значение), которое назначим позже
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // наше велью появится (засетится ну или же отправится на сервер запрос в нашем случае) только тогда, когда пройдет время задержки
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // когда предыдущий запрос выполнился и теперь отправляется новый, старый таймаут (то, что выше) очищается
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;