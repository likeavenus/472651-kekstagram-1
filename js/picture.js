'use strict';
var OBJS = 26;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = 'Отдыхаем...';
var posts = [];

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
// var url;
// var getUrl = function (quantity) {
//   for (var i = 0; i <= quantity; i++) {
//      url = 'photos/' + (i++) + '.jpg';
//   }
//   return url;
// };

var renderObjs = function (quantity) {
  for (var i = 1; i < quantity; i++) {
    posts.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: getRandomNumber(15, 100),
          comments: comments[getRandomNumber(0, comments.length - 1)],
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
for (var i = 0; i < OBJS; i++) {
  fragment.appendChild(renderPost(posts[i]));
}
pics.appendChild(fragment);

var bigPic = document.querySelector('.big-picture');
bigPic.classList.remove('hidden');

var bigPicture = bigPic.querySelector('img');
var getRandomPicture = function () {
  bigPicture.src = getUrl(25);
  return bigPicture.src;
};

var comment = document.querySelector('.comments-count');
var like = document.querySelector('.likes-count');
var socialPicture = document.querySelector('.social__picture');
var commentText = document.querySelector('.social__text');
var photoDescription = document.querySelector('.social__caption');
var renderBigPost = function () {
  comment.textContent = getRandomNumber(15, 100);
  like.textContent = getRandomNumber(15, 100);
  socialPicture.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  commentText.textContent = comments[getRandomNumber(0, 2)];
  photoDescription.textContent = descriptions;
  getRandomPicture();
};
renderBigPost();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
