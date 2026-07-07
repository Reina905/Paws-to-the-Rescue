# Implementation Plan: Frontend API Integration

## Overview

Integrar el frontend React con la API REST del backend, reemplazando todos los datos mock con llamadas reales. El orden de implementación sigue las dependencias: servicios → hooks → componentes UI → integración en páginas.

## Task Dependency Graph

```json
{
  "waves": [
    ["1"],
    ["2"],
    ["3"],
    ["4"],
    ["5", "6", "7", "8"],
    ["9"],
    ["10"]
  ]
}
```

## Tasks

- [ ] 1. Crear la capa de servicios API
  - [ ] 1.1 Crear `services/opportunitiesService.js`
    - Exportar funciones: `getOpportunities(filters?)`, `getOpportunityById(id)`, `applyToOpportunity(opportunityId)`
    - Usar la instancia `api` existente de `services/api.ts`
    - `getOpportunities` debe enviar `category` y `location` como query params opcionales
    - `applyToOpportunity` debe hacer POST a `/opportunities/:id/apply`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [ ] 1.2 Crear `services/sheltersService.js`
    - Exportar funciones: `getShelters()`, `getShelterById(id)`, `getShelterDashboard()`, `getShelterRecentApplications()`
    - Usar la instancia `api` existente
    - _Requirements: 1.1, 1.2, 1.5, 1.6_
  - [ ] 1.3 Crear `services/volunteersService.js`
    - Exportar funciones: `getTopMonthlyVolunteers()`, `getVolunteerDashboard()`, `getVolunteerActivity()`, `getVolunteerRecommendations()`, `getVolunteerApplications(status?)`
    - `getVolunteerApplications` debe enviar `status` como query param opcional
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

- [ ] 2. Crear hooks personalizados de data fetching
  - [ ] 2.1 Crear `hooks/useApi.js` — hook genérico
    - Aceptar una función de servicio y argumentos variables
    - Manejar estados `data`, `loading`, `error` con `useState`
    - Ejecutar la función en `useEffect` y al cambiar dependencias
    - Exponer función `refetch` para reintentar
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [ ] 2.2 Crear `hooks/useOpportunities.js`
    - Exportar `useOpportunities(filters)` y `useOpportunityDetail(id)` usando `useApi`
    - Re-ejecutar cuando `filters` o `id` cambian
    - _Requirements: 2.6, 2.7_
  - [ ] 2.3 Crear `hooks/useShelters.js`
    - Exportar `useShelters()`, `useShelterDetail(id)`, `useShelterDashboard()`, `useShelterRecentApplications()`
    - _Requirements: 2.6, 2.7_
  - [ ] 2.4 Crear `hooks/useVolunteers.js`
    - Exportar `useTopVolunteers()`, `useVolunteerDashboard()`, `useVolunteerActivity()`, `useVolunteerRecommendations()`, `useVolunteerApplications(status)`
    - Re-ejecutar `useVolunteerApplications` cuando `status` cambia
    - _Requirements: 2.6, 2.7_
  - [ ] 2.5 Crear `hooks/useApply.js` — hook de mutación
    - Manejar estados `loading`, `error`, `success`
    - Mapear errores HTTP específicos: 409 → ya aplicó, 404 → no existe, 401 → autenticación requerida
    - No ejecutar en mount, solo al llamar `apply(opportunityId)`
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [ ] 3. Crear componentes UI reutilizables de estado
  - [ ] 3.1 Crear `components/LoadingSpinner.jsx`
    - Animación de spinner con colores primarios del tema
    - Aceptar prop `className` para personalización
    - _Requirements: 13.1_
  - [ ] 3.2 Crear `components/ErrorMessage.jsx`
    - Mostrar mensaje de error y botón "Reintentar"
    - Aceptar props `message` y `onRetry`
    - _Requirements: 13.2_
  - [ ] 3.3 Crear `components/EmptyState.jsx`
    - Mostrar mensaje configurable cuando una lista está vacía
    - Aceptar prop `message`
    - _Requirements: 13.3, 13.4_

- [ ] 4. Checkpoint — Verificar servicios, hooks y componentes
  - Asegurar que los archivos se crearon correctamente y no hay errores de importación
  - Preguntar al usuario si tiene dudas antes de integrar en páginas

- [ ] 5. Integrar la Página de Inicio (Home)
  - [ ] 5.1 Integrar `HomeVolunteeringSection.jsx` con API
    - Reemplazar `MOCK_OPPORTUNITIES` con `useOpportunities()` hook
    - Agregar `LoadingSpinner` mientras carga y `ErrorMessage` con `refetch` si falla
    - Renderizar solo las primeras 3 oportunidades reales: `data?.slice(0, 3)`
    - Eliminar la constante `MOCK_OPPORTUNITIES` del archivo
    - _Requirements: 3.1, 3.3, 3.5, 12.1_
  - [ ] 5.2 Integrar `HomeVolunteersOfMonth.jsx` con API
    - Reemplazar `MOCK_VOLUNTEERS` con `useTopVolunteers()` hook
    - Agregar `LoadingSpinner` mientras carga y `ErrorMessage` con `refetch` si falla
    - Eliminar la constante `MOCK_VOLUNTEERS` del archivo
    - _Requirements: 3.2, 3.4, 3.6, 12.2_

- [ ] 6. Integrar páginas de Oportunidades de Voluntariado
  - [ ] 6.1 Integrar `Volunteering.jsx` con API
    - Reemplazar `import { volunteeringData }` con `useOpportunities(filters)` hook
    - Agregar estado local para filtros de categoría/ubicación
    - Agregar `LoadingSpinner`, `ErrorMessage` con `refetch`, y `EmptyState` para array vacío
    - Eliminar el import de `volunteeringData`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [ ] 6.2 Integrar `VolunteeringDetails.jsx` con API
    - Reemplazar `volunteeringData.find()` con `useOpportunityDetail(id)` hook
    - Agregar `LoadingSpinner` mientras carga
    - Mostrar "Oportunidad no encontrada" si es 404
    - Mostrar `ErrorMessage` con `refetch` para otros errores
    - Agregar botón "Aplicar" usando `useApply()` hook (visible solo si autenticado con rol volunteer)
    - Deshabilitar botón mientras procesa, mostrar confirmación en éxito, manejar 409/401
    - Redirigir a `/login` en error 401
    - Eliminar el import de `volunteeringData`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [ ] 7. Integrar páginas de Refugios
  - [ ] 7.1 Integrar `Shelters.jsx` con API
    - Reemplazar `MOCK_SHELTERS` con `useShelters()` hook
    - Agregar `LoadingSpinner`, `ErrorMessage` con `refetch`, y `EmptyState`
    - Eliminar la constante `MOCK_SHELTERS` del archivo
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 12.4_
  - [ ] 7.2 Integrar `ShelterDetail.jsx` con API
    - Reemplazar `MOCK_SHELTER` y `MOCK_OPPORTUNITIES` con `useShelterDetail(id)` hook
    - Usar `useParams()` para obtener el `id` de la URL
    - Agregar `LoadingSpinner`, mensaje "Refugio no encontrado" para 404, `ErrorMessage` para otros errores
    - Eliminar las constantes mock del archivo
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 12.5_

- [ ] 8. Integrar Dashboards y Aplicaciones (páginas protegidas)
  - [ ] 8.1 Integrar `VolunteerDashboard.jsx` con API
    - Reemplazar `MOCK_VOLUNTEER`, `MOCK_HISTORY`, `MOCK_RECOMMENDATIONS` con hooks: `useVolunteerDashboard()`, `useVolunteerActivity()`, `useVolunteerRecommendations()`
    - Agregar `LoadingSpinner` por sección y `ErrorMessage` con refetch por sección
    - Detectar error 401 y redirigir a `/login` con `useNavigate()`
    - Eliminar las constantes mock del archivo
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 12.6_
  - [ ] 8.2 Integrar `ShelterDashboard.jsx` con API
    - Reemplazar `MOCK_SHELTER` y `MOCK_APPLICATIONS` con hooks: `useShelterDashboard()`, `useShelterRecentApplications()`
    - Agregar `LoadingSpinner` por sección y `ErrorMessage` con refetch por sección
    - Detectar error 401 y redirigir a `/login` con `useNavigate()`
    - Eliminar las constantes mock del archivo
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 12.7_
  - [ ] 8.3 Integrar `VolunteerApplications.jsx` con API
    - Reemplazar `MOCK_APPLICATIONS` con `useVolunteerApplications(filter)` hook
    - Pasar el filtro de estado actual al hook para que re-fetche al cambiar
    - Agregar `LoadingSpinner`, `ErrorMessage` con `refetch`
    - Detectar error 401 y redirigir a `/login`
    - Eliminar la constante `MOCK_APPLICATIONS` del archivo
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 12.8_

- [ ] 9. Limpieza final — Eliminar archivo mock
  - Eliminar `services/volunteeringData.js` del proyecto
  - Verificar que no queden imports rotos a este archivo
  - _Requirements: 12.3_

- [ ] 10. Checkpoint final — Verificar integración completa
  - Ejecutar `npm run build` para verificar que no hay errores de compilación
  - Verificar que no quedan constantes `MOCK_` en ningún archivo de `pages/` o `features/`
  - Preguntar al usuario si tiene dudas o si necesita ajustes

## Notes

- Las tareas 5, 6, 7 y 8 son independientes entre sí una vez completada la tarea 4 (pueden paralelizarse)
- La eliminación de mocks se hace como parte de cada tarea de integración de página, excepto el archivo `volunteeringData.js` que se elimina en la tarea 9
- No se introducen nuevas dependencias — todo se implementa con React hooks nativos y axios existente
- Los componentes de UI (tarea 3) siguen el sistema de diseño existente con Tailwind CSS
