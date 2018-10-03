'use strict';
var OBJS = 25;
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
      comments: ['Всё отлично!', 'В целом всё неплохо. Но не всё.'],
      descriptions: descriptions[getRandomNumber(0, 5)],
      data: 'data-img="' + (i + 1) + '"'
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
  postElement.querySelector('.picture__comments').textContent = post.comments.length;
  return postElement;
};

renderObjs(OBJS);
var fragment = document.createDocumentFragment();
for (var i = 0; i < posts.length; i++) {
  fragment.appendChild(renderPost(posts[i]));
}
pics.appendChild(fragment);

var bigPic = document.querySelector('.big-picture');

var commentsList = document.querySelector('.social__comments');
commentsList.innerHTML = '';

var getPhotoDescription = function () {
  var socialCaption = document.querySelector('.social__caption');
  var likesCount = document.querySelector('.likes-count');
  likesCount.textContent = getRandomNumber(15, 200);
  socialCaption.textContent = descriptions[0];
};

var createListElement = function (comment) {
  var socialComment = document.createElement('li');
  var avatar = document.createElement('img');
  var socialText = document.createElement('p');

  socialComment.classList.add('social__comment');
  avatar.classList.add('social__picture');
  avatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  avatar.setAttribute('alt', 'Аватар комментатора фотографии');
  avatar.setAttribute('width', '35');
  avatar.setAttribute('height', '35');
  socialText.classList.add('social__text');
  socialText.textContent = comment;

  socialComment.appendChild(avatar);
  socialComment.appendChild(socialText);
  return socialComment;
};

var renderBigPost = function (post) {
  var bigPostFragment = document.createDocumentFragment();
  for (i = 0; i < post.comments.length; i++) {
    bigPostFragment.appendChild(createListElement(post.comments[i]));
  }
  commentsList.appendChild(bigPostFragment);
  getPhotoDescription();
};

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var setupWindow = document.querySelector('.img-upload__overlay');
var cancelSetup = document.querySelector('.cancel');
var uploadFile = document.querySelector('#upload-file');
var hashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');
var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    uploadFile.value = '';
  }
};

uploadFile.addEventListener('change', function () {
  openPopup();
});

cancelSetup.addEventListener('click', function () {
  closePopup();
  uploadFile.value = '';
});

var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onFocusInput = function (currentInput) {
  currentInput.onfocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };
  currentInput.onblur = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };
};
onFocusInput(hashtags);
onFocusInput(textDescription);

pics.addEventListener('click', function (e) {
  console.log(e.target.dataset);
  if (e.target.tagName === 'IMG') {
    bigPic.classList.remove('hidden');
    renderPost(posts[5])
    renderBigPost(posts[1]);
  }
});

var bigPicCancel = document.querySelector('#picture-cancel');

bigPicCancel.addEventListener('click', function () {
  bigPic.classList.add('hidden');
});

var effectPin = document.querySelector('.effect-level__pin');
var PIN_START = 0;
var PIN_END = 453;
var effectsList = document.querySelector('.effects__list');
var effectsItem = document.querySelector('.effects__item');
var imageUpload = document.querySelector('.img-upload__preview img');
var effects = {
  phobos: {
    min: 0,
    max: 3,
    units: 'px',
    filterName: 'blur'
  },
  none: {},
  chrome: {
    min: 0,
    max: 1,
    units: '',
    filterName: 'grayscale'
  },
  sepia: {
    min: 0,
    max: 1,
    units: '',
    filterName: 'sepia'
  },
  marvin: {
    min: 0,
    max: 100,
    units: '%',
    filterName: 'invert'
  },
  heat: {
    min: 1,
    max: 3,
    units: '',
    filterName: 'brightness'
  }
};

var getCurrentInputValue = function () {
  return document.querySelector('.effects__radio:checked').value;
};

var getFilterEffects = function () {
  var filterEffects = effects[getCurrentInputValue()];
  return filterEffects;
};

var getCurrentEffect = function () {
  getCurrentInputValue() === 'none' ? imageUpload.style.filter = '' : imageUpload.style.filter = getFilterEffects().filterName + '(' + getFilterEffects().max + getFilterEffects().units + ')';
};

effectsList.addEventListener('click', function (e) {
  if (e.target.tagName === 'INPUT') {
    getCurrentEffect();
  }
});

var getValue = function (max, min, pinPosition, scaleWidth) {
  var value = pinPosition * (max - min) / scaleWidth + min;
  return value;
};

effectPin.addEventListener('mouseup', function (evt) {
  imageUpload.style.filter = getFilterEffects().filterName + '(' + getValue(getFilterEffects().max, getFilterEffects().min, evt.target.offsetLeft, PIN_END) + getFilterEffects().units + ')';
  console.log(imageUpload.style.filter);
});


// evt.target.offsetLeft текущее значение пина

