# Comandos utiles

## Inicializar todo

configurar JAVA_HOME y PATH para 

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$HOME/Android/android-studio/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
export JAVA_HOME=$HOME/.jdks/corretto-17.0.9

```bash
npm install
```

Ejecutar la app
```bash
npx react-native start --reset-cache
```

## Limpiar y descargar librerias

```bash
npx react-native-clean-project     
```

Se puede limpiar la app de android con 
```bash
./gradlew clean
```
en el directorio android, luego se ejecuta normalmente

Para checkear si esta todo instalado
```bash
npx react-native doctor  
```

Para debaguear ver el tutorial este: [debug](https://blog.logrocket.com/debugging-react-native-vs-code/)


