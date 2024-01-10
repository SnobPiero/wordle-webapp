# Table of content

- [Table of content](#table-of-content)
- [General](#general)
- [Versions](#versions)
- [Development](#development)
- [Run Test](#run-test)
- [Servers](#servers)
- [DNS](#dns)
- [Deploy TEST](#deploy-test)
  - [Frist deploy...](#frist-deploy)
  - [Others deploy...](#others-deploy)
- [Deploy PRODUCTION](#deploy-production)
  - [Frist deploy...](#frist-deploy-1)
  - [Others deploy...](#others-deploy-1)

# General

This application is made with:

- "react"
- "next"
- "next-auth"
- "next-i18next"
- "react-hook-form"
- "axios"
- "pino" (for logs)
- "postcss" + "tailwindcss"
- "next-secure-headers"
- "husky" (git pre-commit)
- "eslint" + "prettier" + "autoprefixer"
- "@testing-library/react" + "jest" + "cypress"

# Versions

node: 18.12.1  
npm: 8.19.2  
yarn: 1.22.5  
react: 18.2.0

# Development

Install packages

```node
yarn;
```

Run locally

```node
yarn dev
```

Browse [http://localhost:3000](http://localhost:3000)

# Run Test

Unit test

```node
yarn test:unit
```

E2E test

```node
yarn test:e2e:open
```

_Open Cypress program locally_

```node
yarn test:e2e:run
```

_Run Cypress in console headless_

# Servers

**Application server**:  
IP: 10.0.15.221  
Node: 18.12.1  
PM2: 5.2.2

**DB server:**  
IP: 10.0.15.220  
SQLServer Express (Comunity edition)

# Deploy TEST

## Frist deploy...

❗💥❗ NOTE: verify install-service.js -> execPath  
❗💥❗ NOTE: verify install-service.js -> --max_old_space_size

Folder: C:\Applications\test-emb-scadenziario

```node
git clone https://...
yarn
```

**WARN: copy .env.production.local!**  
**This overwrite the production .env**

```node
yarn build
pm2 start ecosystem-test.config.js
pm2 save
cd cmd
npm link pm2
npm link node-windows
node install-service.js emb_test
```

⭐ Go to "Services" -> find the service installed -> "Properties" -> Startup type -> Automatic (Delayed Start) -> Apply

_only for delete the windows service:_

```node
node uninstall-service.js emb_test
```

---

## Others deploy...

Folder: C:\Applications\test-emb-scadenziario

```node
pm2 stop emb_test
git pull origin main
yarn build
```

⭐ Restart windows service

# Deploy PRODUCTION

## Frist deploy...

❗💥❗ NOTE: verify install-service.js -> execPath  
❗💥❗ NOTE: verify install-service.js -> --max_old_space_size

Folder: C:\Applications\emb-scadenziario

```node
git clone https://...
yarn
yarn build
pm2 start ecosystem.config.js
pm2 save
cd cmd
npm link pm2
npm link node-windows
node install-service.js emb
```

⭐ Go to "Services" -> find the service installed -> "Properties" -> Startup type -> Automatic (Delayed Start) -> Apply

_only for delete the windows service:_

```node
node uninstall-service.js emb
```

---

## Others deploy...

Folder: C:\Applications\emb-scadenziario

```node
pm2 stop emb
git pull origin main
yarn build
```

⭐ Restart windows service
