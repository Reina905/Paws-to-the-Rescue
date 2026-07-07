# Requirements Document

## Introduction

Este documento define los requisitos para los formularios del frontend de la plataforma "Paws to the Rescue". Se necesitan tres conjuntos de formularios: (1) un formulario para que los refugios creen oportunidades de voluntariado, (2) un formulario para que los voluntarios se registren/apliquen a una oportunidad, y (3) la actualización del formulario de registro (Sign Up) para soportar campos diferenciados según el rol seleccionado (voluntario o refugio).

## Glossary

- **Frontend_App**: La aplicación React del frontend que presenta la interfaz de usuario
- **Formulario_Crear_Oportunidad**: Formulario utilizado por refugios para crear nuevas oportunidades de voluntariado
- **Formulario_Aplicar_Oportunidad**: Formulario/acción utilizada por voluntarios para registrarse en una oportunidad existente
- **Formulario_Registro**: Formulario de la página Sign Up para crear cuentas nuevas
- **Selector_Rol**: Componente que permite al usuario elegir entre registrarse como voluntario o como refugio
- **Voluntario**: Usuario con rol "volunteer" que se registra para participar en oportunidades
- **Refugio**: Usuario con rol "shelter" que crea y gestiona oportunidades de voluntariado
- **Oportunidad**: Una actividad de voluntariado creada por un refugio con fecha, ubicación, duración y espacios disponibles
- **Backend_API**: El servicio NestJS que expone los endpoints REST en http://localhost:3000
- **Supabase_Auth**: El servicio de autenticación de Supabase utilizado para registro e inicio de sesión

## Requirements

### Requirement 1: Selección de Rol en el Registro

**User Story:** Como usuario nuevo, quiero elegir si me registro como voluntario o como refugio, para que el formulario muestre los campos apropiados según mi rol.

#### Acceptance Criteria

1. WHEN el usuario navega a la página de registro, THE Formulario_Registro SHALL mostrar un Selector_Rol con exactamente dos opciones: "Voluntario" y "Refugio", sin ninguna opción preseleccionada por defecto.
2. WHEN el usuario selecciona el rol "Voluntario" en el Selector_Rol, THE Formulario_Registro SHALL mostrar los campos: nombre (obligatorio, máximo 100 caracteres), apellido (obligatorio, máximo 100 caracteres), email (obligatorio), contraseña (obligatoria, mínimo 6 caracteres), descripción (opcional, máximo 500 caracteres), habilidades (opcional, array de strings) y número de contacto (opcional, máximo 20 caracteres).
3. WHEN el usuario selecciona el rol "Refugio" en el Selector_Rol, THE Formulario_Registro SHALL mostrar los campos: nombre del refugio (obligatorio, máximo 150 caracteres), email (obligatorio), contraseña (obligatoria, mínimo 6 caracteres), ubicación (obligatoria, máximo 200 caracteres), descripción (opcional, máximo 500 caracteres), número de contacto (opcional, máximo 20 caracteres), capacidad de animales (opcional, entero entre 0 y 10000) y logo (opcional, URL válida).
4. WHEN el usuario cambia la selección del Selector_Rol, THE Formulario_Registro SHALL limpiar todos los valores ingresados en los campos específicos del rol anterior y mostrar los campos del nuevo rol seleccionado con valores vacíos.
5. WHEN el usuario envía el formulario con rol "Voluntario" y todos los campos obligatorios completos, THE Frontend_App SHALL enviar la solicitud de registro a Supabase_Auth con el metadato role="volunteer" y, tras recibir confirmación exitosa de Supabase_Auth, crear el perfil de voluntario mediante POST /volunteers con los campos nombre, apellido, descripción, habilidades y número de contacto.
6. WHEN el usuario envía el formulario con rol "Refugio" y todos los campos obligatorios completos, THE Frontend_App SHALL enviar la solicitud de registro a Supabase_Auth con el metadato role="shelter" y, tras recibir confirmación exitosa de Supabase_Auth, crear el perfil del refugio mediante POST /shelters con los campos nombre del refugio, ubicación, descripción, número de contacto, capacidad de animales y logo.
7. IF el registro en Supabase_Auth falla (email ya registrado o contraseña débil), THEN THE Formulario_Registro SHALL mostrar un mensaje de error indicando la causa del fallo y preservar los datos ingresados por el usuario sin limpiar el formulario.
8. IF la creación del perfil mediante POST /volunteers o POST /shelters falla después de un registro exitoso en Supabase_Auth, THEN THE Frontend_App SHALL mostrar un mensaje de error indicando que el perfil no pudo crearse y permitir al usuario reintentar la creación del perfil.

### Requirement 2: Validación del Formulario de Registro

**User Story:** Como usuario nuevo, quiero recibir retroalimentación clara sobre errores de validación, para que pueda corregir los datos antes de enviar el formulario.

#### Acceptance Criteria

1. WHEN el usuario presiona el botón de envío del Formulario_Registro sin completar uno o más campos obligatorios (voluntario: nombre, apellido, email, contraseña; refugio: nombre, email, contraseña, ubicación), THE Formulario_Registro SHALL mostrar un mensaje de error visible inmediatamente debajo de cada campo obligatorio vacío indicando que el campo es requerido, y SHALL preservar los valores ya ingresados en los demás campos.
2. WHEN el usuario ingresa un email que no cumple el patrón estándar de dirección de correo (texto@dominio.extensión), THE Formulario_Registro SHALL mostrar un mensaje de error inmediatamente debajo del campo de email indicando que el formato de email es inválido.
3. WHEN el usuario ingresa una contraseña con menos de 6 caracteres, THE Formulario_Registro SHALL mostrar un mensaje de error inmediatamente debajo del campo de contraseña indicando que la contraseña debe tener al menos 6 caracteres.
4. WHEN el usuario ingresa un valor no numérico, un valor menor a 1 o un valor mayor a 10000 en el campo de capacidad de animales (rol Refugio), THE Formulario_Registro SHALL mostrar un mensaje de error inmediatamente debajo del campo indicando que el valor debe ser un número entero positivo entre 1 y 10000.
5. IF Supabase_Auth devuelve un error durante el registro, THEN THE Formulario_Registro SHALL mostrar el mensaje de error retornado por Supabase_Auth en la parte superior del formulario y SHALL preservar todos los valores ingresados por el usuario en los campos del formulario.
6. WHILE el Formulario_Registro está procesando el envío a Supabase_Auth, THE Formulario_Registro SHALL deshabilitar el botón de envío y mostrar el texto "Creando cuenta..." dentro del botón como indicador de carga.
7. WHEN el usuario corrige un campo que previamente mostraba un error de validación y el nuevo valor cumple las reglas de validación, THE Formulario_Registro SHALL ocultar el mensaje de error correspondiente a ese campo.

### Requirement 3: Crear Oportunidad de Voluntariado

**User Story:** Como refugio, quiero crear nuevas oportunidades de voluntariado mediante un formulario, para que los voluntarios puedan verlas y aplicar.

#### Acceptance Criteria

1. WHILE el usuario tiene el rol "shelter", THE Frontend_App SHALL mostrar una opción "Crear Oportunidad" accesible desde el dashboard del refugio.
2. WHEN el usuario refugio accede al formulario de crear oportunidad, THE Formulario_Crear_Oportunidad SHALL mostrar los campos: nombre (texto, obligatorio, máximo 200 caracteres), categoría (selector, obligatorio), ubicación (texto, obligatorio, máximo 200 caracteres), fecha (fecha, obligatorio), duración (texto, obligatorio), espacios totales (número entero, obligatorio, mínimo 1) e imagen (URL, opcional).
3. WHEN el usuario refugio intenta enviar el Formulario_Crear_Oportunidad con uno o más campos obligatorios vacíos o con espacios totales menor a 1, THE Formulario_Crear_Oportunidad SHALL impedir el envío y mostrar un mensaje de validación junto a cada campo inválido indicando el motivo del error.
4. WHEN el usuario refugio envía el Formulario_Crear_Oportunidad con todos los campos obligatorios completos y válidos, THE Frontend_App SHALL enviar una solicitud POST /opportunities al Backend_API con los datos del formulario y el token de autenticación.
5. WHEN el Backend_API responde con código 201 (creado exitosamente), THE Frontend_App SHALL mostrar un mensaje de éxito y redirigir al usuario al dashboard del refugio.
6. IF el Backend_API responde con un error (400, 401 o 500), THEN THE Formulario_Crear_Oportunidad SHALL mostrar un mensaje de error descriptivo al usuario y preservar los datos ingresados en el formulario sin limpiar los campos.
7. WHILE el Formulario_Crear_Oportunidad está procesando el envío, THE Formulario_Crear_Oportunidad SHALL deshabilitar el botón de envío y mostrar un indicador de carga hasta recibir la respuesta del Backend_API o transcurridos 30 segundos (timeout).

### Requirement 4: Validación del Formulario de Crear Oportunidad

**User Story:** Como refugio, quiero que el formulario valide mis datos antes de enviarlos, para evitar errores en la creación de oportunidades.

#### Acceptance Criteria

1. WHEN el usuario refugio intenta enviar el Formulario_Crear_Oportunidad sin completar uno o más campos obligatorios (name, category, location, date, duration, total_spots), THE Formulario_Crear_Oportunidad SHALL mostrar un mensaje de error junto a cada campo obligatorio vacío e impedir el envío del formulario.
2. WHEN el usuario refugio ingresa un valor menor a 1 o mayor a 10000 en el campo "espacios totales", THE Formulario_Crear_Oportunidad SHALL mostrar un mensaje de error indicando que el valor debe estar entre 1 y 10000.
3. WHEN el usuario refugio selecciona una fecha anterior a la fecha actual (comparación por día calendario sin componente horario), THE Formulario_Crear_Oportunidad SHALL mostrar un mensaje de error indicando que la fecha debe ser futura.
4. THE Formulario_Crear_Oportunidad SHALL presentar el campo "categoría" como un selector con las categorías disponibles obtenidas del Backend_API.
5. IF el Backend_API no responde o retorna un error al solicitar las categorías disponibles, THEN THE Formulario_Crear_Oportunidad SHALL deshabilitar el campo "categoría", mostrar un mensaje indicando que no se pudieron cargar las categorías, e impedir el envío del formulario.
6. WHEN el usuario refugio ingresa un valor en el campo "nombre" que excede 200 caracteres, THE Formulario_Crear_Oportunidad SHALL mostrar un mensaje de error indicando que el nombre no debe superar los 200 caracteres.
7. IF el usuario refugio proporciona un valor en el campo opcional "imagen" que no cumple el formato de URL válida, THEN THE Formulario_Crear_Oportunidad SHALL mostrar un mensaje de error indicando que el valor debe ser una URL válida.

### Requirement 5: Aplicar a una Oportunidad de Voluntariado

**User Story:** Como voluntario, quiero aplicar a una oportunidad de voluntariado desde la página de detalles, para registrarme como participante.

#### Acceptance Criteria

1. WHILE el usuario tiene el rol "volunteer" y visualiza los detalles de una oportunidad con estado "open" y espacios disponibles mayor a 0, THE Frontend_App SHALL mostrar un botón "Aplicar Ahora" habilitado.
2. WHEN el voluntario presiona el botón "Aplicar Ahora", THE Frontend_App SHALL enviar una solicitud POST /opportunities/:id/apply al Backend_API con el token de autenticación.
3. WHEN el Backend_API responde con código 201 (aplicación exitosa), THE Frontend_App SHALL mostrar un mensaje de confirmación indicando que la aplicación fue registrada exitosamente, deshabilitar el botón "Aplicar Ahora" y actualizar el contador de espacios disponibles en la vista.
4. IF el Backend_API responde con código 409 (ya aplicó previamente), THEN THE Frontend_App SHALL mostrar un mensaje indicando que ya tiene una aplicación activa para esta oportunidad.
5. IF el Backend_API responde con código 404 (oportunidad no encontrada) o error de red, THEN THE Frontend_App SHALL mostrar un mensaje de error descriptivo al usuario.
6. WHILE la solicitud de aplicación está siendo procesada, THE Frontend_App SHALL deshabilitar el botón "Aplicar Ahora" y mostrar un indicador de carga.
7. WHILE el usuario no tiene sesión activa y visualiza los detalles de una oportunidad, THE Frontend_App SHALL mostrar el botón "Aplicar Ahora" deshabilitado con un enlace a la página de login.

### Requirement 6: Accesibilidad de los Formularios

**User Story:** Como usuario con necesidades de accesibilidad, quiero que los formularios sean navegables con teclado y compatibles con lectores de pantalla, para poder utilizar la plataforma sin barreras.

#### Acceptance Criteria

1. THE Frontend_App SHALL asociar cada campo de formulario (en los formularios de registro, crear oportunidad y aplicar a oportunidad) con una etiqueta `<label>` mediante el atributo `htmlFor` en el label cuyo valor coincida con el atributo `id` del campo correspondiente.
2. WHEN un campo de formulario muestra un mensaje de error de validación, THE Frontend_App SHALL renderizar el mensaje en un elemento cuyo `id` esté referenciado en el atributo `aria-describedby` del campo correspondiente, de modo que el lector de pantalla anuncie el mensaje al enfocar el campo.
3. THE Frontend_App SHALL permitir la navegación completa de cada formulario mediante la tecla Tab siguiendo el orden visual de arriba hacia abajo de los campos, sin saltos ni trampas de foco, y cada elemento interactivo SHALL mostrar un indicador de foco visible con un contraste mínimo de 3:1 respecto al fondo.
4. WHEN un campo de formulario tiene un error de validación, THE Frontend_App SHALL establecer el atributo `aria-invalid="true"` en el campo correspondiente; WHEN el error se corrige, THE Frontend_App SHALL remover el atributo `aria-invalid` o establecerlo en `"false"`.
5. WHEN el usuario envía un formulario y existen errores de validación, THE Frontend_App SHALL mover el foco al primer campo con error para que el lector de pantalla anuncie el campo y su mensaje de error asociado.
6. THE Frontend_App SHALL marcar los campos obligatorios con el atributo `aria-required="true"` y con un indicador visual de campo requerido.
7. WHEN el usuario envía un formulario con éxito, THE Frontend_App SHALL comunicar el resultado mediante una región ARIA live (`role="status"` o `aria-live="polite"`) para que lectores de pantalla anuncien la confirmación.
