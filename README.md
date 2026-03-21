# AI Automation Playground 🤖🚀

Una plataforma interactiva para experimentar con automatizaciones impulsadas por Inteligencia Artificial, conectada directamente a un backend de **n8n**.

## 📖 Descripción

**AI Automation Playground** es una aplicación diseñada para demostrar el poder de la IA en flujos de trabajo del mundo real. A través de una interfaz de chat moderna y fluida, los usuarios pueden interactuar con diferentes escenarios preconfigurados (Soporte Médico, Atención al Cliente, Bienes Raíces, etc.). 

La aplicación utiliza un backend de **n8n** para procesar la lógica de negocio, extraer pasos de flujo de trabajo y generar respuestas inteligentes, las cuales se muestran en el cliente con un efecto de "typewriter" mejorado para una experiencia de usuario premium.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [Next.js 16+](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Backend/Orquestación**: [n8n](https://n8n.io/) (Webhook-based logic)

## 📂 Estructura del Proyecto

```text
src/
├── app/              # Rutas de la aplicación y API (Route Handlers)
│   ├── api/chat/     # Endpoint principal de comunicación con n8n
│   └── page.tsx      # Interfaz principal (Chat + Workflow viewer)
├── components/       # Componentes modulares de UI
│   ├── chat/         # Componentes de la interfaz de chat (mensajes, inputs)
│   ├── workflow/     # Visualización de los pasos del flujo (StepTimeline)
│   └── ui/           # Componentes base (Button, Badge, Card)
├── data/             # Definiciones de escenarios y datos estáticos
├── hooks/            # Hooks personalizados (useChat para lógica de mensajes)
├── lib/              # Utilidades y cliente de API
└── types/            # Definiciones de tipos TypeScript
```

## 🔌 API

La aplicación incluye un proxy seguro para manejar la comunicación con n8n:

### `POST /api/chat`

Este endpoint actúa como puente entre el cliente y el webhook de n8n.

- **Body**:
  ```json
  {
    "message": "string",
    "scenario": "string",
    "sessionId": "string"
  }
  ```
- **Procesamiento**:
  1. Valida el escenario y el mensaje.
  2. Reenvía la petición al webhook de n8n configurado en `N8N_WEBHOOK_URL`.
  3. Procesa la respuesta de n8n (extrayendo el campo `output` si es JSON).
  4. Devuelve texto plano al cliente para su visualización.

## 🚀 Configuración Local

1.  **Clonar el repositorio**.
2.  **Instalar dependencias**:
    ```bash
    bun install
    ```
3.  **Configurar variables de entorno**:
    Crea un archivo `.env.local` con:
    ```env
    N8N_WEBHOOK_URL=tu_webhook_aqui
    ```
4.  **Ejecutar el servidor de desarrollo**:
    ```bash
    bun dev
    ```

---
Desarrollado con ❤️ para el Playground de Automatización AI.
