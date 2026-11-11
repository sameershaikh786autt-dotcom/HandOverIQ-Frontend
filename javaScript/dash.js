

 const logoutBtn = document.getElementById('logoutBtn');
        
        logoutBtn.addEventListener('click', () => {
            // Wapas login page par bhejne ke liye
            window.location.href = 'index.html';
        });

// ==================== 3. SAVE PROJECT LOGIC ====================
const saveProjectBtn = document.getElementById('saveProjectBtn');
if (saveProjectBtn) {
    saveProjectBtn.addEventListener('click', () => {
        const currentUserId = localStorage.getItem("userId");

        if (!currentUserId) {
            alert("Session expired! Please login again.");
            window.location.href = 'index.html';
            return;
        }

        const projectData = {
            name: document.getElementById('projectName').value.trim(),
            description: document.getElementById('projectDescription').value.trim(),
            repositoryUrl: document.getElementById('repositoryUrl').value.trim()
            // Yahan se userId hata di hai kyunki ab wo URL path mein ja rahi hai
        };

        if (!projectData.name) {
            alert("Please enter a project name!");
            return;
        }

        // 👉 Yahan URL ke aakhir mein userId append kar di hai
        fetch(`https://handoveriq-2xn4.onrender.com/api/handoveriq/detail/${currentUserId}`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        })
        .then(response => response.text())
        .then(result => {
            alert("Project successfully saved! ID: " + result);
        })
        .catch(error => console.error('Project Save Error:', error));
    });
}


// ==================== 4. SAVE DOCUMENT LOGIC ====================
const saveDocBtn = document.getElementById('saveDocBtn');
if (saveDocBtn) {
    saveDocBtn.addEventListener('click', () => {
        const currentUserId = localStorage.getItem("userId");

        if (!currentUserId) {
            alert("Session expired! Please login again.");
            window.location.href = 'index.html';
            return;
        }

        const documentData = {
            fileName: document.getElementById('fileName').value.trim(),
            filePath: "uploads/" + document.getElementById('fileName').value.trim(),
            fileType: "text/plain", 
            fileSize: 1024,
            extractedText: document.getElementById('extractedText').value.trim(),
            userId: currentUserId
        };

        if (!documentData.fileName) {
            alert("Please enter a file name!");
            return;
        }

       fetch(`https://handoveriq-2xn4.onrender.com/api/handoveriq/document/${currentUserId}`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(documentData)
        })
        .then(response => {
            if (response.ok) {
                alert("Document successfully saved! 📄");
            } else {
                alert("Failed to save document.");
            }
        })
        .catch(error => console.error('Document Save Error:', error));
    });
}

const analyzeAiBtn = document.getElementById('analyzeAiBtn'); // 👉 Button ID match kar li
const responseContainer = document.getElementById('responseContainer');
const aiOutputText = document.getElementById('aiOutputText');

if (analyzeAiBtn) {
    analyzeAiBtn.addEventListener('click', () => {
        // 1. Project ID aur Document ID ko input fields se uthao
        // (Apne HTML input fields ki IDs yahan check kar lena, jaise 'projectIdInput' aur 'documentIdInput')
        const projectId = document.getElementById('projectIdInput').value.trim();
        const documentId = document.getElementById('documentIdInput').value.trim();

        if (!projectId || !documentId) {
            alert("Please enter both Project ID and Document ID!");
            return;
        }

        // 2. Box ko visible karo aur loading message dikhao
        responseContainer.style.display = 'block';
        aiOutputText.innerText = "Generating AI HandOver Report, please wait... 🚀";

        // 3. Backend ke /api/handoveriq/check endpoint par request bhejo
        fetch(`https://handoveriq-2xn4.onrender.com/api/handoveriq/check?projectId=${projectId}&documentId=${documentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error or invalid IDs!");
            }
            return response.text();
        })
        .then(aiResult => {
            // 4. AI ka response aate hi screen par dikha do
            responseContainer.style.display = 'block';
            aiOutputText.innerText = aiResult;
        })
        .catch(error => {
            console.error('AI Error:', error);
            responseContainer.style.display = 'block';
            aiOutputText.innerText = "Error: Failed to generate AI report. Check console for details.";
        });
    });
}