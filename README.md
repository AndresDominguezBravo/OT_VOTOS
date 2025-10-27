# OT Votos

Aplicación para recopilar y visualizar resultados de votaciones de Operación Triunfo. Construida con React y Vite, y desplegada automáticamente en GitHub Pages.

- Sitio público: https://andresdominguezbravo.github.io/OT_VOTOS/
- Rama de despliegue: `gh-pages`

## Requisitos

- Node.js 22 (o superior) y npm

## Scripts

```bash
npm install      # instala dependencias
npm run dev      # arranca el servidor local en http://localhost:5173
npm run build    # genera la versión de producción en dist/
```

## Flujo de despliegue

1. Haz commit en la rama principal (`main` por defecto).
2. Empuja los cambios a GitHub.
3. El workflow `.github/workflows/deploy.yml` ejecuta:
   - `npm ci`
   - `npm run build`
   - Publica `dist/` en la rama `gh-pages` usando `peaceiris/actions-gh-pages`.
4. GitHub Pages actualiza el sitio en `https://andresdominguezbravo.github.io/OT_VOTOS/`.

Si necesitas desplegar manualmente (por ejemplo, desde tu máquina local) puedes usar:

```bash
npm run deploy
```

Ese comando genera el build y lo publica en la rama `gh-pages`.
