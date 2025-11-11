import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    textDecoration: "underline",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 8,
    marginTop: 12,
    fontWeight: "bold",
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  }
});

const InformePDF = ({ data }) => {
  const { dataSemanal, dataVentas, dataVentasUsuarios } = data;
    
  console.log("Datos informe: ",data);
  
  if (!data) {
    return null;
  }

  const totalGanado = dataSemanal?.reduce((sum, item) => sum + item.ingresos_generados, 0) || 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Informe General de Stock System</Text>

          {/* Informe Semanal */}
          <Text style={styles.subtitle}>Reporte Semanal (Últimos 7 días)</Text>
          <Table data={dataSemanal || []}>
            <TH style={styles.tableHeader}>
              <TD weighting={0.2}>Fecha</TD>
              <TD weighting={0.3}>Producto</TD>
              <TD weighting={0.15}>Cantidad</TD>
              <TD weighting={0.2}>Vendedor</TD>
              <TD weighting={0.15}>Ingresos</TD>
            </TH>
            <TR
              render={({ item }) => (
                <>
                  <TD weighting={0.2}>{new Date(item.fecha).toLocaleDateString()}</TD>
                  <TD weighting={0.3}>{item.producto_nombre}</TD>
                  <TD weighting={0.15}>{item.cantidad_vendida}</TD>
                  <TD weighting={0.2}>{item.usuario_nombre}</TD>
                  <TD weighting={0.15}>{`$${item.ingresos_generados.toFixed(2)}`}</TD>
                </>
              )}
            />
          </Table>

          {/* Informe de Productos más vendidos */}
          <Text style={styles.subtitle}>Reporte de Productos Más Vendidos</Text>
          <Table data={dataVentas || []}>
            <TH style={styles.tableHeader}>
              <TD weighting={0.5}>Producto</TD>
              <TD weighting={0.25}>Total Vendido</TD>
              <TD weighting={0.25}>Ingresos Totales</TD>
            </TH>
            <TR
              render={({ item }) => (
                <>
                  <TD weighting={0.5}>{item.producto_nombre}</TD>
                  <TD weighting={0.25}>{item.total_vendido}</TD>
                  <TD weighting={0.25}>{`$${item.ingresos_totales.toFixed(2)}`}</TD>
                </>
              )}
            />
          </Table>

          {/* Informe de Ventas por Usuario */}
          <Text style={styles.subtitle}>Reporte de Ventas por Usuario</Text>
          <Table data={dataVentasUsuarios || []}>
            <TH style={styles.tableHeader}>
              <TD weighting={0.5}>Usuario</TD>
              <TD weighting={0.25}>N° de Ventas</TD>
              <TD weighting={0.25}>Ingresos Totales</TD>
            </TH>
            <TR
              render={({ item }) => (
                <>
                  <TD weighting={0.5}>{item.usuario_nombre}</TD>
                  <TD weighting={0.25}>{item.numero_de_ventas}</TD>
                  <TD weighting={0.25}>{`$${item.ingresos_totales.toFixed(2)}`}</TD>
                </>
              )}
            />
          </Table>
        </View>
        <Text style={styles.footer}>Total ganado estos 7 días: ${totalGanado.toFixed(2)}</Text>
      </Page>
    </Document>
  );
};

export default InformePDF;