
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

function updateResume() {
  for (const field of fields) {
    const input = document.getElementById(field);

    if (outputMap[field]) {
      document.getElementById(outputMap[field]).textContent =
        input.value.trim() || (
          field === "name" ? "Your Name" : ""
        );
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

document.getElementById("resumeForm").addEventListener(
  "input",
  updateResume
);

document.getElementById("downloadBtn").addEventListener(
  "click",
  () => window.print()
);

updateResume();
