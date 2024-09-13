const resources = {
  ru: {
    translation: {
      form: {
        placeholder: 'Ссылка на RSS',
        button: 'Добавить',
        example: 'Пример: https://lorem-rss.hexlet.app/feed?legth=10',
      },
      errors: {
        0: 'RSS успешно загружен',
        1: 'Ссылка должна быть валидным URL',
        2: 'RSS уже существует',
        3: 'Ошибка сети.',
        4: 'Ресурс не содержит валидный RSS',
        5: 'Неизвестная ошибка',
      },
      content: {
        feeds: {
          title: 'Фиды',
        },
        posts: {
          title: 'Посты',
          preview: 'Просмотр',
        },
        modal: {
          read: 'Читать полностью',
          close: 'Закрыть',
        },
      },
    },
  },
  en: {
    translation: {
      form: {
        placeholder: 'RSS link',
        button: 'Add',
        example: 'Example: https://lorem-rss.hexlet.app/feed?legth=10',
      },
      errors: {
        0: 'RSS has been loaded',
        1: 'The link is must be a valid URL',
        2: 'RSS is already exists',
        3: 'Network error',
        4: 'RSS is invalid',
        5: 'Unknown Error',
      },
      content: {
        feeds: {
          title: 'Feeds',
        },
        posts: {
          title: 'Posts',
          preview: 'Preview',
        },
        modal: {
          read: 'Read full',
          close: 'Close',
        },
      },
    },
  },
};

export default resources;
