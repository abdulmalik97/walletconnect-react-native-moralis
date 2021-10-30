import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  StatusBar,
} from "react-native";
import { getEllipsisTxt } from "../../utils/formatters";
import useERC20Transfers from "./hooks/useERC20Transfers";
import { List } from "react-native-paper";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function RecentTransactions() {
  const { ERC20Transfers } = useERC20Transfers();
  const { Moralis } = useMoralis();
  //   console.log(ERC20Transfers[0]);

  const renderItem = ({ item }) => {
    return <Item title={item.address} />;
  };

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      {/* <List.AccordionGroup>
        <List.Accordion title="ERC20 Transfers" id="1"> */}
      {/* {!ERC20Transfers
            ? ""
            : ERC20Transfers.map((item, key) => (
                <List.item title="hi" key={key}>
                    
                  <td>{getEllipsisTxt(item.from_address, 5)}</td>
                    <td>{getEllipsisTxt(item.to_address, 5)}</td>
                    <td>{parseFloat(Moralis.Units.FromWei(item.value).toFixed(6))}</td>
                    <td>{item.block_number}</td>
                </List.item>
              ))} */}
      {/* 
          <List.Item title="Item 1" />
          <List.Item title="Item 12" />
        </List.Accordion> */}

      <FlatList
        data={ERC20Transfers}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* <List.Accordion title="Accordion 2" id="2">
      <List.Item title="Item 2" />
    </List.Accordion>
    <View>
      <Text>
        List.Accordion can be wrapped because implementation uses React.Context.
      </Text>
      <List.Accordion title="Accordion 3" id="3">
        <List.Item title="Item 3" />
      </List.Accordion>
    </View> */}
      {/* </List.AccordionGroup> */}

      {/* <h1 style={styles.title}>ERC20 Transfers</h1>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Block Number</th>
            </tr>
          </thead>
          <tbody>
            {!ERC20Transfers
              ? null
              : ERC20Transfers.map((item, key) => (
                  <tr key={key}>
                    <td>{getEllipsisTxt(item.address, 5)}</td>
                    <td>{getEllipsisTxt(item.from_address, 5)}</td>
                    <td>{getEllipsisTxt(item.to_address, 5)}</td>
                    <td>{parseFloat(Moralis.Units.FromWei(item.value).toFixed(6))}</td>
                    <td>{item.block_number}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",

    marginTop: StatusBar.currentHeight || 0,

    // color: "red",
  },
  blue: {
    backgroundColor: "blue",
  },
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  title: {
    fontSize: 10,
    color: "black",
  },
});

export default RecentTransactions;
