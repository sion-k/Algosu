// 전체 문제 목록
let problem = [];
// 사용자가 해결한 문제 목록
let solved = [];
// 사용자의 OJ별 핸들
let handle = {};

getHandle("boj");

// oj의 이름을 입력받아서 그 oj의 핸들을 반환한다
function getHandle(oj) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			handle[oj] = flag;
			getProblem();
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	let id = sessionStorage.getItem("id");
	xhttp.open("GET", "../oj/getHandle.php?oj=" + oj + "&id=" + id);
	xhttp.send();
}

// 전체 문제의 목록을 반환
function getProblem() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			json = flag.trim().split("\n");
			for (j of json) {
				j = JSON.parse(j);
				problem.push(j["id"]);
			}
			getSolved();
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	xhttp.open("GET", "../problem/getProblem.php");
	xhttp.send();
}

// 사용자가 실제로 해결한 문제의 목록을 반환
function getSolved() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			solved = flag.trim().split(" ");
			setProgress();
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	xhttp.open("GET", "../problem/getSolved.php?handle=" + handle["boj"]);
	xhttp.send();
}

// 비동기 이벤트를 동기화 시켜주기 위해 Daisy Chain방식 사용
// 이전 함수의 호출이 모두 끝나야 이 함수를 호출해서 진행도를 갱신한다
function setProgress() {
	console.log(problem);
	console.log(solved);
	let cnt = 0;
	for (let s of solved) {
		if (problem.indexOf("boj" + s) != -1) {
			console.log(s);
			cnt++;
		}
	}
	let per = parseInt(cnt / problem.length * 100);
	$("#progress").html(per + "%");
}
