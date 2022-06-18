import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
let errors = [];

form.addEventListener('submit',async event => {
  try {
    event.preventDefault();
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());
    if (formIsValid(article)) {
      const json = JSON.stringify(article);
      const promesse = await fetch('https://restapi.fr/api/articles_blog_charlotte', {
        method: 'POST',
        body: json,
        headers: {
          'content-type': 'application/json'
        }
      });
    }
    const body  = await response.json();
    console.log(body);
  } catch (e) {
    console.log('e: ', e);
  }
})

const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content || !article.img || !article.title) {
    errors.push('Vous devez renseigner tous les champs!');
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHtml = "";
    errors.forEach( (e) => {
      errorHtml += `<li>${e}</li>`;
    })
    errorElement.innerHTML = errorHtml;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}
