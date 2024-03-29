import { Accordion } from '../../components/Accordion/Accordion';
import { PagesBackButton } from '../../components/PagesBackButton/PagesBackButton';

const dataPolicy = [
  {
    title: 'Обрабатываемые данные',
    content:
      'Мы не осуществляем сбор ваших персональных данных с использованием Сайта',
  },
  {
    title: 'Цели обработки данных',
    content:
      'Информационное обслуживание, включая рассылку рекламно-информационных материалов',
  },
  {
    title: 'Требования к защите данных',
    content:
      'Администрация осуществляет хранение данных и обеспечивает их охрану от несанкционированного доступа и распространения в соответствии с внутренними правилами и регламентами',
  },
  {
    title: 'Передача данных',
    content:
      'Администрация вправе передать данные третьим лицам для защиты прав и законных интересов Администрации в связи с допущенными Пользователем нарушениями',
  },
  {
    title: 'Изменение Политики конфиденциальности',
    content:
      'Настоящая Политика может быть изменена или прекращена Администрацией в одностороннем порядке без предварительного уведомления Пользователя. Новая редакция Политики вступает в силу с момента ее размещения на Сайте, если иное не предусмотрено новой редакцией Политики',
  },
];

export const PolicyPage = () => {
  const data = dataPolicy.map((el) => ({ ...el, id: el.title.slice(10) }));
  return (
    <>
      <div className="button_back_offset">
        <PagesBackButton />
      </div>
      <h2>Правила и Политика конфиденциальности</h2>
      {data.map((e, i) => (
        <Accordion key={e.id || i} title={e.title}>
          {e.content}
        </Accordion>
      ))}
    </>
  );
};
