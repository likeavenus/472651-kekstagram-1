'use strict';
var OBJS = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];
var descriptions = 'Отдыхаем...';
var posts = [];

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var getRandomUrl = function () {
  var url =  'photos/' + getRandomNumber(1, 25) + '.jpg';
  return url;
}

var renderObjs = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    posts.push(
        {
          url: getRandomUrl(),
          likes: getRandomNumber(15, 100),
          comments: comments[getRandomNumber(0, comments.length - 1)],
          descriptions: descriptions
        }
    );
  }
  return posts;
}

var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var pics = document.querySelector('.pictures');

var renderPost = function (post) {
  var postElement = picture.cloneNode(true);
  postElement.querySelector('.picture__img').src = post.url;
  postElement.querySelector('.picture__likes').textContent = post.likes;
  postElement.querySelector('.picture__comments').textContent = post.comments;
  return renderPost;
}
var fragment = document.createDocumentFragment();
for (var i = 0; i < OBJS; i++) {
  renderObjs(OBJS);
  fragment.appendChild(renderPost(posts[i]));
}
pics.appendChild(fragment);

document.querySelector('.big-picture').classList.remove('hidden');
