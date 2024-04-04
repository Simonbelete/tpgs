import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import { Chicken } from "@/models";

export const generateBarcodeUrl = (value: string) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, value, { height: 50 });
  return canvas.toDataURL();
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    height: 100,
  },
});

export const QRDocument = ({ data }: { data: Chicken[] }) => {
  console.log(data);
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {data.slice(0, data.length / 2).map((e, i) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                key={i}
                style={styles.image}
                src={generateBarcodeUrl(e.tag)}
              />
            ))}
          </View>
          <View style={styles.section}>
            {data.slice(data.length / 2, data.length).map((e, i) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                key={i}
                style={styles.image}
                src={generateBarcodeUrl(e.tag)}
              />
            ))}
          </View>
        </Page>
      </Document>
    </>
  );
};
