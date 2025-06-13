// utils/generateEmail.js
export const generateEmail = async ({ name, position, skills }) => {
  try {
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        position: position.trim(),
        skills: skills.map(skill => skill.trim()), // ensure skills is an array of strings
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Frontend JSON Error:", error);
    return { success: false, message: "Invalid JSON sent to server." };
  }
};
