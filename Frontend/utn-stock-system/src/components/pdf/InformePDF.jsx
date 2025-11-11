import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    textDecoration: 'underline',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  tableCol: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 9,
  },
  // Anchos específicos para tablas con menos columnas
  tableCol3: { width: "33.33%" },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function InformePDF({ semanal, ventas, ventaUsuario }) {
  const totalGanancias = ventas?.reduce((acc, item) => acc + item.ingresos_totales, 0) || 0;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Informe General de Ventas</Text>

        {/* Informe Semanal */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Informe Semanal de Ventas</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Fecha</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Producto</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Categoría</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Cantidad</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Usuario</Text></View>
              <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Ingresos</Text></View>
            </View>
            {semanal?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{new Date(item.fecha).toLocaleDateString()}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.producto_nombre}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.categoria_nombre}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.cantidad_vendida}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.usuario_nombre}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>${item.ingresos_generados.toFixed(2)}</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* Informe de Productos más vendidos */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Productos Más Vendidos</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{...styles.tableColHeader, ...styles.tableCol3}}><Text style={styles.tableCellHeader}>Producto</Text></View>
              <View style={{...styles.tableColHeader, ...styles.tableCol3}}><Text style={styles.tableCellHeader}>Total Vendido</Text></View>
              <View style={{...styles.tableColHeader, ...styles.tableCol3}}><Text style={styles.tableCellHeader}>Ingresos Totales</Text></View>
            </View>
            {ventas?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={{...styles.tableCol, ...styles.tableCol3}}><Text style={styles.tableCell}>{item.producto_nombre}</Text></View>
                <View style={{...styles.tableCol, ...styles.tableCol3}}><Text style={styles.tableCell}>{item.total_vendido}</Text></View>
                <View style={{...styles.tableCol, ...styles.tableCol3}}><Text style={styles.tableCell}>${item.ingresos_totales.toFixed(2)}</Text></View>
              </View>
            ))}
          </View>
        </View>

        {/* Informe de Ventas por Usuario */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Informe de Ventas por Usuario</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{...styles.tableColHeader, ...styles.tableCol3}}><Text style={styles.tableCellHeader}>Usuario</Text></View>
              <View style={{...styles.tableColHeader, ...styles.tableCol3}}><Text style={styles.tableCellHeader}>N° de Ventas</Text></View>
              <View style={{...styles.tableColHeader, ...styles.tableCol3}}><Text style={styles.tableCellHeader}>Ingresos Totales</Text></View>
            </View>
            {ventaUsuario?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={{...styles.tableCol, ...styles.tableCol3}}><Text style={styles.tableCell}>{item.usuario_nombre}</Text></View>
                <View style={{...styles.tableCol, ...styles.tableCol3}}><Text style={styles.tableCell}>{item.numero_de_ventas}</Text></View>
                <View style={{...styles.tableCol, ...styles.tableCol3}}><Text style={styles.tableCell}>${item.ingresos_totales.toFixed(2)}</Text></View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>Ganancias Totales: ${totalGanancias.toFixed(2)}</Text>
        </View>

      </Page>
    </Document>
  );
}

export default InformePDF;