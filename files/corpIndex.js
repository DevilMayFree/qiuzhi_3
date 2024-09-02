function corpIndex_init() {
	//nav 公司跟工作機會切換
	$('.talent_image .nav_company, .talent_image .nav_Jobs').on('click', function () {
		$(this).parent().find('li').removeClass('active');
		$(this).addClass('active');
	});

	//公司品牌展開
	$('.introduce img').on('click', function () {
		$('.introduce_box').addClass('block');
	});

	//公司品牌關閉
	$('.introduce_box img').on('click', function () {
		$('.introduce_box').removeClass('block');
	});

	$(window).scroll(function (event) {
		$('.navbar').addClass('navbar_fixed');
	});

	//輪播公司環境
	$(".environment .slider_item").not('.slick-initialized').slick({
		infinite: false,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1366,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 811,
				settings: {
					slidesToShow: 3.2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1.2,
				}
			}

		]
	});

	//輪播產品/服務 (txt img兩者都有))
	$('.product .content:not(.txt_none) .slider_item').not('.slick-initialized').slick({
		infinite: false,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 811,
				settings: {
					slidesToShow: 3.2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1.5,
				}
			}
		]
	});
	//輪播產品/服務 (沒有txt))
	$('.product content.txt_none  .slider_item').not('.slick-initialized').slick({
		infinite: false,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1366,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 811,
				settings: {
					slidesToShow: 3.2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1.2,
				}
			}

		]
	});

	$(".additional .slider_item").not('.slick-initialized').slick({
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	//輪播公司影音
	$('.video .slider_item').not('.slick-initialized').slick({
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1366,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2.7,
					// centerMode: true,
					// centerPadding: '15px',
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1.5,
					// centerMode: true,
					// centerPadding: '15px',
				}
			}
		]
	});

	$(".company .slider_item").not('.slick-initialized').slick({
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true
	});

	//跑馬燈初始化
	corpIndex_marquee_stateCheck();

	checkBannerImg();

	// 拷貝正式機
	var $JobsContent = $("#JobsContent").text() + "";
	if ($JobsContent.indexOf("無職缺") == -1) {
		var $jobs = document.querySelector('#Jobs')
		// toPosit($jobs)
	}
}

// 拷貝正式機後，修改
function toPosit(toThis) {
	let bridge = toThis;
	let body = document.body;
	let height = 0;

	while (bridge !== body) {
		height += bridge.offsetTop;
		bridge = bridge.offsetParent;
	}

	const screenWidth = window.innerWidth;
	let offset;

	if (screenWidth < 576) {
		offset = 160; // 螢幕寬度在0~575px之間
	} else if (screenWidth < 768) {
		offset = 190; // 螢幕寬度在576~767px之間
	} else {
		offset = 200; // 螢幕寬度大於或等於768px
	}

	window.scrollTo({
		top: height - offset,
		behavior: 'smooth'
	});
}

//檢核上稿圖片,顯示滿版或是半版
function checkBannerImg() {
	const img = document.querySelector('.banner-img');
	if (img) {
		if (img.naturalWidth > 803.6)
			$('.brief-small').prop('style', 'display:none !important');
		else
			$('.brief-big').prop('style', 'display:none !important');
	}
	else
		$('.brief-small').prop('style', 'display:none !important');
}

//跑馬燈狀態
function corpIndex_marquee_stateCheck() {
	let _ul = document.querySelector('.marquee ul');

	if (_ul) {
		let _parent = _ul.parentNode;

		if (_ul.offsetWidth > _parent.offsetWidth) {
			corpIndex_marquee_calcSpeed(30);
			_ul.style.animationPlayState = 'running';
		}
	}
}

function corpIndex_marquee_calcSpeed(speed) {
	// Time = Distance/Speed
	const spanSelector = document.querySelector('.marquee ul');
	const spanLength = spanSelector.offsetWidth;
	const timeTaken = spanLength / speed;
	spanSelector.style.animationDuration = timeTaken + "s";
}

//跑馬燈控制
function corpIndex_marquee_control(sender, playState) {
	let _ul = sender.querySelector('ul');

	if (_ul) {
		let _parent = _ul.parentNode;

		if (_ul.offsetWidth > _parent.offsetWidth) {
			_ul.style.animationPlayState = playState;
			_ul.style.transform = _ul.style.transform;
		}
	}
}

document.addEventListener('readystatechange', function () {
	if (document.readyState == "complete") {
		setTimeout(function () {
			corpIndex_init();
			// window.location.hash = '#jobs';
		}, 300);
	}
});

// 滾動事件：切換是否點亮「公司介紹/工作機會」
// 主要內文的 公司介紹 / 工作機會
const companyDom = document.querySelector('#company');
const JobsDom = document.querySelector('#Jobs');
// 導覽列上的 公司介紹 / 工作機會
const navCompany = document.querySelector('.nav_company');
const navJobs = document.querySelector('.nav_Jobs');

const width = window.innerWidth;

// 品牌名稱過長，才顯示下拉箭頭
document.addEventListener('DOMContentLoaded', function () {
	const downArrow = document.querySelector('.introduce > img');
	const brandNameEl = document.querySelector('.introduce p.txt');
	if (brandNameEl && brandNameEl) {
		if (brandNameEl.scrollHeight <= 43) {
			downArrow.style.display = 'none';
		}
	}
	addEventListener('resize', () => {

		if (brandNameEl && brandNameEl) {
			if (brandNameEl.scrollHeight <= 43) {
				downArrow.style.display = 'none';

			} else {
				downArrow.style.display = 'block'
			}
		}
	})
});

// 3. 公司影音
const videoSliderFrame = document.querySelectorAll('.video .video_item .slider_item .image')

const badgeSlider = document.querySelector('.company .mark')
setTimeout(() => {
	const badgeArrow = document.querySelector('.company .mark .slick-prev')
	if (badgeArrow) {
		badgeSlider.style.marginLeft = '20px'
	}
}, 800)

document.addEventListener("DOMContentLoaded", () => {
	/* 公司Bar */
	const navbar = document.querySelector("header.header");
	const domCompany = document.querySelector("#company");
	const domInformation = document.querySelector(".information");
	const goTop = document.querySelector("#gotop");
	const domCompanyRectHeight = domCompany.offsetHeight;

	// 定義一個函式，用來判斷是否需要新增或移除 .fixed 類別，以及調整 marginTop 的高度
	function handleScroll() {
		// 取得 domCompany 元素的位置資訊
		const domCompanyRect = domCompany.getBoundingClientRect();
		// 取得 domCompany 底部距離畫面頂部的距離
		const bottomOfDomCompany = domCompanyRect.top + domCompanyRect.height;

		// 當畫面滾動超過 domCompany 的最底部時
		if (bottomOfDomCompany < window.scrollY) {
			//
			navbar.classList.add("header--noshadow");
			
			// 將 .fixed 類別新增到 domCompany 元素
			domCompany.classList.add("fixed");
			
			// 調整 domCompany 的 marginTop，以防止內容被 navbar 蓋住
			domCompany.style.marginTop = navbar.offsetHeight + "px";
			domInformation.style.marginTop = domCompanyRectHeight + "px";
			
			//
			goTop.classList.remove("d-none");
			goTop.classList.add("d-flex");
		} else {
			//
			navbar.classList.remove("header--noshadow");
			
			// 如果沒有超過，則移除 .fixed 類別
			domCompany.classList.remove("fixed");
			
			// 將 domCompany 的 marginTop 重設為零
			domCompany.style.marginTop = "";
			domInformation.style.marginTop = "";
			
			//
			goTop.classList.add("d-none");
			goTop.classList.remove("d-flex");
		};
	};
	
	// 定義一個函式，隱藏搜尋BAR
	function hideSearchBar() {
		const searchBlock = document.querySelector(".header__search");
		if (searchBlock.classList.contains("header__search--active")) {
			searchBlock.classList.remove("header__search--active");
		};
	};

	// 當視窗滾動時，呼叫 handleScroll 函式
	window.addEventListener("scroll", handleScroll);
	window.addEventListener("scroll", hideSearchBar);
	// 當視窗大小調整時，也呼叫 handleScroll 函式
	window.addEventListener("resize", handleScroll);
	// 網頁載入完成後，初始化一次 handleScroll 函式
	window.addEventListener("load", handleScroll);

	/* GoTop */
	// 點擊 #gotop
	goTop.addEventListener("click", function () {
		window.scrollTo(0, 0);
	});

	/* 工作機會 點擊錨點 */
	const btnGoJobs = document.querySelector('.btn_goJobs');
	const Jobs = document.querySelector('#Jobs');
	let JobsPosition = Jobs.getBoundingClientRect().top;//
	let navbarHeight = navbar.offsetHeight;
	let domCompanyStyle = window.getComputedStyle(domCompany);
	let domCompanyStyleHeight = parseInt(domCompanyStyle.height)
	let navbarMenuTotalHeight = parseInt(navbarHeight + domCompanyStyleHeight);

	const articleJobs = document.querySelector('.Jobs');
	let articleJobsStyle = window.getComputedStyle(articleJobs);
	let articleJobsStylePt = parseInt(articleJobsStyle.paddingTop);


	// 監聽滾動事件，並動態更新 offset 的值
	function jobsValueUpdate() {
		jobsPosition = Jobs.getBoundingClientRect().top;
		navbarHeight = navbar.offsetHeight;
		domCompanyHeightOri = domCompany.offsetHeight;
		marginTopJobs = parseInt(window.getComputedStyle(Jobs).marginTop);
	}
	
	window.addEventListener("scroll", jobsValueUpdate);
	window.addEventListener("resize", jobsValueUpdate);

	// 點擊 觸發
	btnGoJobs.addEventListener("click", function (event) {
		event.preventDefault(); // 防止默認跳轉行為
		// 點擊時，更新數值
		JobsPosition = Jobs.getBoundingClientRect().top;
		navbarHeight = navbar.offsetHeight;
		domCompanyHeightOri = domCompany.offsetHeight;
		marginTopJobs = parseInt(window.getComputedStyle(Jobs).marginTop);


		// navbar.fixed company.fixed 不同情況更新對應數值
		function companyValueUpdate() {
			navbarHeight = navbar.offsetHeight;
			domCompanyStyle = window.getComputedStyle(domCompany);
			domCompanyStyleHeight = parseInt(domCompanyStyle.height)
			navbarMenuTotalHeight = parseInt(navbarHeight + domCompanyStyleHeight);
		}

		if (navbar.classList.contains("header--fixed") && domCompany.classList.contains("fixed")) {
			companyValueUpdate()
			window.scrollBy(0, JobsPosition - navbarMenuTotalHeight - articleJobsStylePt);
		} else if (navbar.classList.contains("header--fixed") && !domCompany.classList.contains("fixed")) {
			companyValueUpdate();
			const totalMenuHeight = navbarMenuTotal2();
			window.scrollBy(0, JobsPosition - totalMenuHeight - articleJobsStylePt);
		} else {
			const totalMenuHeight = navbarMenuTotal2();
			window.scrollBy(0, JobsPosition - navbarHeight - totalMenuHeight - articleJobsStylePt); //768
		};
	});

	//.autocomplete-suggestions 寬度 位置 START
	// 函數來更新搜尋下拉選單的寬度和位置
	function updateDropdownPosition() {
		const searchInput = document.querySelector(".search__bar-input--input");
		const autocomplete = document.querySelector(".autocomplete-suggestions");

		// 檢查元素是否存在(autocomplete)
		if (searchInput && autocomplete) {
			// 獲取搜尋輸入框的寬度
			let inputRect = searchInput.getBoundingClientRect();
			let inputWidth = inputRect.width;

			// 設置搜尋下拉選單的寬度
			autocomplete.style.width = inputWidth + "px";
			autocomplete.style.maxWidth = searchInput.offsetWidth + "px";
		};
	};
	
	// 在頁面載入時立即更新下拉選單的位置
	window.onload = function () {
		updateDropdownPosition();
		// 在搜索輸入框點擊時更新下拉選單的位置
		const searchInput = document.querySelector(".search__bar-input--input");
		searchInput.addEventListener('click', function (event) {
			updateDropdownPosition();
		});
	};
	// 頁面加載時和視窗大小調整時更新搜尋下拉選單的位置
	window.addEventListener("load", updateDropdownPosition);
	window.addEventListener("resize", updateDropdownPosition);
	//.autocomplete-suggestions 寬度 位置 END

	/// [公司簡介 / 產品/服務] 監聽開啟按鈕
	const btnOpens = document.querySelectorAll(".btn_container .btn_open");
	btnOpens.forEach((btnOpen) => {
		btnOpen.addEventListener('click', () => {
			const container = btnOpen.closest('.container');
			const btnClose = container.querySelector('.btn_close')
			const para = container.querySelector('p');
			const outContainer = btnOpen.closest(".small_text_outContainer");
			const txtBox = btnOpen.closest(".txt_box");
			btnClose.classList.remove('d-none');
			btnOpen.classList.add('d-none');
			para.classList.add('open');
			if (outContainer) {
				const smallText = outContainer.querySelector(".small_text_container");
				smallText.style.maxHeight = "";
			};
			if (txtBox) {
				const textContent = txtBox.querySelector(".text_content")
				if (textContent.classList.contains("small-type")) {
					textContent.style.maxHeight = "";
				};
			};
		});
	})

	// [公司簡介 / 產品/服務] 監聽關閉按鈕
	const btnCloses = document.querySelectorAll(".btn_container .btn_close");
	btnCloses.forEach((btnClose) => {
		btnClose.addEventListener('click', () => {
			const container = btnClose.closest('.container');
			const btnOpen = container.querySelector('.btn_open');
			const para = container.querySelector('p');
			const outContainer = btnOpen.closest(".small_text_outContainer");
			const txtBox = btnOpen.closest(".txt_box");
			btnOpen.classList.remove('d-none');
			btnClose.classList.add('d-none');
			para.classList.remove('open');
			if (outContainer || txtBox) {
				smallBriefImg();
			};
		});
	})

	// [function][公司簡介 / 產品/服務] 判斷半版的圖片高度
	function smallBriefImg() {
		// const smallBrief = document.querySelectorAll('.container.brief-small');
		const smallType = document.querySelectorAll('.container.small-type');
		smallType.forEach((smallType) => {
			const smallImg = smallType.querySelector(".small_image_container img");
			if (smallImg) {
				let smallImgHeight = smallImg.clientHeight;
				const smallTextContainer = smallType.querySelector(".small_text_container");
				if (window.innerWidth >= 811) {
					smallTextContainer.style.maxHeight = smallImgHeight + "px";
				} else {
					smallTextContainer.style.maxHeight = "";
				};
			};

			const slider = smallType.querySelector(".slider_item");
			if (slider) {
				// let sliderHeight = slider.clientHeight;
				const textContent = smallType.querySelector(".text_content");
				if (window.innerWidth >= 811) {
					textContent.style.maxHeight = "175px";
				} else {
					textContent.style.maxHeight = "";
				};
			};
		});
	};
	// [公司簡介 / 產品/服務] 判斷半版的圖片高度
	window.addEventListener('resize', smallBriefImg)
	smallBriefImg();

	// [公司簡介 / 產品/服務]開啟/收合判斷尺寸顯示
	function btnContainerShow() {
		const textContents = document.querySelectorAll('.container .text_content');
		textContents.forEach((textContent) => {
			const btnContainer = textContent.closest(".container").querySelector('.btn_container');
			const maxHeight = parseFloat(window.getComputedStyle(textContent).getPropertyValue('max-height')); // 獲取 max-height 屬性的值並轉換為數值
			const actualHeight = textContent.scrollHeight; // 獲取元素的實際高度
			if (window.innerWidth >= 811) {
				if (textContent.closest(".container").classList.contains("brief-big") ||
					textContent.closest(".container").classList.contains("brief-small") ||
					textContent.closest(".content").classList.contains("img_none")) {
					if (actualHeight > maxHeight) {
						btnContainer.classList.remove('d-none');
						btnContainer.classList.add('d-flex');
					} else if (!maxHeight) {
						btnContainer.classList.remove('d-none');
						btnContainer.classList.add('d-flex');
					} else {
						btnContainer.classList.add('d-none');
						btnContainer.classList.remove('d-flex');
					};
				} else {
					btnContainer.classList.remove('d-none');
					btnContainer.classList.add('d-flex');
				};
				textContent.classList.remove('no_text_out');
			}
			if (window.innerWidth < 811) {
				if (textContent.clientHeight < 130) {
					// btnContainer.classList.remove('d-md-none','d-flex');
					btnContainer.classList.add('d-none');
					btnContainer.classList.remove('d-flex');
					textContent.classList.remove('no_text_out');
				} else {
					// btnContainer.classList.add('d-md-none','d-flex');
					textContent.classList.add('no_text_out');
					btnContainer.classList.remove('d-none');
					btnContainer.classList.add('d-flex');
				}
			}
		})
	}
	window.addEventListener('resize', btnContainerShow)
	btnContainerShow();

	// [function] 配合畫面取得 navbar + company Height
	function navbarMenuTotal2(width) {
		let totalMenuHeight;
		if (width < 576) {
			totalMenuHeight = 101; // (45 + 56);
		} else if (width < 768) {
			totalMenuHeight = 122; // (66 + 56);
		} else {
			totalMenuHeight = 126; // (66 + 60);
		}
		return totalMenuHeight;
	}

	// [公司介紹] menu 錨點滾動到絕對定位
	const links = document.querySelectorAll('.content_nav_link');
	const sections = [];

	links.forEach(link => {
		const _href = link.getAttribute('href');	
		if(_href.startsWith('#')){
			const targetId = link.getAttribute('href').substring(1);
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				sections.push({
					id: targetId,
					element: targetElement,
					link: link
				});
			}

			link.addEventListener('click', function (event) {
				event.preventDefault(); // 防止默認跳轉行為
				const parentNode = targetElement.closest('article'); // 獲取目標元素父層節點
				const parentNodeTP = parseInt(window.getComputedStyle(parentNode).paddingTop); // 獲取 article padding-top
				const screenWidth = window.innerWidth; //獲取視窗寬度
				const menuHeight = navbarMenuTotal2(screenWidth); //獲取 menu總和
				// 根據螢幕寬度設置偏移量 navbar + company Height
				const scrollPosition = targetElement.offsetTop - menuHeight - parentNodeTP; // 計算偏移位置
				window.scrollTo({
					top: scrollPosition,
					behavior: 'smooth' // 平滑滾動
				});
			});
		}
	});

	// [function][公司介紹] menu 滑動監控
	function onScroll() {
		const scrollPosition = window.pageYOffset + 230; // 當前滾動位置，加上偏移
		sections.forEach((section, index) => {
			const sectionTop = section.element.offsetTop;
			const nextSectionTop = index < sections.length - 1 ? sections[index + 1].element.offsetTop : document.body.scrollHeight;
			if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
				section.link.classList.add('active');
			} else {
				section.link.classList.remove('active');
			}
		});
	}
	window.addEventListener('scroll', onScroll);
	onScroll(); // 初始化時運行一次，確保正確高亮

});






