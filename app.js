function init( titles, count ) {
    // 生成题目
    createTitles( titles, count );
    // 提交答题
    submitTitles( titles, count );
}


// ------------------- 主逻辑 -------------------
// 提交答题
function submitTitles( titles, count ) {
    var inputElement = [];
    var submits = document.getElementById('submits');
    var titles = document.getElementById('titls');
    var answer = titles.getElementsByTagName('b');
    submits.onclick = function () {
        var selectAnswer = [];  // 最终选择
        for( var i=0; i<count; i++ ) {
            inputElement[i] = document.getElementsByName('titles'+i);
            for ( var j=0; j<inputElement[i].length; j++ ) {
                if (inputElement[i][j].checked){
                    selectAnswer.push(inputElement[i][j].value)
                }
            }
        }
        var index = selectAnswer.length%(count+1);
        if(!index) {
            alert('好好答题，别闹！');
            return;
        } else if (index != 4) {
            alert('有' + (4 - index) + '题没答！');
            return;
        }

        this.disabled = true;

        // 后台所需数据
        log(selectAnswer);

        // 答题结束：提示
        for ( var i=0; i<answer.length; i++ ) {
            if (answer[i].innerHTML == selectAnswer[i]) {
                alert('第' +(i+1)+ '题：对');
            } else {
                alert('第' +(i+1)+ '题：错');
            }
        }

    };
}
// 生成题目
function createTitles( titles, count ) {
    var subscript = [];     // 生成下标
    var selectTitle = [];   // 题目数组
    var lenTit = titles.length;
    for ( var i=0; i<lenTit; i++ ) {
        subscript.push(i);
    }

    // 随机排序下标
    subscript.sort(randomsort);
    // 生成题目
    for ( var i=0; i<count; i++ ) {
        selectTitle.push(titles[subscript[i]]);
    }

    // 创建题目
    createInput(selectTitle);
}
// 创建题目
function createInput( selectTitle ) {
    var inner = '';
    var answer = '';
    var name = '';
    var titles = document.getElementById('titls');
    for ( var i=0; i<selectTitle.length; i++ ) {
        var obj = selectTitle[i];
        inner += '<div>'+obj[0]+'</div>';
        names = i ? i : '';
        // 题目
        for ( var k in obj[1] ) {
            for (var j in obj[1][k]) {
            inner += '<label><input type="radio" name="titles'+ i +'" value="' +obj[1][k][j]+ '">'  +j+ '</label>';
            }
        }
        // 答案
        answer += '<b style="display:none">' +obj[2][0]['answer']+ '</b>';
    }
    var titles = document.getElementById('titls');
    var submits = '<input type="button" id="submits" value="提交"/>';
    titles.innerHTML = inner + submits + answer;
}
// ------------------- 常用方法 -------------------
// 随机排序
function randomsort(a, b) {
    // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    return Math.random()>.5 ? -1 : 1;
}
function log (s) {
	if (typeof console == 'undefined'){
		alert(s);
	} else {
		console.log(s);
	}
    
}