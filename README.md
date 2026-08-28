# 🚀 B2B Automated Lead Ingestion & Qualification Pipeline

[![CI Pipeline](https://github.com/vlessvndroo/crm-lead-capture-b2b/actions/workflows/ci.yml/badge.svg)](https://github.com/vlessvndroo/crm-lead-capture-b2b/actions)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Make.com](https://img.shields.io/badge/Make.com-Automation-6D28D9?style=for-the-badge&logo=make&logoColor=white)](https://www.make.com/)
[![Telegram Bot API](https://img.shields.io/badge/Telegram_Bot-Real--Time_Alerts-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)

> **Full-Stack B2B Growth Engine:** Sistema de captura, calificación y triaje en tiempo real de oportunidades comerciales B2B, diseñado para maximizar el *Speed-to-Lead* y priorizar cuentas de alto valor (*High-Ticket Accounts*) mediante flujos serverless.

---

## 📌 El Problema de Negocio (Business Context)

En ventas corporativas B2B, **el 78% de los clientes compra al primer proveedor que responde**. Retrasar el contacto más de 5 minutos reduce la probabilidad de conversión hasta en un **400%**. 

Este proyecto resuelve tres grandes fricciones operativas:
1. **Fuga de prospectos calificados:** Elimina tiempos muertos conectando prospectos de alto presupuesto con el cerrador de ventas en segundos.
2. **Triaje automático (Criterio BANT):** Clasifica leads según su presupuesto (*Budget*) antes de agendar llamadas, evitando reuniones improductivas.
3. **Cero trabajo manual:** Automatiza el registro en la base de datos (CRM) y notifica vía push sin que los comerciales tengan que monitorear plataformas manualmente.

---

## 🏗️ Arquitectura del Sistema

```mermaid
flowchart LR
    A[📱 Lead Form\nReact + TS + Tailwind] -->|POST Webhook + Metadata| B(⚡ Make.com Router)
    
    B -->|Filtro: Lead Prioritario\nPresupuesto >= $5,000| C[📊 Google Sheets CRM]
    C --> D[🔔 Telegram Push Alert\nAlerta Instantánea a Ventas]
    
    B -->|Filtro: Lead Estándar\nPresupuesto < $5,000| E[📊 Google Sheets CRM\nCola de Nutrición]
```

### Flujo Operativo Paso a Paso:
1. **Captura (Frontend):** El prospecto ingresa nombre, empresa, industria, teléfono internacional y rango de presupuesto con validación reactiva inline.
2. **Ingesta Asíncrona:** El cliente web despacha un payload JSON tipado y normalizado a un endpoint Webhook en Make.com.
3. **Enrutamiento Inteligente (Make):**
   * **Rama 1 (High-Ticket):** Registra la fila en Google Sheets y envía una alerta push formateada al Bot de Telegram del equipo comercial con acceso inmediato para llamar o escribir.
   * **Rama 2 (Estándar):** Registra el prospecto en la base de datos para seguimiento y nutrición por email marketing sin saturar las alertas urgentes.

👉 **Documentación técnica de la integración:** Consulta la carpeta [`/automation`](./automation/README.md) y el [`webhook-contract.json`](./automation/webhook-contract.json).

---

## ✨ Características Técnicas y UI/UX

* 🎨 **Phone Input Pixel-Perfect (Stripe/Airbnb Style):**
  * Selector de país con bandera, código de llamada dinámico (`+58`, `+1`, etc.) y dropdown nativo accesible en un bloque `bg-gray-50`.
  * Input numérico desacoplado y reactivo en bloque blanco (`flex-1`).
  * Alturas milimétricamente unificadas (`h-10` / `40px`) con estados `:focus-within` y transiciones fluidas.
* 🛡️ **Validación Reactiva Inline & Tipado Estricto:** Eliminación de alerts nativos, bordes dinámicos de error en rojo y helper text accesible.
* 🌐 **Desacoplamiento con Variables de Entorno:** Soporte para `VITE_MAKE_WEBHOOK_URL` configurable en producción/staging.
* ⚡ **Feedback Interactivo de Carga:** Botón con spinner SVG animado y banners de confirmación/error para una experiencia de usuario impecable.
* 🔄 **CI/CD Automatizado:** Pipeline con GitHub Actions que valida TypeScript y compila el bundle en cada commit.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | UI reactiva, modular y con tipado estricto |
| **Estilos** | Tailwind CSS 4 + Custom CSS | Diseño responsivo moderno y micro-interacciones |
| **Build Tool** | Vite 6 | Bundling ultrarrápido y HMR instantáneo |
| **Teléfonos** | `react-phone-number-input` | Validación y formateo telefónico internacional |
| **Middleware / iPaaS** | Make.com (Integromat) | Orquestación serverless, lógica de decisión y webhooks |
| **Almacenamiento** | Google Sheets API / CRM | Base de datos centralizada y auditable |
| **Notificaciones** | Telegram Bot API | Notificaciones push en tiempo real a comerciales |
| **CI/CD** | GitHub Actions | Automatización de pruebas de tipo y compilación |

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
* Node.js 18+ instalado
* Gestor de paquetes `npm`

### Pasos
```bash
# 1. Clonar el repositorio
git clone https://github.com/vlessvndroo/crm-lead-capture-b2b.git

# 2. Entrar al directorio de la app
cd crm-lead-capture-b2b/lead-capture-app

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno (opcional)
cp .env.example .env

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## ☁️ Despliegue en Producción (Live Demo)

La aplicación está lista para ser desplegada en **Vercel** o **Netlify**:

### Configuración en Vercel
* **Framework Preset:** `Vite`
* **Root Directory:** `lead-capture-app`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Variable de Entorno:** `VITE_MAKE_WEBHOOK_URL` = `https://hook.us2.make.com/...`

---

## 📈 Roadmap & Próximas Mejoras

- [x] Integración de Webhooks con Make.com
- [x] Enrutamiento condicional por presupuesto (High-Ticket triage)
- [x] Alertas push a Telegram Bot
- [x] Validación reactiva inline sin alert() nativos
- [x] CI/CD con GitHub Actions
- [ ] Botón interactivo directo a WhatsApp Web en la alerta de Telegram
- [ ] Enriquecimiento automático de leads con Clearbit / Apollo API (datos de empresa y empleados)
- [ ] Dashboard analítico de métricas comerciales con Recharts

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de un sistema de captación y automatización de procesos comerciales B2B.  
*Repositorio:* [github.com/vlessvndroo/crm-lead-capture-b2b](https://github.com/vlessvndroo/crm-lead-capture-b2b)  
*Contacto / LinkedIn:* [[Tu Enlace de LinkedIn]](https://linkedin.com)
