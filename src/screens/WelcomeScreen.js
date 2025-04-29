import { View, Text, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-4xl font-bold text-purple-700 mb-12">NextChapter</Text>

      <TouchableOpacity
        className="w-full bg-blue-600 py-3 rounded-xl mb-4"
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text className="text-white text-center text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full border border-blue-600 py-3 rounded-xl"
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-blue-600 text-center text-lg font-semibold">Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
