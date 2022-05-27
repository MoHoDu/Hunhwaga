var select = 0;

var sty = [];

sty[0] = "때는 신라시대 성덕왕 시기";
sty[1] = "세상에 정말 여러 사람이 있고,";

sty[2] = "그 중 재주 있는 사람도 많으니";
sty[3] = "그 누가 가장 잘났다고 하기 어려우나";

sty[4] = "미모를 두고서는 다들 입 모아 말하길,";
sty[5] = "'수로부인'이 으뜸이십니다. 하였다.";

sty[6] = "그녀가 가는 길에는 꽃이 만개하였고,";
sty[7] = "순정공이 강릉 태수로 부임하는 그 날";

sty[8] = "점심을 먹기 위해서 가는 길에";
sty[9] = "잠깐 멈추었던 바닷가에도";

sty[10] = "높이가 천길이나 될 것같이 커다란 절벽 위에";
sty[11] = "아름다운 철쭉이 피어 있었다.";

sty[12] = "순정공의 부인, 수로 부인이 말하길,";
sty[13] = "'저 꽃을 꺾어다 줄 사람이 어디 없는가?'";

sty[14] = "하지만 '사람의 발길이 닿기 어려운 곳입니다.'";
sty[15] = "는 이유로 모든 종자들이 사양하였다.";

sty[16] = "그런데 마침 암소를 끌고 나온 노인이";
sty[17] = "그 말을 듣고는 자신의 소를 맡기고";

sty[18] = "아무런 망설임도 없이 꽃을 가져오겠다며";
sty[19] = "바로 절벽을 오르기 시작하는데...";

sty[20] = "조작키를 숙지하고 시간 안에";
sty[21] = "절벽 정상까지 올라가서 철쭉을 꺾어 오자!";


function story() {

    let height = document.documentElement.clientHeight;
    var canvas;

    canvas = document.getElementById("canvas");

    canvas.width = 64*8;

    if (height * 0.5 <= canvas.width) {

        canvas.width = height * 0.5;

    }

    canvas.height = canvas.width;

    if (select == 0) {



    }else if (select == 1) {

        $('#next').text("다음으로");
        canvas.src = document.getElementById(select).src;
        $('#text1').text(sty[select * 2 - 2]);
        $('#text2').text(sty[select * 2 - 1]);

    } else if (select == 11) {

        $('#next').text("게임 시작");
        canvas.src = document.getElementById(select).src;
        $('#text1').text(sty[select * 2 - 2]);
        $('#text2').text(sty[select * 2 - 1]);

    }else if (select > 11) {

        window.location.href = 'game.html';

    } else {

        canvas.src = document.getElementById(select).src;
        $('#text1').text(sty[select * 2 - 2]);
        $('#text2').text(sty[select * 2 - 1]);

    }

    select += 1;
}

story(select);