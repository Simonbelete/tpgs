import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { Column, Row } from "./Formulation";
import _ from "lodash";

// Create styles
const styles = StyleSheet.create({
  page: {
    marginTop: 10,
    marginBottom: 100,
    padding: 10,
  },
  table: {
    width: "auto",
  },
  thead: {
    backgroundColor: "#ADCEFF",
  },
  tbody: {},
  tr: {
    flexDirection: "row",
    borderWidth: 1,
  },
  th: {
    width: "10%",
    borderRightWidth: 1,
    padding: 3,
  },
  td: {
    width: "10%",
    borderRightWidth: 1,
    padding: 3,
  },
  cell: {
    margin: "auto",
    marginLeft: 5,
    marginRight: 5,
  },
});

const TR = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.tr}>{children}</View>;
};

const TH = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) => {
  return (
    <View style={{ ...styles.th, width: width, minWidth: width }}>
      <Text style={styles.cell}>{children}</Text>
    </View>
  );
};

const TD = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) => {
  return (
    <View style={{ ...styles.td, width: width, minWidth: width }}>
      <Text style={styles.cell}>{children}</Text>
    </View>
  );
};

export const RenderPdfDocument = ({
  columns,
  rows,
  ration,
  requirement,
}: {
  columns: Column[];
  rows: Row[];
  ration: Row;
  requirement: Row;
}) => {
  return (
    <Document>
      <Page
        // @ts-ignore
        size={{ width: columns.length * 100 }}
        orientation="landscape"
        wrap={false}
        style={styles.page}
      >
        <View style={styles.table}>
          <View style={styles.thead}>
            <TR>
              {columns &&
                columns.map((el, key) => (
                  <TH key={key} width={_.get(el, "width", 100)}>
                    {el.title}
                  </TH>
                ))}
            </TR>
          </View>

          <View style={styles.tbody}>
            {rows &&
              rows.map((el, key) => (
                <TR key={key}>
                  {columns.map((cl, key2) => (
                    <TD key={key2} width={_.get(cl, "width", 100)}>
                      {_.get(el, cl.path, "-")}
                    </TD>
                  ))}
                </TR>
              ))}
          </View>

          <View>
            <TR>
              {columns.map((cl, key2) => (
                <TD key={key2} width={_.get(cl, "width", 100)}>
                  {_.get(ration, cl.path, "-")}
                </TD>
              ))}
            </TR>
          </View>

          <View>
            <TR>
              {columns.map((cl, key2) => (
                <TD key={key2} width={_.get(cl, "width", 100)}>
                  {_.get(requirement, cl.path, "-")}
                </TD>
              ))}
            </TR>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RenderPdfDocument;
