const loadData = async (searchText, dataLimit) => {
    togglePhoneContainer(false);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, dataLimit);
}
const displayData = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');

    phonesContainer.textContent = '';
    const showAll = document.getElementById('show-all-btn');
    const warnMsg = document.getElementById('warn-msg');
    if (phones.length === 0) {
        warnMsg.classList.remove('d-none');
    } else {
        warnMsg.classList.add('d-none');
    }
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
                <div class="card h-100 rounded-3">
                    <img class="p-5" src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body px-5">
                        <h5 class="card-title">Brand: ${phone.brand}</h5>
                        <h6 class="card-title mt-3">Phone Name: ${phone.phone_name}</h6>
                        <button onclick="loadPhone('${phone.slug}')" class="btn btn-success mt-4">Show Details</button>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    })
    toggleSpinner(false);
}
const loadPhone = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    console.log(url);
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
    } catch {
        console.error('error', error);
    }
}
const displayPhone = (phone) => {
    // console.log(phone.brand);

    const phoneContainer = document.getElementById('phone-container');
    togglePhoneContainer(true);
    const sensors = phone.mainFeatures.sensors;
    // console.log(sensors);
    phoneContainer.innerHTML = `
    <img class="w-50" src="${phone.image}" alt="phone-image">
    <h3 class="mt-4">${phone.name}</h3>
    <p>WLAN: ${phone.others.WLAN}</p>
    <p>NFC: ${phone.others.NFC}</p>
    <p>USB: ${phone.others.USB}</p>
    <ul>
    <h6>Sensors</h6>
    <li>${sensors[0]?.toUpperCase()}</li>
    <li>${sensors[1]?.toUpperCase()}</li>
    <li>${sensors[2]?.toUpperCase()}</li>
    <li>${sensors[3]?.toUpperCase()}</li>
    <li>${sensors[4]?.toUpperCase()}</li>
    <li>${sensors[5]?.toUpperCase()}</li>
    <li>${sensors[6]?.toUpperCase()}</li>
    <li>${sensors[7] ? sensors[7] : 'Not found'}</li>
    
    </ul>
    
    
    
    `;
}
const handelSearch = (dataLimit) => {
    toggleSpinner(true);
    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    loadData(searchText, dataLimit);
}
document.getElementById('search-field').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        toggleSpinner(true);
        const inputField = document.getElementById('search-field');
        handelSearch(10);
    }
})
document.getElementById('show-all-btn').addEventListener('click', () => {
    toggleSpinner(true);
    handelSearch();
})
const toggleSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isLoading) {
        spinnerContainer.classList.remove('d-none');
    } else {
        spinnerContainer.classList.add('d-none');
    }
}
const togglePhoneContainer = (isVisible) => {
    const phoneContainer = document.getElementById('phone-container');
    if (isVisible) {
        phoneContainer.classList.remove('d-none');
    } else {
        phoneContainer.classList.add('d-none');
    }
}
loadData('oppo');
