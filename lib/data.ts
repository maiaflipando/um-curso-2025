// Simulated database with historical expense data
const expensesDB = [
  // Team 1 - Desarrollo
  {
    id: 1,
    description: "Licencias de software de desarrollo",
    amount: 2500,
    category: "Software",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-01-15",
  },
  {
    id: 2,
    description: "Equipos de desarrollo nuevos",
    amount: 8500,
    category: "Equipos",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-01-20",
  },
  {
    id: 3,
    description: "Almuerzo de equipo",
    amount: 450,
    category: "Comidas",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-02-05",
  },
  {
    id: 4,
    description: "Conferencia de tecnología",
    amount: 1200,
    category: "Viajes",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-02-15",
  },
  {
    id: 5,
    description: "Suscripción a herramientas de desarrollo",
    amount: 890,
    category: "Software",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-03-01",
  },
  {
    id: 6,
    description: "Material de oficina",
    amount: 320,
    category: "Oficina",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-03-10",
  },
  {
    id: 7,
    description: "Capacitación en nuevas tecnologías",
    amount: 1800,
    category: "Software",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-04-05",
  },
  {
    id: 8,
    description: "Cena de celebración de proyecto",
    amount: 680,
    category: "Comidas",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-04-20",
  },
  {
    id: 9,
    description: "Renovación de licencias IDE",
    amount: 1500,
    category: "Software",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-05-01",
  },
  {
    id: 10,
    description: "Viaje a cliente para implementación",
    amount: 2200,
    category: "Viajes",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-05-15",
  },

  // Team 2 - Marketing
  {
    id: 11,
    description: "Campaña publicitaria en redes sociales",
    amount: 3500,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-01-10",
  },
  {
    id: 12,
    description: "Diseño gráfico para campaña",
    amount: 1200,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-01-25",
  },
  {
    id: 13,
    description: "Evento de lanzamiento de producto",
    amount: 4500,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-02-10",
  },
  {
    id: 14,
    description: "Herramientas de análisis de marketing",
    amount: 890,
    category: "Software",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-02-20",
  },
  {
    id: 15,
    description: "Material promocional",
    amount: 650,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-03-05",
  },
  {
    id: 16,
    description: "Almuerzo con influencers",
    amount: 380,
    category: "Comidas",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-03-15",
  },
  {
    id: 17,
    description: "Feria comercial",
    amount: 2800,
    category: "Viajes",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-04-01",
  },
  {
    id: 18,
    description: "Producción de video promocional",
    amount: 3200,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-04-15",
  },
  {
    id: 19,
    description: "Campaña de email marketing",
    amount: 750,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-05-01",
  },
  {
    id: 20,
    description: "Equipos para eventos",
    amount: 1800,
    category: "Equipos",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-05-10",
  },

  // Team 3 - Ventas
  {
    id: 21,
    description: "CRM y herramientas de ventas",
    amount: 1200,
    category: "Software",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-01-05",
  },
  {
    id: 22,
    description: "Viaje a cliente potencial",
    amount: 1800,
    category: "Viajes",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-01-18",
  },
  {
    id: 23,
    description: "Cena de negocios",
    amount: 420,
    category: "Comidas",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-02-02",
  },
  {
    id: 24,
    description: "Material de presentaciones",
    amount: 280,
    category: "Oficina",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-02-12",
  },
  {
    id: 25,
    description: "Conferencia de ventas",
    amount: 2200,
    category: "Viajes",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-03-01",
  },
  {
    id: 26,
    description: "Almuerzo con equipo de ventas",
    amount: 350,
    category: "Comidas",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-03-15",
  },
  {
    id: 27,
    description: "Renovación de licencias CRM",
    amount: 980,
    category: "Software",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-04-01",
  },
  {
    id: 28,
    description: "Viaje de cierre de contrato",
    amount: 1600,
    category: "Viajes",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-04-18",
  },
  {
    id: 29,
    description: "Equipos de presentación",
    amount: 1200,
    category: "Equipos",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-05-05",
  },
  {
    id: 30,
    description: "Cena de celebración de meta",
    amount: 580,
    category: "Comidas",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-05-20",
  },

  // Recent expenses (current month)
  {
    id: 31,
    description: "Suscripción mensual de herramientas",
    amount: 450,
    category: "Software",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-12-01",
  },
  {
    id: 32,
    description: "Campaña navideña",
    amount: 2800,
    category: "Marketing",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-12-05",
  },
  {
    id: 33,
    description: "Viaje de fin de año a cliente",
    amount: 1900,
    category: "Viajes",
    teamId: 3,
    teamName: "Ventas",
    userId: 4,
    userName: "Sofia Lopez",
    date: "2024-12-10",
  },
  {
    id: 34,
    description: "Almuerzo de equipo navideño",
    amount: 680,
    category: "Comidas",
    teamId: 1,
    teamName: "Desarrollo",
    userId: 2,
    userName: "Ana Martinez",
    date: "2024-12-15",
  },
  {
    id: 35,
    description: "Material de oficina fin de año",
    amount: 320,
    category: "Oficina",
    teamId: 2,
    teamName: "Marketing",
    userId: 3,
    userName: "Luis Garcia",
    date: "2024-12-18",
  },
]

const teamsDB = [
  { id: 1, name: "Desarrollo", description: "Equipo de desarrollo de software", managerId: 2 },
  { id: 2, name: "Marketing", description: "Equipo de marketing y comunicaciones", managerId: 3 },
  { id: 3, name: "Ventas", description: "Equipo de ventas y relaciones comerciales", managerId: 4 },
]

const usersDB = [
  { id: 1, email: "admin@flipzen.com", name: "Carlos Rodriguez", role: "admin_manager" },
  { id: 2, email: "manager1@flipzen.com", name: "Ana Martinez", role: "team_manager", teamId: 1 },
  { id: 3, email: "manager2@flipzen.com", name: "Luis Garcia", role: "team_manager", teamId: 2 },
  { id: 4, email: "manager3@flipzen.com", name: "Sofia Lopez", role: "team_manager", teamId: 3 },
]

export function getCurrentUser() {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function getTeams() {
  return teamsDB
}

export function getExpensesByUser(user) {
  if (user.role === "admin_manager") {
    return expensesDB.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else {
    return expensesDB
      .filter((expense) => expense.teamId === user.teamId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}

export function addExpense(expenseData, user) {
  const team = teamsDB.find((t) => t.id === expenseData.teamId)
  const newExpense = {
    id: Math.max(...expensesDB.map((e) => e.id)) + 1,
    description: expenseData.description,
    amount: expenseData.amount,
    category: expenseData.category,
    teamId: expenseData.teamId,
    teamName: team?.name || "Unknown",
    userId: user.id,
    userName: user.name,
    date: expenseData.date,
  }

  expensesDB.unshift(newExpense)
  return newExpense
}

export function getExpenseStats(expenses) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const categories = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  return {
    total,
    count: expenses.length,
    average: expenses.length > 0 ? total / expenses.length : 0,
    categories,
  }
}
