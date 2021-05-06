const nameInput = document.getElementById("site-name");
const urlInput = document.getElementById("site-url");
const form = document.getElementById("form-input");
let output = document.getElementById('output');
let delBtn = document.getElementsByClassName('del-btn');


form.addEventListener('submit', saveSite);

function saveSite(e) {
	e.preventDefault();

	if (nameInput.value == '' || urlInput.value == '') {
		alert("Enter site name and url");
		return;
	}

	let bookmark = { name: nameInput.value, url: urlInput.value }

	let bookmarks = localStorage.getItem('bookmarks');
	if (bookmarks == '' || bookmarks == null) {
		bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		bookmarks = JSON.parse(bookmarks);
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	renderDOM();

}

function removeSite(num) {
	let bookmarks = localStorage.getItem('bookmarks');
	bookmarks = JSON.parse(bookmarks);
	bookmarks.splice(num, 1);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	renderDOM();
}

function renderDOM() {
	delBtn = document.getElementsByClassName('del-btn');
	output.innerHTML = '';
	let bookmarks = localStorage.getItem('bookmarks');
	if (bookmarks != null) {
		bookmarks = JSON.parse(bookmarks);
		bookmarks.forEach((site, index) => {
			let outputHTML =
				`<div class="card card-header p-5 mb-3">
				<div class="card-item">
				<span class='fs-4'>${site.name}</span>
				<a class='btn btn-secondary mx-2' href="https://${site.url}">Visit</a>
				<span class='del-btn btn btn-danger' data-id='${index}'>Delete</span>
				</div>
				</div>`;
			output.innerHTML += outputHTML;
		})
	}

	for (let i = 0; i < delBtn.length; i++) {
		delBtn[i].addEventListener('click', removeItem);
	}
}



function removeItem(e) {
	removeSite(Number(e.target.dataset.id));
}



renderDOM();




