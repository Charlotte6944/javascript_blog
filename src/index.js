import "./assets/styles/styles.scss";
import "./index.scss"

const articleContainerElement = document.querySelector(".article-container");

const createArticles = (articles) => {
  const articlesDom = articles.map(article => {
    const articleDom = document.createElement("div");
    articleDom.classList = "article";
    articleDom.innerHTML = `
      <img src="${ article.img }" alt="Photo auteur">
      <h2>${ article.title }</h2>
      <p class="article-author">${ article.author } - ${ article.category }</p>
      <p class="article-content">${ article.content }</p>
      <div class="article-action">
        <button class="btn btn-danger" data-id=${ article._id }>Supprimer</button>
      </div>
    `;
    return articleDom;
  })
  articleContainerElement.innerHTML = '';
  articleContainerElement.append(...articlesDom);
  const deleteButtons = articleContainerElement.querySelectorAll('.btn-danger');
  deleteButtons.forEach( button => {
    button.addEventListener('click', async event => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(`https://restapi.fr/api/charlotte/${articleId}`, {
          method: 'DELETE'
        });
        const body = response.json();
        fetchArticles();
      } catch (error) {
        console.log("e: ", err);
      }
    })
  })
}

const fetchArticles = async () => {
  try {
    const response = await fetch(`https://restapi.fr/api/charlotte`);
    const articles = await response.json();
    createArticles(articles);
  } catch (err) {
    console.log("e: ", err);
  }
}

fetchArticles();
