# Requirements Document

## Introducción

Este documento define los requisitos para integrar el frontend React de **Paws to the Rescue** con la API REST del backend NestJS. El objetivo es reemplazar todos los datos mock/hardcoded que actualmente existen en los componentes y páginas del frontend con llamadas reales a la API, implementando una capa de servicios, hooks personalizados de data fetching, y estados de carga/error en toda la aplicación.

---

## Glossary

- **API_Client**: Instancia de axios configurada en `Frontend/src/services/api.ts` con interceptor Bearer Token que inyecta automáticamente el JWT de Supabase Auth.
- **Service_Layer**: Módulo de funciones TypeScript/JavaScript que encapsulan las llamadas HTTP a cada endpoint del backend usando el API_Client.
- **Custom_Hook**: Hook de React (`useX`) que encapsula la lógica de data fetching con `useState` y `useEffect`, exponiendo `data`, `loading` y `error`.
- **Auth_Store**: Store de Zustand (`useAuthStore`) que gestiona sesión, usuario y rol del usuario autenticado.
- **Opportunity**: Oportunidad de voluntariado publicada por un Shelter.
- **Shelter**: Refugio de gatos registrado en la plataforma.
- **Volunteer**: Usuario voluntario autenticado con rol `volunteer`.
- **Application**: Solicitud de un Volunteer para participar en una Opportunity.
- **Loading_State**: Estado visual que indica al usuario que los datos se están obteniendo del servidor.
- **Error_State**: Estado visual que indica al usuario que hubo un fallo al obtener datos, con opción de reintentar.

---

## Requirements

### Requirement 1: Capa de Servicios API

**User Story:** Como desarrollador frontend, quiero tener funciones centralizadas para cada endpoint del backend, para que los componentes no contengan lógica de llamadas HTTP directamente.

#### Acceptance Criteria

1. THE Service_Layer SHALL exponer una función por cada endpoint del backend: `getOpportunities(filters?)`, `getOpportunityById(id)`, `getShelters()`, `getShelterById(id)`, `getTopMonthlyVolunteers()`, `getVolunteerDashboard()`, `getVolunteerActivity()`, `getVolunteerRecommendations()`, `getVolunteerApplications(status?)`, `getShelterDashboard()`, `getShelterRecentApplications()`, `applyToOpportunity(opportunityId)`.
2. THE Service_Layer SHALL utilizar exclusivamente el API_Client existente (`api` importado de `services/api.ts`) para realizar todas las peticiones HTTP.
3. WHEN una función del Service_Layer recibe parámetros de filtro opcionales, THE Service_Layer SHALL enviarlos como query parameters en la petición GET.
4. WHEN una función del Service_Layer realiza una petición POST, THE Service_Layer SHALL enviar el payload como body de la petición en formato JSON.
5. THE Service_Layer SHALL retornar directamente los datos de la respuesta (`response.data`) sin wrappers adicionales.
6. IF la petición HTTP falla, THEN THE Service_Layer SHALL propagar el error sin capturarlo, delegando el manejo de errores al Custom_Hook que la invoca.

---

### Requirement 2: Hooks Personalizados de Data Fetching

**User Story:** Como desarrollador frontend, quiero hooks reutilizables que manejen el ciclo de vida de las peticiones (loading, data, error), para evitar repetir lógica de `useState`/`useEffect` en cada componente.

#### Acceptance Criteria

1. THE Custom_Hook SHALL exponer un hook genérico `useApi` que acepte una función de servicio y parámetros opcionales, retornando un objeto con `data` (valor inicial `null`), `loading` (booleano), `error` (valor inicial `null`) y una función `refetch`.
2. WHEN el Custom_Hook se monta o cuando sus dependencias cambian, THE Custom_Hook SHALL ejecutar la función de servicio y actualizar `loading` a `true` antes de iniciar la petición.
3. WHEN la petición se completa exitosamente, THE Custom_Hook SHALL almacenar la respuesta en `data`, establecer `loading` en `false` y `error` en `null`.
4. IF la petición falla, THEN THE Custom_Hook SHALL almacenar el mensaje de error en `error`, establecer `loading` en `false` y `data` en `null`.
5. WHEN se invoca la función `refetch`, THE Custom_Hook SHALL re-ejecutar la petición con los mismos parámetros, reseteando `loading` a `true`.
6. THE Custom_Hook SHALL exponer hooks específicos (`useOpportunities`, `useOpportunityDetail`, `useShelters`, `useShelterDetail`, `useTopVolunteers`, `useVolunteerDashboard`, `useVolunteerActivity`, `useVolunteerRecommendations`, `useVolunteerApplications`, `useShelterDashboard`, `useShelterRecentApplications`) que utilicen `useApi` con la función de servicio correspondiente.
7. WHEN un Custom_Hook específico acepta parámetros (como `id` o `status`), THE Custom_Hook SHALL re-ejecutar la petición automáticamente cuando esos parámetros cambian.

---

### Requirement 3: Integración de la Página de Inicio

**User Story:** Como visitante de la página de inicio, quiero ver oportunidades de voluntariado reales y los voluntarios destacados del mes, para conocer la actividad actual de la plataforma.

#### Acceptance Criteria

1. WHEN el componente `HomeVolunteeringSection` se monta, THE `HomeVolunteeringSection` SHALL obtener las oportunidades mediante `getOpportunities()` y renderizar las primeras 3 oportunidades reales del backend.
2. WHEN el componente `HomeVolunteersOfMonth` se monta, THE `HomeVolunteersOfMonth` SHALL obtener los voluntarios del mes mediante `getTopMonthlyVolunteers()` y renderizar hasta 3 voluntarios reales del backend.
3. WHILE los datos de oportunidades se están cargando, THE `HomeVolunteeringSection` SHALL mostrar un indicador visual de carga en lugar de tarjetas vacías.
4. WHILE los datos de voluntarios del mes se están cargando, THE `HomeVolunteersOfMonth` SHALL mostrar un indicador visual de carga.
5. IF la petición de oportunidades falla, THEN THE `HomeVolunteeringSection` SHALL mostrar un mensaje de error con una opción para reintentar la carga.
6. IF la petición de voluntarios del mes falla, THEN THE `HomeVolunteersOfMonth` SHALL mostrar un mensaje de error con una opción para reintentar la carga.

---

### Requirement 4: Integración de la Página de Oportunidades de Voluntariado

**User Story:** Como visitante de la página `/volunteering`, quiero ver la lista completa de oportunidades reales con filtros funcionales, para encontrar la que mejor se adapte a mis intereses.

#### Acceptance Criteria

1. WHEN la página `Volunteering` se monta, THE página SHALL obtener las oportunidades mediante `getOpportunities()` y renderizar la lista completa con datos reales del backend.
2. WHEN el usuario aplica filtros de categoría o ubicación, THE página SHALL llamar a `getOpportunities({ category, location })` con los filtros seleccionados y actualizar la lista.
3. WHILE las oportunidades se están cargando, THE página SHALL mostrar un indicador visual de carga.
4. IF la petición falla, THEN THE página SHALL mostrar un mensaje de error con opción de reintentar.
5. IF el backend retorna un array vacío, THEN THE página SHALL mostrar un mensaje indicando que no hay oportunidades disponibles.

---

### Requirement 5: Integración de la Página de Detalle de Oportunidad

**User Story:** Como visitante de la página `/volunteering/:id`, quiero ver los detalles completos de una oportunidad real para decidir si quiero aplicar.

#### Acceptance Criteria

1. WHEN la página `VolunteeringDetails` se monta, THE página SHALL obtener la oportunidad mediante `getOpportunityById(id)` usando el parámetro `id` de la URL y renderizar los datos reales.
2. WHILE la oportunidad se está cargando, THE página SHALL mostrar un indicador visual de carga.
3. IF la oportunidad no existe (HTTP 404), THEN THE página SHALL mostrar un mensaje de "Oportunidad no encontrada".
4. IF la petición falla por otro error, THEN THE página SHALL mostrar un mensaje de error genérico con opción de reintentar.

---

### Requirement 6: Integración de la Página de Refugios

**User Story:** Como visitante de la página `/shelters`, quiero ver la lista real de refugios registrados en la plataforma con sus datos actualizados.

#### Acceptance Criteria

1. WHEN la página `Shelters` se monta, THE página SHALL obtener los refugios mediante `getShelters()` y renderizar la lista con datos reales del backend.
2. WHILE los refugios se están cargando, THE página SHALL mostrar un indicador visual de carga.
3. IF la petición falla, THEN THE página SHALL mostrar un mensaje de error con opción de reintentar.
4. IF el backend retorna un array vacío, THEN THE página SHALL mostrar un mensaje indicando que no hay refugios registrados.

---

### Requirement 7: Integración de la Página de Detalle de Refugio

**User Story:** Como visitante de la página `/shelters/:id`, quiero ver la información detallada del refugio y sus oportunidades activas para conocer cómo puedo colaborar.

#### Acceptance Criteria

1. WHEN la página `ShelterDetail` se monta, THE página SHALL obtener el refugio mediante `getShelterById(id)` usando el parámetro `id` de la URL y renderizar los datos reales, incluyendo la lista de oportunidades activas del refugio.
2. WHILE el refugio se está cargando, THE página SHALL mostrar un indicador visual de carga.
3. IF el refugio no existe (HTTP 404), THEN THE página SHALL mostrar un mensaje de "Refugio no encontrado".
4. IF la petición falla por otro error, THEN THE página SHALL mostrar un mensaje de error genérico con opción de reintentar.

---

### Requirement 8: Integración del Dashboard del Voluntario

**User Story:** Como voluntario autenticado, quiero que mi dashboard muestre mi perfil real, historial de actividades y recomendaciones personalizadas obtenidas del backend.

#### Acceptance Criteria

1. WHEN la página `VolunteerDashboard` se monta, THE página SHALL obtener los datos del perfil mediante `getVolunteerDashboard()`, el historial mediante `getVolunteerActivity()` y las recomendaciones mediante `getVolunteerRecommendations()`, y renderizar todos los datos reales.
2. WHILE los datos del dashboard se están cargando, THE página SHALL mostrar indicadores visuales de carga en cada sección (perfil, historial, recomendaciones).
3. IF alguna petición del dashboard falla, THEN THE página SHALL mostrar un mensaje de error en la sección correspondiente con opción de reintentar esa sección específica.
4. IF el usuario no está autenticado o su token es inválido (HTTP 401), THEN THE página SHALL redirigir al usuario a la página de login.

---

### Requirement 9: Integración del Dashboard del Refugio

**User Story:** Como administrador de un refugio autenticado, quiero que mi dashboard muestre las estadísticas reales y las aplicaciones recientes de mi refugio.

#### Acceptance Criteria

1. WHEN la página `ShelterDashboard` se monta, THE página SHALL obtener las estadísticas mediante `getShelterDashboard()` y las aplicaciones recientes mediante `getShelterRecentApplications()`, y renderizar todos los datos reales.
2. WHILE los datos del dashboard se están cargando, THE página SHALL mostrar indicadores visuales de carga en cada sección.
3. IF alguna petición del dashboard falla, THEN THE página SHALL mostrar un mensaje de error en la sección correspondiente con opción de reintentar.
4. IF el usuario no está autenticado o su token es inválido (HTTP 401), THEN THE página SHALL redirigir al usuario a la página de login.

---

### Requirement 10: Integración de Aplicaciones del Voluntario

**User Story:** Como voluntario autenticado, quiero ver mis aplicaciones reales a oportunidades con sus estados actualizados y poder filtrar por estado.

#### Acceptance Criteria

1. WHEN la página `VolunteerApplications` se monta, THE página SHALL obtener las aplicaciones mediante `getVolunteerApplications()` y renderizar la lista con datos reales.
2. WHEN el usuario selecciona un filtro de estado (pending, approved, rejected), THE página SHALL llamar a `getVolunteerApplications(status)` con el filtro seleccionado y actualizar la lista.
3. WHILE las aplicaciones se están cargando, THE página SHALL mostrar un indicador visual de carga.
4. IF la petición falla, THEN THE página SHALL mostrar un mensaje de error con opción de reintentar.
5. IF el usuario no está autenticado (HTTP 401), THEN THE página SHALL redirigir al usuario a la página de login.

---

### Requirement 11: Aplicar a una Oportunidad

**User Story:** Como voluntario autenticado, quiero poder aplicar a una oportunidad de voluntariado desde la página de detalle, para registrar mi interés en participar.

#### Acceptance Criteria

1. WHEN el voluntario hace clic en el botón de aplicar en `VolunteeringDetails`, THE página SHALL enviar una petición mediante `applyToOpportunity(opportunityId)` al backend.
2. WHILE la petición de aplicación se está procesando, THE página SHALL deshabilitar el botón de aplicar y mostrar un indicador de carga en el botón.
3. WHEN la aplicación se crea exitosamente (HTTP 201), THE página SHALL mostrar un mensaje de confirmación al usuario y actualizar el estado visual del botón para indicar que ya aplicó.
4. IF el voluntario ya tiene una aplicación activa para esa oportunidad (HTTP 409), THEN THE página SHALL mostrar un mensaje indicando que ya tiene una aplicación activa.
5. IF la oportunidad no existe (HTTP 404), THEN THE página SHALL mostrar un mensaje de error apropiado.
6. IF el usuario no está autenticado (HTTP 401), THEN THE página SHALL redirigir al usuario a la página de login.

---

### Requirement 12: Eliminación de Datos Mock

**User Story:** Como desarrollador frontend, quiero que se eliminen todos los datos mock y hardcoded del código fuente, para que la aplicación dependa exclusivamente de datos reales del backend.

#### Acceptance Criteria

1. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_OPPORTUNITIES` de `HomeVolunteeringSection.jsx`.
2. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_VOLUNTEERS` de `HomeVolunteersOfMonth.jsx`.
3. WHEN la integración está completa, THE aplicación SHALL eliminar el archivo `volunteeringData.js` de `services/`.
4. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_SHELTERS` de `Shelters.jsx`.
5. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_SHELTER` y `MOCK_OPPORTUNITIES` de `ShelterDetail.jsx`.
6. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_VOLUNTEER`, `MOCK_HISTORY` y `MOCK_RECOMMENDATIONS` de `VolunteerDashboard.jsx`.
7. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_SHELTER` y `MOCK_APPLICATIONS` de `ShelterDashboard.jsx`.
8. WHEN la integración está completa, THE aplicación SHALL eliminar las constantes `MOCK_APPLICATIONS` de `VolunteerApplications.jsx`.

---

### Requirement 13: Estados de Carga y Error Reutilizables

**User Story:** Como desarrollador frontend, quiero componentes reutilizables de estados de carga y error, para mantener una experiencia visual consistente en toda la aplicación.

#### Acceptance Criteria

1. THE aplicación SHALL proveer un componente `LoadingSpinner` que muestre una animación de carga con el tema visual de la plataforma (colores primarios).
2. THE aplicación SHALL proveer un componente `ErrorMessage` que muestre el mensaje de error recibido y un botón "Reintentar" que invoque la función `refetch` del hook correspondiente.
3. THE aplicación SHALL proveer un componente `EmptyState` que muestre un mensaje configurable cuando una lista no tiene elementos.
4. WHEN cualquier página utiliza los componentes de estado, THE página SHALL pasar el mensaje específico del contexto (por ejemplo, "No hay oportunidades disponibles" vs "No hay refugios registrados").
