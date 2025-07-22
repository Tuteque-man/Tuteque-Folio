# 🔥 Configuración de Firebase para Tuteque-Man Portfolio

## 📋 Pasos para configurar Firebase

### 1. Crear proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear proyecto"
3. Nombra tu proyecto: `tuteque-man-portfolio`
4. Sigue los pasos del asistente

### 2. Habilitar Firestore Database
1. En el panel de Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba"
4. Elige la ubicación más cercana

### 3. Obtener credenciales
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Selecciona "Configuración del proyecto"
3. En la pestaña "General", baja hasta "Tus apps"
4. Haz clic en el ícono de web (</>)
5. Registra tu app con el nombre "Tuteque-Man Portfolio"
6. Copia la configuración

### 4. Actualizar configuración
Reemplaza el contenido en `src/firebase/config.js` con tus credenciales reales:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-sender-id",
  appId: "tu-app-id"
};
```

### 5. Configurar reglas de Firestore
En Firebase Console > Firestore Database > Reglas, usa estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notifications/{document} {
      allow read, write: if true;
    }
    match /messages/{document} {
      allow read, write: if true;
    }
  }
}
```

## 🎉 Funcionalidades implementadas

### ✅ Sistema de Notificaciones
- **Notificaciones de victoria** para repos nuevos
- **Milestones** cuando alcances 10, 25, 50, 100 repos
- **Repos populares** cuando tengan 10+, 25+, 50+, 100+ estrellas
- **Panel de notificaciones** en tiempo real
- **Toast notifications** que aparecen automáticamente

### 🔔 Centro de Notificaciones
- Botón flotante en la esquina superior derecha
- Contador de notificaciones no leídas
- Panel desplegable con historial
- Notificaciones en tiempo real

### 📊 Base de Datos
- Colección `notifications` para las notificaciones
- Timestamps automáticos
- Estado de lectura/no leída
- Ordenamiento por fecha

## 🚀 Próximos pasos

1. **Configurar Firebase** con las credenciales reales
2. **Probar las notificaciones** agregando repos nuevos
3. **Personalizar mensajes** y thresholds
4. **Agregar formulario de contacto** funcional
5. **Panel de administración** para gestionar notificaciones

## 🛠️ Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📝 Notas importantes

- Las notificaciones se guardan en localStorage para evitar duplicados
- El sistema detecta repos nuevos comparando con la carga anterior
- Los milestones se guardan permanentemente para no repetirse
- Las notificaciones populares se guardan por repo y threshold

¡Tu portfolio ahora tiene un sistema épico de notificaciones de victoria! 🏆 