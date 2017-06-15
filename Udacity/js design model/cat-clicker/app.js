$(function() {
	// M
	var model = {
		currentCat:null,
		cats:[
			{name: "cat1", count: 0, imgSrc: "cat_picture1.jpg"},
			{name: "cat2", count: 0, imgSrc: "cat_picture2.jpg"},
			{name: "cat3", count: 0, imgSrc: "cat_picture3.jpg"},
			{name: "cat4", count: 0, imgSrc: "cat_picture4.jpg"},
			{name: "cat5", count: 0, imgSrc: "cat_picture5.jpg"},
		]
	};

	// O
	var octopus = {
		init: function() {
			model.currentCat = model.cats[0];
			catListView.init();
			catView.init();
			adminView.init();
		},

		// 获取当前的猫
		getCurrentCat: function() {
			return model.currentCat;
		},

		// 获取所有的猫
		getAllCats: function() {
			return model.cats;
		},

		// 设置猫到展区
		setCat: function(id) {
			model.currentCat = model.cats[id];
			// 隐藏admin区域
			this.setAdminHide();
		},

		// 点击次数处理
		handleCount: function() {
			model.currentCat.count++;
		},

		getCatListId: function() {
			return catListView.catId;
		},
		// admin展示
		setAdminShow: function() {
			adminView.adminShow = true;
			adminView.render();
		},

		// admin隐藏
		setAdminHide: function() {
			adminView.adminShow = false;
			adminView.render();
		},

		// 设置admin
		setCatInfo: function() {
			model.currentCat = adminView.getAdminCatInfo();
			catView.render();
			catListView.updateList(model.currentCat);
		}
	};

	// V
	var catListView = {
		init: function() {
			this.catList = document.getElementById("cat-list");
			this.catId = 0;
			this.render();
		},

		updateList: function(cat) {
			var catId = octopus.getCatListId();
			$(this.catList).children().eq(catId).text(cat.name);
		},

		render: function() {
			// 从octopus获取所有的猫
			var cats = octopus.getAllCats();
			var _this = this;
			// 清空猫列表
			this.catList.innerHTML = "";
			// 创建猫的列表
			for (var i = 0; i< cats.length; i ++) {
				var li = document.createElement("li");
				li.textContent = cats[i].name;

				// 点击切换猫
				li.addEventListener("click", (function(i) {
						// 闭包,保存i
						return function() {
							octopus.setCat(i);
							catView.render();
							_this.catId = i;
						}
				}(i))
			);
				this.catList.appendChild(li);
			}
		}
	};

	var catView = {
		init: function() {
			this.catNameElem = document.getElementById("cat-name");
			this.catCountElem = document.getElementById("cat-count");
			this.catImgElem = document.getElementById("cat-img");
			// 点击猫图，次数增加
			this.catImgElem.addEventListener("click", function() {
				octopus.handleCount();
				this.render();
			}.bind(catView));

			this.render();
		},

		render: function() {
			// 从章鱼那获取当前的猫
			var currentCat = octopus.getCurrentCat();
			// 渲染出猫的名字，点击数，图片
			this.catNameElem.textContent = currentCat.name;
			this.catCountElem.textContent = currentCat.count;
			this.catImgElem.src = currentCat.imgSrc;

		}
	}
	var adminView = {
		init: function() {
			this.adminBtnElem = document.getElementById("admin");
			this.adminRegionElem = document.getElementsByClassName("adminRegion")[0];
			this.adminIptCatName = document.getElementById("ipt-name");
			this.adminIptImgSrc = document.getElementById("ipt-imgUrl");
			this.adminIptClicks= document.getElementById("ipt-clicks");
			this.adminBtnCancle = document.getElementById("cancle");
			this.adminBtnSave = document.getElementById("save");

			// admin区域默认隐藏
			this.adminShow = false;

			// 点击admin按钮 出现admin区域
			this.adminBtnElem.addEventListener("click", function() {
				octopus.setAdminShow();
			});

			// 取消按钮， 隐藏admin区域
			this.adminBtnCancle.addEventListener("click", function() {
				octopus.setAdminHide();
			});

			// 保存按钮
			this.adminBtnSave.addEventListener("click", function() {
				octopus.setCatInfo();
			});
			this.render();
		},

		getAdminCatInfo: function() {
			var cat = {};
			cat.name = $(this.adminIptCatName).val();
			cat.imgSrc = $(this.adminIptImgSrc).val();
			cat.count = $(this.adminIptClicks).val();
			return cat;
		},

		render: function() {
			// 设置admin区域的展现与隐藏
			if (this.adminShow) {

				$(this.adminRegionElem).show();

				var currentCat = octopus.getCurrentCat();
				$(this.adminIptCatName).val(currentCat.name);
				$(this.adminIptImgSrc).val(currentCat.imgSrc);
				$(this.adminIptClicks).val(currentCat.count);

			} else {
				$(this.adminRegionElem).hide();
			}
		}
	}
	octopus.init();
})
