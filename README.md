# Mirador Jarana · Menú web

La carta digital de **Mirador Jarana Gastro Bar**. Es una página estática (HTML + CSS + un poco de JavaScript), sin frameworks ni base de datos, y Vercel la publica.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | **Todo el contenido de la carta**: platos, descripciones, precios, horario y contacto. |
| `styles.css` | Diseño: colores por sección, tipografías, tamaños y adaptación a celular. |
| `app.js` | Resalta en la barra superior la sección que estás viendo. La carta funciona aunque no cargue. |
| `vercel.json` | Configuración de Vercel: cabeceras de seguridad y caché. |
| `img/` | Imagen que aparece al compartir el enlace (`og.png`) e ícono para iPhone. |
| `favicon.svg` | Ícono de la pestaña del navegador. |
| `robots.txt`, `sitemap.xml` | Ayudan a que Google encuentre la página. |

## Cómo cambiar un precio (ejemplo)

1. Abre `index.html` en GitHub y pulsa el lápiz (✏️ *Edit*).
2. Busca el plato con `Ctrl + F`, por ejemplo `Churrasco`.
3. Vas a ver una línea así:

   ```html
   <data class="price" value="42000">$42.000</data>
   ```

   Cambia **los dos** números: `value="45000"` (sin puntos, es el que leen Google y los programas) y `$45.000` (el que ve el cliente).
4. Pulsa **Commit changes**. Vercel publica el cambio solo, en menos de un minuto.

## Cómo agregar un plato

Copia un bloque `<li class="item">…</li>` completo de la misma sección, pégalo debajo y cambia el nombre, la descripción y el precio. Si el plato no lleva descripción, borra la línea `<p class="desc">`.

## Probarla en tu computador (opcional)

Con Python instalado, en la carpeta del proyecto ejecuta:

```bash
python -m http.server 8000
```

Luego abre http://localhost:8000 en el navegador.

## Notas técnicas

- **Caché:** si cambias `styles.css` o `app.js`, sube el número en `styles.css?v=2` / `app.js?v=2` dentro de `index.html` (por ejemplo a `v=3`). Así los celulares que ya visitaron la carta descargan el diseño nuevo.
- **Fotos:** las de ambiente vienen de [Unsplash](https://unsplash.com/license) (uso comercial gratis) y se cargan desde su CDN (`images.unsplash.com`), que entrega el tamaño y formato justo para cada pantalla. Para cambiar una foto, reemplaza el código `photo-…` en `index.html`.
- **Animaciones:** solo CSS y un poco de JavaScript (`app.js`), sin React ni librerías externas. Se desactivan solas si el teléfono tiene activado "reducir movimiento".
- **Fuentes:** Lobster, Oswald y Aleo (licencia SIL OFL) se cargan desde jsDelivr con versión fija.
- **Seguridad:** `vercel.json` define una política de contenido (CSP) que solo permite scripts propios, fuentes de jsDelivr y el mapa de Google.
- **El código QR** apunta a la dirección principal. Si cambias la dirección del sitio, hay que generar un QR nuevo.
