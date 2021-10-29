import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import BottomNavigation from "./Components/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SplashScreen from "./Components/SplashScreen";
import CryptoAuth from "./Components/CryptoAuth";

import Moralis from "moralis/types";

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", flex: 1 },
  topCenter: { alignItems: "center" },

  blue: { backgroundColor: "blue" },
  red: { backgroundColor: "red" },

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

function Test(): JSX.Element {
  return (
    <View style={[StyleSheet.absoluteFill, styles.blue]}>
      <Text>GJDSFJGDFJGDF</Text>
    </View>
  );
}

function Test2(): JSX.Element {
  return (
    <View style={[StyleSheet.absoluteFill, styles.red]}>
      <Text>GJDSFJfdsfdsfsdfGDFJGDF</Text>
    </View>
  );
}

function Home(): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Test} />
      <Tab.Screen name="Settings" component={Test2} />

      {/* <View style={[StyleSheet.absoluteFill, styles.white]}>
      <BottomNavigation />

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
    </View> */}
    </Tab.Navigator>
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

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
