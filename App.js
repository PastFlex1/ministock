import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ImageBackground,
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import appFirebase from "./firebaseConfig";

const Stack = createStackNavigator();
const db = getFirestore(appFirebase);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleLogin = () => {
    navigation.navigate("Menu");
  };

  const handleSignup = async () => {
    try {
      await addDoc(collection(db, "users"), {
        email: email,
        name: name,
        password: password,
      });
      Alert.alert("Alerta", "Cuenta creada con éxito");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "No se pudo crear la cuenta");
    }
  };

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const handleEditProduct = (editedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleAddProvider = (provider) => {
    setProviders((prevProviders) => [...prevProviders, provider]);
  };

  const handleEditProvider = (editedProvider) => {
    setProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider.id === editedProvider.id ? editedProvider : provider
      )
    );
  };

  const handleDeleteProvider = (id) => {
    setProviders((prevProviders) =>
      prevProviders.filter((provider) => provider.id !== id)
    );
  };

  const handleAddOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const handleEditOrder = (editedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editedOrder.id ? editedOrder : order
      )
    );
  };

  const handleDeleteOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4CAF50",
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackground: () => (
            <Image
              style={{ flex: 1 }}
              source={require("./assets/background.jpeg")} 
            />
          ),
        }}
      >
        <Stack.Screen name="          Bienvenidos a ministock    ">
          {({ navigation }) => (
            <ImageBackground
              source={require("./assets/background.jpeg")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <Text style={styles.title}>Inicio de Sesión</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Correo Electrónico"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Menu")}
                  >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {({ navigation }) => (
            <ImageBackground
              source={require("./assets/background.jpeg")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <Text style={styles.title}>Crear Cuenta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Correo Electrónico"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignup}
                  >
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>
        <Stack.Screen name="Menu">
          {({ navigation }) => (
            <ImageBackground
              source={require("./assets/background.jpeg")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate("ProductList")}
                >
                  <Text>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate("ProviderList")}
                >
                  <Text>Proveedores</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate("OrderList")}
                >
                  <Text>Pedidos</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen name="ProductList">
          {({ navigation }) => (
            <ImageBackground
              source={require("./assets/background.jpeg")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <FlatList
                  data={products}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.listItem}>
                      <Text>
                        {item.unit} - {item.name} - ${item.price}
                      </Text>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() =>
                          navigation.navigate("AddProductForm", {
                            product: item,
                          })
                        }
                      >
                        <Text>E</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteProduct(item.id)}
                      >
                        <Text>X</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddProductForm")}
                >
                  <Text style={styles.addButtonLabel}>+</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen name="ProviderList">
          {({ navigation }) => (
            <ImageBackground
              source={require("./assets/background.jpeg")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <FlatList
                  data={providers}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.listItem}>
                      <Text>
                        {item.name} - {item.phone} - {item.idNumber}
                      </Text>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() =>
                          navigation.navigate("AddProviderForm", {
                            provider: item,
                          })
                        }
                      >
                        <Text>E</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteProvider(item.id)}
                      >
                        <Text>X</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddProviderForm")}
                >
                  <Text style={styles.addButtonLabel}>+</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen name="OrderList">
          {({ navigation }) => (
            <ImageBackground
              source={require("./assets/background.jpeg")}
              style={styles.background}
              resizeMode="cover"
            >
              <View style={styles.container}>
                <FlatList
                  data={orders}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.listItem}>
                      <Text>
                        {item.productName} - ${item.total}
                      </Text>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() =>
                          navigation.navigate("AddOrderForm", { order: item })
                        }
                      >
                        <Text>E</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteOrder(item.id)}
                      >
                        <Text>X</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddOrderForm")}
                >
                  <Text style={styles.addButtonLabel}>+</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>

        <Stack.Screen name="AddProductForm">
          {({ route, navigation }) => {
            const { product } = route.params || {};
            return (
              <ImageBackground
                source={require("./assets/background.jpeg")}
                style={styles.background}
                resizeMode="cover"
              >
                <AddProductForm
                  product={product}
                  onSave={(product) => {
                    if (product.id) {
                      handleEditProduct(product);
                    } else {
                      handleAddProduct(product);
                    }
                    navigation.goBack();
                  }}
                />
              </ImageBackground>
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="AddProviderForm">
          {({ route, navigation }) => {
            const { provider } = route.params || {};
            return (
              <ImageBackground
                source={require("./assets/background.jpeg")}
                style={styles.background}
                resizeMode="cover"
              >
                <AddProviderForm
                  provider={provider}
                  onSave={(provider) => {
                    if (provider.id) {
                      handleEditProvider(provider);
                    } else {
                      handleAddProvider(provider);
                    }
                    navigation.goBack();
                  }}
                />
              </ImageBackground>
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="AddOrderForm">
          {({ route, navigation }) => {
            const { order } = route.params || {};
            return (
              <ImageBackground
                source={require("./assets/background.jpeg")}
                style={styles.background}
                resizeMode="cover"
              >
                <AddOrderForm
                  order={order}
                  onSave={(order) => {
                    if (order.id) {
                      handleEditOrder(order);
                    } else {
                      handleAddOrder(order);
                    }
                    navigation.goBack();
                  }}
                />
              </ImageBackground>
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AddProductForm = ({ product, onSave }) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [unit, setUnit] = useState(product ? product.unit : "");

  const handleSubmit = () => {
    const productData = {
      id: product ? product.id : Date.now().toString(),
      name,
      price,
      unit,
    };
    onSave(productData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar/Editar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Unidad"
        value={unit}
        onChangeText={setUnit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddProviderForm = ({ provider, onSave }) => {
  const [name, setName] = useState(provider ? provider.name : "");
  const [phone, setPhone] = useState(provider ? provider.phone : "");
  const [idNumber, setIdNumber] = useState(provider ? provider.idNumber : "");

  const handleSubmit = () => {
    const providerData = {
      id: provider ? provider.id : Date.now().toString(),
      name,
      phone,
      idNumber,
    };
    onSave(providerData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar/Editar Proveedor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Proveedor"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Identificación"
        value={idNumber}
        onChangeText={setIdNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddOrderForm = ({ order, onSave }) => {
  const [productName, setProductName] = useState(
    order ? order.productName : ""
  );
  const [total, setTotal] = useState(order ? order.total : "");

  const handleSubmit = () => {
    const orderData = {
      id: order ? order.id : Date.now().toString(),
      productName,
      total,
    };
    onSave(orderData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar/Editar Pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Total"
        value={total}
        onChangeText={setTotal}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "peru",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "tan",
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "tan",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 30,
  },
  menuButton: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  editButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    marginLeft: 10,
    borderRadius: 5,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#FF0000",
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default App;
