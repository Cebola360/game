// lista de fronteiras
export const fronteiras = {

  // América do sul:
      Argentina: ["Brasil", "Bolivia", "Chile"],
      Bolivia: ["Chile", "Brasil", "Argentina"],
      Brasil: ["Argentina", "Bolivia", "Colombia", "Chile", "Nigeria"],
      Chile: ["Colombia", "Brasil", "Bolivia", "Argentina"],
      Colombia: ["Mexico", "Brasil", "Chile"],

  // América do Norte:
      "Estados Unidos": ["Canada", "Mexico"],
      Mexico: ["Colombia", "Estados Unidos"],
      Canada: ["Estados Unidos", "Groelandia","Russia Oriental"],

  // Europa
      Alemanha: ["Inglaterra", "Polonia", "Espanha"],
      Espanha: ["Alemanha","Inglaterra", "Polonia", "Marrocos", "Egito"],
      Groelandia: ["Islandia", "Canada"],
      Inglaterra: ["Islandia", "Espanha", "Alemanha", "Irlanda", "Polonia"],
      Irlanda: ["Inglaterra"],
      Islandia: ["Suecia", "Inglaterra", "Groelandia"],
      Polonia: ["Alemanha", "Egito", "Espanha", "Russia Ocidental","Oriente Médio"],
      "Russia Ocidental": ["Suecia", "Polonia", "Oriente Médio", "Russia Oriental"],
      Suecia: ["Islandia", "Russia Ocidental"],

  // Africa
      "Africa do Sul": ["Madagascar", "Sudao", "Congo"],
      Congo: ["Nigeria", "Africa do Sul", "Sudao"],
      Egito: ["Sudao", "Nigeria", "Marrocos", "Polonia", "Oriente Medio", "Espanha"],
      Madagascar: ["Africa do Sul"],
      Marrocos: ["Egito", "Nigeria", "Espanha"],
      Nigeria: ["Sudao", "Congo", "Marrocos", "Egito", "Brasil"],
      Sudao: ["Congo", "Africa do Sul", "Nigeria", "Egito"],
      
  // Ásia
      China: ["Russia Oriental", "India", "Japao","Mongolia","Viatna"],
      India: ["China", "Oriente Médio", "Russia Oriental", "Viatna", "Malasia"],
      Japao: ["China", "Russia Oriental"],
      "Oriente Médio": ["Egito", "India", "Polonia", "Russia Ocidental", "Russia Oriental"],
      "Russia Oriental": ["Mongolia","Canada","China", "Russia Ocidental", "India", "Japao", "Oriente Médio"],
      Viatna: ["India", "China", "Nova Zelandia", "Indonesia"],
      
  // Oceania
      "Nova Zelandia": ["Australia", "Viatna"],
      Indonesia: ["Australia", "Papua Nova-Guine"],
      Malasia: ["Singapura", "India"],
      "Papua Nova-Guine": ["Ilhas Salomao", "Indonesia"],
      Australia: ["Indonesia", "Ilhas Salomao", "Singapura"],
      Singapura: ["Malasia", "Australia"],
      "Ilhas Salomao": ["Australia", "Papua Nova-Guine"]

    };