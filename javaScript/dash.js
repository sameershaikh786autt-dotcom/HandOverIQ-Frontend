

 const logoutBtn = document.getElementById('logoutBtn');
        
        logoutBtn.addEventListener('click', () => {
            // Wapas login page par bhejne ke liye
            window.location.href = 'index.html';
        });


        const API_BASE = 'https://handoveriq-2xn4.onrender.com/api/handoveriq';

// ==================== 3. SAVE PROJECT LOGIC ====================
const saveProjectBtn = document.getElementById('saveProjectBtn');
if (saveProjectBtn) {
    saveProjectBtn.addEventListener('click', async () => {
        const currentUserId = localStorage.getItem("userId");

        if (!currentUserId) {
            alert("Session expired! Please login again.");
            window.location.href = 'index.html';
            return;
        }

        const nameInput = document.getElementById('projectName');
        const descInput = document.getElementById('projectDescription');
        const repoInput = document.getElementById('repositoryUrl');

        const projectName = nameInput ? nameInput.value.trim() : '';
        if (!projectName) {
            alert("Please enter a project name!");
            return;
        }

        const projectData = {
            name: projectName,
            description: descInput ? descInput.value.trim() : '',
            repositoryUrl: repoInput ? repoInput.value.trim() : ''
        };

        saveProjectBtn.disabled = true;

        try {
            const response = await fetch(`${API_BASE}/detail/${encodeURIComponent(currentUserId)}`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                throw new Error(await response.text() || "Failed to save project.");
            }

            const result = await response.text();
            alert("Project successfully saved! ID: " + result);

            // Optional: Form fields reset
            if (nameInput) nameInput.value = '';
            if (descInput) descInput.value = '';
            if (repoInput) repoInput.value = '';

        } catch (error) {
            console.error('Project Save Error:', error);
            alert("Error saving project: " + error.message);
        } finally {
            saveProjectBtn.disabled = false;
        }
    });
}

// ==================== 4. SAVE DOCUMENT LOGIC ====================
const saveDocBtn = document.getElementById('saveDocBtn');
if (saveDocBtn) {
    saveDocBtn.addEventListener('click', async () => {
        const currentUserId = localStorage.getItem("userId");

        if (!currentUserId) {
            alert("Session expired! Please login again.");
            window.location.href = 'index.html';
            return;
        }

        const fileInput = document.getElementById('fileName');
        const textInput = document.getElementById('extractedText');

        const fileName = fileInput ? fileInput.value.trim() : '';
        const extractedText = textInput ? textInput.value.trim() : '';

        if (!fileName) {
            alert("Please enter a file name!");
            return;
        }

        const documentData = {
            fileName: fileName,
            filePath: `uploads/${fileName}`,
            fileType: "text/plain", 
            fileSize: new Blob([extractedText]).size || 1024,
            extractedText: extractedText,
            userId: currentUserId
        };

        saveDocBtn.disabled = true;

        try {
            const response = await fetch(`${API_BASE}/document/${encodeURIComponent(currentUserId)}`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(documentData)
            });

            if (!response.ok) {
                throw new Error(await response.text() || "Failed to save document.");
            }

            alert("Document successfully saved! 📄");

            if (fileInput) fileInput.value = '';
            if (textInput) textInput.value = '';

        } catch (error) {
            console.error('Document Save Error:', error);
            alert("Error saving document: " + error.message);
        } finally {
            saveDocBtn.disabled = false;
        }
    });
}

// ==================== 5. AI HANDOVER REPORT LOGIC ====================
const analyzeAiBtn = document.getElementById('analyzeAiBtn');
const responseContainer = document.getElementById('responseContainer');
const aiOutputText = document.getElementById('aiOutputText');

if (analyzeAiBtn) {
    analyzeAiBtn.addEventListener('click', async () => {
        const projInput = document.getElementById('projectIdInput');
        const docInput = document.getElementById('documentIdInput');

        const projectId = projInput ? projInput.value.trim() : '';
        const documentId = docInput ? docInput.value.trim() : '';

        if (!projectId || !documentId) {
            alert("Please enter both Project ID and Document ID!");
            return;
        }

        if (responseContainer) responseContainer.style.display = 'block';
        if (aiOutputText) {
            aiOutputText.style.whiteSpace = 'pre-wrap'; // Preserves indentation & bullet points
            aiOutputText.innerText = "Generating AI HandOver Report, please wait... 🚀";
        }

        analyzeAiBtn.disabled = true;
        analyzeAiBtn.innerText = "Processing...";

        try {
            const params = new URLSearchParams({ projectId, documentId });
            const response = await fetch(`${API_BASE}/check?${params.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errDetail = await response.text();
                throw new Error(errDetail || "Server returned an error status.");
            }

            const aiResult = await response.text();
            if (aiOutputText) {
                aiOutputText.innerText = aiResult;
            }
        } catch (error) {
            console.error('AI Error:', error);
            if (aiOutputText) {
                aiOutputText.innerText = `Error: ${error.message}`;
            }
        } finally {
            analyzeAiBtn.disabled = false;
            analyzeAiBtn.innerText = "Generate AI Report";
        }
    });
}