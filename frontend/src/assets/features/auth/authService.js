export async function loginUsuario(formData) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error =  new Error("Error al iniciar sesión");
      error.status = response.status;
      throw error;
      
    }
 
    return await response.json();

  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
    
}

export async function registerUsuario(formData) {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = new Error("Error al registrar el usuario");
      error.status = response.status;
      throw error;
    }

    return await response.json();

  } catch (error) {
    console.error("Error en registerUsuario:", error);
    throw error;
  }
}


export async function reEnviarCorreo(email) {
  try {
    const response = await fetch("http://localhost:3000/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email} ),
    });
    
    if (!response.ok) {
        const error = new Error("Error al reenviar el correo de verificación");
        error.status = response.status;
  
        throw error;
    }
    
    return await response.text();
    
} catch (error) {

    console.error("Error en reenviarCorreo:", error);
    throw error;
}
}