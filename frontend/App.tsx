import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import { Button, Header, Icon } from "react-native-elements";

import Moralis from "moralis/types";

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", flex: 1 },
  topCenter: { alignItems: "center" },

  white: { backgroundColor: "white" },
  margin: { marginBottom: 20 },
  marginLarge: { marginBottom: 35 },
  weightHeavey: { fontWeight: "700", fontSize: 20 },
});

function Web3ApiExample(): JSX.Element {
  const { Moralis, user } = useMoralis();
  const chainNAme = "eth";
  const {
    account: { getNativeBalance },
  } = useMoralisWeb3Api();

  //defaults to eth chain and user logged in address, if you want custom, you can pass in the options argument
  const { data, isFetching, error } = useMoralisWeb3ApiCall(getNativeBalance);

  if (isFetching) {
    return (
      <View style={styles.marginLarge}>
        <Text>Fetching token-balances...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.marginLarge}>
        <Text>Error:</Text>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.marginLarge}>
      <Text style={styles.weightHeavey}>Native balance</Text>

      <Text style={styles.weightHeavey}>
        {/* @ts-ignore */}
        {data ? data.balance / ("1e" + "18") : "none"}
      </Text>
    </View>
  );
}

function UserExample(): JSX.Element {
  const { user } = useMoralis();

  return (
    <View style={styles.marginLarge}>
      <Text style={styles.weightHeavey}>UserName: {user.getUsername()}</Text>
      <Text style={styles.weightHeavey}>
        User Email: {user.getEmail() ?? "-"}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.weightHeavey}>
        User Address: {user.get("ethAddress")}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <View style={[StyleSheet.absoluteFill, styles.white]}>
      <View>
        <Header
          backgroundImageStyle={{}}
          barStyle="default"
          centerComponent={{
            text: "My Awesome DAPP",
            style: { color: "#fff" },
          }}
          centerContainerStyle={{}}
          containerStyle={{}}
          leftComponent={{ icon: "menu", color: "#fff" }}
          leftContainerStyle={{}}
          placement="center"
          rightComponent={{ icon: "home", color: "#fff" }}
          rightContainerStyle={{}}
          statusBarProps={{}}
        />
      </View>
      <View style={[styles.white, styles.center]}>
        <View style={styles.marginLarge}>
          {authError && (
            <>
              <Text>Authentication error:</Text>
              <Text style={styles.margin}>{authError.message}</Text>
            </>
          )}
          {isAuthenticating && (
            <Text style={styles.margin}>Authenticating...</Text>
          )}
          {!isAuthenticated && (
            <Button
              buttonStyle={{ width: 200, backgroundColor: "green" }}
              containerStyle={{ margin: 5 }}
              disabledStyle={{
                borderWidth: 2,
                borderColor: "#00F",
              }}
              onPress={() => authenticate({ connector })}
              loadingProps={{ animating: true }}
              title="Authenticate With Crypto Wallet"></Button>
          )}
          {isAuthenticated && (
            <>
              <Button
                buttonStyle={{ width: 200, backgroundColor: "red" }}
                containerStyle={{ margin: 5 }}
                disabledStyle={{
                  borderWidth: 2,
                  borderColor: "#00F",
                }}
                onPress={() => logout()}
                title="Logout"></Button>
            </>
          )}
        </View>
        {isAuthenticated && (
          <View>
            <UserExample />
            <Web3ApiExample />
          </View>
        )}
      </View>
    </View>
  );
}

export default App;
