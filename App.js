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
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";
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

  useEffect(() => {
    const unsubscribeProducts = onSnapshot(collection(db, "productos"), (snapshot) => {
      const productList = [];
      snapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productList);
    });

    const unsubscribeProviders = onSnapshot(collection(db, "proveedores"), (snapshot) => {
      const providerList = [];
      snapshot.forEach((doc) => {
        providerList.push({ id: doc.id, ...doc.data() });
      });
      setProviders(providerList);
    });

    const unsubscribeOrders = onSnapshot(collection(db, "pedidos"), (snapshot) => {
      const orderList = [];
      snapshot.forEach((doc) => {
        orderList.push({ id: doc.id, ...doc.data() });
      });
      setOrders(orderList);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeProviders();
      unsubscribeOrders();
    };
  }, []);

  const handleLogin = () => {
    navigation.navigate("Menu");
  };

  const handleSignup = async () => {
    try {
      await addDoc(collection(db, "usuarios"), {
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

  const handleAddProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "productos"), product);
      setProducts((prevProducts) => [...prevProducts, { ...product, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding product: ", error);
      Alert.alert("Error", "No se pudo agregar el producto");
    }
  };

  const handleEditProduct = async (editedProduct) => {
    try {
      const productRef = doc(db, "productos", editedProduct.id);
      await updateDoc(productRef, editedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editedProduct.id ? editedProduct : product
        )
      );
    } catch (error) {
      console.error("Error editing product: ", error);
      Alert.alert("Error", "No se pudo editar el producto");
    }
  };
  

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
      Alert.alert("Error", "No se pudo eliminar el producto");
    }
  };

  const handleAddProvider = async (provider) => {
    try {
      const docRef = await addDoc(collection(db, "proveedores"), provider);
      setProviders((prevProviders) => [...prevProviders, { ...provider, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding provider: ", error);
      Alert.alert("Error", "No se pudo agregar el proveedor");
    }
  };

  const handleEditProvider = async (editedProvider) => {
    try {
      const providerRef = doc(db, "proveedores", editedProvider.id);
      await updateDoc(providerRef, editedProvider);
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === editedProvider.id ? editedProvider : provider
        )
      );
    } catch (error) {
      console.error("Error editing provider: ", error);
      Alert.alert("Error", "No se pudo editar el proveedor");
    }
  };

  const handleDeleteProvider = async (id) => {
    try {
      await deleteDoc(doc(db, "proveedores", id));
      setProviders((prevProviders) => prevProviders.filter((provider) => provider.id !== id));
    } catch (error) {
      console.error("Error deleting provider: ", error);
      Alert.alert("Error", "No se pudo eliminar el proveedor");
    }
  };
  

  const handleAddOrder = async (order) => {
    try {
      const docRef = await addDoc(collection(db, "pedidos"), order);
      setOrders((prevOrders) => [...prevOrders, { ...order, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding order: ", error);
      Alert.alert("Error", "No se pudo agregar el pedido");
    }
  };  

  const handleEditOrder = async (editedOrder) => {
    try {
      const orderRef = doc(db, "pedidos", editedOrder.id);
      await updateDoc(orderRef, editedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === editedOrder.id ? editedOrder : order
        )
      );
    } catch (error) {
      console.error("Error editing order: ", error);
      Alert.alert("Error", "No se pudo editar el pedido");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteDoc(doc(db, "pedidos", id));
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order: ", error);
      Alert.alert("Error", "No se pudo eliminar el pedido");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4CAF50",
          },
          headerTintColor: "peru",
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
        <Stack.Screen
          name="Login"
          options={{ title: "           Bienvenidos a Ministock" }}
        >
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
                  <Text style={styles.buttonText}>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate("ProviderList")}
                >
                  <Text style={styles.buttonText}>Proveedores</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate("OrderList")}
                >
                  <Text style={styles.buttonText}>Pedidos</Text>
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
                  route={route}
                  navigation={navigation}
                  onSave={handleAddProduct}
                  onEdit={handleEditProduct}
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
                  route={route}
                  navigation={navigation}
                  onSave={handleAddProvider}
                  onEdit={handleEditProvider}
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
                  route={route}
                  navigation={navigation}
                  onSave={handleAddOrder}
                  onEdit={handleEditOrder}
                />
              </ImageBackground>
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AddProductForm = ({ route, product, onSave, navigation, onEdit }) => {
  const order = route.params?.order;
  const [name, setName] = useState(product ? product.name : "");
  const [unit, setUnit] = useState(product ? product.unit : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [hasIVA, setHasIVA] = useState(product ? product.hasIVA : false);
  const [cost, setCost] = useState(product ? product.cost : "");

  useEffect(() => {
    calculateCost();
  }, [price, hasIVA]);

  const handleSubmit = () => {
    if (product) {
      onEdit({ ...product, name, price, unit });
    } else {
      onSave({ id: Date.now().toString(), name, price, unit });
    }
    navigation.push("ProductList");
  };

  const calculateCost = () => {
    const baseCost = parseFloat(price) || 0;
    const calculatedCost = hasIVA ? baseCost * 1.12 : baseCost;
    setCost(calculatedCost.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text>Nombre del Producto:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text>Unidad:</Text>
      <TextInput value={unit} onChangeText={setUnit} style={styles.input} />
      <Text>Precio:</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Categoría:</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <Text>Incluye IVA:</Text>
      <Switch value={hasIVA} onValueChange={setHasIVA} />
      <Text>Costo Total: ${cost}</Text>
      <Button title="Guardar" color="goldenrod" onPress={handleSubmit} />
    </View>
  );
};

const AddProviderForm = ({ route, onSave, navigation, onEdit }) => {
  const provider = route.params?.provider;
  const [name, setName] = useState(provider ? provider.name : "");
  const [phone, setPhone] = useState(provider ? provider.phone : "");
  const [idNumber, setIdNumber] = useState(provider ? provider.idNumber : "");
  const [address, setAddress] = useState(provider ? provider.address : "");
  const [email, setEmail] = useState(provider ? provider.email : "");

  const handleSubmit = () => {
    if (provider) {
      onEdit({ ...provider, name, phone, idNumber });
    } else {
      onSave({ id: Date.now().toString(), name, phone, idNumber });
    }
    navigation.push("ProviderList");
  };

  return (
    <View style={styles.container}>
      <Text>Nombre del Proveedor:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text>Teléfono:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Text>Cédula/RUC:</Text>
      <TextInput
        value={idNumber}
        onChangeText={setIdNumber}
        style={styles.input}
      />
      <Text>Dirección:</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <Text>Correo Electrónico:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Button title="Guardar" color="goldenrod" onPress={handleSubmit} />
    </View>
  );
};

const AddOrderForm = ({ route, onSave, navigation, products, onEdit }) => {
  const order = route.params?.order;
  const [productName, setProductName] = useState(
    order ? order.productName : ""
  );
  const [quantity, setQuantity] = useState(order ? order.quantity : "");
  const [shipmentStatus, setShipmentStatus] = useState(
    order ? order.shipmentStatus : ""
  );
  const [shippingLocation, setShippingLocation] = useState(
    order ? order.shippingLocation : ""
  );
  const [deliveryLocation, setDeliveryLocation] = useState(
    order ? order.deliveryLocation : ""
  );
  const [price, setPrice] = useState(order ? order.price : "");
  const [hasIVA, setHasIVA] = useState(order ? order.hasIVA : false);
  const [cost, setCost] = useState(order ? order.cost : "");

  useEffect(() => {
    calculateCost();
  }, [price, hasIVA]);

  const handleSubmit = () => {
    if (order) {
      onEdit({ ...order, productName, quantity, shipmentStatus, shippingLocation, deliveryLocation, price, hasIVA, cost });
    } else {
      onSave({ id: Date.now().toString(), productName, quantity, shipmentStatus, shippingLocation, deliveryLocation, price, hasIVA, cost });
    }
    navigation.push("OrderList");
  };

  const calculateCost = () => {
    const baseCost = parseFloat(price) || 0;
    const calculatedCost = hasIVA ? baseCost * 1.12 : baseCost;
    setCost(calculatedCost.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text>Nombre del Producto:</Text>
      <TextInput
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <Text>Cantidad:</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Lugar de Envío:</Text>
      <TextInput
        value={shippingLocation}
        onChangeText={setShippingLocation}
        style={styles.input}
      />
      <Text>Lugar de Entrega:</Text>
      <TextInput
        value={deliveryLocation}
        onChangeText={setDeliveryLocation}
        style={styles.input}
      />
      <Text>Precio:</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Incluye IVA:</Text>
      <Switch value={hasIVA} onValueChange={setHasIVA} />
      <Text>Costo Total: ${cost}</Text>
      <Button title="Guardar" color="goldenrod" onPress={handleSubmit} />
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
    backgroundColor:"peru",
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
    backgroundColor: "tan",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: "peru",
    marginLeft: 10,
    borderRadius: 5,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "coral",
    marginLeft: 10,
    borderRadius: 5,
  },
});

export default App;
