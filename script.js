// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts(page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`;
  const response = await fetch(postsURL);
  const articles = await response.json();
  return articles;
}

async function downloadComments(postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  const response = await fetch(commentsURL);
  const comments = await response.json();
  return comments;
}

async function getUserName(userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const response = await fetch(userURL);
  const user = await response.json();
  return user.name;
}

function getArticleId(comments) {
  const article = comments.previousElementSibling;
  const data = article.dataset;
  return data.postId;
}

const posts = await downloadPosts();
console.log(posts);


for(let post of posts) {
        const main = document.querySelector("main");
        const article = document.createElement("article");
        const head2 = document.createElement("h2");
        const aside2 = document.createElement("aside");
        const details = document.createElement("details");
        const span = document.createElement("span");
        const summary = document.createElement("summary");
        const section = document.createElement("section");
        const header = document.createElement("header");
        const para = document.createElement("p");
        const para1 = document.createElement("p");
        const para2 = document.createElement("p");
        const head3 = document.createElement("h3");
        const small = document.createElement("small");

        const author = await getUserName(post.id);

        main.append(article);
        article.append(head2, aside2, para);
        para.append(post.body);
        aside2.append(span);
        aside2.innerText = "by " + author;
        head2.innerText = post.title;
        span.innerText = await getUserName(post.userId);
        
        main.append(details); 
        details.append(summary, section);
        summary.innerText = "See what our readers had to say...";

        section.append(header);
        
        header.append(head3);
        head3.innerText = "Comments";

        const posts = await downloadPosts();
        console.log(posts);
        const comments = await downloadComments(post.id);

     
      
          for(let comment of comments) {

            const aside = document.createElement("aside");
            const para1 = document.createElement("p");
            const para2 = document.createElement("p");
            const small = document.createElement("small");

            section.append(aside);
            aside.append(para1, para2);

            para1.innerText = comment.body;

            small.innerText = comment.name;
            para2.append(small);
            

          }

          

        } 

const details = document.getElementsByTagName("details");
for (const detail of details) {
  detail.addEventListener("toggle", async (event) => {
    if (detail.open) {
      const asides = detail.getElementsByTagName("aside");
      const commentsWereDownloaded = asides.length > 0;
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(detail);
        const comments = await downloadComments(articleId);
        console.log(comments);

      }
    }
  });
}
