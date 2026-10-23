
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

// Update the resume preview.
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

  // Update contact information.
  const contact = [
    document.getElementById("email").value.trim(),
    document.getElementById("phone").value.trim(),
    document.getElementById("location").value.trim()
  ].filter(Boolean);

  document.getElementById("outContact").textContent =
    contact.join(" | ");

  // Hide sections when their fields are empty.
  const sectionVisibility = [
    {
      output: "outSummary",
      section: "PROFILE"
    },
    {
      output: "outSkills",
      section: "TECHNICAL SKILLS"
    },
    {
      output: "outEducation",
      section: "EDUCATION"
    },
    {
      output: "outProject",
      section: "PROJECTS"
    }
  ];

  sectionVisibility.forEach(item => {
    const output = document.getElementById(item.output);
    const section = output.closest(".resume-section");

    let hasContent = output.textContent.trim() !== "";

    // Show Education if either education or graduation is entered.
    if (item.output === "outEducation") {
      hasContent =
        output.textContent.trim() !== "" ||
        document.getElementById("outGraduation")
          .textContent.trim() !== "";
    }

    // Show Projects if either project field is entered.
    if (item.output === "outProject") {
      hasContent =
        output.textContent.trim() !== "" ||
        document.getElementById("outProjectDescription")
          .textContent.trim() !== "";
    }

    section.hidden = !hasContent;
  });
}

// Switch between the three resume templates.
function changeTemplate() {
  const templateSelect =
    document.getElementById("templateSelect");

  const resume = document.getElementById("resume");

  if (!templateSelect || !resume) {
    return;
  }

  resume.classList.remove(
    "template-modern",
    "template-classic",
    "template-minimal"
  );

  const selectedTemplate = templateSelect.value;

  const validTemplates = [
    "modern",
    "classic",
    "minimal"
  ];

  const template = validTemplates.includes(selectedTemplate)
    ? selectedTemplate
    : "modern";

  resume.classList.add(`template-${template}`);
}

// Update preview whenever the user types.
document.getElementById("resumeForm").addEventListener(
  "input",
  updateResume
);

// Apply the selected template.
document.getElementById("templateSelect").addEventListener(
  "change",
  changeTemplate
);

// Download the resume using the browser's Print / Save as PDF.
document.getElementById("downloadBtn").addEventListener(
  "click",
  () => window.print()
);

// Initialize the page.
changeTemplate();
updateResume();
