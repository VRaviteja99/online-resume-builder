
const fields = [
  "name",
  "role",
  "email",
  "phone",
  "location",
  "summary",
  "skills",
  "education",
  "graduation",
  "project",
  "projectDescription"
];

const outputMap = {
  name: "outName",
  role: "outRole",
  summary: "outSummary",
  skills: "outSkills",
  education: "outEducation",
  graduation: "outGraduation",
  project: "outProject",
  projectDescription: "outProjectDescription"
};

// Update the resume preview using the form values.
function updateResume() {
  for (const field of fields) {
    const input = document.getElementById(field);
    const outputId = outputMap[field];

    if (input && outputId) {
      const output = document.getElementById(outputId);

      if (output) {
        output.textContent = input.value.trim();
      }
    }
  }

  const contact = [
    document.getElementById("email").value.trim(),
    document.getElementById("phone").value.trim(),
    document.getElementById("location").value.trim()
  ].filter(Boolean);

  document.getElementById("outContact").textContent =
    contact.join(" | ");
}

// Switch between the three resume templates.
function changeTemplate() {
  const templateSelect = document.getElementById("templateSelect");
  const resume = document.getElementById("resume");

  if (!templateSelect || !resume) {
    return;
  }

  resume.classList.remove(
    "template-modern",
    "template-classic",
    "template-minimal"
  );

  resume.classList.add(`template-${templateSelect.value}`);
}

// Update the preview whenever the user types.
document.getElementById("resumeForm").addEventListener(
  "input",
  updateResume
);

// Apply the selected template whenever the dropdown changes.
document.getElementById("templateSelect").addEventListener(
  "change",
  changeTemplate
);

// Open the browser print window to save the resume as a PDF.
document.getElementById("downloadBtn").addEventListener(
  "click",
  () => window.print()
);

// Initialize the page with an empty preview and the modern template.
changeTemplate();
updateResume();
