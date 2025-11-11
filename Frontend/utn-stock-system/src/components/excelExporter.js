import * as XLSX from 'xlsx';

/**
 * Exporta los datos del informe a un archivo Excel con múltiples hojas.
 * @param {object} informeData - El objeto que contiene los datos de los informes.
 * @param {string} fileName - El nombre del archivo a generar.
 */
export const exportToExcel = (informeData, fileName) => {
    if (!informeData) {
        console.error("No se proporcionaron datos para la exportación.");
        return;
    }

    const { dataSemanal, dataVentas, dataVentasUsuarios } = informeData;

    // 1. Crear un nuevo libro de trabajo (workbook)
    const wb = XLSX.utils.book_new();

    // 2. Crear las hojas de trabajo (worksheets) a partir de los datos JSON
    
    // Hoja para el Reporte Semanal
    if (dataSemanal && dataSemanal.length > 0) {
        // Formateamos la fecha para que sea más legible en Excel
        const formattedDataSemanal = dataSemanal.map(item => ({
            ...item,
            fecha: new Date(item.fecha).toLocaleDateString()
        }));
        const wsSemanal = XLSX.utils.json_to_sheet(formattedDataSemanal);
        XLSX.utils.book_append_sheet(wb, wsSemanal, "Reporte Semanal");
    }

    // Hoja para Productos Más Vendidos
    if (dataVentas && dataVentas.length > 0) {
        const wsVentas = XLSX.utils.json_to_sheet(dataVentas);
        XLSX.utils.book_append_sheet(wb, wsVentas, "Productos Más Vendidos");
    }

    // Hoja para Ventas por Usuario
    if (dataVentasUsuarios && dataVentasUsuarios.length > 0) {
        const wsVentasUsuarios = XLSX.utils.json_to_sheet(dataVentasUsuarios);
        XLSX.utils.book_append_sheet(wb, wsVentasUsuarios, "Ventas por Usuario");
    }

    // 3. Escribir el libro y forzar la descarga
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};
