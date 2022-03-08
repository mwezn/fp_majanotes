function renderNotes(data) {
	const notesGrid = document.querySelector("#notesGrid");
	notesCount = data.length;
	//sort the notes according to popularity
	data = scoreAndSortNotes(data);
	//iterate over all notes after they have been sorted
	for (let i = 0; i < data.length; i++) {
		notesGrid.insertAdjacentElement("beforeend", buildNoteElement(data[i]));
	}
	//now change the opacity so the notes fade in using our transition CSS property :)
	notesGrid.style.opacity = "1";

	for (let i = 0; i < notesCount; i++) {
		addAllEmojiFunctionality(i);
	}
}

// `<div class="card" >
// <a href="${window.location.href}comment/${data.id}" class="gif-img" >
// </div>
// <div class="card-body">
// <h3 class="card-title"><a href="#" class="text-secondary">What is Lorem Ipsum?</a></h3>
// <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
// <div class="reactions"><span>❤️</span><span>👍</span><span>😑</span></div>
// <a href="#" class="btn btn-danger">Read More</a>
// </div>`

function buildNoteElement(data) {
	let newElement = document.createElement("div");
	
	let cardCol = document.createElement("div")
	cardCol.classList.add("col-md-6", "col-lg-4")
	let cardMargin = document.createElement("div")
	cardMargin.classList.add("card", "my-3");
	
	cardMargin.insertAdjacentElement('afterend', newElement)
	newElement.insertAdjacentElement('afterend', cardMargin)
	cardCol.insertAdjacentElement('beforebegin', cardMargin)
	
	//notes aren't guaranteed to have 'heart', 'thumbs' or 'neutral' fields
	//if they don't exist, make sure the count values equal 0 instead of undefined
	//that's why we can't just use e.g. data[i].heart 
	let heartCount = data['heart'] || 0;
	let thumbsCount = data['thumbs'] || 0;
	let neutralCount = data['neutral'] || 0;
	let commentCount = 0
	if (data['comments']) {
		commentCount = data['comments'].length;
	}

	newElement.classList.add("card");
	let commentLinkElement = document.createElement("a");
	let commentButtonElement = document.createElement("button");

	commentLinkElement.href = `${window.location.href}comment/${data.id}`;
	commentButtonElement.classList.add("commentButton");
	commentButtonElement.id = `commentButton${data.id}`;
	commentButtonElement.textContent = `💬: ${commentCount}`;
	commentLinkElement.insertAdjacentElement("beforeend", commentButtonElement);
	newElement.insertAdjacentElement("beforeend", commentLinkElement);
	if (data.comments) {
		commentButtonElement.style.borderColor = "green";
	} else {
		commentButtonElement.style.borderColor = "red";
	}

	if (data.gif) {
		newElement.insertAdjacentHTML("beforeend", `<img class="gif-img" src="${data.gif}">`);
	}

	let cardBody = document.createElement("div")
	cardBody.classList.add("card-body")
	cardBody.insertAdjacentHTML("beforeend", `<h2 class="card-title">${data.title}</h2>`);
	cardBody.insertAdjacentHTML("beforeend", `<p class="noteContent">${data.note}</p>`);
	cardBody.insertAdjacentHTML("beforeend", `<button id="heart${data.id}" class="emojiButton">❤️</p><p class="emojiCount" id="heartCount${data.id}">${heartCount}</p>`);
	cardBody.insertAdjacentHTML("beforeend", `<button id="neutral${data.id}" class="emojiButton">😐</p><p class="emojiCount" id="neutralCount${data.id}">${neutralCount}</p>`);
	cardBody.insertAdjacentHTML("beforeend", `<button id="thumbs${data.id}" class="emojiButton">👎</p><p class="emojiCount" id="thumbsCount${data.id}">${thumbsCount}</p>`);
	newElement.insertAdjacentElement('beforeend', cardBody)
	newElement.style.backgroundColor = data.color;
	return newElement;
}

function scoreAndSortNotes(data) {
	data.forEach(e => {
		//again, we are not guaranteed to have 'heart', 'thumbs' or 'neutral' attributes
		let heart = e.heart || 0;
		let thumbs = e.thumbs || 0;
		let neutral = e.neutral || 0;
		e.score = (heart * 3) + (neutral * 1) - (thumbs * 3)
	});
	data.sort((a, b) => b.score - a.score);
	return data;
}

function addEmojiFunctionality(element, emoji, id) {
	element.addEventListener('click', () => {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", `${protocol}//${host}/emoji`);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify({
			emoji: emoji,
			id: id
		}));

		//update the count of the emoji button we just clicked
		const usedEmojiButton = document.querySelector(`#${emoji}Count${id}`);
		usedEmojiButton.textContent = parseInt(usedEmojiButton.textContent) + 1;
	});
}

module.exports = {renderNotes}
