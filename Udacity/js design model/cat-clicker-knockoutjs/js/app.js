var initialCats = [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
            catNames: ['a', 'n', 'jdsifo']
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
            catNames: ['a', 'n', 'jdsifo']
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709',
            catNames: ['a', 'n', 'jdsifo']
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559',
            catNames: ['a', 'n', 'jdsifo']
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288',
            catNames: ['a', 'n', 'jdsifo']
        }
];

var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.catNames = ko.observableArray(data.catNames);

  this.title = ko.computed(function() {
      var title;
      var clicks = this.clickCount();
      if (clicks < 10) {
        title = 'Newborn';
      } else if (clicks < 30) {
        title = 'Infant';
      } else if (clicks < 50) {
        title = 'Teen';
      }
      return title;
  }, this);
};

var ViewModel = function() {
  var self = this;
  this.catList = ko.observableArray([]);

  initialCats.forEach(function(catItem) {
    self.catList.push( new Cat(catItem));
  })

  this.currentCat = ko.observable(this.catList()[0]);

  this.setCat = function(clickedCat) {
    self.currentCat(clickedCat);
  }
  // 方法一
  // this.incrementCounter = function() {
  //   this.clickCount(this.clickCount() + 1);
  // }
  // 方法二
  // with 会创建新的上下文 用self来存this

  this.incrementCounter = function() {
    console.log(this);// 打印this为Cat对象
    // 这里的this变为了Cat
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  }
};
ko.applyBindings(new ViewModel());
