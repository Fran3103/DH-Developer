

export const actualizarRol = async (id, rol) => {

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}?role=${rol}`, {

            method:"PUT",
            headers: {
                "Content-type": "application/json"
            
        },
    })

    const data = await response.text()

    if(!response.ok){
        throw new Error(data)
    }

    console.log("Exito: ", data)

    alert("Rol actualizado correctamente")
    }

    catch (error){
        console.error("Error: ", error)
        alert("No se pudo actualizar el rol")
    }

}






