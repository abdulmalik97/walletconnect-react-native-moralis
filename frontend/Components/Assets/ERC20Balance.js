import React from "react";
import { useMoralis } from "react-moralis";
// import { Flex } from "../../uikit/Flex/Flex";
import { getEllipsisTxt } from "../../utils/formatters";
import useERC20Balance from "./hooks/useERC20Balance";
import { List,Card } from 'react-native-paper';

function ERC20Balance(props) {
  const { assets } = useERC20Balance(props);
  const { Moralis } = useMoralis();
  console.log(assets, "assets");
  return (
<Card>
<Card.Title title="Card Title"/>


<View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>

  </Card>
    // <Flex maxWidth="1200px" margin="0 15px">
    //   <h1 style={styles.title}>💰Token Balances</h1>
    //   <div style={styles.card}>
    //     <table style={styles.table}>
    //       <thead>
    //         <tr>
    //           <th style={{ width: "45px" }} />
    //           <th>Name</th>
    //           <th>Symbol</th>
    //           <th>Balance</th>
    //           <th>Token Address</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {!assets
    //           ? null
    //           : assets.map((item, key) => (
    //               <tr key={key}>
    //                 <td>
    //                   {item.logo ? (
    //                     <img
    //                       src={item.logo}
    //                       alt={item.symbol}
    //                       style={{
    //                         maxWidth: "30px",
    //                         maxHeight: "30px",
    //                         borderRadius: "15px",
    //                       }}
    //                     />
    //                   ) : (
    //                     <img
    //                       src="https://etherscan.io/images/main/empty-token.png"
    //                       alt=""
    //                       style={{
    //                         maxWidth: "30px",
    //                         maxHeight: "30px",
    //                         borderRadius: "15px",
    //                       }}
    //                     />
    //                   )}
    //                 </td>
    //                 <td>{item.name}</td>
    //                 <td>{item.symbol}</td>
    //                 <td>{Moralis.Units.FromWei(item.balance, item.decimals)}</td>
    //                 <td>{getEllipsisTxt(item.token_address, 7)}</td>
    //               </tr>
    //             ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </Flex>
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
    item: {
      backgroundColor: "green",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    }
    title: {
      fontSize: 10,
      color: "black",
    },
  });
  

export default ERC20Balance;
