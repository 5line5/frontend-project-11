const resources = {
  ru: {
    translation: {
      form: {
        placeholder: 'Ссылка на RSS',
        button: 'Добавить',
      },
      errors: {
        0: 'RSS был успешно добавлен',
        1: 'Должна быть введена ссылка',
        2: 'Такая ссылка уже была добавлена',
        3: 'Произошла сетевая ошибка',
        4: 'Ошибка при парсинге данных',
        5: 'Неизвестная ошибка',
      },
    },
  },
  en: {
    translation: {
      form: {
        placeholder: 'RSS link',
        button: 'Add',
      },
      errors: {
        0: 'RSS has been loaded',
        1: 'URL is expected',
        2: 'URL must be uniq, such URL has already been added',
        3: 'Network error',
        4: 'Error while parsing RSS stream',
        5: 'Unknown Error',
      },
    },
  },
};

export default resources;
