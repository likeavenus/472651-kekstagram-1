'use strict';
var OBJS = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Отдыхаем...', 'Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var posts = [];

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var renderObjs = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    posts.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: comments[getRandomNumber(0, 5)],
      descriptions: descriptions[getRandomNumber(0, 5)]
    });
  }
  return posts;
};

var picture = document.querySelector('#picture').content.querySelector('.picture');

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
commentsList.innerHTML = '';

var socialComment;
var avatar;
var socialText;
var socialCaption;
var likesCount = document.querySelector('.likes-count');

var addData = function () {
  socialComment.classList.add('social__comment');
  avatar.classList.add('social__picture');
  avatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  avatar.setAttribute('alt', 'Аватар комментатора фотографии');
  avatar.setAttribute('width', '35');
  avatar.setAttribute('height', '35');
  socialText.classList.add('social__text');
  return socialComment;
}

var createListElement = function (post) {
  socialComment = document.createElement('li');
  avatar = document.createElement('img');
  socialText = document.createElement('p');
  socialCaption = document.querySelector('.social__caption');
  socialComment.appendChild(avatar);
  socialComment.appendChild(socialText);
  commentsList.appendChild(socialComment);
  socialText.textContent = post.comments;
  socialCaption.textContent = post.descriptions;
  likesCount.textContent = post.likes;
  addData();
  return socialComment;
};
createListElement(posts);

for (var i = 0; i < 3; i++) {
  fragment.appendChild(createListElement(posts[i]));
}
commentsList.appendChild(fragment);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
