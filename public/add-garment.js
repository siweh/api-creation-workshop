const message = document.querySelector('.message');
const hidden = document.querySelector('.hidden');
const addGarmetBtn = document.querySelector('.addGarmentBtn');
const hideAddGarmetBtn = document.querySelector('.hideAddGarmetBtn');
const addGarmetSection = document.querySelector('.add.garment');
const addGarmetButtonSection = document.querySelector('.add.button');
const formGarment = document.querySelector('.garment');

function showMessage(value, status){
	console.log(status);
	message.innerHTML = value;
	console.log(value);
	
	message.classList.toggle('error');
	message.classList.toggle('success');
	if(status === 'error'){
		message.classList.replace('success', 'error');
		
	}else if(status === 'success'){
		message.classList.replace('error', 'success');
	}
	
	
	setTimeout(() =>  {
		message.innerHTML = '';
		//message.classList.toggle('hidden');
	}, 3000);
}

function toggleAddGarmetScreen() {
	addGarmetSection.classList.toggle('hidden');
	addGarmetButtonSection.classList.toggle('hidden');
}

function hideAddGarmentDiv() { 
	// if (hidden.style.display === "none") {
	// 	hidden.style.display = "block";
	// } else {
	// 	hidden.style.display = "none";
	// }
		addGarmetSection.classList.remove('hidden');
  }

hideAddGarmetBtn.addEventListener('click', function(evt){
	evt.preventDefault();
	hideAddGarmentDiv();
	addGarmetSection.classList.toggle('hidden');
	addGarmetButtonSection.classList.remove('hidden')
}
);

const fieldManager = FieldManager({
	'description': '',
	'img': '',
	'season': '',
	'gender': '',
	'price': 0.00
});

addGarmetBtn.addEventListener('click', function(evt) {

	// fields on the screen
	const fields = fieldManager.getValues();

	axios
		.post('/api/garments', fields)
		.then(result =>{
			if (result.data.status == 'error') {
				showMessage(result.data.message, result.data.status);
			} else {
				toggleAddGarmetScreen();
				// show success message from API
				showMessage(result.data.message, result.data.status);
				fieldManager.clear();
				// show all the data
				filterData();
			}
		})
		.catch(err => {
			showMessage(err.stack)
		});
});

addGarmetButtonSection.addEventListener('click', function(evt) {
	evt.preventDefault();
	toggleAddGarmetScreen()
});