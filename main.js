function signIn() {
	let id = $("#id").val();
	let pw = $("#pw").val();
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let flag = this.responseText;
		if (flag) {
			sessionStorage.setItem("id", flag);
			alert("로그인 성공" + flag);
			location.href = "home/home.html";
		} else {
			alert("로그인을 실패했습니다.");
		}
	}
	xhttp.open("GET", "./user/signIn.php?" + "id=" + id + "&pw=" + pw);
	xhttp.send();
}

function signUp() {
	let id = $("#id").val();
	let pw = $("#pw").val();
	$("#id").val("");
	$("#pw").val("");
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "./user/signUp.php?" + "id=" + id + "&pw=" + pw);
	xhttp.send();
	console.log(xhttp.responseText);
	alert("회원가입이 완료되었습니다.");
}