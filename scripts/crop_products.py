from PIL import Image

def crop_save(src, box, dst):
    im = Image.open(src).convert("RGB")
    im.crop(box).save(dst)
    print(dst, im.crop(box).size)

base = "scripts/_extracted/"
out = "public/assets/img/"

# Compactadora SOL-MTC-15 -- isolate the machine render on white
crop_save(base + "sol_p2_x61_575x1280.jpeg", (0, 240, 575, 800), out + "prod-compactadora.jpg")

# Bicitriciclo SOL-BT-M01 -- isolate the vehicle render on white
crop_save(base + "sol_p2_x63_575x1280.jpeg", (6, 266, 570, 726), out + "prod-bicitriciclo.jpg")

# Línea de reciclaje PET -- isolate the machine render (crop out top banner + bottom text)
crop_save(base + "sol_p2_x62_575x1280.jpeg", (0, 248, 575, 610), out + "prod-linea-pet.jpg")

# Ingeniero SOLINAG en planta -- keep the photo + caption chip, drop the white text panel below
crop_save(base + "sol_p2_x64_575x1280.jpeg", (0, 0, 575, 650), out + "prod-ingeniero.jpg")

# Fachada + equipo SOLINAG (real team photo)
crop_save(base + "sol_p3_x103_399x212.jpeg", (0, 0, 399, 212), out + "team-solinag.jpg")

# --- Catálogo WhatsApp (brand/catalogo/) ---
cat = "brand/catalogo/"

# Compactadora vertical SOL-CV -- vista frontal completa, con logo SOLINAG visible
crop_save(cat + "Compactadora Vertical de 60 ton SOL-CV60M.jpeg", (680, 190, 1015, 545),
          out + "prod-compactadora-vertical.jpg")

# Línea de lavado y secado PET SOL-LP -- fila de equipos del encabezado
crop_save(cat + "Líneas de Lavado y Secado de Hojuelas PET - Serie SOL-LP.jpeg", (410, 208, 1024, 412),
          out + "prod-lavado-pet.jpg")


# ---------------------------------------------------------------------------
# Recortes de las láminas del catálogo (fotos limpias de producto sobre blanco).
# Coordenadas verificadas contra el tamaño nativo de cada lámina.
# ---------------------------------------------------------------------------

# Molino SOL-MTC (lámina 900x1600): los tres modelos, uno por tarjeta.
mtc = cat + "Molino Triturador Compacto Industrial - Serie SOL-MTC.jpeg"
crop_save(mtc, (55, 395, 288, 645), out + "prod-mtc-05.jpg")
crop_save(mtc, (330, 395, 563, 645), out + "prod-mtc-15.jpg")
crop_save(mtc, (605, 395, 838, 645), out + "prod-mtc-30.jpg")

# Bicitriciclos SOL-BT (lámina 1024x1536). El techo va bajo para saltar el
# encabezado del modelo y el suelo alto para dejar fuera "CAPACIDAD DE CARGA";
# los eléctricos se cierran antes en X para soltar el borde de la tarjeta.
bt = cat + "Bicitriciclos de Carga - Serie SOL-BT.jpeg"
crop_save(bt, (52, 450, 332, 676), out + "prod-bt-m01.jpg")
crop_save(bt, (372, 450, 644, 676), out + "prod-bt-me01g.jpg")
crop_save(bt, (697, 450, 969, 676), out + "prod-bt-me01l.jpg")

# Skid de agua SOL-WR500 (lámina 900x1600): render del skid, sin el título.
crop_save(cat + "Skid de Tratamiento y Recuperación de Agua - SOL-WR500.jpeg",
          (340, 248, 890, 575), out + "prod-wr500.jpg")

# Sistema de clasificación SMC-PET 4 (lámina 1024x1536): render con operarios.
crop_save(cat + "Sistema modular de separación pet.jpeg",
          (362, 250, 1015, 545), out + "prod-smc-pet4.jpg")

# Línea de lavado SOL-LP (lámina 1024x1536): la línea completa del encabezado.
crop_save(cat + "Líneas de Lavado y Secado de Hojuelas PET - Serie SOL-LP.jpeg",
          (335, 235, 1015, 420), out + "prod-lp-linea.jpg")


# ---------------------------------------------------------------------------
# Fotografía real de planta.
#
# Las carpetas del catálogo traen seis PNG, pero solo hay TRES imágenes
# distintas: 15Ton/4.png, 30Ton/2.png y 30Ton/3.png son el mismo archivo, y
# 15Ton/3.png es idéntico a 30Ton/4.png. Se conserva una copia de cada una y
# se nombran por lo que muestran, no por la carpeta donde estaban.
#
# (Además, la lámina guardada en la carpeta "15 Ton SOL-CV15M" es en realidad
# la del SOL-CV60M; no hay lámina del CV15M en el catálogo.)
# ---------------------------------------------------------------------------

def foto_planta(src, dst):
    """Convierte un PNG de planta a JPG optimizado, respetando la orientación."""
    from PIL import ImageOps
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im.save(dst, quality=86, optimize=True)
    print(dst, im.size)

cv15 = cat + "Compactadora Vertical 15 Ton  SOL-CV15M/"
foto_planta(cv15 + "2.png", out + "planta-compactadora.jpg")        # equipo completo
foto_planta(cv15 + "3.png", out + "planta-compactadora-frontal.jpg")  # frente cerrado
foto_planta(cv15 + "4.png", out + "planta-tablero.jpg")             # tablero de control
