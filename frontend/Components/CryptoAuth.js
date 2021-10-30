import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import Loader from './Components/Loader';

const LoginScreen = ({ navigation }) => {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleCryptoLogin = () => {
    authenticate({ connector })
      .then(() => {
        if (authError) {
          setErrortext(authError.message);
        } else {
          if (isAuthenticated) {
            navigation.replace("DrawerNavigationRoutes");
          }
        }
      })
      .catch(() => {});
  };

  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../moralis-logo.png")}
                style={{
                  width: "50%",
                  height: 100,
                  resizeMode: "contain",
                  margin: 30,
                }}
              />
            </View>

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
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleCryptoLogin}>
              <Text style={styles.buttonTextStyle}>Crypto Wallet Login</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("RegisterScreen")}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#307ecc",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
