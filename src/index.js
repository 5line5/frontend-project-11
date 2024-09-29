// Import our custom CSS
import '../scss/styles.scss';
import Model from './MVC/model/model.js';
import View from './MVC/view/view.js';

function app() {
  const initState = {
    formState: {
      input: '',
      validationCode: undefined,
    },
    feedsState: {
      feeds: [
        /*
        {
          link: link,
          title: feedTitle,
          description: feedDescription,
          id: feedId
        }
        */
      ],
      posts: [
        /*
        {
          link: postLink,
          title: postTitle,
          description: postDescription,
          id: postId,
          feedId: feedId
        }
        */
      ],
      UI: {
        feeds: {
        /*
          feedId: {
            haveToShow: true || false,
          }
        */
        },
        posts: {
        /*
          postId: {
            isRed: true || false,
          }
        */
        },
      },
    },
  };

  const model = new Model(initState);

  View.renderForm(model);
}

app();
