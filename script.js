 // Global variables
let personnelData = [];
let currentLanguage = 'en';
let editingIndex = -1;
let currentPhoto = null;
let cameraStream = null;

// Language translations
const translations = {
    en: {
        appTitle: "Русская Армия",
        headerTitle: "Русская Армия",
        headerSubtitle: "Military Personnel Management Database",
        searchInputPlaceholder: "Search by Geton Number, Name or Specialist...",
        searchBtn: "🔍 Search",
        showAllBtn: "📋 Show All",
        formSectionTitle: "Personnel Information",
        labelFirstName: "First Name:",
        labelMiddleName: "Middle Name:",
        labelFamilyName: "Family Name:",
        labelNickname: "Nickname:",
        labelGetonNumber: "Geton Number:",
        labelSpecialist: "Specialist:",
        selectSpecialist: "Select Specialist",
        specialistFighter: "Fighter",
        specialistTanker: "Tanker",
        specialistDriver: "Driver",
        specialistMedic: "Medic",
        specialistEngineer: "Engineer",
        specialistCommunications: "Communications",
        specialistArtillery: "Artillery",
        specialistIntelligence: "Intelligence",
        specialistLogistics: "Logistics",
        specialistOther: "Other",
        labelServiceLocation: "Service Location:",
        labelStatus: "Status:",
        statusAlive: "Alive",
        statusDeceased: "Deceased",
        labelMaritalStatus: "Marital Status:",
        maritalSingle: "Single",
        maritalMarried: "Married",
        labelBankAccount: "Bank Account:",
        serviceType: "Service Type:",
        serviceContract: "Contract",
        serviceConscript: "Conscript",
        labelServiceStatus: "Service Status:",
        serviceStatusActiveDuty: "Active Duty",
        serviceStatusOnLeave: "On Leave",
        serviceStatusSickLeave: "Sick Leave",
        serviceStatusTraining: "Training",
        serviceStatusTransferred: "Transferred",
        serviceStatusDischarged: "Discharged",
        labelContractStart: "Contract Start:",
        labelContractEnd: "Contract End:",
        labelLeaveStartDate: "Leave Start:",
        labelLeaveEndDate: "Leave End:",
        saveBtn: "💾 Save Personnel",
        updateBtn: "✏️ Update",
        clearBtn: "🗑️ Clear Form",
        photoSectionTitle: "Photo Management",
        noPhotoText: "No Photo",
        uploadPhotoBtn: "📁 Upload Photo",
        takePhotoBtn: "📷 Take Photo",
        downloadPhotoBtn: "⬇️ Download Photo",
        recordsListTitle: "Personnel Records",
        cardService: "Service:",
        cardStatus: "Status:",
        cardLeave: "Leave:",
        cameraModalTitle: "Take Photo",
        captureBtn: "📸 Capture",
        cancelCaptureBtn: "❌ Cancel",
        alertRequiredFields: "Please fill in required fields: First Name, Family Name, and Geton Number",
        alertGetonExists: "Geton Number already exists!",
        alertSaved: "Personnel saved successfully!",
        alertUpdated: "Personnel updated successfully!",
        alertSelectToUpdate: "Please select a personnel record to update.",
        confirmDelete: "Are you sure you want to delete this personnel record?",
        alertCameraDenied: "Camera access denied or not available"
    },
    ru: {
        appTitle: "Русская Армия",
        headerTitle: "Русская Армия",
        headerSubtitle: "База Данных Управления Личным Составом",
        searchInputPlaceholder: "Поиск по номеру жетона, имени или специальности...",
        searchBtn: "🔍 Поиск",
        showAllBtn: "📋 Показать все",
        formSectionTitle: "Информация о Персонале",
        labelFirstName: "Имя:",
        labelMiddleName: "Отчество:",
        labelFamilyName: "Фамилия:",
        labelNickname: "Псевдоним:",
        labelGetonNumber: "Номер жетона:",
        labelSpecialist: "Специальность:",
        selectSpecialist: "Выберите специальность",
        specialistFighter: "Боец",
        specialistTanker: "Танкист",
        specialistDriver: "Водитель",
        specialistMedic: "Медик",
        specialistEngineer: "Инженер",
        specialistCommunications: "Связист",
        specialistArtillery: "Артиллерист",
        specialistIntelligence: "Разведчик",
        specialistLogistics: "Логистика",
        specialistOther: "Другое",
        labelServiceLocation: "Место службы:",
        labelStatus: "Статус:",
        statusAlive: "Жив",
        statusDeceased: "Погиб",
        labelMaritalStatus: "Семейное положение:",
        maritalSingle: "Холост",
        maritalMarried: "Женат",
        labelBankAccount: "Банковский счет:",
        serviceType: "Тип службы:",
        serviceContract: "Контрактник",
        serviceConscript: "Призывник",
        labelServiceStatus: "Статус службы:",
        serviceStatusActiveDuty: "На службе",
        serviceStatusOnLeave: "В отпуске",
        serviceStatusSickLeave: "На больничном",
        serviceStatusTraining: "На учениях",
        serviceStatusTransferred: "Переведен",
        serviceStatusDischarged: "Уволен",
        labelContractStart: "Начало контракта:",
        labelContractEnd: "Конец контракта:",
        labelLeaveStartDate: "Начало отпуска:",
        labelLeaveEndDate: "Конец отпуска:",
        saveBtn: "💾 Сохранить Персонал",
        updateBtn: "✏️ Обновить",
        clearBtn: "🗑️ Очистить Форму",
        photoSectionTitle: "Управление Фотографиями",
        noPhotoText: "Нет Фотографии",
        uploadPhotoBtn: "📁 Загрузить Фото",
        takePhotoBtn: "📷 Сделать Фото",
        downloadPhotoBtn: "⬇️ Скачать Фото",
        recordsListTitle: "Записи Персонала",
        cardService: "Служба:",
        cardStatus: "Статус:",
        cardLeave: "Отпуск:",
        cameraModalTitle: "Сделать Фото",
        captureBtn: "📸 Сделать",
        cancelCaptureBtn: "❌ Отмена",
        alertRequiredFields: "Пожалуйста, заполните обязательные поля: Имя, Фамилия и Номер жетона",
        alertGetonExists: "Номер жетона уже существует!",
        alertSaved: "Персонал успешно сохранен!",
        alertUpdated: "Персонал успешно обновлен!",
        alertSelectToUpdate: "Пожалуйста, выберите запись персонала для обновления.",
        confirmDelete: "Вы уверены, что хотите удалить эту запись персонала?",
        alertCameraDenied: "Доступ к камере запрещен أو غير متاح"
    }
};

// Function to set language
function setLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[id^="label"], [id^="appTitle"], [id^="header"], [id^="search"], [id^="formSection"], [id^="photoSection"], [id^="recordsList"], [id$="Btn"]');
    elements.forEach(element => {
        const key = element.id;
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    const searchInput = document.getElementById('searchInput');
    searchInput.placeholder = searchInput.dataset[lang + 'Placeholder'];

    // Update select options
    document.querySelectorAll('select option').forEach(option => {
        const enText = option.dataset.en;
        const ruText = option.dataset.ru;
        if (enText && ruText) {
            option.textContent = translations[lang][option.value] || (lang === 'en' ? enText : ruText);
            // Special handling for "Select Specialist" default option
            if (option.value === "" && lang === 'ru') {
                option.textContent = translations.ru.selectSpecialist;
            } else if (option.value === "" && lang === 'en') {
                option.textContent = translations.en.selectSpecialist;
            }
        }
    });

    // Update no photo text
    document.getElementById('noPhotoText').textContent = translations[lang].noPhotoText;
    document.getElementById('cameraModalTitle').textContent = translations[lang].cameraModalTitle;


    renderPersonnelList(); // Re-render list to update card language
}
 // Update footer copyright and contact info
        document.querySelectorAll('.footer p[lang="en"]').forEach(function(el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.footer p[lang="ru"]').forEach(function(el) {
            el.style.display = 'none';
        });
        document.querySelectorAll('.footer p[lang="' + lang + '"]').forEach(function(el) {
            el.style.display = 'block'; // أو 'flex' أو 'inline-block' حسب طريقة عرضك
        });

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
    loadPersonnelData();
});


// CRUD Operations
function getFormData() {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        middleName: document.getElementById('middleName').value.trim(),
        familyName: document.getElementById('familyName').value.trim(),
        nickname: document.getElementById('nickname').value.trim(),
        getonNumber: document.getElementById('getonNumber').value.trim(),
        specialist: document.getElementById('specialist').value,
        serviceLocation: document.getElementById('serviceLocation').value.trim(),
        status: document.getElementById('status').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        bankAccount: document.getElementById('bankAccount').value.trim(),
        serviceType: document.getElementById('serviceType').value,
        serviceStatus: document.getElementById('serviceStatus').value,
        contractStart: document.getElementById('contractStart').value,
        contractEnd: document.getElementById('contractEnd').value,
        leaveStartDate: document.getElementById('leaveStartDate').value,
        leaveEndDate: document.getElementById('leaveEndDate').value,
        photo: currentPhoto
    };
}

function clearForm() {
    document.getElementById('personnelForm').reset();
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('photoPreview').src = '';
    document.getElementById('noPhotoText').style.display = 'block';
    currentPhoto = null;
    editingIndex = -1; // Reset editing mode
    document.getElementById('saveBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
}

function validateForm(data) {
    if (!data.firstName || !data.familyName || !data.getonNumber) {
        alert(translations[currentLanguage].alertRequiredFields);
        return false;
    }
    return true;
}

function savePersonnel() {
    const data = getFormData();
    if (!validateForm(data)) return;

    // Check for duplicate Geton Number
    if (personnelData.some(p => p.getonNumber === data.getonNumber)) {
        alert(translations[currentLanguage].alertGetonExists);
        return;
    }

    personnelData.push(data);
    savePersonnelData();
    renderPersonnelList();
    clearForm();
    alert(translations[currentLanguage].alertSaved);
}

function updatePersonnel() {
    if (editingIndex === -1) {
        alert(translations[currentLanguage].alertSelectToUpdate);
        return;
    }

    const data = getFormData();
    if (!validateForm(data)) return;

    // Check for duplicate Geton Number, excluding the current editing record
    if (personnelData.some((p, index) => index !== editingIndex && p.getonNumber === data.getonNumber)) {
        alert(translations[currentLanguage].alertGetonExists);
        return;
    }

    personnelData[editingIndex] = data;
    savePersonnelData();
    renderPersonnelList();
    clearForm();
    alert(translations[currentLanguage].alertUpdated);
}

function deletePersonnel(index) {
    if (confirm(translations[currentLanguage].confirmDelete)) {
        personnelData.splice(index, 1);
        savePersonnelData();
        renderPersonnelList();
        clearForm(); // Clear form if the deleted item was being edited
    }
}

function editPersonnel(index) {
    const person = personnelData[index];
    document.getElementById('firstName').value = person.firstName;
    document.getElementById('middleName').value = person.middleName;
    document.getElementById('familyName').value = person.familyName;
    document.getElementById('nickname').value = person.nickname;
    document.getElementById('getonNumber').value = person.getonNumber;
    document.getElementById('specialist').value = person.specialist;
    document.getElementById('serviceLocation').value = person.serviceLocation;
    document.getElementById('status').value = person.status;
    document.getElementById('maritalStatus').value = person.maritalStatus;
    document.getElementById('bankAccount').value = person.bankAccount;
    document.getElementById('serviceType').value = person.serviceType;
    document.getElementById('serviceStatus').value = person.serviceStatus;
    document.getElementById('contractStart').value = person.contractStart;
    document.getElementById('contractEnd').value = person.contractEnd;
    document.getElementById('leaveStartDate').value = person.leaveStartDate;
    document.getElementById('leaveEndDate').value = person.leaveEndDate;

    if (person.photo) {
        document.getElementById('photoPreview').src = person.photo;
        document.getElementById('photoPreview').style.display = 'block';
        document.getElementById('noPhotoText').style.display = 'none';
        currentPhoto = person.photo;
    } else {
        document.getElementById('photoPreview').style.display = 'none';
        document.getElementById('photoPreview').src = '';
        document.getElementById('noPhotoText').style.display = 'block';
        currentPhoto = null;
    }

    editingIndex = index; // Set editing mode
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'inline-block';
}

// Local Storage Functions
function savePersonnelData() {
    localStorage.setItem('personnelData', JSON.stringify(personnelData));
}

function loadPersonnelData() {
    const storedData = localStorage.getItem('personnelData');
    if (storedData) {
        personnelData = JSON.parse(storedData);
    }
    renderPersonnelList();
}

// Render Personnel List
function renderPersonnelList(dataToRender = personnelData) {
    const listContainer = document.getElementById('personnelRecords');
    listContainer.innerHTML = ''; // Clear previous list

    if (dataToRender.length === 0) {
        listContainer.innerHTML = `<p style="text-align: center; color: #aaa;">${currentLanguage === 'en' ? 'No personnel records found.' : 'Записи о персонале не найдены.'}</p>`;
        return;
    }

    dataToRender.forEach((person, index) => {
        const card = document.createElement('div');
        card.classList.add('personnel-card');
        card.innerHTML = `
            <div class="card-info">
                <strong>${person.firstName} ${person.middleName ? person.middleName + ' ' : ''}${person.familyName} (${person.nickname ? person.nickname : 'N/A'})</strong><br>
                <small>Geton Number: ${person.getonNumber} | Specialist: ${translations[currentLanguage][`specialist${person.specialist}`] || person.specialist}</small><br>
                <small>${translations[currentLanguage].cardService} ${translations[currentLanguage][`service${person.serviceType}`] || person.serviceType} | ${translations[currentLanguage].cardStatus} ${translations[currentLanguage][`status${person.status}`] || person.status} | ${translations[currentLanguage][`labelServiceStatus`]} ${translations[currentLanguage][`serviceStatus${person.serviceStatus.replace(/\s/g, '')}`] || person.serviceStatus}</small><br>
                ${person.serviceLocation ? `<small>Location: ${person.serviceLocation}</small><br>` : ''}
                ${person.contractStart ? `<small>Contract: ${person.contractStart} to ${person.contractEnd || 'N/A'}</small><br>` : ''}
                ${person.leaveStartDate ? `<small>${translations[currentLanguage].cardLeave} ${person.leaveStartDate} to ${person.leaveEndDate || 'N/A'}</small>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="editPersonnel(${index})">✏️ ${currentLanguage === 'en' ? 'Edit' : 'Редактировать'}</button>
                <button class="btn btn-danger" onclick="deletePersonnel(${index})">❌ ${currentLanguage === 'en' ? 'Delete' : 'Удалить'}</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Search Functionality
function searchPersonnel() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = personnelData.filter(person =>
        person.getonNumber.toLowerCase().includes(searchTerm) ||
        person.firstName.toLowerCase().includes(searchTerm) ||
        person.familyName.toLowerCase().includes(searchTerm) ||
        person.specialist.toLowerCase().includes(searchTerm) ||
        (person.nickname && person.nickname.toLowerCase().includes(searchTerm))
    );
    renderPersonnelList(filteredData);
}

function showAllPersonnel() {
    document.getElementById('searchInput').value = '';
    renderPersonnelList();
}

// Photo Management
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photoPreview').src = e.target.result;
            document.getElementById('photoPreview').style.display = 'block';
            document.getElementById('noPhotoText').style.display = 'none';
            currentPhoto = e.target.result; // Store as base64
        };
        reader.readAsDataURL(file);
    }
}

function openCamera() {
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraModal = document.getElementById('cameraModal');
    const captureCanvas = document.getElementById('captureCanvas');

    cameraModal.style.display = 'flex';
    captureCanvas.style.display = 'none'; // Hide canvas initially

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraStream = stream;
            cameraVideo.srcObject = stream;
            cameraVideo.style.display = 'block'; // Show video feed
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
            alert(translations[currentLanguage].alertCameraDenied);
            closeCamera();
        });
}

function capturePhoto() {
    const cameraVideo = document.getElementById('cameraVideo');
    const captureCanvas = document.getElementById('captureCanvas');
    const context = captureCanvas.getContext('2d');

    // Set canvas dimensions to match video feed or a reasonable size
    captureCanvas.width = cameraVideo.videoWidth;
    captureCanvas.height = cameraVideo.videoHeight;

    context.drawImage(cameraVideo, 0, 0, captureCanvas.width, captureCanvas.height);
    const photoDataUrl = captureCanvas.toDataURL('image/png');

    document.getElementById('photoPreview').src = photoDataUrl;
    document.getElementById('photoPreview').style.display = 'block';
    document.getElementById('noPhotoText').style.display = 'none';
    currentPhoto = photoDataUrl; // Store the captured photo

    closeCamera(); // Close the modal after capture
}

function closeCamera() {
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    cameraVideo.srcObject = null; // Clear video stream
    cameraModal.style.display = 'none';
}

function downloadPhoto() {
    if (currentPhoto) {
        const a = document.createElement('a');
        a.href = currentPhoto;
        a.download = 'personnel_photo.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert(currentLanguage === 'en' ? 'No photo to download.' : 'Нет фотографии для скачивания.');
    }
}


