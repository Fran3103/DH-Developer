/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        celeste : '#19A7CE', 
        celesteOscuro : '#19a7ce8e',
        azul: '#073D56',
        verde: '#bbfff1',
    

      },
    
      screens:{

        xs:"400px",
        sm:"640px",
        md:"768px",
        lg:"1024px",
        xl:"1280px",
        xxl: "1536px" 

      }
    },
  },
  plugins: [],
}