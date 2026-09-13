/**
 * resumen-diario.js
 * Nodo de código (Code Node) de n8n — Sistema de Automatización del Control Operativo
 * Grupo ConsigueVentas Inversiones E.I.R.L. — Núcleo Web
 *
 * Función: al finalizar la sesión del colaborador, genera el resumen del día
 * (total de actividades, tiempo trabajado, incidencias detectadas) para
 * enviarlo por Telegram y para el registro en la hoja "Registros".
 *
 * Input esperado: lista de actividades del día (leídas desde Google Sheets)
 * para un mismo chat_id / colaborador.
 */

const items = $input.all();

if (items.length === 0) {
  return [{ json: { mensaje: "No se registraron actividades hoy." } }];
}

const colaborador = items[0].json.colaborador;
const totalActividades = items.length;
const minutosTotales = items.reduce(
  (acc, item) => acc + (item.json.duracion_minutos || 0),
  0
);
const incidencias = items.filter((item) => item.json.es_incidencia === true);

const horas = Math.floor(minutosTotales / 60);
const minutos = minutosTotales % 60;

const resumenTexto =
  `📋 Resumen del día — ${colaborador}\n\n` +
  `✅ Actividades registradas: ${totalActividades}\n` +
  `⏱️ Tiempo total: ${horas}h ${minutos}min\n` +
  `⚠️ Incidencias detectadas: ${incidencias.length}\n` +
  (incidencias.length > 0
    ? incidencias.map((i) => `   • ${i.json.actividad}`).join("\n")
    : "");

return [
  {
    json: {
      colaborador,
      fecha: new Date().toISOString().split("T")[0],
      total_actividades: totalActividades,
      minutos_totales: minutosTotales,
      total_incidencias: incidencias.length,
      mensaje_telegram: resumenTexto,
    },
  },
];
