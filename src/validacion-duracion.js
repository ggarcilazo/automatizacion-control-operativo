/**
 * validacion-duracion.js
 * Nodo de código (Code Node) de n8n — Sistema de Automatización del Control Operativo
 * Grupo ConsigueVentas Inversiones E.I.R.L. — Núcleo Web
 *
 * Función: valida que la duración de una actividad registrada por el colaborador
 * no supere el máximo permitido (RNF definido en el proyecto: 60 minutos).
 * Si se excede, marca la actividad como posible incidencia para que el agente
 * de IA (Gemini) la revise en el siguiente nodo.
 *
 * Input esperado (item de n8n):
 *   { hora_inicio: "2026-09-13T08:00:00", hora_fin: "2026-09-13T09:15:00", actividad: "..." }
 */

const DURACION_MAXIMA_MIN = 60;

const items = $input.all();
const resultados = [];

for (const item of items) {
  const { hora_inicio, hora_fin, actividad } = item.json;

  const inicio = new Date(hora_inicio);
  const fin = new Date(hora_fin);
  const duracionMin = Math.round((fin - inicio) / 60000);

  const excedeMaximo = duracionMin > DURACION_MAXIMA_MIN;

  resultados.push({
    json: {
      ...item.json,
      duracion_minutos: duracionMin,
      excede_maximo: excedeMaximo,
      requiere_revision_ia: excedeMaximo, // pasa al nodo de clasificación Gemini
    },
  });
}

return resultados;
