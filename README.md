# AI Automation Playground 🤖🚀

An interactive platform to experiment with AI-powered automations, connected directly to an **n8n** backend.

<details>
<summary><b>🇪🇸 Leer en Español</b></summary>
Una plataforma interactiva para experimentar con automatizaciones impulsadas por Inteligencia Artificial, conectada directamente a un backend de **n8n**.
</details>

---

## 📖 Description

**AI Automation Playground** is an application designed to demonstrate the power of AI in real-world workflows. Through a modern and fluid chat interface, users can interact with different pre-configured scenarios (Medical Support, Customer Service, Real Estate, etc.).

The application uses an **n8n** backend to process business logic, extract workflow steps, and generate intelligent responses, which are displayed in the client with an enhanced "typewriter" effect for a premium user experience.

<details>
<summary><b>🇪🇸 Leer en Español</b></summary>
**AI Automation Playground** es una aplicación diseñada para demostrar el poder de la IA en flujos de trabajo del mundo real. A través de una interfaz de chat moderna y fluida, los usuarios pueden interactuar con diferentes escenarios preconfigurados (Soporte Médico, Atención al Cliente, Bienes Raíces, etc.). 

La aplicación utiliza un backend de **n8n** para procesar la lógica de negocio, extraer pasos de flujo de trabajo y generar respuestas inteligentes, las cuales se muestran en el cliente con un efecto de "typewriter" mejorado para una experiencia de usuario premium.
</details>

## 🛠️ Built With

- **Frontend**: [Next.js 16+](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Orchestration**: [n8n](https://n8n.io/) (Webhook-based logic)

<details>
<summary><b>🇪🇸 Leer en Español: Tecnologías Utilizadas</b></summary>
- **Frontend**: [Next.js 16+](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Backend/Orquestación**: [n8n](https://n8n.io/) (Webhook-based logic)
</details>

## 📂 Project Structure

```text
src/
├── app/              # App routes and API (Route Handlers)
│   ├── api/chat/     # Main communication endpoint with n8n
│   └── page.tsx      # Main interface (Chat + Workflow viewer)
├── components/       # Modular UI components
│   ├── chat/         # Chat interface components (messages, inputs)
│   ├── workflow/     # Workflow step visualization (StepTimeline)
│   └── ui/           # Base components (Button, Badge, Card)
├── data/             # Scenario definitions and static data
├── hooks/            # Custom hooks (useChat for message logic)
├── lib/              # Utilities and API client
└── types/            # TypeScript type definitions
```

<details>
<summary><b>🇪🇸 Leer en Español: Estructura del Proyecto</b></summary>
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
</details>

## 🔌 API

The application includes a secure proxy to handle communication with n8n:

### `POST /api/chat`

This endpoint acts as a bridge between the client and the n8n webhook.

- **Body**:
  ```json
  {
    "message": "string",
    "scenario": "string",
    "sessionId": "string"
  }
  ```
- **Processing**:
  1. Validates the scenario and message.
  2. Forwards the request to the n8n webhook configured in `N8N_WEBHOOK_URL`.
  3. Processes the n8n response (extracting the `output` field if JSON).
  4. Returns plain text to the client for display.

<details>
<summary><b>🇪🇸 Leer en Español: API</b></summary>
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
</details>

## 🚀 Local Setup

1. **Clone the repository**.
2. **Install dependencies**:
    ```bash
    bun install
    ```
3. **Configure environment variables**:
    Create a `.env.local` file with:
    ```env
    N8N_WEBHOOK_URL=your_webhook_here
    ```
4. **Run the development server**:
    ```bash
    bun dev
    ```

<details>
<summary><b>🇪🇸 Leer en Español: Configuración Local</b></summary>
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
</details>

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<details>
<summary><b>🇪🇸 Leer en Español</b></summary>
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
</details>

---
Built with ❤️ for the AI Automation Playground.

