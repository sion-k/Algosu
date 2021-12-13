let ojs = [ "cf", "boj", "atcoder", "topcoder" ];

renderAll();

// 현재 oj의 handle을 보여줌
function renderAll() {
	for (let oj of ojs) {
		render(oj);
	}
}

function render(oj) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			console.log(flag);
			$("#" + oj).html(flag);
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	xhttp.open("GET", "getHandle.php?" + "oj=" + oj);
	xhttp.send();
}

// 핸들 정보를 업데이트하고 home.html로 이동
function updateAll() {
	for (let oj of ojs) {
		update(oj);
	}
	location.href="../home/home.html";
}

function update(oj) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			console.log(flag);
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	let handle = $("#" + oj).html();
	if (handle === "no handle") return;
	xhttp.open("GET", "setHandle.php?" + "oj=" + oj + "&handle=" + handle);
	xhttp.send();
}
