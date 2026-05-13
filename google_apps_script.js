/**
 * Google Apps Script para Terapeuta247
 * Recibe datos del formulario web y los escribe en Google Sheets
 * 
 * INSTRUCCIONES:
 * 1. Abre tu Google Sheet
 * 2. Ve a Extensiones > Apps Script
 * 3. Pega este código
 * 4. Guarda el proyecto (nombre: "Terapeuta247_Form")
 * 5. Despliega: Desplegar > Nuevo despliegue
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Acceso: Cualquier persona (incluso anónima)
 * 6. Copia la URL de la aplicación web
 * 7. Pégala en script.js reemplazando 'TU_URL_DE_APPS_SCRIPT'
 */

function doPost(e) {
  try {
    // Parsear los datos enviados desde el formulario
    const data = JSON.parse(e.postData.contents);
    
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Agregar una nueva fila con los datos
    sheet.appendRow([
      data.phone || '',      // Columna A: Número de WhatsApp
      data.message || '',    // Columna B: Mensaje a enviar
      data.timestamp || ''   // Columna C: Fecha y hora
    ]);
    
    // Respuesta exitosa
    return ContentService.createTextOutput("Success");
    
  } catch (err) {
    // Manejo de errores
    return ContentService.createTextOutput("Error: " + err.message);
  }
}

/**
 * Configuración inicial: crea encabezados si no existen
 * Ejecuta esta función una vez manualmente
 */
function setupHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, 3).getValues()[0];
  
  // Si no hay encabezados, los crea
  if (!headers[0]) {
    sheet.getRange(1, 1, 1, 3).setValues([['phone', 'message', 'timestamp']]);
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
  }
}
