/*
This is empty on purpose! Your code to build the resume will go here.
 */
var model = {
  // 人物传记
  bio: {
    name: 'Reber',
    role: 'Web Developer',
    contacts: {
      mobile: '137********',
      email: '137********@139.com',
      github: 'lwcReber',
      twitter: 'reberTwitter',
      blog: 'no',
      location: 'shenzhen'
    },
    welcomeMessage: 'just do it',
    skills: ['HTML', 'CSS', 'JavaScript', 'C'],
    biopic: 'images/fry.jpg'
  },

  // 教育背景
  edu: {
    schools: [{
      name: 'Shenzhen Polytechnic',
      location: '广东省深圳市南山区西丽湖沙河西路',
      degree: '大专',
      majors: ['汽车电子'],
      dates: '2013.9-2016.7',
      url: 'http://www.szpt.edu.cn/in_index.shtml'
    }],
    onlineCourses: [{
      title: '前端开发进阶',
      school: 'Udacity',
      dates: '2017.5-2017.8',
      url: 'https://cn.udacity.com/'
    }]
  },

  // 工作经验
  work: {
    jobs: [{
      employer: 'Mr XX',
      title: '嵌入式单片机',
      location: '西乡',
      dates: '2016.2-2017.2',
      description: 'vehicle navigation'
    }]
  },

  // 项目经验
  projects: {
    projects: [{
      title: 'MSCMM8520',
      dates: '2016.8-2016.12',
      description: '9寸大屏机',
      images: 'images/197x148.gif'
    }]
  },
  // 替换元素的内容
  setPlaceholder: function(old, replacedata) {
    return old.replace("%data%", replacedata);
  }
};

var octopus = {
  init: function() {
    view.init();
  },

  // 获取人物传记
  getBio: function() {
    return model.bio;
  },

  // 获取工作经历
  getWork: function() {
    return model.work;
  },

  // 获取项目经验
  getProjects: function() {
    return model.projects;
  },

  // 获取教育背景
  getEducation: function() {
    return model.edu;
  },

  // 获取元素的显示内容
  getPlaceholder: function(old, replacedata) {
    return model.setPlaceholder(old, replacedata);
  }
};

var view = {
  init: function() {
    this.bio = octopus.getBio();
    this.work = octopus.getWork();
    this.projects = octopus.getProjects();
    this.edu = octopus.getEducation();

    this.header = $("#header");
    this.workExperienceElem = $("#workExperience");
    this.projectElem = $("#projects");
    this.educationElem = $("#education");
    this.topContacts = $("#topContacts");
    this.footerContacts = $("#footerContacts");

    this.render();
  },

  // 添加到elem里的最后面
  appendElem: function(elem, data) {
    elem.append(data);
  },

  // 添加到elem里的最前面
  prependElem: function(elem, data) {
    elem.prepend(data);
  },

  render: function() {
    /**
     * bio 区域
     */
    // 姓名
    var headerName = octopus.getPlaceholder(HTMLheaderName, this.bio.name);

    // 职位
    var headerRole = octopus.getPlaceholder(HTMLheaderRole, this.bio.role);

    // 电话
    var mobile = octopus.getPlaceholder(HTMLmobile, this.bio.contacts.mobile)

    // email
    var email = octopus.getPlaceholder(HTMLemail, this.bio.contacts.email);

    // twitter
    var twitter = octopus.getPlaceholder(HTMLtwitter, this.bio.contacts.twitter);

    // github
    var github = octopus.getPlaceholder(HTMLgithub, this.bio.contacts.github);

    // blog
    var blog = octopus.getPlaceholder(HTMLblog, this.bio.contacts.blog);

    // location
    var location = octopus.getPlaceholder(HTMLlocation, this.bio.contacts.location);

    // biopic 头像
    var bioPic = octopus.getPlaceholder(HTMLbioPic, this.bio.biopic);

    // welcomeMsg
    var welcomeMsg = octopus.getPlaceholder(HTMLwelcomeMsg, this.bio.welcomeMessage);

    // 添加职位姓名到header
    this.prependElem(this.header, headerName + headerRole);
    // 创建联系方式列表
    this.appendElem(this.topContacts, mobile + email + twitter + github + blog + location);
    // 创建头像、技能
    this.appendElem(this.header, bioPic + welcomeMsg + HTMLskillsStart);

    // 获取skillsStart ul元素
    var skillsStart = $("#skills");
    // 创建skills表
    for (var i = 0; i < this.bio.skills.length; i++) {
      var skills = octopus.getPlaceholder(HTMLskills, this.bio.skills[i]);
      this.appendElem(skillsStart, skills);
    }

    /**
     * work 区域
     */
    // workStart
    this.appendElem(this.workExperienceElem, HTMLworkStart);

    // 获取workStatr元素
    var workEtyElem = $(".work-entry");

    for (var i = 0; i < this.work.jobs.length; i++) {
      // 工作雇主
      var workEmployer = octopus.getPlaceholder(HTMLworkEmployer, this.work.jobs[i].employer);
      var workTitle = octopus.getPlaceholder(HTMLworkTitle, this.work.jobs[i].title);

      // 工作时间
      var workDates = octopus.getPlaceholder(HTMLworkDates, this.work.jobs[i].dates);

      // 工作地点
      var workLocation = octopus.getPlaceholder(HTMLworkLocation, this.work.jobs[i].location);

      // 工作描述
      var workDescription = octopus.getPlaceholder(HTMLworkDescription, this.work.jobs[i].description);

      // 添加元素到work-entry元素
      this.appendElem(workEtyElem, workEmployer + workTitle + workDates + workLocation + workDescription);
    }

    /**
     * project
     */
    this.appendElem(this.projectElem, HTMLprojectStart);

    // 获取projectStart元素
    var projectEtyElem = $(".project-entry");

    for (var i = 0; i < this.projects.projects.length; i++) {
      // project的标题
      var projectTitle = octopus.getPlaceholder(HTMLprojectTitle, this.projects.projects[i].title);

      // project的日期
      var projectDate = octopus.getPlaceholder(HTMLprojectDates, this.projects.projects[i].dates);

      // project的描述
      var projectDescription = octopus.getPlaceholder(HTMLprojectDescription, this.projects.projects[i].description);

      // project的图片
      var projectImage = octopus.getPlaceholder(HTMLprojectImage, this.projects.projects[i].images);

      // 添加项目经验
      this.appendElem(projectEtyElem, projectTitle + projectDate + projectDescription + projectImage);
    }

    /**
     * 教育背景
     */
    this.appendElem(this.educationElem, HTMLschoolStart);

    // 获取education-entry元素
    var schoolEtyElem = $(".education-entry")[0];
    for (var i = 0; i < this.edu.schools.length; i++) {
      var schoolName = octopus.getPlaceholder(HTMLschoolName, this.edu.schools[i].name);

      var schooDegree = octopus.getPlaceholder(HTMLschoolDegree, this.edu.schools[i].degree);

      var schoolDates = octopus.getPlaceholder(HTMLschoolDates, this.edu.schools[i].dates);

      var schoolLocation = octopus.getPlaceholder(HTMLschoolLocation, this.edu.schools[i].location);

      var schoolMajor = '';
      for (var j = 0; j < this.edu.schools[i].majors.length; j++) {
        schoolMajor += this.edu.schools[i].majors[j] + ' ';
      }
      var schoolMajors = octopus.getPlaceholder(HTMLschoolMajor, schoolMajor);
      // 添加学校
      this.appendElem($(schoolEtyElem), schoolName + schooDegree + schoolDates + schoolLocation + schoolMajors);
    }

    // 在线教育
    this.appendElem(this.educationElem, HTMLonlineClasses);
    // 创建onlineCourses入口
    this.appendElem(this.educationElem, HTMLschoolStart);

    var onlineClassEtyElem = $(".education-entry")[1];

    for (i = 0; i < this.edu.onlineCourses.length; i++) {
      var onlineTitle = octopus.getPlaceholder(HTMLonlineTitle, this.edu.onlineCourses[i].title);

      var onlineSchool = octopus.getPlaceholder(HTMLonlineSchool, this.edu.onlineCourses[i].school);

      var onlineDates = octopus.getPlaceholder(HTMLonlineDates, this.edu.onlineCourses[i].dates);

      var onlineUrl = octopus.getPlaceholder(HTMLonlineURL, this.edu.onlineCourses[i].url);

      this.appendElem($(onlineClassEtyElem), onlineTitle + onlineSchool + onlineDates + onlineUrl);
    }

    // 添加地图
    var mapElem = $("#mapDiv");
    this.appendElem(mapElem, googleMap);

    // footerContacts
    this.appendElem(this.footerContacts, mobile + email + github + twitter + location);
  }
}
octopus.init();
