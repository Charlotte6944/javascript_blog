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
}

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/articles_blog_charlotte");
    const articles = await response.json();
    createArticles(articles);
  } catch (err) {
    console.log("e: ", err);
  }
}

fetchArticles();
