let problem = [];
let solved = [];
let handle = {};

getHandle("boj");

// 이미 푼 문제들 물 채우기
function render() {
	let problems = $(".title");
	for (let p of problems) {
		let key = $(p).html();
		if (solvedThis(key)) {
			$(p).parent().prepend($("<div class='water'></div>"));
			console.log("solved : " + key);
		}
	}
}

function getID(name) {
	for (let p of problem) {
		if (p["name"] === name) {
			return p["id"]; 
		}
	}
}

// 문제 이름으로 풀었는지 확인
function solvedThis(name) {
	let key = getID(name)
	for (let s of solved) {
		if (key == "boj" + s) {
			return true;
		} 
	}
	return false;
}

function getHandle(oj) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			handle[oj] = flag;
			getProblem("수학");
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	let id = sessionStorage.getItem("id");
	xhttp.open("GET", "../oj/getHandle.php?oj=" + oj + "&id=" + id);
	xhttp.send();
}

// tag를 기준으로 문제를 가져옴
function getProblem(tag) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			json = flag.trim().split("\n");
			for (j of json) {
				j = JSON.parse(j);
				if (j["tag"].indexOf(tag) != -1) {
					problem.push(j);
				}
			}
			console.log(problem);
			getSolved();
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	xhttp.open("GET", "../problem/getProblem.php");
	xhttp.send();
}

function getSolved() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			solved = flag.trim().split(" ");
			console.log(solved);
			render();
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	xhttp.open("GET", "../problem/getSolved.php?handle=" + handle["boj"]);
	xhttp.send();
}
