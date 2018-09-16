'use strict';
var OBJS = 26;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];
var descriptions = 'Отдыхаем...';
var posts = [];

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var renderObjs = function (quantity) {
  for (var i = 1; i < quantity; i++) {
    posts.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: getRandomNumber(15, 200),
          comments: comments.length,
          descriptions: descriptions
        }
    );
  }
  return posts;
};

var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var pics = document.querySelector('.pictures');

var renderPost = function (post) {
  var postElement = picture.cloneNode(true);
  postElement.querySelector('.picture__img').src = post.url;
  postElement.querySelector('.picture__likes').textContent = post.likes;
  postElement.querySelector('.picture__comments').textContent = post.comments;
  return postElement;
};

renderObjs(OBJS);
var fragment = document.createDocumentFragment();
for (var i = 0; i < posts.length; i++) {
  fragment.appendChild(renderPost(posts[i]));
}
pics.appendChild(fragment);

var bigPic = document.querySelector('.big-picture');
bigPic.classList.remove('hidden');

var commentsList = document.querySelector('.social__comments');
// commentsList.removeChild('li');

var socialComment = document.createElement('li');
var avatar = document.createElement('img');
var socialText = document.createElement('p');

var socialCaption = document.querySelector('.social__caption');

var renderBigPost = function () {
  socialComment.classList.add('social__comment');
  avatar.classList.add('social__picture');
  avatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  avatar.setAttribute('alt', 'Аватар комментатора фотографии');
  avatar.setAttribute('width', '35');
  avatar.setAttribute('height', '35');
  socialText.classList.add('social__text');
  socialText.textContent = comments;
  socialCaption.textContent = descriptions;

  socialComment.appendChild(avatar);
  socialComment.appendChild(socialText);
  commentsList.appendChild(socialComment);
};
renderBigPost();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
