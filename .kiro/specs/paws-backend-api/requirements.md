# Requirements Document

## Introduction

Este documento define los requisitos del backend NestJS para la plataforma **Paws to the Rescue**, una aplicación de voluntariado para refugios de gatos. El backend expone una API REST que consume el frontend React (Vite) mediante axios con autenticación Bearer Token emitido por Supabase Auth. Los módulos esqueleto ya existen (`auth`, `volunteers`, `shelters`, `opportunities`, `badges`, `supabase`); este spec cubre la implementación completa de sus servicios, controladores, DTOs y la seguridad de cada endpoint.

---

## Glossary

- **API**: La aplicación NestJS que corre en `http://localhost:3000` y expone los endpoints REST.
- **Supabase_Client**: Instancia de `@supabase/supabase-js` provista por `SupabaseService.getClient()`.
- **JWT_Guard**: El `JwtAuthGuard` de Passport que valida el token Bearer emitido por Supabase Auth.
- **Volunteer**: Usuario registrado con rol `volunteer`; tiene perfil, historial de actividades y aplicaciones a oportunidades.
- **Shelter**: Organización registrada con rol `shelter`; gestiona oportunidades de voluntariado.
- **Opportunity**: Turno o actividad de voluntariado publicada por un Shelter.
- **Application**: Solicitud de un Volunteer para participar en una Opportunity. Estados posibles: `pending`, `approved`, `rejected`.
- **Badge**: Insignia otorgada a un Volunteer al cumplir ciertos hitos.
- **Dashboard_Volunteer**: Vista del panel personal del Volunteer.
- **Dashboard_Shelter**: Vista del panel de gestión del Shelter.
- **CORS_Origin**: Origen permitido para peticiones cross-origin, por defecto `http://localhost:5173`.

---

## Requirements

### Requirement 1: Configuración Global de la API

**User Story:** Como desarrollador frontend, quiero que la API arranque correctamente con CORS habilitado y validación global, para que el cliente React pueda consumirla sin errores de red ni payloads inválidos.

#### Acceptance Criteria

1. WHEN la API inicia, THE API SHALL habilitar CORS con origen `http://localhost:5173`, permitiendo los métodos `GET`, `POST`, `PATCH`, `PUT`, `DELETE` y `OPTIONS`, y el header `Authorization`.
2. WHEN la API recibe una petición preflight `OPTIONS`, THE API SHALL responder con HTTP 204 e incluir los headers CORS correspondientes antes de procesar la petición principal.
3. THE API SHALL aplicar `ValidationPipe` de forma global con `whitelist: true` y `forbidNonWhitelisted: true`.
4. WHEN la API inicia, THE API SHALL escuchar en el puerto definido por la variable de entorno `PORT` si su valor está en el rango 1–65535; IF la variable no está definida o está fuera de rango, THEN THE API SHALL usar el puerto `3000`.
5. WHEN una petición llega con un payload que viola las reglas de validación del DTO, THEN THE API SHALL responder con HTTP 400 e incluir en `message` un array que identifica cada campo inválido y la restricción violada (por ejemplo, `"name must be a string"`).

---

### Requirement 2: Autenticación con Supabase JWT

**User Story:** Como usuario autenticado, quiero que mis peticiones sean validadas con el token JWT de Supabase, para que solo yo pueda acceder a mis recursos protegidos.

#### Acceptance Criteria

1. THE JWT_Guard SHALL extraer el token del header `Authorization: Bearer <token>` en cada petición protegida.
2. THE JWT_Guard SHALL verificar la firma del token usando el secreto `SUPABASE_JWT_SECRET` del entorno con el algoritmo `HS256`.
3. WHEN el token es válido, THE JWT_Guard SHALL inyectar en `req.user` los campos `id` (claim `sub`), `email`, `role` y `metadata` (claim `user_metadata`); IF el claim `user_metadata` está ausente en el token, THEN `metadata` SHALL ser `null`.
4. IF el token está ausente o es inválido, THEN THE JWT_Guard SHALL responder con HTTP 401.
5. IF el token ha expirado, THEN THE JWT_Guard SHALL responder con HTTP 401.
6. IF la variable de entorno `SUPABASE_JWT_SECRET` no está definida al iniciar la API, THEN THE API SHALL lanzar un error de arranque y registrarlo en consola sin exponer el valor del secreto.

---

### Requirement 3: Listado de Oportunidades de Voluntariado

**User Story:** Como visitante de la página `/volunteering`, quiero obtener la lista de oportunidades de voluntariado activas con todos los campos necesarios para la tarjeta, para poder elegir en cuál participar.

#### Acceptance Criteria

1. WHEN se realiza `GET /opportunities`, THE API SHALL responder con HTTP 200 y un array de objetos con los campos: `id`, `image`, `category`, `shelterName` (objeto con `name` y `logo`), `name`, `location`, `date`, `duration`, `availableSpaces`, `totalSpaces`. IF no existen oportunidades activas, THE API SHALL responder con HTTP 200 y un array vacío `[]`.
2. THE API SHALL incluir únicamente oportunidades cuyo campo `isActive` sea `true`.
3. IF el parámetro de query `shelterId` está presente pero no corresponde a ningún Shelter existente, THE API SHALL responder con HTTP 200 y un array vacío `[]`.
4. IF los parámetros de query `category` y/o `location` están presentes, THE API SHALL filtrar el resultado aplicando las condiciones con lógica AND y comparación case-insensitive.
5. WHEN se realiza `GET /opportunities/:id`, THE API SHALL responder con HTTP 200 y todos los campos almacenados de la oportunidad, independientemente del valor de `isActive`.
6. IF el identificador `:id` no corresponde a ninguna oportunidad, THEN THE API SHALL responder con HTTP 404.

---

### Requirement 4: Gestión de Refugios (Shelters)

**User Story:** Como visitante de la página `/shelters`, quiero obtener la lista de refugios con sus estadísticas básicas para conocer dónde puedo colaborar.

#### Acceptance Criteria

1. WHEN se realiza `GET /shelters`, THE API SHALL responder con HTTP 200 y un array de objetos con los campos: `id`, `name`, `logo`, `description`, `contactNumber`, `location`, `animalCapacity`, `activeVolunteerOpportunities`. IF no existen refugios, THE API SHALL responder con HTTP 200 y `[]`.
2. THE API SHALL calcular `activeVolunteerOpportunities` como el conteo de Opportunities con `isActive: true` asociadas al Shelter; IF no hay ninguna, el valor SHALL ser `0`.
3. WHEN se realiza `GET /shelters/:id`, THE API SHALL responder con HTTP 200 con el objeto completo del Shelter más un array `opportunities` que contiene los objetos de sus oportunidades activas con los campos `id`, `name`, `category`, `location`, `date`, `duration`, `availableSpaces`, `totalSpaces`; IF no hay oportunidades activas, `opportunities` SHALL ser `[]`.
4. IF el identificador `:id` no corresponde a ningún Shelter, THEN THE API SHALL responder con HTTP 404 y `message: "Shelter not found"`.

---

### Requirement 5: Dashboard del Voluntario

**User Story:** Como voluntario autenticado, quiero acceder a mi dashboard personal con mi perfil, historial de actividades y recomendaciones, para hacer seguimiento de mi participación.

#### Acceptance Criteria

1. THE JWT_Guard SHALL proteger los endpoints `GET /volunteers/me/dashboard`, `GET /volunteers/me/activity` y `GET /volunteers/me/recommendations`; IF el token está ausente o es inválido, THE API SHALL responder con HTTP 401.
2. IF el token es válido pero el claim `role` no es `volunteer`, THEN THE API SHALL responder con HTTP 403.
3. WHEN se realiza `GET /volunteers/me/dashboard` con un token válido de rol `volunteer`, THE API SHALL responder con HTTP 200 y un objeto con: `name` (string), `role` (string), `since` (string en formato `MMM YYYY`, por ejemplo `"Oct 2023"`), `totalHours` (número entero no negativo), `sheltersAssisted` (número entero no negativo).
4. WHEN se realiza `GET /volunteers/me/activity` con un token válido de rol `volunteer`, THE API SHALL responder con HTTP 200 y un array de actividades completadas, cada una con: `title` (string), `location` (string), `time` (string en formato relativo legible, por ejemplo `"2 days ago"`), `hours` (string, por ejemplo `"3 hours"`), `note` (string). IF no hay actividades, THE API SHALL responder con `[]`.
5. WHEN se realiza `GET /volunteers/me/recommendations` con un token válido de rol `volunteer`, THE API SHALL responder con HTTP 200 y un array de oportunidades recomendadas, cada una con: `title` (string), `location` (string), `description` (string), `tag` (string o `null`). IF no hay recomendaciones, THE API SHALL responder con `[]`.
6. IF el token no corresponde a un perfil de Volunteer existente en la base de datos, THEN THE API SHALL responder con HTTP 404.

---

### Requirement 6: Dashboard del Refugio

**User Story:** Como administrador de un refugio autenticado, quiero acceder al dashboard de mi refugio con estadísticas y las aplicaciones recientes, para gestionar mis voluntarios.

#### Acceptance Criteria

1. THE JWT_Guard SHALL proteger los endpoints `GET /shelters/me/dashboard` y `GET /shelters/me/applications/recent`; IF el token está ausente o es inválido, THE API SHALL responder con HTTP 401.
2. IF el token es válido pero el claim `role` no es `shelter`, THEN THE API SHALL responder con HTTP 403.
3. WHEN se realiza `GET /shelters/me/dashboard` con un token válido de rol `shelter`, THE API SHALL responder con HTTP 200 y un objeto con: `name` (string), `location` (string), `totalAnimals` (número entero, suma de animales registrados actualmente en el Shelter), `volunteers` (número entero, conteo de Volunteers con al menos una Application `approved` en el Shelter), `activeOpportunities` (número entero, conteo de Opportunities con `isActive: true`), `pendingApplications` (número entero, conteo de Applications con `status: "pending"` en las Opportunities del Shelter).
4. WHEN se realiza `GET /shelters/me/applications/recent` con un token válido de rol `shelter`, THE API SHALL responder con HTTP 200 y un array de hasta 10 aplicaciones más recientes ordenadas por `createdAt` descendente, cada una con: `name` (nombre del Volunteer), `role` (nombre de la Opportunity), `time` (string en formato relativo legible, por ejemplo `"2 hours ago"`). IF no hay aplicaciones, THE API SHALL responder con `[]`.
5. IF el token no corresponde a un perfil de Shelter existente, THEN THE API SHALL responder con HTTP 404.

---

### Requirement 7: Aplicaciones del Voluntario

**User Story:** Como voluntario autenticado, quiero ver mis aplicaciones a oportunidades con su estado actualizado, para saber en cuáles fui aceptado o rechazado.

#### Acceptance Criteria

1. THE JWT_Guard SHALL proteger `GET /volunteers/me/applications` y `POST /opportunities/:id/apply`; IF el token está ausente o es inválido, THE API SHALL responder con HTTP 401.
2. WHEN se realiza `GET /volunteers/me/applications` con un token válido, THE API SHALL responder con HTTP 200 y un array de las aplicaciones del Volunteer autenticado con: `id`, `title`, `shelter`, `location`, `date`, `hours`, `status`. IF no hay aplicaciones, THE API SHALL responder con `[]`.
3. THE API SHALL incluir aplicaciones en los estados `pending`, `approved` y `rejected`.
4. IF el parámetro de query `status` está presente y su valor es uno de `pending`, `approved` o `rejected`, THE API SHALL filtrar el resultado por ese estado; IF el valor no es ninguno de los tres, THE API SHALL responder con HTTP 400 y un mensaje descriptivo.
5. WHEN se realiza `POST /opportunities/:id/apply` con un token válido, THE API SHALL crear una Application con estado `pending` y responder con HTTP 201 y el objeto `{ id, opportunityId, volunteerId, status: "pending" }`.
6. IF el Volunteer ya tiene una Application con estado `pending` o `approved` para esa misma Opportunity, THEN THE API SHALL responder con HTTP 409 y `message: "Ya tienes una aplicación activa para esta oportunidad"`.
7. IF el identificador de la Opportunity no existe, THEN THE API SHALL responder con HTTP 404.

---

### Requirement 8: Voluntarios del Mes (Home)

**User Story:** Como visitante de la página de inicio, quiero ver los tres voluntarios con más horas registradas en el mes actual, para conocer a quienes más contribuyen.

#### Acceptance Criteria

1. WHEN se realiza `GET /volunteers/top-monthly`, THE API SHALL responder con HTTP 200 y un array de hasta 3 objetos con los campos: `place` (número entero 1, 2 o 3), `name` (string), `hours` (número entero no negativo), `label` (string).
2. THE API SHALL ordenar los resultados de mayor a menor por `hours` acumuladas en el mes natural en curso (mes del calendario actual completo).
3. IF existen menos de 3 voluntarios con horas registradas en el mes, THE API SHALL retornar solo los disponibles sin completar posiciones vacías.

---

### Requirement 9: Gestión de Oportunidades por el Refugio

**User Story:** Como administrador de un refugio autenticado, quiero crear, actualizar y desactivar oportunidades de voluntariado desde el dashboard, para gestionar los turnos disponibles.

#### Acceptance Criteria

1. THE JWT_Guard SHALL proteger `POST /opportunities`, `PATCH /opportunities/:id` y `DELETE /opportunities/:id`; IF el token está ausente o es inválido, THE API SHALL responder con HTTP 401.
2. WHEN se realiza `POST /opportunities` con un payload válido y token de rol `shelter`, THE API SHALL crear la Opportunity asociada al Shelter del usuario autenticado (usando `req.user.id`) y responder con HTTP 201 con el objeto completo creado.
3. THE API SHALL requerir en el payload de creación los campos: `name` (string), `category` (string), `location` (string), `date` (string), `duration` (string), `totalSpaces` (número entero positivo). `availableSpaces` SHALL inicializarse con el mismo valor que `totalSpaces`. `isActive` SHALL inicializarse en `true`.
4. IF algún campo requerido está ausente o con tipo incorrecto, THEN THE API SHALL responder con HTTP 400 con detalle de los campos inválidos.
5. WHEN se realiza `PATCH /opportunities/:id` con un token válido de rol `shelter`, THE API SHALL actualizar solo los campos enviados en el payload y responder con HTTP 200 y el objeto actualizado.
6. IF el Shelter autenticado no es propietario de la Opportunity con `:id`, THEN THE API SHALL responder con HTTP 403.
7. WHEN se realiza `DELETE /opportunities/:id` por el Shelter propietario, THE API SHALL marcar la Opportunity como `isActive: false` (soft-delete) y responder con HTTP 200.

---

### Requirement 10: Gestión de Aplicaciones por el Refugio

**User Story:** Como administrador de un refugio autenticado, quiero aprobar o rechazar aplicaciones de voluntarios, para controlar quién participa en mis turnos.

#### Acceptance Criteria

1. THE JWT_Guard SHALL proteger `PATCH /applications/:id/status`; IF el token está ausente o es inválido, THE API SHALL responder con HTTP 401.
2. WHEN se realiza `PATCH /applications/:id/status` con `{ "status": "approved" }` o `{ "status": "rejected" }`, THE API SHALL actualizar el estado de la Application y responder con HTTP 200 y el objeto Application actualizado.
3. IF el valor de `status` en el payload no es `"approved"` ni `"rejected"`, THEN THE API SHALL responder con HTTP 400.
4. IF la Application con `:id` no existe, THEN THE API SHALL responder con HTTP 404.
5. IF la Application no pertenece a una Opportunity del Shelter autenticado, THEN THE API SHALL responder con HTTP 403.
6. WHEN una Application cambia a `approved` desde un estado distinto de `approved`, THE API SHALL decrementar `availableSpaces` de la Opportunity en 1.
7. WHEN una Application cambia de `approved` a `rejected`, THE API SHALL incrementar `availableSpaces` de la Opportunity en 1.
8. IF `availableSpaces` es `0` antes de aprobar, THEN THE API SHALL responder con HTTP 409 y `message: "No hay espacios disponibles"`.

---

### Requirement 11: Registro y Perfil de Usuarios

**User Story:** Como nuevo usuario, quiero completar mi perfil después del registro con Supabase Auth, para que la plataforma tenga mis datos de voluntario o refugio.

#### Acceptance Criteria

1. WHEN se realiza `POST /volunteers` con un token válido y el payload `{ name, role, bio, avatarUrl }`, THE API SHALL crear el perfil de Volunteer en Supabase vinculado al `sub` del token (`user_id`) y responder con HTTP 201 con el perfil creado.
2. IF ya existe un perfil de Volunteer para ese `sub`, THEN THE API SHALL responder con HTTP 409 y `message: "El perfil de voluntario ya existe"`.
3. WHEN se realiza `POST /shelters` con un token válido y el payload `{ name, description, location, contactNumber, animalCapacity, logo }`, THE API SHALL crear el perfil de Shelter vinculado al `sub` del token y responder con HTTP 201 con el perfil creado.
4. IF ya existe un perfil de Shelter para ese `sub`, THEN THE API SHALL responder con HTTP 409 y `message: "El perfil de refugio ya existe"`.
5. WHEN se realiza `GET /volunteers/:id` con un `id` válido, THE API SHALL responder con HTTP 200 y el perfil del Volunteer; IF el `id` no existe, THE API SHALL responder con HTTP 404.
6. WHEN se realiza `GET /shelters/:id` con un `id` válido (distinto de `"me"`), THE API SHALL responder con HTTP 200 y el perfil del Shelter; IF el `id` no existe, THE API SHALL responder con HTTP 404.

---

### Requirement 12: Manejo Global de Errores

**User Story:** Como desarrollador frontend, quiero recibir respuestas de error consistentes con un formato estándar, para poder mostrar mensajes útiles al usuario sin lógica adicional.

#### Acceptance Criteria

1. THE API SHALL retornar todos los errores en el formato `{ statusCode: number, message: string | string[], error: string }` siguiendo la estructura estándar de NestJS `HttpException`.
2. WHEN ocurre un error no controlado en el servidor, THE API SHALL responder con HTTP 500, `message: "Internal server error"` y `error: "Internal Server Error"` sin exponer stack traces ni detalles internos al cliente.
3. WHEN la consulta a Supabase_Client falla, THE API SHALL registrar el error completo (incluyendo el mensaje de Supabase) en consola con nivel `error`, y responder al cliente con HTTP 500 en el formato estándar sin incluir el mensaje interno de Supabase en la respuesta.
