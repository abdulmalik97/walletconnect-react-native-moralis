import React from "react";
import { useMoralis } from "react-moralis";
import useERC20Balance from "./hooks/useERC20balance";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  Text,
  Image,
} from "react-native";
import { Divider } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  logo: {
    height: 50,
    width: 50,
  },
  balance: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
  },
});

const Item = ({ name, logo, balance, symbol }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemView}>
      <View style={{ flex: 1 }}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <Image
            source={{ uri: "https://etherscan.io/images/main/empty-token.png" }}
            style={styles.logo}
          />
        )}
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View
        style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}>
        <Text style={styles.balance}>
          {balance} {symbol}
        </Text>
      </View>
    </View>
    <Divider />
  </View>
);

export default function Assets() {
  const { assets } = useERC20Balance();
  const { Moralis } = useMoralis();

  const renderItem = ({ item }) => {
    return (
      <Item
        name={item.name}
        logo={item.logo}
        balance={parseFloat(
          Moralis.Units.FromWei(item.balance, item.decimals).toFixed(6)
        )}
        symbol={item.symbol}
      />
    );
  };

  //   console.log(assets[0], "hiii");
  //   if (!assets) return <>No Data</>;

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>

    // <div style={styles.content}>
    //   {assets.map((item, key) => (
    //     <div className="row" key={key} style={styles.row}>
    //       <div>
    //         {item.logo ? (
    //           <img
    //             src={item.logo}
    //             alt={item.symbol}
    //             style={{
    //               maxWidth: "35px",
    //               maxHeight: "35px",
    //               borderRadius: "15px",
    //             }}
    //           />
    //         ) : (
    //           <img
    //             src="https://etherscan.io/images/main/empty-token.png"
    //             alt=""
    //             style={{
    //               maxWidth: "35px",
    //               maxHeight: "35px",
    //               borderRadius: "15px",
    //             }}
    //           />
    //         )}
    //       </div>
    //       <div style={styles.right}>
    //         <h4 style={styles.text}>{item.symbol}</h4>
    //         <h4 style={styles.text}>{parseFloat(Moralis.Units.FromWei(item.balance, item.decimals).toFixed(6))}</h4>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
