# Esquema de Datos — Google Sheets

El sistema usa un único archivo de Google Sheets como Data Mart, con dos hojas.
**No se incluyen datos reales de la empresa**, solo la estructura de columnas y
una fila de ejemplo ficticia para referencia.

## Hoja `Registros`

Almacena el historial de actividades de todos los colaboradores.

| Columna           | Tipo     | Descripción                                            |
| ----------------- | -------- | ------------------------------------------------------- |
| ID                | Texto    | Identificador único del registro                         |
| Fecha             | Fecha    | Fecha de la actividad (YYYY-MM-DD)                       |
| Colaborador       | Texto    | Nombre del colaborador                                   |
| Proyecto          | Texto    | Proyecto asignado durante la jornada                     |
| Actividad         | Texto    | Descripción de la actividad realizada                    |
| Hora Inicio       | Hora     | Hora de inicio de la actividad                           |
| Hora Fin          | Hora     | Hora de fin de la actividad                              |
| Duración (min)    | Número   | Duración calculada automáticamente                       |
| Estado            | Texto    | `Pendiente` / `En curso` / `Finalizado`                  |
| Categoría IA      | Texto    | Categoría asignada por Gemini (Diseño, Desarrollo, etc.) |
| Es Incidencia     | Booleano | `TRUE`/`FALSE`, calculado por el agente de IA            |

**Fila de ejemplo (ficticia):**

```
ID: 000123 | Fecha: 2026-09-10 | Colaborador: Colaborador Demo | Proyecto: Cliente X
Actividad: "Diseño de piezas para campaña de redes" | Hora Inicio: 09:00 | Hora Fin: 09:45
Duración: 45 | Estado: Finalizado | Categoría IA: Diseño | Es Incidencia: FALSE
```

## Hoja `Chat_Estados`

Guarda el estado conversacional de cada colaborador dentro del bot de Telegram,
para que el flujo recuerde en qué paso quedó (proyecto seleccionado, actividad
en curso, etc.) sin pedir la misma información varias veces.

| Columna              | Tipo   | Descripción                                            |
| -------------------- | ------ | ------------------------------------------------------- |
| Chat ID              | Texto  | ID de chat de Telegram del colaborador                  |
| Colaborador          | Texto  | Nombre del colaborador                                  |
| Proyecto Actual      | Texto  | Proyecto seleccionado para la jornada en curso           |
| Paso Actual          | Texto  | Paso del flujo conversacional (`esperando_actividad`, `esperando_hora_fin`, etc.) |
| Última Actualización | Fecha/Hora | Marca de tiempo del último mensaje procesado         |

> Ambas hojas mantuvieron esta misma estructura desde el primer incremento
> del proyecto (INC 1), sin cambios — evidencia de que los requerimientos de
> datos se definieron correctamente desde el análisis inicial.
