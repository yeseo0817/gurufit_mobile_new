(function(){
$(function(){
	
	// 상단 배너가 있을 경우
	if($(".btn_top_bnr").length > 0) {
		var TopBnr = $(".btn_top_bnr");
		$(".bnr_close").bind("click", function(){
			TopBnr.slideUp();
		});
	}
	
	// 셀렉트박스 디자인
	if($(".sel_custom").length > 0){
		$('.sel_custom').each(function(){
			var select = $(this).find("select").selectBox();
		});
	}
	
	// 셀렉트 박스 설치
	// 페이지에 해당 셀렉트 박스 디자인이 있을 경우 일괄 설치
	if($(".set_select").length > 0){
		$('.set_select').each(function(){
			setSelect($(this));
		});
	}
	
});
})(jQuery);

/* 셀렉트 박스 사용 예시
$("#test").find("a").each(function(){
	$(this).bind("click", function(){
		console.log($(this).data("value"));
	});
});
*/

// 셀렉트박스 설치
var setSelect = function(elem){
	if(elem.hasClass("disable") == false){
		if(elem.hasClass("select_on") == false){
			elem.find(".box").bind("click", function(){
				if(elem.hasClass("active")){
					elem.removeClass("active");
				} else {
					elem.addClass("active");
				}
			});
			
			elem.find(".select_list li").bind("click", function(){
				elem.find(".box").html($(this).find("a").html());
				elem.find(".box").attr("data-value", $(this).find("a").data("value"));
				elem.removeClass("active");
				
			});
			
			$(document).mouseup(function(e){
				var container = elem;
				if( container.has(e.target).length === 0){
					elem.removeClass("active");
				}
			});
			elem.addClass("select_on");
		}
	}
}

// 셀렉트 상자 값 선택하기
function setGuruSelectValue(select, value) {
    if (value) {
        var selected;
        select.find(".select_list a").each(function() {
            if ($(this).data("value") == value) {
                selected = $(this).html();
                return false;
            }
        });
        
        if (selected) {
            var photo_sort_box = select.find(".box");
            photo_sort_box.attr("data-value", value);
            photo_sort_box.html(selected);
        }
    }
}
// 셀렉트 상자 값 가져오기
function getGuruSelectValue(select) {
    var photo_sort_box = select.find(".box");
    return photo_sort_box.attr("data-value");
}

// 모달 팝업 화면 고정
// f_modal_perant div에 open이 입력 될 때  같이 호출 되야 함.
var setFixModal = function(_modal){
	$("body").addClass("fix");
	_modal.addClass("modal_fix");
}

// 모달 팝업 화면 고정 해제
// 팝업의 클로즈 액션 때에 호출 되어야 함
// 호출 되지 않으 면 페이지에 스크롤이 사라짐
var delFixModal = function(){
	if($(".f_modal_layer").length <= 1){
		$("body").removeClass("fix");
	}
}

//모달 팝업 Fix 활성화 예시
//setFixModal($("#photoModal"));

// 측면 메뉴 토글
// ex) asdieToggle($(".user_custom_filter"));
var asdieToggle = function(elem){
	var aside = elem;
	aside.find(".filter_tit").bind("click", function(){
		$(this).toggleClass("close");
	});
}

//천 단위 콤마찍기
var m_iAddComma = function(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//게시판 토글 기능
var toggleListActive = function(elem){
	elem.children("li").bind("click", function(){
		if($(this).hasClass("reply")){
			elem.children("li").not($(this)).removeClass("active");
			$(this).toggleClass("active");
		}
	});
}

//별 점 기능 
var starRating = function(elem, msgArr){
	var countElem = elem.find(".rating_count");
	// 클릭 여부 체크
	var starChecked = false;
	if(elem.length > 0){
		// 별점을 하나씩 검사 함
		elem.find(".star_rating > i").each(function(){
			$(this).bind("click", function(){
				var idx = $(this).index() + 1; // 클릭한 별 점 인덱스 저장
				countElem.val(idx); // 별점 Input 저장
				starRatingCheck($(this), idx, elem, msgArr);
				starChecked = true;
			});
			$(this).hover(function(){
				if(starChecked == false){
					var idx = $(this).index() + 1; // 클릭한 별 점 인덱스 저장
					 starRatingCheck($(this), idx, elem, msgArr);
				}
			}, function(){
				if(starChecked == false){
					starRatingCheck($(this), 0, elem, msgArr);
				} else {
					starRatingCheck($(this), idx, elem, msgArr);
				}
			});
		});
	}
}
function starRatingCheck(_star, idx, elem, msgArr){
	for(var i=0; i < _star.parent().find("i").length; i++){
		if(i<idx){
			_star.parent().find("i").eq(i).addClass("star_on");
		} else {
			_star.parent().find("i").eq(i).removeClass("star_on");
		}
	}
	elem.find(".msg").html(msgArr[idx]);
	if(idx > 0){
		elem.addClass("active");
	} else {
		elem.removeClass("active");
	}
}



