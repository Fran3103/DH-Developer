/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { iconMap } from "../../../utils/iconMap";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { updateCaracteristica } from "../CaracteristicaService";

// eslint-disable-next-line react/prop-types
const EditarCaracteristicas = ({ cerrar, confirmar, datosEditar }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    icono: "",
  });
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);
  const Icon = iconMap[formData.icono];
  useEffect(() => {
    if (datosEditar) {
      setFormData({
        id: datosEditar.id,
        name: datosEditar.name,
        icono: datosEditar.icono,
      });
    }
  }, [datosEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstado(true);
    setEnviado(false);

    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("icono", formData.icono);
    try {
      await updateCaracteristica(formData.id, data);
      setEstado("Característica actualizada con éxito");
      setEnviado(true);
      confirmar();
    } catch (error) {
      setError(error.message || "Error en la solicitud");
      setEnviado(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col ">
        <h2 className="text-xl font-semibold mb-4">Editar Caracteristica</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 relative gap-4 items-center w-full justify-between  "
        >
          <div className="flex w-full justify-between items-center">
            <label className="block mb-1">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
              readOnly
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-2/3 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex w-full justify-between">
            <label className="block mb-1">Icono:</label>
            <Listbox
              value={formData.icono}
              onChange={(value) => {
                if (typeof value === "string" && iconMap[value]) {
                  setFormData({ ...formData, icono: value });
                } else {
                  setFormData({ ...formData, icono: "" });
                }
              }}
            >
              <div className="relative w-2/3">
                <ListboxButton className="w-full border px-3 py-2 rounded text-left">
                  {formData.icono && iconMap[formData.icono] ? (
                    <span className="flex items-center gap-2">
                      <Icon className="text-xl" />
                    </span>
                  ) : (
                    "Selecciona un icono"
                  )}
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full grid grid-cols-3 gap-2 p-2 overflow-auto rounded bg-white shadow">
                  {Object.entries(iconMap).map(([key, Icon]) =>
                    Icon ? (
                      <ListboxOption
                        key={key}
                        value={key}
                        className={({ selected }) =>
                          `px-3 py-2 flex items-center gap-2 cursor-pointer ${
                            selected ? "bg-blue-100" : ""
                          } `
                        }
                      >
                        {({ selected }) => (
                          <>
                            <Icon className="text-xl" />

                            {selected && (
                              <span className="m-auto text-blue-500">✓</span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ) : null
                  )}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={cerrar}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <p
              className={
                enviado
                  ? "text-xs text-red-500 text-center absolute bottom-3 left-1/2 -translate-x-1/2"
                  : "hidden"
              }
            >
              {estado}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCaracteristicas;
