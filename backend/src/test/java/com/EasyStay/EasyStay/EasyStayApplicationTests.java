import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.util.List;

public class TestJsonIcono {

	public static void main(String[] args) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		List<Caracteristicas> lista = mapper.readValue(
				new File("src/main/resources/caracteristicas.json"),
				mapper.getTypeFactory().constructCollectionType(List.class, Caracteristicas.class)
		);

		for (Caracteristicas c : lista) {
			System.out.println("✅ Name: " + c.getName() + " | Icono: " + c.getIcono());
		}
	}

	static class Caracteristicas {
		private String name;
		private String icono;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getIcono() {
			return icono;
		}

		public void setIcono(String icono) {
			this.icono = icono;
		}
	}
}
