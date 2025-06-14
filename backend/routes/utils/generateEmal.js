export const generateEmail = async ({ name, position, skills }) => {
  try {
    // Use backend URL from environment or fallback
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'https://cold-email-x55y.onrender.com';

    const response = await fetch(`${backendURL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // important for CORS with credentials
      body: JSON.stringify({
        name: name.trim(),
        position: position.trim(),
        skills: skills.map(skill => skill.trim()),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ generateEmail() Error:", error);
    return { success: false, message: "Server error. Please try again later." };
  }
};
