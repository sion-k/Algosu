let problem = [];
let solved = [];
let handle = {};

getHandle("boj");

function render() {
    
}

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
